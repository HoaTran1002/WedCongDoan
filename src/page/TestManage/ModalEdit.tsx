import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { styled } from '@mui/material/styles'
import { TextField, Tooltip } from '@mui/material'
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { blue } from '@mui/material/colors'

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #555',
  boxShadow: 24,
  borderRadius: 2,
  p: 4
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
interface IModal {
  nameExam?: string
  callBack?: () => void
  setNameExam: ({ value }: { value: string }) => void
}
export default function BasicModal({
  nameExam,
  callBack,
  setNameExam
}: IModal): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)
  const submit = async (): Promise<void> => {
    if (callBack) {
      callBack()
      setOpen(false)
    }
  }
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = String(event.target.value)

    setNameExam({ value })
  }

  return (
    <div>
      <LightTooltip placement='right' title='Chỉnh sửa'>
        <Button
          sx={{ marginLeft: 0.2 }}
          onClick={handleOpen}
          variant='outlined'
        >
          <EditNoteIcon />
        </Button>
      </LightTooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Sửa Tên Đề Thi
          </Typography>

          <Box>
            <TextField
              defaultValue={nameExam}
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
              onChange={onChangeInput}
            />
          </Box>
          <>
            <Button
              sx={{ marginLeft: 0.2 }}
              onClick={submit}
              variant='outlined'
            >
              xác nhận
            </Button>
            <Button
              sx={{ marginLeft: 0.2 }}
              onClick={handleClose}
              variant='outlined'
            >
              thoát
            </Button>
          </>
        </Box>
      </Modal>
    </div>
  )
}
