import {connect} from "react-redux"
import {getPaymentsByLimit} from "../selectors"
import React, {FC} from "react"
import Payments from "./Payments"
import {PaymentType, StateType} from "../types"

type MapStatePropsType = {
    payments: PaymentType[]
}

type OwnPropsType = {
    resetPageChildTable: boolean
    setResetPageChildTable: (isReset: boolean) => void
}

const PaymentsByLimit: FC<MapStatePropsType & OwnPropsType> = ({payments, resetPageChildTable, setResetPageChildTable}) => {
    return (
        <Payments resetPage={resetPageChildTable} setResetPage={setResetPageChildTable} paymentsResult={payments} title={'Оплата по лимиту'}/>
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    payments: getPaymentsByLimit(state)
})


export default connect<MapStatePropsType, {}, OwnPropsType, StateType>(mapStateToProps)(PaymentsByLimit)