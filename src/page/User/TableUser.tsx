import DeleteIcon from '@mui/icons-material/Delete'
import { Snackbar,Box,Tooltip,IconButton } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import * as React from 'react'
import { deleteUsers, getAllUser } from '~/api/userApi'
import useFetch from '~/hook/useFetch'
import BasicModal from './ModalEditUser'
import { TableWithFixedColumn, ColumnsProps } from '~/components/TableFixed'
interface User {
  userId: string
  userName: string
  dateOfBirth: string
  email: string
  password: string
  userAddress: string
  roleId: number
  depId: number
}
const TableUser = (): JSX.Element => {
  const [reset, setReset] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [userState, call] = useFetch()
  const [deleteUserState, callDelete] = useFetch()

  const users = userState?.payload 

  const formatDay = (dayOrigin: string): string => {
    const dateObj = new Date(dayOrigin);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month.toString().padStart(2, "0")} / ${day.toString().padStart(2, "0")} / ${year}`;
  }
  const rows =
    users?.map((user: User) => ({
      id: user.userId,
      username: user.userName,
      dateofbirth:formatDay(user.dateOfBirth),
      email: user.email,
      password: user.password,
      useraddress: user.userAddress,
      roleId: user.roleId,
      depId: user.depId
    })) || []

  const handleDelete = (id: string): void => {
    const request: { _id: string } = {
      _id: id
    }
    callDelete(async () => {
      try {
        await deleteUsers(request)
        await setShowSuccess(true)
        window.location.reload()
      } catch (error) {
        setShowError(true)
      }
    })
  }
  const handelReset = (): void => {
    if (reset) {
      setReset(false)
    } else {
      setReset(true)
    }
  }
  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
  }
  
  const columns: ColumnsProps[] = [
    { field: 'id', headerName: 'ID Người Dùng', },
    { field: 'username', headerName: 'Họ và tên', },
    { field: 'dateofbirth', headerName: 'Ngày Sinh', },
    {
      field: 'email',
      headerName: 'Gmail',
      type: 'string',
    
    },
    {
      field: 'password',
      headerName: 'Mật Khẩu',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
    
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: any) => [
        <BasicModal
          key='edit'
          id={params.id}
          userName={params.username}
          dateOfBirth={params.dateofbirth}
          email={params.email}
          password={params.password}
          userAddress={params.useraddress}
          roleId={params.roleId}
          depId={params.depId}
        />,
        <Tooltip key='delete' title="Xóa">
          <IconButton onClick={(): void => handleDelete(params.id)}>
            <DeleteIcon color='error' />
          </IconButton>
        </Tooltip>
      ]
    }
  ]



  React.useEffect(() => {
    call(getAllUser)
  }, [showSuccess])
  return (
    <>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <MuiAlert
          onClose={handleCloseSuccess}
          severity='success'
          elevation={6}
          variant='filled'
        >
          Thao tác thành công 
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <MuiAlert
          onClose={handleCloseError}
          severity='error'
          elevation={6}
          variant='filled'
        >
          Thao tác thất bại
        </MuiAlert>
      </Snackbar>
      {userState.loading || deleteUserState.loading ? (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '500px',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display:"flex",
              justifyContent:"center"
            }}
          >
            <TableWithFixedColumn
              rows={rows}
              columns={columns}
              maxWidth={900}
            />
          </Box>
        </>
      )}
    </>
  )
}
export default TableUser
