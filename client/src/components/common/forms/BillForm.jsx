import React from "react"
import formsFields from "../../../config/formsFields"
import {connect} from "react-redux";
import {addBillThunk, updateBillThunk} from "../../../redux/bills-reducer";
import CommonForm from "./CommonForm";
import {getDeals} from "../../../selectors";

const BillForm = ({mode, addBill, updateBill, handleClose, initialValues, deals}) => {
    return (
        <CommonForm addItem={addBill}
                    updateItem={updateBill}
                    mode={mode}
                    handleClose={handleClose}
                    initialValues={initialValues}
                    formsFields={formsFields.bills}
                    itemsForSelectorField={deals}
                    allowNullParent={false}
        />
    )
}

const mapStateToProps = state => {
    return {
        deals: getDeals(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBill: values => dispatch(addBillThunk(values)),
        updateBill: values => dispatch(updateBillThunk(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillForm)