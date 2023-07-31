import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Tooltip, IconButton } from '@mui/material'

import CircularProgress from '@mui/material/CircularProgress'
import * as React from 'react'
import { deleteUsers, getAllUser, UpdateIsDeleted } from '~/api/userApi'

import useFetch from '~/hook/useFetch'
import BasicModal from './ModalEditUser'
import { TableWithFixedColumn, ColumnsProps } from '~/components/TableFixed'
import MessageAlert from '~/components/MessageAlert'
import { LoadingContext } from '.'
import { formatDay } from '~/utils/dateUtils'
import ModalDelete from '~/components/ModalDelete'
interface User {
  userId: string
  userName: string
  dateOfBirth: string
  email: string
  password: string
  userAddress: string
  roleId: number
  depId: number
  isDeleted: number
}

const TableUser = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [userState, call] = useFetch()
  const [deleteUserState, callDelete] = useFetch()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')
  const [serverity, setServerity] = React.useState<string>('')
  const users = userState?.payload
  const loadingParams = React.useContext(LoadingContext)

  const rows =
    users
      ?.filter((user: User) => user.isDeleted !== 1)
      .map((user: User) => ({
        id: user.userId,
        username: user.userName,
        dateofbirth: formatDay(user.dateOfBirth),
        email: user.email,
        password: user.password,
        roleId: user.roleId,
        depId: user.depId
      })) || []
      const formatDateYYYY_DD_MM = (inputDate: string):string => {
        const parts = inputDate.split('/').map((part) => part.trim());
        if (parts.length !== 3) {
          throw new Error('Invalid date format');
        }
      
        const [day, month, year] = parts;
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      };
  const handleDelete = async (id: string): Promise<void> => {
    const request: { _id: string; value: number } = {
      _id: id,
      value: 1
    }
    await callDelete(async (): Promise<void> => {
      await UpdateIsDeleted(request)
    })
    setMessage('đã xoá user!')
    setServerity('success')
    setLoading(!loading)
  }

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: 'ID Người Dùng' },
    { field: 'username', headerName: 'Họ và tên' },
    { field: 'dateofbirth', headerName: 'Ngày Sinh' },
    {
      field: 'email',
      headerName: 'Gmail',
      type: 'string'
    },
    {
      field: 'password',
      headerName: 'Mật Khẩu'
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: any) => [
        <BasicModal
          key='edit'
          id={params.id}
          userName={params.username}
          dateOfBirth={formatDateYYYY_DD_MM(params.dateofbirth)}
          email={params.email}
          password={params.password}
          userAddress={params.useraddress}
          roleId={params.roleId}
          depId={params.depId}
        />,
        <>
          <Tooltip key='delete' title='Xóa'>
            <ModalDelete
              callBack={(): void => {
                handleDelete(params.id)
              }}
              content={'bạn có muốn xoá người dùng này?'}
              question={'cảnh báo!!'}
            />
          </Tooltip>
        </>
      ]
    }
  ]

  React.useEffect(() => {
    call(getAllUser)
  }, [loading, loadingParams.statusLoading])
  if (message != null) {
    setTimeout(async (): Promise<void> => {
      setMessage('')
    }, 3000)
  }

  return (
    <>
      <>{message && <MessageAlert message={message} severity={serverity} />}</>

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
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <TableWithFixedColumn
              rows={rows}
              columns={columns}
              maxWidth={900}
              maxHeight={400}
            />
          </Box>
        </>
      )}
    </>
  )
}
export default TableUser
