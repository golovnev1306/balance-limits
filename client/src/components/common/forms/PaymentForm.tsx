import React, {FC} from 'react'
import formsFields from "../../../config/formsFields"
import {connect} from "react-redux";
import {addPaymentThunk, updatePaymentThunk} from "../../../redux/payments-reducer";
import CommonForm from "./CommonForm";
import {getDeals, getLimits} from "../../../selectors";
import {FormModeType, LimitType, PaymentFormType, StateType, TDispatch} from '../../../types'
import {InjectedFormProps} from 'redux-form'

type OwnPropsType = {
    mode: FormModeType
    handleClose: () => void
}

type MapStatePropsType = {
    limits: LimitType[]
}

type MapDispatchPropsType = {
    addPayment: (values: PaymentFormType) => void
    updatePayment: (values: PaymentFormType) => void
}

type AllComponentPropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType

const PaymentForm: FC<InjectedFormProps<PaymentFormType, AllComponentPropsType> & AllComponentPropsType> = ({
                                       mode, addPayment, updatePayment, handleClose, initialValues, limits
                                        }) => {
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

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        limits: getLimits(state)
    }
}

const mapDispatchToProps = (dispatch: TDispatch): MapDispatchPropsType => {
    return {
        addPayment: (values: PaymentFormType) => dispatch(addPaymentThunk(values)),
        updatePayment: (values: PaymentFormType) => dispatch(updatePaymentThunk(values))
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, mapDispatchToProps)(PaymentForm)