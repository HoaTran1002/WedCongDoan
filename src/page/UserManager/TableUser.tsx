import * as React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

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
  }
]

const rows = [
  {
    id: 1,
    username: 'Snow',
    dateofbirth: '29/10/2002',
    email: 'vanhoa@gmail.com',
    password: '67789',
    useraddress: 'TP.HCM'
  },
  {
    id: 2,
    username: 'Snow',
    dateofbirth: '29/10/2002',
    email: 'huutoan@gmail.com',
    password: '67789',
    useraddress: 'Vũng Tàu'
  },
  {
    id: 4,
    username: 'Snow',
    dateofbirth: '29/10/2002',
    email: 'giadat@gmail.com',
    password: '67789',
    useraddress: 'Bình Thuận'
  },
  {
    id: 5,
    username: 'Snow',
    dateofbirth: '29/10/2002',
    email: 'dangkhoa@gmail.com',
    password: '67789',
    useraddress: 'Bình Định'
  },
  {
    id: 6,
    username: 'Snow',
    dateofbirth: '29/10/2002',
    email: 'huutri@gmail.com',
    password: '67789',
    useraddress: 'Đà Nẵng'
  },
  {
    id: 7,
    username: 'Snow',
    dateofbirth: '29/10/2002',
    email: 'vanquyet@gmail.com',
    password: '67789',
    useraddress: 'Lâm Đồng'
  },
  {
    id: 8,
    username: 'Snow',
    dateofbirth: '29/10/2002',
    email: 'vandat@gmail.com',
    password: '67789',
    useraddress: 'Hà Nội'
  },
  {
    id: 9,
    username: 'Snow',
    dateofbirth: '29/10/2002',
    email: 'gialong@gmail.com',
    password: '67789',
    useraddress: 'Hải Phòng'
  }
]

const TableUser = (): JSX.Element => {
  return (
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
        checkboxSelection
      />
    </div>
  )
}

export default TableUser
