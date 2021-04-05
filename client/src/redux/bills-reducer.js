import billsApi from "../api/billsApi"
import {setMessage, setSelectedBill} from "./app-reducer"
import {formatInputData, formatOutputData} from "../helpers"
import {MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR} from "../constants"


const ADD_BILL = 'ADD_BILL'
const SET_BILLS = 'SET_BILLS'

const initialState = {
    bills: []
}

const billsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BILLS:
            return {
                bills: [
                    ...action.bills,
                ]
            }
        case ADD_BILL:
            return {
                bills: [
                    ...state.bills,
                    action.bill,
                ]
            }
        default:
            return state
    }
}

export const setBills = bills => ({type: SET_BILLS, bills})
export const addBill = bill => ({type: ADD_BILL, bill})


export const setBillsThunk = () => {
    return async (dispatch) => {
        try {
            const result = await billsApi.getBills()

            if (result.status === 200) {
                const bills = result.data
                dispatch(setBills(bills))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }

    }
}

export const addBillThunk = (values) => {
    return async (dispatch) => {
        try {
            const result = await billsApi.add(formatOutputData(values))
            if (result.status === 201) {
                dispatch(addBill(formatInputData(result.data)))
                dispatch(setMessage('Счет добавлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const deleteBillThunk = billId => {
    return async (dispatch) => {
        try {
            const result = await billsApi.delete(billId)
            if (result.status === 200) {
                dispatch(setSelectedBill({}))
                dispatch(setBillsThunk())
                dispatch(setMessage('Счет удален'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const updateBillThunk = (values) => {
    return async (dispatch) => {
        try {
            const result = await billsApi.update(formatOutputData(values))
            if (result.status === 200) {
                dispatch(setSelectedBill({...values}))
                dispatch(setBillsThunk())
                dispatch(setMessage('Счет обновлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}


export default billsReducer