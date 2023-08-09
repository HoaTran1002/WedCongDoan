import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
interface PropsModal {
    open:boolean,
    close:() => void,
    title?:string,
    header:string,
    handleOK:()=>void,
}

const ModalMessage = (prop:PropsModal):JSX.Element=>{

    return (
        <Dialog
            open={prop.open}
            onClose={prop.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {prop.header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {prop.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={prop.handleOK}>OK</Button>
          <Button onClick={prop.close}>
            Trở về
          </Button>
        </DialogActions>
      </Dialog>
    )
}
export default ModalMessage