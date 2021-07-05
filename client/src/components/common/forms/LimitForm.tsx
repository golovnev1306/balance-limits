import React, {FC} from 'react'
import {connect} from 'react-redux'
import {addLimitThunk, updateLimitThunk} from '../../../redux/limits-reducer'
import CommonForm from './CommonForm'
import formsFields from '../../../config/formsFields'
import {InjectedFormProps} from 'redux-form'
import {FormModeType, LimitFormType, StateType, TDispatch} from '../../../types'

type OwnPropsType = {
    mode: FormModeType
    handleClose: () => void
}

type MapDispatchPropsType = {
    addLimit: (values: LimitFormType) => void
    updateLimit: (values: LimitFormType) => void
}

const LimitForm: FC<InjectedFormProps<LimitFormType> & OwnPropsType & MapDispatchPropsType> = ({mode, addLimit, updateLimit, handleClose, initialValues}) => {
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

const mapDispatchToProps = (dispatch: TDispatch): MapDispatchPropsType => {
    return {
        addLimit: (values: LimitFormType) => dispatch(addLimitThunk(values)),
        updateLimit: (values: LimitFormType) => dispatch(updateLimitThunk(values))
    }
}

export default connect<{}, MapDispatchPropsType, {}, StateType>(null, mapDispatchToProps)(LimitForm)