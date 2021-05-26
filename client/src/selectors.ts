import {createSelector} from "reselect";
import {countBalances, getComparedData, getComparingObject} from "./helpers";
import {StateType} from "./types";

export const getLimits = (state: StateType) => state.limits.limits
export const getIsInitialized = (state: StateType) => state.app.isInitialized
export const getSelectedLimit = (state: StateType) => state.app.selectedLimit
export const getSelectedLimitId = (state: StateType) => state.app.selectedLimit?.id
export const getSelectedDeal = (state: StateType) => state.app.selectedDeal
export const getSelectedDealId = (state: StateType) => state.app.selectedDeal?.id
export const getSelectedBill = (state: StateType) => state.app.selectedBill
export const getSelectedPayment = (state: StateType) => state.app.selectedPayment
export const getDeals = (state: StateType) => state.deals.deals
export const getBills = (state: StateType) => state.bills.bills
export const getPayments = (state: StateType) => state.payments.payments
export const getPartners = (state: StateType) => state.partners.partners
export const getMessage = (state: StateType) => state.app.message
export const getPageSizes = (state: StateType) => state.app.pageSizes

export const getLimitsWithBalances = createSelector(getLimits, getDeals, getPayments,  (limits, deals, payments) => {
    const countedBalanceByDeals: number[] = countBalances(limits, deals, 'limit')
    const countedBalanceByPayments: number[] = countBalances(limits, payments, 'limit')

    return limits.map(limit => {
        return Object.assign(limit, {
            balance: countedBalanceByDeals[limit.id],
            balanceByPayments: countedBalanceByPayments[limit.id]
        })})
})

export const getDealsWithBalances = createSelector(getDeals, getBills, (deals, bills) => {
    const countedBalanceByBills: any = countBalances(deals, bills, 'deal')
    return deals.map(deal => Object.assign(deal, {balance: countedBalanceByBills[deal.id]}))
})

export const getFreeDeals = createSelector(getDealsWithBalances, deals => {
    return deals.filter(deal => deal.limit_id === -1)
})

export const getDealsByLimit = createSelector(getDealsWithBalances, getSelectedLimitId, (deals, limitId) => {
    return deals.filter(deal => deal.limit_id === limitId)
})

export const getPaymentsByLimit = createSelector(getPayments, getSelectedLimitId, (payments, limitId) => {
    return payments.filter(payment => payment.limit_id === limitId)
})

export const getBillsByDeal = createSelector(getBills, getSelectedDealId, (bills, dealId) => {
    return bills.filter(bill => bill.deal_id === dealId)
})

export const getBillsComparedWithPayments = createSelector(getBills, getPayments, (bills, payments) => {
    return getComparedData(bills, payments)
})

export const getPaymentsComparedWithBills = createSelector(getPayments, getBills, (payments, bills) => {
    return getComparedData(payments, bills)
})

export const getProblemsBills = createSelector(getBillsComparedWithPayments, (bills) => {
    return bills.filter(bill => {
        return Object.keys(bill.found).length === 0
    })
})

export const getProblemsPayments = createSelector(getPaymentsComparedWithBills, (payments) => {
    return payments.filter(payment => {
        return Object.keys(payment.found).length === 0
    })
})