import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import UserTextFields from './UserTextFields'
import AddIcon from '@mui/icons-material/Add'
import useFetch from '~/hook/useFetch'
import { getAllUser } from '~/api/userApi'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'white',
  borderRadius: 2,
  boxShadow:
    'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
  p: 4
}
interface IModalcontex {
  offModal: () => void
}
export const UsecontexModalAdd = React.createContext<IModalcontex>({
  offModal: () => {
    return
  }
})
export default function BasicModal(): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)
  const [userState, call] = useFetch()

  React.useEffect(() => {
    call(getAllUser)
  }, [])
  const modalPrams: IModalcontex = {
    offModal: (): void => {
      handleClose()
    }
  }
  return (
    <UsecontexModalAdd.Provider value={modalPrams}>
      {!userState.loading ? (
          <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                position: "relative",
                cursor: "pointer",
                borderRadius: "3px",
                transition: "all linear 0.2s",
              }}
              onClick={handleOpen}
            >
              <span
                className='icon-button'
                style={{
                  transition: "all linear 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#007ecd",
                  color: "white",
                  padding: "5px",
                }}
              ><AddIcon /></span>
              <span
                style={{
                  backgroundColor: "#def5ff",
                  height: "100%",
                  color: "#002fa7",
                  fontWeight: "500",
                  padding: "5px",
                }}
              >Thêm người dùng</span>

            </Box>
      ) : null}
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
              roleId={0}
              depId={0}
            />
          </Typography>
        </Box>
      </Modal>
    </UsecontexModalAdd.Provider>
  )
}
