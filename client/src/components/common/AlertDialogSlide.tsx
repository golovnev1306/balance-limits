import React, {FC, useState} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteIcon from "@material-ui/icons/Delete"

type OwnPropsType = {
    modalTitlePostfix: string
    handleDelete: () => void
}

const AlertDialogSlide:FC<OwnPropsType> = ({modalTitlePostfix, handleDelete}) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAgree = () => {
        handleClose()
        handleDelete()
    }

    const handleDisagree = () => {
        handleClose()
    }

    return (
        <div style={{display: 'inline'}}>
            <Button onClick={handleClickOpen}
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    color="secondary"
                    style={{marginLeft: '10px'}}>Удалить</Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>{`Удалить ${modalTitlePostfix}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Уверены, что хотите удалить {modalTitlePostfix}? Внимание, восстановить его уже не получится.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree} variant="outlined" color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleAgree} variant="outlined" color="primary">
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialogSlide