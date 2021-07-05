import billsApi from "../api/billsApi"
import {setMessage, setSelectedBill} from "./app-reducer"
import {formatInputData, formatOutputData} from "../helpers"
import {MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR} from "../constants"
import {BillType, ReturnActionsType} from "../types"
import {Dispatch} from "redux"

const initialState = {
    bills: [] as Array<BillType>
}

type BillsActionsType = ReturnActionsType<typeof actions>

const billsReducer = (state = initialState, action: BillsActionsType) => {
    switch (action.type) {
        case "SET_BILLS":
            return {
                bills: [
                    ...action.bills,
                ]
            }
        case "ADD_BILL":
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

export const actions = {
    setBills: (bills: Array<BillType>) => ({type: "SET_BILLS", bills} as const),
    addBill: (bill: BillType) => ({type: "ADD_BILL", bill} as const)
}


export const setBillsThunk = () => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await billsApi.getBills()

            if (result.status === 200) {
                const bills = result.data
                dispatch(actions.setBills(bills))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
            throw new Error
        }

    }
}

export const addBillThunk = (values: any) => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await billsApi.add(formatOutputData(values))
            if (result.status === 201) {
                dispatch(actions.addBill(formatInputData(result.data)))
                dispatch(setMessage('Счет добавлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const deleteBillThunk = (billId: number) => {
    return async (dispatch: any) => {
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

export const updateBillThunk = (values: any) => {
    return async (dispatch: any) => {
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