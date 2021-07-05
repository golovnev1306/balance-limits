const {getKeyByValue} = require('../../helpers')
const path = require('path')
const fs = require('fs')

const dirFileWithProplemsImportEconomy = `${path.resolve()}/problemsImportEconomyList.xlsx`

const {Deal, Limit} = require('../models/index')
const ExcelJS = require('exceljs')

module.exports = {
    getAll: async (req, res) => {
        try {
            const deals = await Deal.findAll({
                attributes: ['id', 'number', 'date',
                    'product', 'summ',
                    'partner', 'limit_id', 'economy', 'is_bid',
                    'Limit.kvr', 'Limit.kosgu',
                    'Limit.kvfo', 'Limit.ok'
                ],
                include: {
                    model: Limit,
                    attributes: []
                },
                raw: true,
            })
            res.status(200).json(deals)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },
    add: async (req, res) => {
        const {...values} = req.body
        try {
            const createdDeal = await Deal.create({...values})
            const createdDealWithCodes = await Deal.findOne({
                where: {
                    id: createdDeal.id
                },
                attributes: ['id', 'number', 'date',
                    'product', 'summ',
                    'partner', 'limit_id', 'economy', 'is_bid',
                    'Limit.kvr', 'Limit.kosgu',
                    'Limit.kvfo', 'Limit.ok'
                ],
                include: {
                    model: Limit,
                    attributes: []
                },
                raw: true,
            })
            res.status(201).json(createdDealWithCodes)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },
    delete: async (req, res) => {
        try {
            const {dealId} = req.query
            const isDestroyed = await Deal.destroy({
                where: {
                    id: dealId
                }
            })

            res.status(200).json(isDestroyed)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },
    update: async (req, res) => {
        try {
            const {...values} = req.body
            await Deal.update(
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

    importEconomy: async (req, res) => {
        const {importFile} = req.files

        const workbook = new ExcelJS.Workbook();
        try {
            await workbook.xlsx.load(importFile.data)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка открытия файла, возможно неверный формат: \n${error}`})
        }
        let sheet = workbook.worksheets[0]
        let columns = {
            number: 'Номер извещения',
            product: 'Наименование объекта закупки',
            economy: 'Экономия',
            partner: 'Участник',
            date: 'Дата заключения контракта',
            status: 'Статус контракта',
        }

        let excelColumns = {}
        let excelColumnsKeys = []
        let excelData = []
        try {
            sheet.eachRow(async function (row, rowNumber) {
                if (rowNumber === 1) {
                    let colValues = Object.values(columns)

                    row.eachCell((cell, colNumber) => {

                        if (colValues.includes(cell.value)) {
                            excelColumns[colNumber] = cell.value
                            excelColumnsKeys.push(colNumber)
                        }
                    })
                }

                if (rowNumber > 1) {
                    let rowData = {}
                    row.eachCell((cell, colNumber) => {
                        if (excelColumnsKeys.includes(colNumber)) {
                            rowData[getKeyByValue(columns, excelColumns[colNumber])] = cell.value
                        }
                    })
                    excelData.push(rowData)
                }
            })
        } catch (error) {
            res.status(400).json({messageBody: `Во время чтения данных в файле произошла ошибка: \n${error}`})
        }

        const currentYear = (new Date).getFullYear()

        excelData = excelData.filter(rowData => {

            if (rowData.date) {
                return rowData.status === 'Контракт заключён' && (currentYear.toString() === rowData.date.slice(6, 10))
            }

            return false
        })

        let dealsWillBeUpdate = []
        let isExistMistakes = false

        try {
            let deals = await Deal.findAll({
                raw: true
            })

            excelData.forEach((rowData, indexOfRow) => {
                const comparedDeals = deals.filter(deal => {
                    let newNumber = `${rowData.number.slice(-4)}`
                    return (deal.number.slice(-4) === newNumber)
                })

                comparedDeals.map((comparedDeal, i) => {
                    if (i === 0) {
                        dealsWillBeUpdate.push({...comparedDeal, economy: rowData.economy})
                        excelData[indexOfRow] = null
                    } else {
                        dealsWillBeUpdate.push({...comparedDeal, economy: 0})
                    }
                })
            })

            excelData = excelData.filter(Boolean)
            if (excelData.length !== 0) {
                isExistMistakes = true
                const workbookWithMistakes = new ExcelJS.Workbook()
                const worksheetWithMistakes = workbookWithMistakes.addWorksheet('Неустановленная экономия')

                let columnsForExcel = []

                for (let key in columns) {
                    columnsForExcel.push({
                        header: columns[key],
                        key: key
                    })
                }
                worksheetWithMistakes.columns = columnsForExcel
                worksheetWithMistakes.addRows(excelData)
                worksheetWithMistakes.columns.forEach(column => {
                    column.width = column.header.length < 12 ? 20 : (column.header.length + 10)
                })
                workbookWithMistakes
                    .xlsx
                    .writeFile(dirFileWithProplemsImportEconomy)
                    .then(() => {
                        console.log("saved")
                    })
                    .catch((err) => {
                        console.log("err", err)
                    })
            }

        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }

       try {
            await Deal.bulkCreate(dealsWillBeUpdate, {updateOnDuplicate: ['economy']})
            res.status(200).json({isSuccess: true, isExistMistakes})
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },

    download: async (req, res) => {
        try {
            await res.download(dirFileWithProplemsImportEconomy)
        } catch (error) {
            res.status(500).json({messageBody: `Ошибка при загрузке: \n${error}`})
        }
    },

    deleteFile: async (req, res) => {
        fs.stat( dirFileWithProplemsImportEconomy, function (error) {
            if (error) {
                return res.status(400).json({messageBody: `Удаляемый файл не существует`})
            }

            fs.unlink(dirFileWithProplemsImportEconomy,function(error){
                if(error) {
                    return res.status(500).json({messageBody: `Не удалось удалить файл, причина: ${error}`})
                }
                res.status(200).json({isSuccess: true})
            })
        })
    },

    checkFile: async (req, res) => {
        fs.stat( dirFileWithProplemsImportEconomy, function (error) {
            if (error) {
                return res.status(200).json({isExistMistakes: false})
            }

            res.status(200).json({isExistMistakes: true})
        })
    }
}