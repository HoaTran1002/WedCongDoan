import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Tooltip, IconButton } from '@mui/material'

import CircularProgress from '@mui/material/CircularProgress'
import * as React from 'react'
import { deleteUsers, getAllUser } from '~/api/userApi'

import useFetch from '~/hook/useFetch'
import BasicModal from './ModalEditUser'
import { TableWithFixedColumn, ColumnsProps } from '~/components/TableFixed'
import MessageAlert from '~/components/MessageAlert'
import { LoadingContext } from '.'

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
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [userState, call] = useFetch()
  const [deleteUserState, callDelete] = useFetch()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')
  const [serverity, setServerity] = React.useState<string>('')
  const users = userState?.payload
  const loadingParams = React.useContext(LoadingContext)

  const formatDay = (dayOrigin: string): string => {
    const dateObj = new Date(dayOrigin)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${month.toString().padStart(2, '0')} / ${day
      .toString()
      .padStart(2, '0')} / ${year}`
  }
  const rows =
    users?.map((user: User) => ({
      id: user.userId,
      username: user.userName,
      dateofbirth: formatDay(user.dateOfBirth),
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
        setShowSuccess(true)
        setMessage('đã xoá user!')
        setServerity('info')
        setLoading(!loading)
      } catch (error) {
        setShowError(true)
      }
    })
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
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false
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
        <Tooltip key='delete' title='Xóa'>
          <IconButton onClick={(): void => handleDelete(params.id)}>
            <DeleteIcon color='error' />
          </IconButton>
        </Tooltip>
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
