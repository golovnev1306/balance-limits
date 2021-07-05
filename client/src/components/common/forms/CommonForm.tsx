import FormControl from "@material-ui/core/FormControl"
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import MaterialField from "../fields/MaterialField"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"
import React, {FC} from 'react'
import {
    BillFormType,
    DealFormType,
    FormFieldsType,
    FormModeType,
    LimitFormType,
    LimitType,
    PaymentFormType
} from '../../../types'
import { formatNumberHandler } from "../../../helpers"

type AllFormType = LimitFormType & PaymentFormType & BillFormType & DealFormType

type OwnPropsType = {
    mode: FormModeType
    addItem: (values: AllFormType) => void
    updateItem: (values: AllFormType) => void
    handleClose: () => void
    formsFields: FormFieldsType[]
    itemsForSelectorField?: any

    partners?: string[]
    allowNullParent?: boolean
}

type AllPropsType = InjectedFormProps<AllFormType, OwnPropsType> & OwnPropsType

const CommonForm: FC<AllPropsType> = ({mode, handleSubmit, addItem, updateItem,
                                      handleClose, pristine, formsFields, itemsForSelectorField, partners, allowNullParent}) => {

    const submit = (values: AllFormType) => {
        switch (mode) {
            case 'add':
            case 'copy':
                addItem(values)
                break
            case 'update':
                updateItem(values)
                break
            default:
        }

        handleClose()
    }


    return (
        <form style={{textAlign: 'center'}}
              onSubmit={handleSubmit(submit)}>
            {formsFields.map(item => {
                return (<div style={{margin: '10px 0'}}>
                    <FormControl fullWidth>
                        {/*@ts-ignore*/}
                        <Field allowNullParent={allowNullParent} itemsForSelectField={(item.type === 'select') ? itemsForSelectorField : []}
                               format={formatNumberHandler}
                               component={MaterialField}
                               {...item}
                               partners={(item === 'autocomplete') ? partners : []}
                        />
                    </FormControl>
                </div>)
            })}
            <Button
                variant="contained"
                color="primary"
                size="large"
                type={'submit'}
                startIcon={<SaveIcon/>}
                disabled={(pristine && mode !== 'copy')}
            >
                Сохранить
            </Button>
        </form>
    )
}

export default reduxForm<AllFormType, OwnPropsType>({
    form: Math.random().toString(36).substring(7)
})(CommonForm)
