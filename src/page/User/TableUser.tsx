import * as React from 'react'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteUsers, getAllUser } from '~/api/userApi'
import axios from 'axios'
import BasicModal from './ModalEditUser'
import useFetch from '~/hook/useFetch'
axios.defaults.baseURL = 'http://localhost:5237/api'

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
  const [userState, call] = useFetch()
  const [deleteUserState, callDelete] = useFetch()
  React.useEffect(() => {
    call(getAllUser)
  }, [])

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
    // Thực hiện xóa hàng dữ liệu với ID tương ứng
    console.log('Xóa hàng dữ liệu với ID:', id)
    callDelete(async () => {
      deleteUsers(request)
    })
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
    {
      field: 'useraddress',
      headerName: 'Địa Chỉ',
      type: 'string',
      width: 200
    },
    {
      field: 'roleId',
      headerName: 'Mã Quyền',
      type: 'number',
      width: 80,
      hideable: true
    },
    {
      field: 'depId',
      headerName: 'Mã Phòng',
      type: 'number',
      width: 80,
      hideable: true
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params: any) => [
        // <GridActionsCellItem key={1} icon={<EditIcon />} label='Edit' />,
        // eslint-disable-next-line react/jsx-key
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
      {userState.loading || deleteUserState.loading ? (
        <h1>đang tải xuống ...</h1>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
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
      )}
    </>
  )
}

export default TableUser
