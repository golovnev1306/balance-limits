import React from "react"
import {connect} from "react-redux";
import {addLimitThunk, updateLimitThunk} from "../../../redux/limits-reducer";
import CommonForm from "./CommonForm";
import formsFields from "../../../config/formsFields";

const LimitForm = ({mode, addLimit, updateLimit, handleClose, initialValues}) => {
    return (
        <CommonForm addItem={addLimit}
                    updateItem={updateLimit}
                    mode={mode}
                    handleClose={handleClose}
                    initialValues={initialValues}
                    formsFields={formsFields.limits}
        />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addLimit: values => dispatch(addLimitThunk(values)),
        updateLimit: values => dispatch(updateLimitThunk(values))
    }
}

export default connect(null, mapDispatchToProps)(LimitForm)