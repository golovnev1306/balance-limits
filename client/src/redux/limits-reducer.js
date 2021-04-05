import limitsApi from '../api/limitsApi'
import {setMessage, setSelectedBill, setSelectedDeal, setSelectedLimit} from "./app-reducer"
import {formatOutputData} from "../helpers"
import {MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR} from "../constants"


const SET_LIMITS = 'SET_LIMITS'
const ADD_LIMIT = 'ADD_LIMIT'

const initialState = {
    limits: []
}

const limitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIMITS:
            return {
                limits: action.limits
            }
        case ADD_LIMIT:
            return {
                limits: [...state.limits, action.limit],
            }
        default:
            return state
    }
}

const setLimits = limits => ({type: SET_LIMITS, limits})
const addLimit = limit => ({type: ADD_LIMIT, limit})

export const setLimitsThunk = () => {
    return async (dispatch) => {
        try {
            const result = await limitsApi.getAll()
            if (result.status === 200) {
                const limits = result.data
                dispatch(setLimits(limits))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const addLimitThunk = (values) => {
    return async (dispatch) => {
        try {
            const result = await limitsApi.add(formatOutputData(values))
            if (result.status === 201) {
                dispatch(addLimit(result.data))
                dispatch(setMessage('Лимит добавлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const deleteLimitThunk = limitId => {

    return async (dispatch) => {

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

export const updateLimitThunk = (values) => {
    return async (dispatch) => {
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