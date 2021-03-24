import React from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import styles from './Import.module.css'
import {Field, reduxForm} from "redux-form"
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {importPaymentsThunk} from "../../redux/payments-reducer";
import {compose} from "redux";
import {connect} from "react-redux";
import AttachmentIcon from '@material-ui/icons/Attachment';
import {required} from "redux-form-validators";
import Typography from "@material-ui/core/Typography";

const Import = ({handleSubmit, importPayments, reset, invalid}) => {

    const submit = (values) => {
        importPayments(values)
        reset()
    }

    return (

        <form onSubmit={handleSubmit(submit)} className={styles.import_form}>
            <div><h3>Импорт оплаты</h3></div>
            <FormControl>
                <Field type={'file'} component={FileInput} name={'importFile'} validate={[required({msg: 'Нет файла'})]}/>
            </FormControl>
            <FormControl>
                <Field component={CheckboxInput} name={'importOverwrite'}/>
            </FormControl>
            <FormControl>
                <div style={{marginTop: '25px'}}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        type={'submit'}
                        startIcon={<CloudUploadIcon/>}
                        disabled={invalid}
                    >
                        Вперед
                    </Button>
                </div>
            </FormControl>
        </form>
    )
}

const FileInput = ({input, meta, ...rest}) => {
    const onChangeHandler = (e) => {
        input.onChange(e.target.files[0])
    }

    return (
        <>
            <input
                {...rest}
                onChange={onChangeHandler}
                id="contained-button-file"
                style={{display: 'none'}}
            />
            <label htmlFor="contained-button-file">
                <Button variant="outlined" color="primary" component="span">
                    Приложите файл
                </Button>
            </label>
            {(meta.invalid && meta.touched) && (<div><Typography color={'error'}>{meta.error}</Typography></div>)}
            {input.value && (<div className={styles.import_file}><AttachmentIcon/> {input.value.name}</div>)}
        </>
    )
}

const CheckboxInput = ({input}) => {

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value}
                    onChange={input.onChange}
                    color="primary"
                />
            }
            label="Перезаписать"
        />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        importPayments: values => dispatch(importPaymentsThunk(values))
    }
}

export default compose(reduxForm({
    form: 'import'
}), connect(null, mapDispatchToProps))(Import)