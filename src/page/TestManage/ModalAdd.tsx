import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp'
import { blue } from '@mui/material/colors'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',

  bgcolor: 'white',

  borderRadius: 2,
  boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
  p: 4
}

interface ModalAddProps {
  children: React.ReactNode
  Title: string // Prop bổ sung
}
export default function ModalAdd({ children, Title }: ModalAddProps): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return (
    <div>
      <Box
        onClick={handleOpen}
        sx={{ background: blue[100], width: 100, height: 'auto', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
      >
        {/* <Link to={`/TestCreate/Competition/${comId}`}>
            <Button>
              <PostAddSharpIcon sx={{ width: '100%', height: '100%' }} />
            </Button>
          </Link> */}
        <Button>
          <PostAddSharpIcon sx={{ width: '100%', height: '100%' }} />
        </Button>

        <Box
          sx={{
            background: blue[700],
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            textDecoration: 'none',
            border: 'none'
          }}
        >
          <span>TẠO MỚI</span>
        </Box>
      </Box>
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
            {Title}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {children}
          </Typography>
          <Button onClick={handleClose} sx={{ marginTop: 2 }} variant='contained'>
            Thoát
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
