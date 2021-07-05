import React, {FC, Fragment} from 'react'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import styles from './ImportPaymentsForm.module.css'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {connect} from 'react-redux'
import AttachmentIcon from '@material-ui/icons/Attachment'
import {required} from 'redux-form-validators'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import WarningIcon from '@material-ui/icons/Warning'
import {compose} from 'redux'
import {importPaymentsThunk} from '../../../redux/payments-reducer'
import {StateType, TDispatch} from '../../../types'
import WarningOptions from '../WarningOptions'

type MapDispatchPropsType = {
    importPayments: (values: any) => void
}

const ImportPaymentsForm: FC<InjectedFormProps & MapDispatchPropsType> = ({handleSubmit, importPayments, reset, invalid}) => {
    const submit = (values: any) => {
        importPayments(values)
        reset()
    }

    const warningOptions = [
        (
            <Fragment>
                Назначение текущего импорта: работа с <b>АЦК Финансы</b>. <br/>
                Требования указанные ниже формирует именно этот сервис (обратите внимание<br/>
                на необходимые поля, т.к. в сервисе есть возможность удалять их)
            </Fragment>
        ),
        (
            <Fragment>
                Файл должен быть формата
                <b> .xlsx</b>
            </Fragment>
        ),
        (
            <Fragment>
                Строка с названиями колонок должна быть под
                номером <b>6</b><br/>
            </Fragment>
        ),
        (
            <Fragment>
                Необходимые поля: <b>'Номер документа'</b>, <b>'Дата документа'</b>, <b>'Статус документа'</b>,<br/>
                <b>'Сумма'</b>, <b>'Назначение платежа'</b>, <b>Наименование получателя</b>, <b>'КВР'</b>, <br/>
                <b>'КОСГУ'</b>, <b>'КВФО'</b>, <b>'Отраслевой код'</b>
            </Fragment>
        )
    ]

    return (
        <form onSubmit={handleSubmit(submit)} className={styles.import_form}>
            <div><h3>Импорт оплаты</h3></div>
            <FormControl>
                <WarningOptions options={warningOptions}/>

                <Field type={'file'} component={FileInput} name={'importFile'}
                       validate={[required({msg: 'Нет файла'})]}/>
            </FormControl>
            <FormControl>
                <Field component={CheckboxInput} label={'Перезаписать'} name={'importOverwrite'}/>
            </FormControl>
            <FormControl>
                <div style={{marginTop: '25px'}}>
                    <Button
                        variant='outlined'
                        color='primary'
                        size='large'
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

const FileInput = ({input, meta, ...rest}: any) => {
    const onChangeHandler = (e: any) => {
        input.onChange(e.target.files[0])
    }

    return (
        <Fragment>
            <input
                {...rest}
                onChange={onChangeHandler}
                id='contained-button-file'
                style={{display: 'none'}}
            />
            <label htmlFor='contained-button-file'>
                <Button variant='outlined' color='primary' component='span'>
                    Приложите файл
                </Button>
            </label>
            {(meta.invalid && meta.touched) && (<div><Typography color={'error'}>{meta.error}</Typography></div>)}
            {input.value && (<div className={styles.import_file}><AttachmentIcon/> {input.value.name}</div>)}
        </Fragment>
    )
}

//todo fix any type
const CheckboxInput = ({input, label}: any) => {

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value}
                    onChange={input.onChange}
                    color='primary'
                />
            }
            label={label}
        />
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        importPayments: (values: any) => dispatch(importPaymentsThunk(values))
    }
}

export default compose<FC>(reduxForm<{}, MapDispatchPropsType>({
    form: 'importPayments',
    initialValues: {
        importOverwrite: false
    }
}), connect<{}, MapDispatchPropsType, {}, StateType>(null, mapDispatchToProps))(ImportPaymentsForm)