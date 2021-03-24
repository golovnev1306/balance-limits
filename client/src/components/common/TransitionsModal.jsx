import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from "@material-ui/core/Button"
import {connect} from "react-redux"
import {getSelectedDealId, getSelectedLimitId} from "../../selectors"
import MenuItem from "@material-ui/core/MenuItem";

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

const TransitionsModal = ({ChildrenForm, mode, selectedItem, title, modalTitlePostfix, selectedLimitId, selectedDealId, ...rest}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    let initialValues = {}

    switch (mode) {
        case 'update':
            initialValues = {
                ...selectedItem,
                deal_id: selectedItem.deal_id,
            }
            break
        case 'copy':
            initialValues = {
                ...selectedItem,
                id: null,
            }
            break
        case 'add':
            initialValues = {
                limit_id: selectedLimitId ? selectedLimitId : -1,
                deal_id: selectedDealId,
            }
            break
        default:
            initialValues = {}
    }


    return (
        <>
            <Button {...rest} variant={'outlined'} onClick={handleOpen}>{title}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
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
                        <h2 id="transition-modal-title">{`${title} ${modalTitlePostfix}`}</h2>
                        <p id="transition-modal-description">
                            <ChildrenForm mode={mode} initialValues={initialValues}
                                          handleClose={handleClose}/>
                        </p>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

const mapStateToProps = state => {
    return {
        selectedLimitId: getSelectedLimitId(state),
        selectedDealId: getSelectedDealId(state)
    }
}

export default connect(mapStateToProps)(TransitionsModal)