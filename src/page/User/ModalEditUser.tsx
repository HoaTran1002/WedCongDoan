import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import UserTextFields from './UserTextFields'
import EditIcon from '@mui/icons-material/Edit'
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
interface BasicModalProps {
  id: string
  userName: string
  dateOfBirth: string
  email: string
  password: string
  userAddress: string
  roleId: number
  depId: number
}
export default function BasicModal(prop: BasicModalProps): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen} sx={{ width: 30, height: 30, fontSize: 21 }}>
        <EditIcon />
      </Button>
      {/* <Button variant='contained' onClick={handleOpen}>
        Thêm Người Dùng
      </Button> */}
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
            THÔNG TIN NGƯỜI DÙNG
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <UserTextFields
              id={prop.id}
              userName={prop.userName}
              dateOfBirth={prop.dateOfBirth}
              email={prop.email}
              password={prop.password}
              userAddress={prop.userAddress}
              roleId={prop.roleId}
              depId={prop.depId}
              edit={true}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
