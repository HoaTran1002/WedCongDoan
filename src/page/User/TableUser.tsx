import * as React from 'react'
import useAxios from '~/hook/Fetch'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { getAll } from '~/api/userApi'
import axios from 'axios'
import BasicModal from './ModalEditUser'
axios.defaults.baseURL = 'http://localhost:5237/api'
// const rows = [
//   {
//     id: 1,
//     username: 'Snow',
//     dateofbirth: '29/10/2002',
//     email: 'vanhoa@gmail.com',
//     password: '67789',
//     useraddress: 'TP.HCM'
//   },
//   {
//     id: 2,
//     username: 'Snow',
//     dateofbirth: '29/10/2002',
//     email: 'huutoan@gmail.com',
//     password: '67789',
//     useraddress: 'Vũng Tàu'
//   },
//   {
//     id: 4,
//     username: 'Snow',
//     dateofbirth: '29/10/2002',
//     email: 'giadat@gmail.com',
//     password: '67789',
//     useraddress: 'Bình Thuận'
//   },
//   {
//     id: 5,
//     username: 'Snow',
//     dateofbirth: '29/10/2002',
//     email: 'dangkhoa@gmail.com',
//     password: '67789',
//     useraddress: 'Bình Định'
//   },
//   {
//     id: 6,
//     username: 'Snow',
//     dateofbirth: '29/10/2002',
//     email: 'huutri@gmail.com',
//     password: '67789',
//     useraddress: 'Đà Nẵng'
//   },
//   {
//     id: 7,
//     username: 'Snow',
//     dateofbirth: '29/10/2002',
//     email: 'vanquyet@gmail.com',
//     password: '67789',
//     useraddress: 'Lâm Đồng'
//   },
//   {
//     id: 8,
//     username: 'Snow',
//     dateofbirth: '29/10/2002',
//     email: 'vandat@gmail.com',
//     password: '67789',
//     useraddress: 'Hà Nội'
//   },
//   {
//     id: 9,
//     username: 'Snow',
//     dateofbirth: '29/10/2002',
//     email: 'gialong@gmail.com',
//     password: '67789',
//     useraddress: 'Hải Phòng'
//   }
// ]
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
  const [response, err, loader] = useAxios(getAll)
  const users = response?.data
  const rows = users?.map((user: User) => ({
    id: user.userId,
    username: user.userName,
    dateofbirth: user.dateOfBirth,
    email: user.email,
    password: user.password,
    useraddress: user.userAddress,
    roleId: user.roleId,
    depId: user.depId
  }))
  if (response) {
    console.log(response.data)
  }
  if (err) {
    console.log(err)
  }
  if (loader) {
    console.log(loader)
  }
  const handleDelete = (id: string): void => {
    // Thực hiện xóa hàng dữ liệu với ID tương ứng
    console.log('Xóa hàng dữ liệu với ID:', id)
    axios
      .delete(`/Users?id=${id}`)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log('có lỗi khi xoá dữ liệu: ' + error)
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
      {loader ? (
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
