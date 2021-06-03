import React, {CSSProperties, FC, Fragment, ReactElement, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from "@material-ui/core/Button"
import {connect} from "react-redux"
import {getSelectedDealId, getSelectedLimitId} from "../../selectors"
import initialValuesForms from "../../config/initialValuesForms"
import {BillType, DealType, LimitType, PaymentType, StateType} from "../../types"
import {PropTypes} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '400px'
    },
}));

type OwnPropsType = {
    instance: 'limits' | 'deals' | 'bills' | 'payments'
    ChildrenForm: FC<any>//todo убрать any typescript'а
    mode: 'update' | 'copy' | 'add'
    selectedItem: LimitType | DealType | BillType | PaymentType
    title: string
    modalTitlePostfix: string
    btnColor?: PropTypes.Color
    style: CSSProperties
}

type MapStatePropsType = {
    selectedLimitId: number | null
    selectedDealId: number | null
}

const TransitionsModal: FC<OwnPropsType & MapStatePropsType> = ({instance, ChildrenForm
                                                                    , mode, selectedItem, title,
                                                                    modalTitlePostfix, selectedLimitId, selectedDealId,
                                                                    btnColor, style}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    let initialValues = {...initialValuesForms[instance]}
    let resultInitialValues = {}

    function hasOwnProperty<X extends {}, Y extends PropertyKey>
    (obj: X, prop: Y): obj is X & Record<Y, unknown> {
        return obj.hasOwnProperty(prop)
    }
    
    switch (mode) {
        case 'update':
            resultInitialValues = {
                ...initialValues,
                ...selectedItem,
            }
            if (hasOwnProperty(selectedItem, 'deal_id')) {
                resultInitialValues = {
                    ...resultInitialValues,
                    deal_id: selectedItem.deal_id
                }
            }

            break
        case 'copy':
            resultInitialValues = {
                ...initialValues,
                ...selectedItem,
                id: null,
            }
            break
        case 'add':
            resultInitialValues = {
                ...initialValues,
                limit_id: selectedLimitId ? selectedLimitId : -1,
                deal_id: selectedDealId,
            }
            break
        default:
            initialValues = {}
    }

    return (
        <Fragment>
            <Button style={style} color={btnColor} variant={'outlined'} onClick={handleOpen}>{title}</Button>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2>{`${title} ${modalTitlePostfix}`}</h2>
                        <p>
                            <ChildrenForm mode={mode} initialValues={resultInitialValues}
                                          handleClose={handleClose}/>
                        </p>
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = (state: StateType) => {
    return {
        selectedLimitId: getSelectedLimitId(state),
        selectedDealId: getSelectedDealId(state)
    }
}

export default connect<MapStatePropsType, {}, {}, StateType>(mapStateToProps)(TransitionsModal)