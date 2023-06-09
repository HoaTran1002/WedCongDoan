import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import DepTextFields from './DepTextFields'
import AddIcon from '@mui/icons-material/Add'
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
    id: number
    depName: string
}
export default function BasicModal(prop: BasicModalProps): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)
  return (
    <div>
      <Stack direction={'row'} gap={'20px'} sx={{ mt: '15px', mb: '15px' }}>
        <Button onClick={handleOpen} sx={{ width: 30, height: 30, fontSize: 21 }}>
            <EditIcon />
        </Button>
      </Stack>
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
            SỬA TÊN CHUYÊN NGÀNH
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <DepTextFields
              edit={true}
              id={prop.id}
              depName={prop.depName}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
