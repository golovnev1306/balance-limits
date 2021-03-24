import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import DeleteIcon from "@material-ui/icons/Delete"
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})


export default ({modalTitlePostfix, handleDelete}) => {
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
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{`Удалить ${modalTitlePostfix}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
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