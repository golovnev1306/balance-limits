import {createSelector} from 'reselect'
import {countBalances, getComparedData} from './helpers'
import {ComparedData, StateType} from './types'

export const getLimits = (state: StateType) => state.limits.limits
export const getIsInitialized = (state: StateType) => state.app.isInitialized
export const getSelectedLimit = (state: StateType) => state.app.selectedLimit
export const getSelectedLimitId = (state: StateType) => state.app.selectedLimit ? state.app.selectedLimit.id : state.app.selectedLimit
export const getSelectedDeal = (state: StateType) => state.app.selectedDeal
export const getSelectedDealId = (state: StateType) => state.app.selectedDeal ? state.app.selectedDeal.id : state.app.selectedDeal
export const getSelectedBill = (state: StateType) => state.app.selectedBill
export const getSelectedPayment = (state: StateType) => state.app.selectedPayment
export const getDeals = (state: StateType) => state.deals.deals
export const getBills = (state: StateType) => state.bills.bills
export const getPayments = (state: StateType) => state.payments.payments
export const getPartners = (state: StateType) => state.partners.partners
export const getMessage = (state: StateType) => state.app.message
export const getPageSizes = (state: StateType) => state.app.pageSizes
export const getIsExistFileWithMistakesImportEconomy = (state: StateType) => state.deals.isExistFileWithImportMistakes


export const getDealsWithBalances = createSelector(getDeals, getBills, (deals, bills) => {
    const countedBalanceByBills: any = countBalances(deals, bills, 'deal')
    return deals.map(deal => Object.assign(deal, {balance: countedBalanceByBills[deal.id]}))
})

export const getFreeDeals = createSelector(getDealsWithBalances, deals => {
    return deals.filter(deal => deal.limit_id === -1)
})

export const getOnlyDeals = createSelector(getDealsWithBalances, deals => {
    return deals.filter(deal => !deal.is_bid)
})

export const getDealsByLimit = createSelector(getDealsWithBalances, getSelectedLimitId, (deals, limitId) => {
    return deals.filter(deal => deal.limit_id === limitId)
})

export const getLimitsWithBalances = createSelector(getLimits, getOnlyDeals, getDeals, getPayments,  (limits, deals, dealsWithBids, payments) => {
    const countedBalanceByDeals: number[] = countBalances(limits, deals, 'limit')
    const countedBalanceByDealsWithBids: number[] = countBalances(limits, dealsWithBids, 'limit')
    const countedBalanceByPayments: number[] = countBalances(limits, payments, 'limit')

    return limits.map(limit => {
        return Object.assign(limit, {
            balance: countedBalanceByDeals[limit.id],
            balanceByBids: countedBalanceByDealsWithBids[limit.id],
            balanceByPayments: countedBalanceByPayments[limit.id]
        })})
})

export const getPaymentsByLimit = createSelector(getPayments, getSelectedLimitId, (payments, limitId) => {
    return payments.filter(payment => payment.limit_id === limitId)
})

export const getBillsByDeal = createSelector(getBills, getSelectedDealId, (bills, dealId) => {
    return bills.filter(bill => bill.deal_id === dealId)
})

export const getComparedBillsData = createSelector(getBills, getPayments, (bills, payments): ComparedData[] => {
    return getComparedData(bills, payments)
})

export const getComparedPaymentsData = createSelector(getBills, getPayments, (bills, payments): ComparedData[]  => {
    return getComparedData(payments, bills)
})

export const getBillsComparedWithPayments = createSelector(getBills, getComparedBillsData, (bills, comparedData) => {
    return bills.filter(bill => {
        return !!comparedData[bill.id].found
    })
})

export const getProblemsBills = createSelector(getBills, getComparedBillsData, (bills, comparedData) => {
    return bills.filter(bill => {
        return !comparedData[bill.id].found
    })
})

export const getProblemsPayments = createSelector(getPayments, getComparedPaymentsData, (payments, comparedData) => {
    return payments.filter(payment => {
        return !comparedData[payment.id].found
    })
})
