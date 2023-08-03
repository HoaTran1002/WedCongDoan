import {
  Box,
  Button,
  Modal,
  styled,
  SxProps,
  Tooltip,
  tooltipClasses,
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
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))
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
      <LightTooltip placement='left' title='xoá '>
        <Button
          sx={{
            background: 'white',
            border: 1,
            borderRadius: 1,
            margin: 0.2
          }}
          onClick={handleOpen}
        >
          <DeleteSweepIcon sx={{ color: red[400] }} />
        </Button>
      </LightTooltip>

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
