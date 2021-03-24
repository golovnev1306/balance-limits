import FormControl from "@material-ui/core/FormControl";
import {Field, reduxForm} from "redux-form";
import MaterialField from "../fields/MaterialField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";

const CommonForm = ({mode, handleSubmit, addItem, updateItem, handleClose, pristine, formsFields, itemsForSelectorField, partners, allowNullParent}) => {

    const submit = (values) => {
        switch(mode) {
            case 'add': case 'copy':
                addItem(values)
                break
            case 'update':
                updateItem(values)
                break
            default:
        }

        handleClose()
    }

    const formatHandler = (value, name) => {

        if (name === 'summ' && value) {
            let newValue = value.toString().replace(/[^0-9,.]/g, '')
            newValue = newValue.replace(/\./g, ',')
            const separators = [...newValue.matchAll(/,/g)]
            if (separators?.[1]) {
                newValue = newValue.slice(0, separators?.[1].index)
            }

            let firstNumber = separators[0] ? newValue.slice(0, separators[0].index) : newValue
            firstNumber = firstNumber.replace(/\s/g, '')
            if (firstNumber) {
                firstNumber = new Intl.NumberFormat().format(parseInt(firstNumber))
            }


            let secondNumber = separators[0] ? newValue.slice(separators[0].index + 1) : null
            newValue = `${firstNumber}`

            if (secondNumber !== null) {
                if (secondNumber.length > 2) {
                    secondNumber = secondNumber.slice(0, 2)
                }

                newValue = `${firstNumber},${secondNumber}`
            }

            return newValue
        }

        return value
    }
    return (
        <form style={{textAlign: 'center'}}
              onSubmit={handleSubmit(submit)}>
            {formsFields.map(item => {
                return (<div style={{margin: '10px 0'}}>
                    <FormControl fullWidth>
                        <Field allowNullParent={allowNullParent} format={formatHandler}
                               component={MaterialField}
                               {...item}
                               partners={(item.type === 'autocomplete') ? partners : []}
                               itemsForSelectField={(item.type === 'select') ? itemsForSelectorField : []}
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
                disabled={(pristine && mode!=='copy')}
            >
                Сохранить
            </Button>
        </form>
    )
}

export default reduxForm({
    form: Math.random().toString(36).substring(7)
})(CommonForm)
