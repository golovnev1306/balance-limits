import limitsApi from '../api/limitsApi'
import {setMessage, setSelectedBill, setSelectedDeal, setSelectedLimit} from "./app-reducer"
import {formatOutputData} from "../helpers"
import {MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR} from "../constants"
import {LimitType, ReturnActionsType, TDispatch} from "../types"

const initialState = {
    limits: [] as LimitType[]
}

type LimitsActionsType = ReturnActionsType<typeof actions>

const limitsReducer = (state = initialState, action: LimitsActionsType) => {
    switch (action.type) {
        case "SET_LIMITS":
            return {
                limits: action.limits
            }
        case "ADD_LIMIT":
            return {
                limits: [...state.limits, action.limit],
            }
        default:
            return state
    }
}

const actions = {
    setLimits: (limits: LimitType[]) => ({type: "SET_LIMITS", limits} as const),
    addLimit: (limit: LimitType) => ({type: "ADD_LIMIT", limit} as const)
}

export const setLimitsThunk = () => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await limitsApi.getAll()
            if (result.status === 200) {
                const limits = result.data
                dispatch(actions.setLimits(limits))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const addLimitThunk = (values: any) => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await limitsApi.add(formatOutputData(values))
            if (result.status === 201) {
                dispatch(actions.addLimit(result.data))
                dispatch(setMessage('Лимит добавлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const deleteLimitThunk = (limitId: number) => {

    return async (dispatch: TDispatch) => {

        try {
            const result = await limitsApi.delete(limitId)
            if (result.status === 200) {
                dispatch(setSelectedLimit({}))
                dispatch(setSelectedDeal({}))
                dispatch(setSelectedBill({}))
                dispatch(setLimitsThunk())
                dispatch(setMessage('Лимит удален'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const updateLimitThunk = (values: any) => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await limitsApi.update(formatOutputData(values))
            if (result.status === 200) {
                dispatch(setSelectedLimit({...values}))
                dispatch(setLimitsThunk())
                dispatch(setMessage('Лимит обновлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}


export default limitsReducer