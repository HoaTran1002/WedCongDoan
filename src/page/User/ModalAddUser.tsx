import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import UserTextFields from './UserTextFields'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',

  bgcolor: 'white',

  borderRadius: 2,
  boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
  p: 4
}

export default function BasicModal(): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Thêm Người Dùng
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            sx={{ display: 'flex', justifyContent: 'center', color: 'blue' }}
            id='modal-modal-title'
            variant='h6'
            component='h2'
          >
            THÊM NGƯỜI DÙNG MỚI
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <UserTextFields
              edit={false}
              id={''}
              userName={''}
              dateOfBirth={''}
              email={''}
              password={''}
              userAddress={''}
              roleId={'0'}
              depId={'0'}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
