import { Alert, Snackbar, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertColor } from '@mui/material/Alert'
import { v4 as uuidv4 } from 'uuid'
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
  console.log('mount')
  const handleClose = (): void => {
    setShowMessage(false)
  }

  return (
    <>
      <StyledSnackbar
        sx={{
          position: 'fixed',
          minWidth: 30,
          background: '#fff'
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
