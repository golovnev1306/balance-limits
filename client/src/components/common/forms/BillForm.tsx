import React, {FC} from 'react'
import formsFields from '../../../config/formsFields'
import {connect} from 'react-redux';
import {addBillThunk, updateBillThunk} from '../../../redux/bills-reducer';
import CommonForm from './CommonForm';
import {getDeals} from '../../../selectors';
import {BillFormType, DealType, FormModeType, StateType, TDispatch} from '../../../types'
import {InjectedFormProps} from 'redux-form'

type OwnPropsType = {
    mode: FormModeType
    handleClose: () => void
}

type MapStatePropsType = {
    deals: DealType[]
}

type MapDispatchPropsType = {
    addBill: (values: BillFormType) => void
    updateBill: (values: BillFormType) => void
}

export type AllPropsType =
    InjectedFormProps<BillFormType, OwnPropsType & MapStatePropsType & MapDispatchPropsType>
    & OwnPropsType
    & MapStatePropsType
    & MapDispatchPropsType

const BillForm: FC<AllPropsType> = ({mode, addBill, updateBill, handleClose, initialValues, deals}) => {
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

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        deals: getDeals(state)
    }
}

const mapDispatchToProps = (dispatch: TDispatch): MapDispatchPropsType => {
    return {
        addBill: (values: BillFormType) => dispatch(addBillThunk(values)),
        updateBill: (values: BillFormType) => dispatch(updateBillThunk(values))
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, mapDispatchToProps)(BillForm)