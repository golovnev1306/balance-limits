import columnsVariants from "./config/columnVariants"
import columnsExcelExport from "./config/columnsExcelExport"
import moment from "moment"

export const formatOutputData = values => {
    return {
        ...values,
        summ: parseFloat((typeof values.summ === 'string')
            ? values.summ.replace(/\s/g, '').replace(/,/g, '.')
            : values.summ.toString()),
        limit_id: (values.limit_id === -1) ? null : values.limit_id
    }
}

export const formatInputData = (values, keys = []) => {
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

export const convertToExcelData = (items, instanceName) => {
    let dataExcel = []
    items.map(item => {
        let rowExcel = []

        columnsVariants[instanceName].map(column => {
            const style = {
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

export const countBalances = (parents, children, instanceName) => {

    let itemsBalances = []
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

export const createJsFormData = values => {
    let formData = new FormData()
    for (let key in values) {
        formData.append(key, values[key])
    }
    return formData
}

export const formatNumber = value => {
    return new Intl.NumberFormat('ru-RU', {minimumFractionDigits: 2}).format(value.toFixed(2))
}

export const getComparingObject = (obj, fields) => {
    let resultObj = {}

    fields.map(field => {
        resultObj[field] = obj?.[field]
    })

    return resultObj
}

export const getComparedData = (convertibleArray, comparableArray) => {
    const availableComparableArray = [...comparableArray]
    const comparingFields = ['ok', 'kosgu', 'kvfo', 'kvr', 'summ']
    let resultConvertibleArray = [...convertibleArray]
    resultConvertibleArray.map(convertibleItem => {
        const comparingItem = getComparingObject(convertibleItem, comparingFields)

        const foundIndex = availableComparableArray.findIndex(comparableItem => {
            const comparingComparableItem = getComparingObject(comparableItem, comparingFields)
            return JSON.stringify(comparingItem) === JSON.stringify(comparingComparableItem)
        })

        let found = {}

        if (foundIndex !== -1) {
            found = Object.assign({}, availableComparableArray[foundIndex])
            delete availableComparableArray[foundIndex]
        }

        return Object.assign(convertibleItem, {found})
    })

    const availableComparableById = {}

    resultConvertibleArray.map(convertibleItem => {
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

    resultConvertibleArray.map(convertibleItem => {
        return Object.assign(convertibleItem, {available: availableComparableById[convertibleItem.id]})
    })

    return resultConvertibleArray
}