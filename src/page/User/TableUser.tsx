import * as React from 'react'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteUsers, getAllUser } from '~/api/userApi'
import axios from '~/api/axios'
import BasicModal from './ModalEditUser'
import useFetch from '~/hook/useFetch'
import Button from '@mui/material/Button'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import base_url from '~/config/env'
axios.defaults.baseURL = base_url

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

  React.useEffect(() => {
    call(getAllUser)
  }, [showSuccess])

  const users = userState?.payload
  const rows =
    users?.map((user: User) => ({
      id: user.userId,
      username: user.userName,
      dateofbirth: user.dateOfBirth,
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
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID Người Dùng', width: 200 },
    { field: 'username', headerName: 'Họ và tên', width: 200 },
    { field: 'dateofbirth', headerName: 'Ngày Sinh', width: 200 },
    {
      field: 'email',
      headerName: 'Gmail',
      type: 'string',
      width: 200
    },
    {
      field: 'password',
      headerName: 'Mật Khẩu',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200
    },
    // {
    //   field: 'useraddress',
    //   headerName: 'Địa Chỉ',
    //   type: 'string',
    //   width: 200
    // },
    // },
    // {
    //   field: 'roleId',
    //   headerName: 'Mã Quyền',
    //   type: 'number',
    //   width: 0
    // },
    // {
    //   field: 'depId',
    //   headerName: 'Mã Phòng',
    //   type: 'number',
    //   width: 0
    // },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params: any) => [
        <BasicModal
          key={1}
          id={params.row.id}
          userName={params.row.username}
          dateOfBirth={params.row.dateofbirth}
          email={params.row.email}
          password={params.row.password}
          userAddress={params.row.useraddress}
          roleId={params.row.roleId}
          depId={params.row.depId}
        />,
        <GridActionsCellItem
          key={2}
          icon={<DeleteIcon />}
          label='Delete'
          onClick={(): void => handleDelete(params.id)}
        />
      ]
    }
  ]
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
          Acction successful!
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
          Acction Failed!
        </MuiAlert>
      </Snackbar>
      {userState.loading || deleteUserState.loading ? (
        <Box sx={{ 
          display: 'flex',
          width:"100%",
          height:"500px",
          alignItems:"center",
          justifyContent:"center"
         }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 6 }
                }
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </>
      )}
    </>
  )
}
export default TableUser
