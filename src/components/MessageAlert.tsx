import { Snackbar, styled } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertColor } from '@mui/material/Alert'

interface IMessage {
  mesagge: string
  severity: string
}
const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2)
}))
const MessageAlert = ({ mesagge, severity }: IMessage): JSX.Element => {
  const [showMessage, setShowMessage] = React.useState(true)
  const handleClose = (): void => {
    setShowMessage(false)
  }

  return (
    <StyledSnackbar
      sx={{ position: 5, width: '50%' }}
      open={showMessage}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity ? (severity as AlertColor) : 'success'}
        elevation={6}
        variant='filled'
      >
        {mesagge}
      </MuiAlert>
    </StyledSnackbar>
  )
}
export default MessageAlert
