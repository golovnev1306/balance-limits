import Validators, {length, required} from 'redux-form-validators'
import {FormsFieldsType} from '../types'

Object.assign(Validators.messages, {
    presence: {
        defaultMessage: 'Обязательно для заполнения'
    },
    wrongLength: {
        defaultMessage: 'Длина должна быть {count, number} {count, plural, one {символ} other {символа(ов)}}'
    },
    notANumber: {
        defaultMessage: 'Значение должно быть числовым'
    },
    tooLong: {
        defaultMessage: "Слишком длинное значение (максимум {count, number} {count, plural, one {символ} other {символов}})"
    }
})




const formsFields: FormsFieldsType = {
    limits: [
        { name: 'name', autoFocus: true, label: 'Наименование', type: 'text', validate: [required()]},
        { name: 'kvr', label: 'КВР', type: 'text', validate: [required(), length({is: 3})]},
        { name: 'kosgu', label: 'КОСГУ', type: 'text', validate: [required(), length({is: 3})]},
        { name: 'kvfo', label: 'КВФО', type: 'text', validate: [required(), length({is: 1})]},
        { name: 'ok', label: 'Отраслевой код', type: 'text', validate: [required(), length({is: 17})]},
        { name: 'summ', label: 'Сумма', type: 'text', validate: [required()]},
        { name: 'balance', label: 'Остаток по договорам', disabled: true, variant: 'filled', type: 'text'},
    ],
    deals: [
        {name: 'limit_id', label: 'Лимит', type: 'select', validate: [required()]},
        {name: 'number', autoFocus: true, label: 'Номер', type: 'text', validate: [required(), length({max: 15})]},
        {name: 'date', label: 'Дата', type: 'date', InputLabelProps: { shrink: true }, validate: [required()]},
        {name: 'product', label: 'Продукт', type: 'text', validate: [required()]},
        {name: 'partner', label: 'Партнер', type: 'autocomplete', validate: [required(), length({max: 60})]},
        {name: 'summ', label: 'Сумма', type: 'text', validate: [required()]},
        {name: 'is_bid', label: 'Является заявкой', type: 'checkbox', validate: [required()]},
        {name: 'balance', label: 'Остаток', disabled: true, variant: 'filled', type: 'text'},
    ],
    bills: [
        { name: 'deal_id', label: 'Договор', type: 'select', validate: [required()] },
        { name: 'number', autoFocus: true, label: 'Номер', type: 'text', validate: [required(), length({max: 45})] },
        { name: 'date', label: 'Дата', type: 'date', InputLabelProps: { shrink: true }, validate: [required()] },
        { name: 'summ', label: 'Сумма', type: 'text', validate: [required()]}
    ],
    payments: [
        { name: 'limit_id', label: 'Лимит', type: 'select', validate: [required()] },
        { name: 'number', autoFocus: true, label: 'Номер', type: 'text', validate: [required(), length({max: 45})] },
        { name: 'purpose_of_payment', label: 'Назначение платежа', type: 'text', multiline: true},
        {name: 'partner', label: 'Партнер', type: 'text', validate: [required()]},
        { name: 'date', label: 'Дата', type: 'date', InputLabelProps: { shrink: true }, validate: [required()] },
        { name: 'summ', label: 'Сумма', type: 'text', validate: [required()]}
    ]

}

export default formsFields