import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { styled } from '@mui/material/styles'
import { TextField, Tooltip } from '@mui/material'
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
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
  const submit = (): void => {
    if (callBack) {
      callBack()
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
            Chỉnh Tên Đề Thi
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
              submit
            </Button>
            <Button
              sx={{ marginLeft: 0.2 }}
              onClick={handleClose}
              variant='outlined'
            >
              cancel
            </Button>
          </>
        </Box>
      </Modal>
    </div>
  )
}
