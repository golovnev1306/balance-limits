import {rootReducer} from "./redux/store"
import {ThunkDispatch} from "redux-thunk"
import {AnyAction} from "redux"

export type BillType = Readonly<{
    date: string
    deal_id: number
    id: number
    kosgu: string
    kvfo: string
    kvr: string
    ok: string
    number: string
    partner: string
}>

export type DealType = Readonly<{
    id: number
    number: string
    date: string
    summ: number
    partner: string
    limit_id: number
    is_bid: boolean
    kosgu: string
    kvfo: string
    kvr: string
    ok: string
}>

export type LimitType = Readonly<{
    id: number
    name: string
    kosgu: string
    kvfo: string
    kvr: string
    ok: string
}>

export type PaymentType = Readonly<{
    id: number
    limit_id: number
    number: string
    summ: number
    date: string
    purpose_of_payment: string
    partner: string
    kosgu: string
    kvfo: string
    kvr: string
    ok: string
}>

export type ComparedData = Readonly<{
    found: PaymentType | BillType
    available: PaymentType[] | BillType[]
}>


export type MessageTypeType = "success" | "error"

export type MessageType = Readonly<{
    type: MessageTypeType
    body: string
}>

export type PageSizesType = Readonly<{
    limits: number
    deals: number
    bills: number
    payments: number
}>

export type SumsType = Readonly<{
    balanceByDeals: number
    balanceByDealsWithBids: number
    balanceByPayments: number
    sum: number
}>

export type StateType = ReturnType<typeof rootReducer>

export type TDispatch = ThunkDispatch<StateType, void, AnyAction>

type ReturnACType<T> = T extends { [key: string]: infer U } ? U : never
export type ReturnActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<ReturnACType<T>>

export type Nullable<T> = null | T