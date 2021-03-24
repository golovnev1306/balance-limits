import {connect} from "react-redux"
import {getPayments, getPaymentsByLimit, getSelectedPayment} from "../selectors"
import React from "react"
import CommonTable from "./common/CommonTable"
import {setSelectedPayment} from "../redux/app-reducer"
import {deletePaymentThunk} from "../redux/payments-reducer";
import PaymentForm from "./common/forms/PaymentForm";


const PaymentsByLimit = ({deletePayment, setSelectedPayment, selectedPayment, paymentsResult, title, resetPage, setResetPage}) => {

    const handleDelete = () => {
        deletePayment(selectedPayment.id)
    }

    return (
        <CommonTable ChildrenForm={PaymentForm}
                     setSelectedItem={setSelectedPayment}
                     selectedItem={selectedPayment}
                     data={paymentsResult}
                     tableName={'payments'}
                     title={title}
                     modalTitlePostfix={'оплату'}
                     handleDelete={handleDelete}
                     resetPage={resetPage}
                     setResetPage={setResetPage}
        />
    )
}

const mapStateToProps = state => ({
    selectedPayment: getSelectedPayment(state),
})
const mapDispatchToProps = dispatch => {
    return {
        deletePayment: paymentId => dispatch(deletePaymentThunk(paymentId)),
        setSelectedPayment: selectedPayment => dispatch(setSelectedPayment(selectedPayment)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsByLimit)