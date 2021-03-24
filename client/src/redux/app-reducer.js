import {setLimitsThunk} from "./limits-reducer"
import {setDealsThunk} from "./deals-reducer"
import {setBillsThunk} from "./bills-reducer"
import {setPaymentsThunk} from "./payments-reducer";
import {TYPE_MESSAGE_SUCCESS} from "../helpers";


const SET_INITIAL_APP = 'SET_INITIAL_APP'

const SET_SELECTED_LIMIT = 'SET_SELECTED_LIMIT'
const SET_SELECTED_DEAL = 'SET_SELECTED_DEAL'
const SET_SELECTED_BILL = 'SET_SELECTED_BILL'
const SET_SELECTED_PAYMENT = 'SET_SELECTED_PAYMENT'
const CLEAR_ALL_SELECTED = 'CLEAR_ALL_SELECTED'

const SET_MESSAGE = 'SET_MESSAGE'

const SET_PAGE_SIZES = 'SET_PAGE_SIZES'

const initialState = {
    isInitialised: false,

    selectedLimit: {},
    selectedDeal: {},
    selectedBill: {},
    selectedPayment: {},

    pageSizes: {
        limits: 10,
        deals: 10,
        bills: 10,
        payments: 10,
    },

    message: {
        type: TYPE_MESSAGE_SUCCESS,
        body: ''
    }
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_APP:
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        case SET_SELECTED_LIMIT:
            return {
                ...state,
                selectedLimit: action.selectedLimit,
                selectedDeal: {},
                selectedBill: {},
                selectedPayment: {}
            }
        case SET_SELECTED_DEAL:
            return {
                ...state,
                selectedDeal: action.selectedDeal,
                selectedBill: {}
            }
        case SET_SELECTED_BILL:
            return {
                ...state,
                selectedBill: action.selectedBill
            }
        case SET_SELECTED_PAYMENT:
            return {
                ...state,
                selectedPayment: action.selectedPayment
            }

        case SET_MESSAGE:
            return {
                ...state,
                message: {
                    body: action.messageBody,
                    type: action.messageType,
                }
            }

        case CLEAR_ALL_SELECTED: {
            return {
                ...state,
                selectedLimit: {},
                selectedDeal: {},
                selectedBill: {},
                selectedPayment: {}
            }
        }

        case SET_PAGE_SIZES: {
            return {
                ...state,
                pageSizes: {
                    ...state.pageSizes,
                    ...action.pageSizeObj
                },
            }
        }

        default:
            return state
    }
}

const setInitialized = isInitialized => ({type: SET_INITIAL_APP, isInitialized})
export const setSelectedLimit = selectedLimit => ({type: SET_SELECTED_LIMIT, selectedLimit})
export const setSelectedDeal = selectedDeal => ({type: SET_SELECTED_DEAL, selectedDeal})
export const setSelectedBill = selectedBill => ({type: SET_SELECTED_BILL, selectedBill})
export const setSelectedPayment = selectedPayment => ({type: SET_SELECTED_PAYMENT, selectedPayment})
export const clearAllSelected = () => ({type: CLEAR_ALL_SELECTED})

export const setPageSizes = pageSizeObj => ({type: SET_PAGE_SIZES, pageSizeObj})

export const setMessage = (messageBody, messageType = TYPE_MESSAGE_SUCCESS) => ({
    messageBody,
    messageType,
    type: SET_MESSAGE
})

export const initApp = () => (async dispatch => {
    await dispatch(setLimitsThunk())
    await dispatch(setDealsThunk())
    await dispatch(setBillsThunk())
    await dispatch(setPaymentsThunk())
    dispatch(setInitialized(true))
})

export default appReducer