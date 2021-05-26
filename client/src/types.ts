import {rootReducer} from "./redux/store"
import {ThunkDispatch} from "redux-thunk"
import {AnyAction} from "redux"

export type BillType = Readonly<{
    readonly date: string
    readonly deal_id: number
    readonly id: number
    readonly kosgu: string
    readonly kvfo: string
    readonly kvr: string
    readonly ok: string
    readonly number: string
    readonly partner: string
    readonly available?: DealType
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
    available?: BillType[]
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
    balance: number
    balanceByPayments: number
    sum: number
}>

export type StateType = ReturnType<typeof rootReducer>

export type TDispatch = ThunkDispatch<StateType, void, AnyAction>

type ReturnACType<T> = T extends { [key: string]: infer U } ? U : never
export type ReturnActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<ReturnACType<T>>

export type Nullable<T> = null | T