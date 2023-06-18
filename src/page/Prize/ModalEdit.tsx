import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import EditIcon from '@mui/icons-material/Edit'
import TextFields from './TextFields'
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
  comId: string
  priId: string
  cpid: string
  PrizTId: string
  Quantity: string
  PrizeDetail: string
}
export default function BasicModal(prop: BasicModalProps): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)
  console.log(prop.priId + prop.id + prop.PrizTId + prop.Quantity + prop.PrizeDetail)
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
            THÔNG TIN GIẢI THƯỞNG
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <TextFields
              edit={true}
              cpid={prop.cpid}
              priId={prop.priId}
              comId={prop.id}
              priTid={prop.PrizTId}
              quantity={prop.Quantity}
              prizeDetail={prop.PrizeDetail}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
