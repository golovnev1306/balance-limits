import React from "react"
import {connect} from "react-redux";
import CommonForm from "./CommonForm";
import formsFields from "../../../config/formsFields";
import {addDealThunk, updateDealThunk} from "../../../redux/deals-reducer";
import {getLimits, getPartners} from "../../../selectors";

const DealForm = ({mode, addDeal, updateDeal, handleClose, initialValues, limits, partners}) => {

    return (
        <CommonForm addItem={addDeal}
                    updateItem={updateDeal}
                    mode={mode}
                    handleClose={handleClose}
                    initialValues={initialValues}
                    formsFields={formsFields.deals}
                    itemsForSelectorField={limits}
                    allowNullParent={true}
                    partners={partners}
        />
    )
}

const mapStateToProps = state => {
    return {
        limits: getLimits(state),
        partners: getPartners(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDeal: values => dispatch(addDealThunk(values)),
        updateDeal: values => dispatch(updateDealThunk(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DealForm)