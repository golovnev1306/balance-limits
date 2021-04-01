import {connect} from "react-redux";
import {getSelectedBill, getSelectedPayment} from "../selectors";
import React, {Fragment} from "react";
import CommonTable from "./common/CommonTable";
import {deleteBillThunk} from "../redux/bills-reducer";
import BillForm from "./common/forms/BillForm";
import {setSelectedBill, setSelectedPayment} from "../redux/app-reducer";
import PaymentForm from "./common/forms/PaymentForm";
import {deletePaymentThunk} from "../redux/payments-reducer";


const Bills = ({deleteBill, deletePayment, selectedBill, selectedPayment, setSelectedBill, setSelectedPayment, billsResult,
                   title, resetPage, setResetPage, isCompareMode}) => {

    const handleDeleteBill = () => {
        deleteBill(selectedBill.id)
    }

    const handleDeletePayment = () => {
        deletePayment(selectedPayment.id)
    }

    return (
        <Fragment>
            <CommonTable ChildrenForm={BillForm}
                         tableName={'bills'}
                         data={billsResult}
                         selectedItem={selectedBill}
                         title={title}
                         setSelectedItem={setSelectedBill}
                         modalTitlePostfix={'счет'}
                         handleDelete={handleDeleteBill}
                         resetPage={resetPage}
                         setResetPage={setResetPage}
                         isCompareMode={isCompareMode}
            />
            {isCompareMode && selectedBill.id && (
                <CommonTable ChildrenForm={PaymentForm}
                             tableName={'payments'}
                             data={selectedBill.available ? selectedBill.available : []}
                             title={'Cвободная оплата, совпавшая по кодам'}
                             modalTitlePostfix={'оплату'}
                             handleDelete={handleDeletePayment}
                             selectedItem={selectedPayment}
                             setSelectedItem={setSelectedPayment}
                />
            )}
        </Fragment>

    )
}

const mapStateToProps = state => (
    {
        selectedBill: getSelectedBill(state),
        selectedPayment: getSelectedPayment(state)
    })
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

export default connect(mapStateToProps, mapDispatchToProps)(Bills)