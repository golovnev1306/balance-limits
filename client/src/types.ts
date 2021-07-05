import {rootReducer} from "./redux/store"
import {ThunkDispatch} from "redux-thunk"
import {AnyAction} from "redux"
import {length, required} from 'redux-form-validators'
import {BaseFieldProps, GenericFieldHTMLAttributes} from 'redux-form/lib/Field'

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
    economy: number
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

export type AllItemsType = LimitType | DealType | BillType | PaymentType
export type AllFuncSetItemType = ((limit: LimitType) => void) |
    ((deal: DealType) => void) |
    ((bill: BillType) => void) |
    ((payment: PaymentType) => void)

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
    limits?: number
    deals?: number
    bills?: number
    payments?: number
}>

export type SumsType = Readonly<{
    balanceByDeals: Nullable<number>
    balanceByDealsWithBids: Nullable<number>
    balanceByPayments: Nullable<number>
    sum: Nullable<number>
    economy: Nullable<number>
}>

export type StateType = ReturnType<typeof rootReducer>

export type TDispatch = ThunkDispatch<StateType, void, AnyAction>

type ReturnACType<T> = T extends { [key: string]: infer U } ? U : never
export type ReturnActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<ReturnACType<T>>

export type Nullable<T> = null | T

export type ResponseImportDealsEconomy = {
    isExistMistakes: boolean
    isSuccess: boolean
}

export type LimitFormType = {
    name: string
    kvr: string
    kosgu: string
    kvfo: string
    ok: string
    summ: number
}

export type PaymentFormType = {
    limit_id: number
    number: string
    purpose_of_payment: string
    partner: string
    date: string
    summ: number
}

export type BillFormType = {
    deal_id: number
    number: string
    date: string
    summ: number
}

export type DealFormType = {
    limit_id: number
    number: string
    date: string
    product: string
    partner: string
    summ: number
    is_bid: boolean
}

type ExtendedFieldsProps = {
    label: string
    variant: string
    autoFocus: boolean
    InputLabelProps: { shrink: boolean }
    multiline: boolean
}

export type FormFieldsType = BaseFieldProps | GenericFieldHTMLAttributes | ExtendedFieldsProps

export type FormsFieldsType = {
    limits: FormFieldsType[]
    deals: FormFieldsType[]
    bills: FormFieldsType[]
    payments: FormFieldsType[]
}


export type FormModeType = 'add' | 'copy' | 'update'
export type TablesNamesType = 'limits' | 'deals' | 'bills' | 'payments'
export type ShowModeType = 'all' | 'onlyDeals' | 'onlyBids' | 'dealsWithEconomy'

export function hasOwnProperty<X extends {}, Y extends PropertyKey>
(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}