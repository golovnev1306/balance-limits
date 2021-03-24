import {connect} from "react-redux"
import {getPaymentsByLimit} from "../selectors"
import React from "react"
import Payments from "./Payments";
import Deals from "./Deals";


const PaymentsByLimit = ({payments, resetPageChildTable, setResetPageChildTable}) => {
    return (
        <Payments resetPage={resetPageChildTable} setResetPage={setResetPageChildTable} paymentsResult={payments} title={'Оплата по лимиту'}/>
    )
}

const mapStateToProps = state => ({
    payments: getPaymentsByLimit(state)
})


export default connect(mapStateToProps)(PaymentsByLimit)