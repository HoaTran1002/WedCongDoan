import {
  Box,
  Button,
  Modal,
  Tooltip,
  SxProps,
  IconButton,
  TooltipProps,
  Typography
} from '@mui/material'
import React from 'react'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { blue, red } from '@mui/material/colors'
const style:SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: 1,
  borderColor: blue[100],
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent:"flex-start",
  flexDirection:"column"
}
interface IModal {
  question?: string
  content?: string
  setIsDeleteValue?: (value: boolean) => void
  id?: number
  callBack?: () => void
}

const ModalDelete = ({
  question,
  content,
  setIsDeleteValue,
  id,
  callBack
}: IModal): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)
  const callDelete = (): void => {
    if (callBack) {
      callBack()
    }
    setOpen(false)
  }

  return (
    <div>
      <Tooltip title='Xóa' placement='bottom'>
        <IconButton
          onClick={handleOpen}
        >
          <DeleteSweepIcon sx={{ color: red[400] }} />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
            >
              {question ? question : 'Bạn muốn xoá trắc nghiệm?'}
                </Typography>
              <Typography id='modal-modal-description' sx={{mt:2}}>
                {content
                  ? content
                  : 'câu trắc nghiệm này sẽ hoàn toàn bị xoá khỏi đề thi!'}
              </Typography>
              <Box
                sx={{
                  display:"flex",
                  gap:"20px",
                  justifyContent:"flex-end",
                  mt:3
                }}
              >
                <Button variant='contained' onClick={callDelete}>
                  Đồng ý
                </Button>
                <Button variant='outlined' onClick={handleClose}>
                  Thoát
                </Button>
                
              </Box>
        </Box>
      </Modal>
    </div>
  )
}
export default ModalDelete
