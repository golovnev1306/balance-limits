import React from "react"
import formsFields from "../../../config/formsFields"
import {connect} from "react-redux";
import {addPaymentThunk, updatePaymentThunk} from "../../../redux/payments-reducer";
import CommonForm from "./CommonForm";
import {getDeals, getLimits} from "../../../selectors";

const PaymentForm = ({mode, addPayment, updatePayment, handleClose, initialValues, limits}) => {
    return (
        <CommonForm addItem={addPayment}
                    updateItem={updatePayment}
                    mode={mode}
                    handleClose={handleClose}
                    initialValues={initialValues}
                    formsFields={formsFields.payments}
                    itemsForSelectorField={limits}
                    allowNullParent={false}
        />
    )
}

const mapStateToProps = state => {
    return {
        limits: getLimits(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPayment: values => dispatch(addPaymentThunk(values)),
        updatePayment: values => dispatch(updatePaymentThunk(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)