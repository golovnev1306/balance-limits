import React, {FC, Fragment} from 'react'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import styles from './ImportPaymentsForm.module.css'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import DeleteIcon from '@material-ui/icons/Delete'
import {connect} from 'react-redux'
import AttachmentIcon from '@material-ui/icons/Attachment'
import {required} from 'redux-form-validators'
import Typography from '@material-ui/core/Typography'
import {compose} from 'redux'
import {LimitFormType, StateType, TDispatch} from '../../../types'
import WarningOptions from '../WarningOptions'
import {deleteFileWithMistakes, importDealsEconomyThunk} from '../../../redux/deals-reducer'
import {getIsExistFileWithMistakesImportEconomy} from '../../../selectors'
import {SERVER_URL} from '../../../constants'

type MapDispatchPropsType = {
    importDealsEconomy: (values: any) => void
    deleteFileWithMistakesImportEconomy: (values: any) => void
}

type MapStatePropsType = {
    isExistFileWithMistakesImportEconomy: boolean
}

const ImportPaymentsForm: FC<InjectedFormProps & MapStatePropsType & MapDispatchPropsType> = ({
                                                                                                  handleSubmit,
                                                                                                  importDealsEconomy, reset, invalid, isExistFileWithMistakesImportEconomy,
                                                                                                  deleteFileWithMistakesImportEconomy
                                                                                              }) => {
    const submit = (values: any) => {
        importDealsEconomy(values)
        reset()
    }

    const warningOptions = [
        <Fragment>
            Назначение текущего импорта: работа с <b>РТС-Тендер</b>. <br/>
            Требования указанные ниже формирует именно этот сервис (обратите внимание<br/>
            на необходимые поля, т.к. в сервисе есть возможность удалять их)
        </Fragment>,
        (
            <Fragment>Файл должен быть формата
                <b> .xlsx</b></Fragment>
        ),
        (
            <Fragment>
                Строка с названиями колонок должна быть под
                номером <b>1</b><br/>
            </Fragment>
        ),
        (
            <Fragment>
                Необходимые поля: <b>'Номер извещения'</b>, <b>'Наименование объекта закупки'</b>,<br/>
                <b>'Экономия'</b>, <b>'Участник'</b>, <b>'Дата заключения контракта'</b>,<br/>
                <b>'Статус контракта'</b>
            </Fragment>
        ),
    ]

    return (
        <Fragment>
            <form onSubmit={handleSubmit(submit)} className={styles.import_form}>
                <div><h3>Импорт экономии по договорам</h3></div>
                <FormControl>
                    <WarningOptions options={warningOptions}/>

                    <Field type={'file'} component={FileInput} name={'importFile'}
                           validate={[required({msg: 'Нет файла'})]}/>
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
            {isExistFileWithMistakesImportEconomy &&
            (
                <div style={{marginTop: '45px'}}>
                    <Typography style={{marginBottom: '20px'}} color={'error'}>У вас имеется файл со списком
                        проблемно-импортированных сущностей с экономией</Typography>
                    <Button
                        variant='outlined'
                        color='primary'
                        size='large'
                        href={`${SERVER_URL}/api/deals/download`}
                        startIcon={<CloudDownloadIcon/>}
                    >
                        Скачать
                    </Button>
                    <Button
                        variant={'outlined'}
                        color={'secondary'}
                        size='large'
                        style={{marginLeft: '10px'}}
                        onClick={deleteFileWithMistakesImportEconomy}
                        startIcon={<DeleteIcon/>}
                    >
                        Удалить с сервера
                    </Button>
                </div>)
            }
        </Fragment>
    )
}

const FileInput = ({input, meta, ...rest}: any) => {
    const onChangeHandler = (e: any) => {
        input.onChange(e.target.files[0])
    }

    return (
        <>
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
        </>
    )
}

//todo fix any type

const mapDispatchToProps = (dispatch: TDispatch): MapDispatchPropsType => {
    return {
        importDealsEconomy: (values: any) => dispatch(importDealsEconomyThunk(values)),
        deleteFileWithMistakesImportEconomy: () => dispatch(deleteFileWithMistakes())
    }
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        isExistFileWithMistakesImportEconomy: getIsExistFileWithMistakesImportEconomy(state)
    }
}

export default compose<FC>(reduxForm<{}, MapDispatchPropsType>({
    form: 'importEconomyOfDeals'
}), connect<{}, MapDispatchPropsType, {}, StateType>(mapStateToProps, mapDispatchToProps))(ImportPaymentsForm)