import dealsApi from '../api/dealsApi'
import {setMessage, setSelectedBill, setSelectedDeal} from "./app-reducer"
import {createJsFormData, formatInputData, formatOutputData} from '../helpers'
import {MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR} from "../constants"
import {addPartner, setPartners} from "./partners-reducer"
import {DealType, ReturnActionsType, TDispatch} from "../types"
import paymentsApi from '../api/paymentsApi'
import {setPaymentsThunk} from './payments-reducer'

const initialState = {
    deals: [] as DealType[],
    isExistFileWithImportMistakes: false
}

type DealsActionsType = ReturnActionsType<typeof actions>

const dealsReducer = (state = initialState, action: DealsActionsType) => {
    switch (action.type) {
        case "SET_DIALS":
            return {
                ...state,
                deals: action.deals
            }
        case 'ADD_DIAL':
            return {
                ...state,
                deals: [
                    ...state.deals,
                    action.deal
                ]
            }
        case 'SET_EXIST_FILE':
            return {
                ...state,
                isExistFileWithImportMistakes: action.isExistFileWithImportMistakes
            }
        default:
            return state
    }
}


const actions = {
    setDials: (deals: DealType[]) => ({type: 'SET_DIALS', deals} as const),
    addDeal: (deal: DealType) => ({type: 'ADD_DIAL', deal} as const),
    setExistFileWithMistakes: (isExistFileWithImportMistakes: boolean) => ({type: 'SET_EXIST_FILE', isExistFileWithImportMistakes} as const)
}


export const setDealsThunk = () => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await dealsApi.getDeals()
            if (result.status === 200) {
                let partners = [] as string[]
                const deals = result.data
                deals.map((deal: DealType, index: number) => {
                    partners.push(deal.partner)
                    deals[index] = formatInputData(deal, ['limit_id'])
                })
                dispatch(setPartners(partners))
                dispatch(actions.setDials(deals))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
            throw new Error
        }

    }
}

export const addDealThunk = (values: any) => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await dealsApi.add(formatOutputData(values))
            if (result.status === 201) {
                dispatch(addPartner(result.data.partner))
                dispatch(actions.addDeal(formatInputData(result.data, ['limit_id'])))
                dispatch(setMessage('Договор добавлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const deleteDealThunk = (dealId: number) => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await dealsApi.delete(dealId)
            if (result.status === 200) {
                dispatch(setSelectedDeal({}))
                dispatch(setSelectedBill({}))
                await dispatch(setDealsThunk())
                dispatch(setMessage('Договор удален'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const updateDealThunk = (values: any) => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await dealsApi.update(formatOutputData(values))
            if (result.status === 200) {
                dispatch(setSelectedDeal({...values}))
                await dispatch(setDealsThunk())
                dispatch(setMessage('Договор обновлен'))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const importDealsEconomyThunk = (values: any) => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await dealsApi.importEconomy(createJsFormData(values))
            if (result.status === 200) {
                await dispatch(setDealsThunk())
                dispatch(setMessage('Импорт успешно завершен'))
                if (result.data.isExistMistakes) {
                    dispatch(actions.setExistFileWithMistakes(true))
                }
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }
    }
}

export const deleteFileWithMistakes = () => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await dealsApi.deleteFile()
            if (result.status === 200) {
                dispatch(actions.setExistFileWithMistakes(false))
            }
        } catch (er) {
            console.log(er)
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }

    }
}

export const checkIsExistFileWithMistakes = () => {
    return async (dispatch: TDispatch) => {
        try {
            const result = await dealsApi.checkFile()
            if (result.data.isExistMistakes) {
                dispatch(actions.setExistFileWithMistakes(true))
            } else {
                dispatch(actions.setExistFileWithMistakes(false))
            }
        } catch (er) {
            dispatch(setMessage(er?.response?.data?.messageBody ? er.response.data.messageBody : MESSAGE_ERROR_UNIVERSAL, TYPE_MESSAGE_ERROR))
        }

    }
}

export default dealsReducer