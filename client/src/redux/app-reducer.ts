import {setLimitsThunk} from "./limits-reducer"
import {setDealsThunk} from "./deals-reducer"
import {setBillsThunk} from "./bills-reducer"
import {setPaymentsThunk} from "./payments-reducer"
import {TYPE_MESSAGE_SUCCESS} from "../constants"
import {
    BillType,
    DealType,
    LimitType,
    MessageType, MessageTypeType, Nullable,
    PageSizesType,
    PaymentType,
    ReturnActionsType,
    TDispatch
} from "../types"

const initialState = {
    isInitialized: false,

    selectedLimit: null as Nullable<LimitType>,
    selectedDeal: null as Nullable<DealType>,
    selectedBill: null as Nullable<BillType>,
    selectedPayment: null as Nullable<PaymentType>,

    pageSizes: {
        limits: 10,
        deals: 10,
        bills: 10,
        payments: 10,
    } as PageSizesType,

    message: {
        type: TYPE_MESSAGE_SUCCESS,
        body: ''
    } as MessageType
}

const appReducer = (state = initialState, action: AppActionsTypes): typeof initialState => {
    switch (action.type) {
        case "SET_INITIAL_APP":
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        case "SET_SELECTED_LIMIT":
            return {
                ...state,
                selectedLimit: action.selectedLimit,
                selectedDeal: null,
                selectedBill: null,
                selectedPayment: null
            }
        case "SET_SELECTED_DEAL":
            return {
                ...state,
                selectedDeal: action.selectedDeal,
                selectedBill: null
            }
        case "SET_SELECTED_BILL":
            return {
                ...state,
                selectedBill: action.selectedBill,
            }
        case "SET_SELECTED_PAYMENT":
            return {
                ...state,
                selectedPayment: action.selectedPayment,
            }

        case "SET_MESSAGE":
            return {
                ...state,
                message: {
                    body: action.messageBody,
                    type: action.messageType,
                }
            }

        case "CLEAR_ALL_SELECTED": {
            return {
                ...state,
                selectedLimit: null,
                selectedDeal: null,
                selectedBill: null,
                selectedPayment: null
            }
        }

        case "SET_PAGE_SIZES": {
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

type AppActionsTypes = ReturnActionsType<typeof actions>

const actions = {
    setInitialized: (isInitialized: boolean) => ({type: 'SET_INITIAL_APP', isInitialized} as const),
    setSelectedLimit: (selectedLimit: any) => ({type: 'SET_SELECTED_LIMIT', selectedLimit} as const),
    setSelectedDeal: (selectedDeal: any) => ({type: 'SET_SELECTED_DEAL', selectedDeal} as const),
    setSelectedBill: (selectedBill: any) => ({type: 'SET_SELECTED_BILL', selectedBill} as const),
    setSelectedPayment: (selectedPayment: any) => ({type: 'SET_SELECTED_PAYMENT', selectedPayment} as const),
    clearAllSelected: () => ({type: 'CLEAR_ALL_SELECTED'} as const),
    setPageSizes: (pageSizeObj: PageSizesType) => ({type: 'SET_PAGE_SIZES', pageSizeObj} as const),
    setMessage: (messageBody: string, messageType: MessageTypeType = TYPE_MESSAGE_SUCCESS) => ({
        messageBody,
        messageType,
        type: 'SET_MESSAGE'
    } as const)
}


export const initApp = () => (async (dispatch: TDispatch) => {
    await dispatch(setLimitsThunk())
    await dispatch(setDealsThunk())
    await dispatch(setBillsThunk())
    await dispatch(setPaymentsThunk())
    dispatch(actions.setInitialized(true))
})

export const {setMessage, setSelectedBill, clearAllSelected, setPageSizes, setSelectedDeal, setSelectedLimit, setSelectedPayment} = actions

export default appReducer