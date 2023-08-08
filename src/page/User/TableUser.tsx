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
  roleId: number
  depId: number
  isDeleted: number
}
interface IUserContext {
  alertEdit: () => void
  alertAdd: () => void
}
export const UserContex = React.createContext<IUserContext>({
  alertEdit: () => {
    return
  },
  alertAdd: () => {
    return
  }
})
const TableUser = (): JSX.Element => {
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

  const handleDelete = async (id: string): Promise<void> => {
    const request: { _id: string; value: number } = {
      _id: id,
      value: 1
    }
    await callDelete(async (): Promise<void> => {
      await UpdateIsDeleted(request)
      // setShowSuccess(true)
    })
    setMessage('đã xoá người Dùng!')
    setServerity('info')
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
          dateOfBirth={params.dateofbirth}
          email={params.email}
          password={params.password}
          roleId={params.roleId}
          depId={params.depId}
        />,
        <Tooltip key='delete' title='Xóa'>
          <ModalDelete
            callBack={(): void => {
              handleDelete(params.id)
            }}
            content={'bạn có muốn xoá người dùng này?'}
            question={'cảnh báo!!'}
          />

          {/* <IconButton onClick={(): void => handleDelete(params.id)}>
            <DeleteIcon color='error' />
          </IconButton> */}
        </Tooltip>
      ]
    }
  ]

  React.useEffect(() => {
    call(getAllUser)
  }, [loading, loadingParams.statusLoading])
  if (message !== '') {
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }
  const userContextParams: IUserContext = {
    alertEdit: (): void => {
      setServerity('info')
      setMessage('chỉnh sửa thành công!')
    },
    alertAdd: (): void => {
      setServerity('info')
      setMessage('đã thêm người Dùng!')
    }
  }
  return (
    <UserContex.Provider value={userContextParams}>
      <>{message && <MessageAlert message={message} severity={serverity} />}</>
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <TableWithFixedColumn
              isLoading={userState.loading || deleteUserState.loading }
              rows={rows}
              columns={columns}
              maxWidth={'90%'}
              maxHeight={'65vh'}
            />
          </Box>
        </>
    </UserContex.Provider>
  )
}
export default TableUser
