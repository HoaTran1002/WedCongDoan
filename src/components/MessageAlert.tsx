import { Alert, Snackbar, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertColor } from '@mui/material/Alert'

interface IMessage {
  message: string
  severity: string
}

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2)
}))

const MessageAlert = ({ message, severity }: IMessage): JSX.Element => {
  const [showMessage, setShowMessage] = useState<boolean>(true)

  const handleClose = (): void => {
    setShowMessage(false)
  }

  return (
    <>
      <StyledSnackbar
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50%'
        }}
        open={showMessage}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity ? (severity as AlertColor) : 'success'}
          elevation={6}
          variant='outlined'
        >
          {message}
        </Alert>
      </StyledSnackbar>
    </>
  )
}

export default MessageAlert
