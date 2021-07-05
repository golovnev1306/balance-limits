import React, {FC} from 'react'
import {connect} from 'react-redux'
import CommonForm from './CommonForm'
import formsFields from '../../../config/formsFields'
import {addDealThunk, updateDealThunk} from '../../../redux/deals-reducer'
import {getLimits, getPartners} from '../../../selectors'
import {InjectedFormProps} from 'redux-form'
import {DealFormType, FormModeType, LimitType, StateType, TDispatch} from '../../../types'

type OwnPropsType = {
    mode: FormModeType
    handleClose: () => void
}

type MapStatePropsType = {
    limits: LimitType[]
    partners: string[]
}

type MapDispatchPropsType = {
    addDeal: (values: DealFormType) => void
    updateDeal: (values: DealFormType) => void
}

type AllComponentPropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType

const DealForm: FC<InjectedFormProps<DealFormType, AllComponentPropsType> & AllComponentPropsType> = ({mode, addDeal, updateDeal, handleClose, initialValues, limits, partners}) => {

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

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        limits: getLimits(state),
        partners: getPartners(state)
    }
}

const mapDispatchToProps = (dispatch: TDispatch): MapDispatchPropsType => {
    return {
        addDeal: (values: DealFormType) => dispatch(addDealThunk(values)),
        updateDeal: (values: DealFormType) => dispatch(updateDealThunk(values))
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, mapDispatchToProps)(DealForm)