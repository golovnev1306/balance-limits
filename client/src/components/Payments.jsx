import {connect} from "react-redux"
import {getPayments, getPaymentsByLimit, getSelectedBill, getSelectedPayment} from "../selectors"
import React, {Fragment} from "react"
import CommonTable from "./common/CommonTable"
import {setSelectedBill, setSelectedPayment} from "../redux/app-reducer"
import {deletePaymentThunk} from "../redux/payments-reducer";
import PaymentForm from "./common/forms/PaymentForm";
import BillForm from "./common/forms/BillForm";
import {deleteBillThunk} from "../redux/bills-reducer";


const PaymentsByLimit = ({deletePayment, deleteBill, setSelectedPayment, selectedPayment, selectedBill, setSelectedBill, paymentsResult, title, resetPage, setResetPage, isCompareMode}) => {

    const handleDelete = () => {
        deletePayment(selectedPayment.id)
    }

    const handleDeleteBill = () => {
        deleteBill(selectedBill.id)
    }

    return (
        <Fragment>
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
                     isCompareMode={isCompareMode}
        />
            {isCompareMode && selectedPayment.id && (
                <CommonTable ChildrenForm={BillForm}
                             tableName={'bills'}
                             data={selectedPayment.available ? selectedPayment.available : []}
                             selectedItem={selectedBill}
                             title={'Свободные счета совпавшие по кодам'}
                             setSelectedItem={setSelectedBill}
                             modalTitlePostfix={'счет'}
                             handleDelete={handleDeleteBill}
                />
            )}
        </Fragment>
    )
}

const mapStateToProps = state => ({selectedBill: getSelectedBill(state), selectedPayment: getSelectedPayment(state)})
const mapDispatchToProps = dispatch => {
    return {
        deleteBill: billId => dispatch(deleteBillThunk(billId)),
        setSelectedBill: selectedBill => {
            dispatch(setSelectedBill(selectedBill))
        },
        deletePayment: paymentId => dispatch(deletePaymentThunk(paymentId)),
        setSelectedPayment: selectedPayment => {
            dispatch(setSelectedPayment(selectedPayment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsByLimit)