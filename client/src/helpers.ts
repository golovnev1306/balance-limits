import columnsVariants from './config/columnVariants'
import columnsExcelExport from './config/columnsExcelExport'
import moment from 'moment'
import classNames from 'classnames'
import {DEFAULT_CELL_CLASS} from './constants'
import {TablesNamesType} from './types'

export const formatOutputData = (values: any) => {
    return {
        ...values,
        summ: parseFloat((typeof values.summ === 'string')
            ? values.summ.replace(/\s/g, '').replace(/,/g, '.')
            : values.summ.toString()),
        limit_id: (values.limit_id === -1) ? null : values.limit_id
    }
}

export const formatInputData = (values: any, keys: string[] = []) => {
    let result = {...values}
    keys.map(key => {
        switch (key) {
            case 'limit_id':
                result.limit_id = result.limit_id === null ? -1 : result.limit_id
                break
            default:
        }
    })

    result.date = moment(result.date).format('YYYY-MM-DD')

    return result
}

export const convertToExcelData = (items: any[], instanceName: TablesNamesType) => {
    let dataExcel: any[] = []
    items.map(item => {
        let rowExcel: any[] = []

        columnsVariants[instanceName].map(column => {
            const style: any = {
                alignment: {wrapText: true},
                border: {bottom: {style: 'thin', color: {rgb: '000000'}}},
                numFmt: "0.00"
            }

            if (column.field === 'is_bid') {
                style.numFmt = "0"
            }

            if (item.is_bid) {
                style.fill = {
                    fgColor: {
                        rgb: "FFCCEEFF"
                    }
                }
            }

            rowExcel.push({
                value: item[column.field] !== null
                    ? (column.field === 'date' ? new Date(item[column.field]).toLocaleDateString() : item[column.field])
                    : '',
                style
            })
        })
        dataExcel.push(rowExcel)
    })

    return [{
        columns: columnsExcelExport[instanceName],
        data: dataExcel
    }]
}

export const countBalances = (parents: any[], children: any[], instanceName: string) => {

    let itemsBalances: any[] = []
    const columnName = `${instanceName}_id`

    parents.map(parent => {
        if (!itemsBalances[parent.id]) {
            itemsBalances[parent.id] = parent.summ
        }
    })

    children.map(child => {

        if (child[columnName] !== -1) {
            itemsBalances[child[columnName]] -= child.summ
        }
    })
    return itemsBalances
}

export const createJsFormData = (values: any) => {
    let formData = new FormData()
    for (let key in values) {
        formData.append(key, values[key])
    }
    return formData
}

export const formatNumber = (value: number) => {

    return value !== null ? new Intl.NumberFormat('ru-RU', {minimumFractionDigits: 2})
        // @ts-ignore
        .format((Math.round(value * 100) / 100).toFixed(2)) : ''
}

export const formatNumberHandler = (value: number, name: string) => {

    if (name === 'summ' && value) {
        let newValue = value.toString().replace(/[^0-9,.]/g, '')
        newValue = newValue.replace(/\./g, ',')
        const separators = [...newValue.matchAll(/,/g)]
        if (separators?.[1]) {
            newValue = newValue.slice(0, separators?.[1].index)
        }

        let firstNumber = separators[0] ? newValue.slice(0, separators[0].index) : newValue
        firstNumber = firstNumber.replace(/\s/g, '')
        if (firstNumber) {
            firstNumber = new Intl.NumberFormat().format(parseInt(firstNumber))
        }


        let secondNumber = null
        if (typeof separators[0]?.index !== 'undefined') {
            secondNumber = newValue.slice(separators[0].index + 1)
        }

        newValue = `${firstNumber}`

        if (secondNumber !== null) {
            if (secondNumber.length > 2) {
                secondNumber = secondNumber.slice(0, 2)
            }

            newValue = `${firstNumber},${secondNumber}`
        }

        return newValue
    }
    return value
}

export const getComparingObject = (obj: any, fields: string[]) => {
    let resultObj: any = {}

    fields.map(field => {
        resultObj[field] = obj?.[field]
    })

    return resultObj
}

export const getComparedData = (convertibleArray: any[], comparableArray: any[]) => {
    const availableComparableArray = [...comparableArray]
    const comparingFields = ['ok', 'kosgu', 'kvfo', 'kvr', 'summ']
    let resultConvertibleArray: any[] = []
    convertibleArray.forEach(convertibleItem => {
        const comparingItem = getComparingObject(convertibleItem, comparingFields)
        const foundIndex = availableComparableArray.findIndex(comparableItem => {
            const comparingComparableItem = getComparingObject(comparableItem, comparingFields)
            return JSON.stringify(comparingItem) === JSON.stringify(comparingComparableItem)
        })

        let found = null

        if (foundIndex !== -1) {
            found = Object.assign({}, availableComparableArray[foundIndex])
            delete availableComparableArray[foundIndex]
        }

        resultConvertibleArray[convertibleItem.id] = {found}
    })

    const availableComparableById: any = {}

    convertibleArray.forEach(convertibleItem => {
        const comparingItem = getComparingObject(convertibleItem, ['ok', 'kosgu', 'kvfo', 'kvr'])
        availableComparableArray.map(comparableItem => {
            const comparingComparableItem = getComparingObject(comparableItem, ['ok', 'kosgu', 'kvfo', 'kvr'])
            if (JSON.stringify(comparingItem) === JSON.stringify(comparingComparableItem)) {
                if (!availableComparableById[convertibleItem.id]) {
                    availableComparableById[convertibleItem.id] = []
                }
                availableComparableById[convertibleItem.id].push(comparableItem)
            }
        })
    })

    convertibleArray.forEach(convertibleItem => {
        Object.assign(resultConvertibleArray[convertibleItem.id], {available: availableComparableById[convertibleItem.id]
                ? availableComparableById[convertibleItem.id]
                : null})
    })

    return resultConvertibleArray
}

export const getConcatClassWithDefault = (combineClass = '') => classNames(DEFAULT_CELL_CLASS, combineClass)