import dealsApi from '../api/dealsApi'
import {setMessage, setSelectedBill, setSelectedDeal} from "./app-reducer";
import moment from "moment"
import {formatInputData, formatOutputData, MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR} from "../helpers";
import {addPartner, setPartners} from "./partners-reducer";

const SET_DIALS = 'SET_DIALS'
const ADD_DIAL = 'ADD_DIAL'

const initialState = {
    deals: []
}

const dealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIALS:
            return {
                deals: action.deals
            }
        case ADD_DIAL:
            return {
                deals: [
                    ...state.deals,
                    action.deal
                ]
            }
        default:
            return state
    }
}

const setDials = deals => ({type: SET_DIALS, deals})
export const addDeal = deal => ({type: ADD_DIAL, deal})


export const setDealsThunk = () => {
    return async (dispatch) => {
        const result = await dealsApi.getDeals()
        if (result.status === 200) {
            let partners = []
            const deals = result.data
            deals.map((deal, index) => {
                partners.push(deal.partner)
                deals[index] = formatInputData(deal, ['limit_id'])
            })
            dispatch(setPartners(partners))
            dispatch(setDials(deals))
        }

    }
}

export const addDealThunk = (values) => {
    return async (dispatch) => {
        try {
            const result = await dealsApi.add(formatOutputData(values))
            if (result.status === 201) {
                dispatch(addPartner(result.data.partner))
                dispatch(addDeal(formatInputData(result.data, ['limit_id'])))
                dispatch(setMessage('Договор добавлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const deleteDealThunk = dealId => {
    return async (dispatch) => {
        try {
            const result = await dealsApi.delete(dealId)
            if (result.status === 200) {
                dispatch(setSelectedDeal({}))
                dispatch(setSelectedBill({}))
                dispatch(setDealsThunk())
                dispatch(setMessage('Договор удален'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const updateDealThunk = (values) => {
    return async (dispatch) => {
        try {
            const result = await dealsApi.update(formatOutputData(values))
            if (result.status === 200) {
                dispatch(setSelectedDeal({...values}))
                dispatch(setDealsThunk())
                dispatch(setMessage('Договор обновлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export default dealsReducer