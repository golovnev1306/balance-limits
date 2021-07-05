import paymentsApi from "../api/paymentsApi"
import {setMessage, setSelectedPayment} from "./app-reducer"
import {
    createJsFormData,
    formatInputData,
    formatOutputData
} from "../helpers"
import {MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR} from "../constants"
import {PaymentType, ReturnActionsType, TDispatch} from "../types"

const initialState = {
    payments: [] as PaymentType[]
}

type PaymentsActionsType = ReturnActionsType<typeof actions>

const paymentsReducer = (state = initialState, action: PaymentsActionsType) => {
    switch (action.type) {
        case "SET_PAYMENTS":
            return {
                payments: [
                    ...action.payments,
                ]
            }
        case "ADD_PAYMENT":
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


const actions = {
    setPayments: (payments: PaymentType[]) => ({type: "SET_PAYMENTS", payments} as const),
    addPayment: (payment: PaymentType) => ({type: "ADD_PAYMENT", payment} as const)
}


export const setPaymentsThunk = () => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await paymentsApi.get()
            if (result.status === 200) {
                const payments = result.data
                dispatch(actions.setPayments(payments))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
            throw new Error
        }


    }
}

export const addPaymentThunk = (values: any) => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await paymentsApi.add(formatOutputData(values))
            if (result.status === 201) {

                dispatch(actions.addPayment(formatInputData(result.data)))
                dispatch(setMessage('Оплата добавлена'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const deletePaymentThunk = (paymentId: number) => {
    return async (dispatch: TDispatch) => {
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

export const updatePaymentThunk = (values: any) => {
    return async (dispatch: TDispatch) => {
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

export const importPaymentsThunk = (values: any) => {
    return async (dispatch: TDispatch) => {
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