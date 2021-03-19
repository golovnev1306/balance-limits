const {Payment, Limit} = require('../models/index')
const ExcelJS = require('exceljs')
const {getKeyByValue} = require('../../helpers')
const moment = require('moment')

module.exports = {
    getAll: async (req, res) => {
        const payments = await Payment.findAll({
            attributes: [
                'id', 'purpose_of_payment', 'number', 'date', 'summ', 'limit_id', 'Limit.kvr', 'Limit.kosgu',
                'Limit.kvfo', 'Limit.ok'
            ],
            include: {
                model: Limit,
                attributes: [],
            },
            raw: true
        })
        res.status(200).json(payments)
    },

    add: async (req, res) => {
        const {...values} = req.body
        const createdPayment = await Payment.create({...values})
        const createdPaymentWithCodes = await Payment.findOne({
            where: {
                id: createdPayment.id
            },
            attributes: [
                'id', 'purpose_of_payment', 'number', 'date', 'summ', 'limit_id', 'Limit.kvr', 'Limit.kosgu',
                'Limit.kvfo', 'Limit.ok'
            ],
            include: {
                model: Limit,
                attributes: [],
            },
            raw: true,
        })

        res.status(201).json(createdPaymentWithCodes)
    },

    delete: async (req, res) => {
        const {paymentId} = req.query
        const isDestroyed = await Payment.destroy({
            where: {
                id: paymentId
            }
        })

        res.status(200).json(isDestroyed)
    },

    update: async (req, res) => {
        const {...values} = req.body

        await Payment.update(
            {...values},
            {
                where: {
                    id: values.id
                }
            })

        res.status(200).json({isSuccess: true})
    },

    import: async (req, res) => {
        const {importFile} = req.files
        const {importOverwrite} = req.body
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(importFile.data)
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
        }

        let excelColumns = {}
        let excelColumnsKeys = []
        let excelData = []
        let isWriteArray = true
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

        excelData = excelData.filter(rowData => {

            return rowData.status === 'Обработан' && (rowData.kvr === '244' || rowData.kvr === '247')
        })

        let limits = await Limit.findAll({
            attributes: ['id', 'kvr', 'kosgu', 'kvfo', 'ok'],
            raw: true
        })

        excelData.map(rowData => {
            const limit = limits.find(limit => {
                return (limit.kvr === rowData.kvr) &&
                    (limit.kosgu === rowData.kosgu) &&
                    (limit.kvfo === rowData.kvfo) &&
                    (limit.ok === rowData.ok)
            })
            try {
                rowData.limit_id = limit.id
                rowData.date = moment(rowData.date, "DD.MM.YYYY")
            } catch (error) {
                console.log(error)
            }
        })


        if (importOverwrite) {
            await Payment.destroy({
                where: {},
                truncate: true
            })
        }

        console.log(excelData)
        await Payment.bulkCreate(excelData)

        res.status(201).json({isSuccess: true})
    },
}