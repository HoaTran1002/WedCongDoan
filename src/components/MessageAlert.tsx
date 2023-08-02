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
  const [showMessage, setShowMessage] = useState<boolean>(false)

  useEffect(() => {
    if (!showMessage) {
      // Nếu showMessage là true, hiển thị MessageAlert
      const timer = setTimeout(() => {
        setShowMessage(true) // Đặt lại trạng thái để unmount MessageAlert sau 3000ms
      }, 500)

      // Cleanup function để xóa timer khi component unmount hoặc khi trạng thái showMessage thay đổi thành false
      return () => clearTimeout(timer)
    }
  }, [showMessage])

  const handleClose = (): void => {
    setShowMessage(false)
  }

  return (
    <div id='message-alert-container'>
      {/* Đặt ID cho container chứa MessageAlert */}
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
    </div>
  )
}

export default MessageAlert
