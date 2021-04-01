const {Payment, Limit} = require('../models/index')
const ExcelJS = require('exceljs')
const {getKeyByValue} = require('../../helpers')
const moment = require('moment')

module.exports = {
    getAll: async (req, res) => {
        try {
            const payments = await Payment.findAll({
                attributes: [
                    'id', 'purpose_of_payment', 'number', 'date', 'summ', 'partner', 'limit_id', 'Limit.kvr', 'Limit.kosgu',
                    'Limit.kvfo', 'Limit.ok'
                ],
                include: [{
                    model: Limit,
                    attributes: []
                }],
                raw: true
            })
            res.status(200).json(payments)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },

    add: async (req, res) => {
        const {...values} = req.body
        try {
            const createdPayment = await Payment.create({...values})
            const createdPaymentWithCodes = await Payment.findOne({
                where: {
                    id: createdPayment.id
                },
                attributes: [
                    'id', 'purpose_of_payment', 'number', 'date', 'summ', 'partner', 'limit_id', 'Limit.kvr', 'Limit.kosgu',
                    'Limit.kvfo', 'Limit.ok'
                ],
                include: {
                    model: Limit,
                    attributes: [],
                },
                raw: true,
            })

            res.status(201).json(createdPaymentWithCodes)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },

    delete: async (req, res) => {
        const {paymentId} = req.query
        try {
            const isDestroyed = await Payment.destroy({
                where: {
                    id: paymentId
                }
            })

            res.status(200).json(isDestroyed)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },

    update: async (req, res) => {
        const {...values} = req.body
        try {
            await Payment.update(
                {...values},
                {
                    where: {
                        id: values.id
                    }
                })

            res.status(200).json({isSuccess: true})
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },

    import: async (req, res) => {
        const {importFile} = req.files
        const {importOverwrite} = req.body
        const workbook = new ExcelJS.Workbook();
        try {
            await workbook.xlsx.load(importFile.data)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка открытия файла, возможно неверный формат: \n${error}`})
        }
        let sheet = workbook.worksheets[0]
        let columns = {
            number: 'Номер документа',
            date: 'Дата документа',
            status: 'Статус документа',
            summ: 'Сумма',
            purpose_of_payment: 'Назначение платежа',
            kvr: 'КВР',
            kosgu: 'КОСГУ',
            kvfo: 'КВФО',
            ok: 'Отраслевой код',
            partner: 'Наименование получателя',
        }

        let excelColumns = {}
        let excelColumnsKeys = []
        let excelData = []
        let isWriteArray = true
        try {
            sheet.eachRow(async function (row, rowNumber) {
                if (rowNumber === 6) {
                    let colValues = Object.values(columns)

                    row.eachCell((cell, colNumber) => {

                        if (colValues.includes(cell.value)) {
                            excelColumns[colNumber] = cell.value
                            excelColumnsKeys.push(colNumber)
                        }
                    })
                }

                if (rowNumber > 6) {
                    if (row.getCell('A').value.trim() === 'Итого:') {
                        isWriteArray = false
                    }
                    let rowData = {}
                    row.eachCell((cell, colNumber) => {
                        if (excelColumnsKeys.includes(colNumber)) {
                            rowData[getKeyByValue(columns, excelColumns[colNumber])] = cell.value
                        }
                    })
                    if (isWriteArray) {
                        excelData.push(rowData)
                    }
                }
            })
        } catch (error) {
            res.status(400).json({messageBody: `Во время чтения данных в файле произошла ошибка: \n${error}`})
        }

        excelData = excelData.filter(rowData => {
            return rowData.status === 'Обработан' && (rowData.kvr === '244' || rowData.kvr === '247')
        })

        try {
            let limits = await Limit.findAll({
                attributes: ['id', 'kvr', 'kosgu', 'kvfo', 'ok'],
                raw: true
            })
            excelData.map(rowData => { //todo сделать сравнение с помощью JSON вместо кучи условий
                const limit = limits.find(limit => {
                    return (limit.kvr === rowData.kvr) &&
                        (limit.kosgu === rowData.kosgu) &&
                        (limit.kvfo === rowData.kvfo) &&
                        (limit.ok === rowData.ok)
                })

                rowData.limit_id = limit.id
                rowData.date = moment(rowData.date, "DD.MM.YYYY")
            })
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }


        if (importOverwrite) {
            try {
                await Payment.destroy({
                    where: {},
                    truncate: true
                })
            } catch (error) {
                res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
            }
        }

        try {
            await Payment.bulkCreate(excelData)
            res.status(201).json({isSuccess: true})
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }

    },
}