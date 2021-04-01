import paymentsApi from "../api/paymentsApi"
import {setMessage, setSelectedPayment} from "./app-reducer"
import {
    createJsFormData,
    formatInputData,
    formatOutputData,
    MESSAGE_ERROR_UNIVERSAL,
    TYPE_MESSAGE_ERROR
} from "../helpers"

const ADD_PAYMENT = 'ADD_PAYMENT'
const SET_PAYMENTS = 'SET_PAYMENTS'

const initialState = {
    payments: []
}

const paymentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAYMENTS:
            return {
                payments: [
                    ...action.payments,
                ]
            }
        case ADD_PAYMENT:
            return {
                payments: [
                    ...state.payments,
                    action.payment,
                ]
            }
        default:
            return state
    }
}

export const setPayments = payments => ({type: SET_PAYMENTS, payments})
export const addPayment = payment => ({type: ADD_PAYMENT, payment})


export const setPaymentsThunk = () => {
    return async (dispatch) => {
        try {
            const result = await paymentsApi.get()
            if (result.status === 200) {
                const payments = result.data
                dispatch(setPayments(payments))
            }
        } catch (e) {
            console.log(e.response.data)
        }


    }
}

export const addPaymentThunk = (values) => {
    return async (dispatch) => {
        try {
            const result = await paymentsApi.add(formatOutputData(values))
            if (result.status === 201) {
                dispatch(addPayment(formatInputData(result.data)))
                dispatch(setMessage('Оплата добавлена'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const deletePaymentThunk = paymentId => {
    return async (dispatch) => {
        try {
            const result = await paymentsApi.delete(paymentId)
            if (result.status === 200) {
                dispatch(setSelectedPayment({}))
                dispatch(setPaymentsThunk())
                dispatch(setMessage('Оплата удалена'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const updatePaymentThunk = (values) => {
    return async (dispatch) => {
        try {
            const result = await paymentsApi.update(formatOutputData(values))
            if (result.status === 200) {
                dispatch(setSelectedPayment({...values}))
                dispatch(setPaymentsThunk())
                dispatch(setMessage('Оплата обновлена'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const importPaymentsThunk = (values) => {
    return async (dispatch) => {
        try {
            const result = await paymentsApi.import(createJsFormData(values))
            if (result.status === 201) {
                dispatch(setPaymentsThunk())
                dispatch(setMessage('Импорт успешно завершен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}


export default paymentsReducer