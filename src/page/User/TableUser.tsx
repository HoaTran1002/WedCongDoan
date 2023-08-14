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
import { listWhenSearchDeepCheck } from '~/utils/stringUtils'
import { IUserDetails } from '~/interface/Interface'
interface IUserContext {
  alertEdit: () => void
  alertAdd: () => void
}
interface PropsTable {
  rows:IUserDetails[],
  loading:boolean
}
export const UserContex = React.createContext<IUserContext>({
  alertEdit: () => {
    return
  },
  alertAdd: () => {
    return
  }
})
const TableUser = (prop:PropsTable): JSX.Element => {
  const [deleteUserState, callDelete] = useFetch()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')
  const [serverity, setServerity] = React.useState<string>('')
  
  const handleDelete = async (id: string): Promise<void> => {
    const request: { _id: string; value: number } = {
      _id: id,
      value: 1
    }
    await callDelete(async (): Promise<void> => {
      await UpdateIsDeleted(request)
    })
    setMessage('đã xoá người Dùng!')
    setServerity('info')
    setLoading(!loading)
  }

  const columns: ColumnsProps[] = [
    { field: 'id', headerName: 'ID Người Dùng' },
    { field: 'username', headerName: 'Họ và tên' },
    { field: 'dateOfBirth', hidden:true},
    { field:'dateOfBirthToShow',headerName: 'Ngày Sinh'},
    {
      field: 'email',
      headerName: 'Gmail',
      type: 'string'
    },
    {
      field: 'password',
      headerName: 'Mật Khẩu'
    },
    {field:'roleIdToShow',headerName:'Quyền'},
    {field:'roleId',hidden:true},
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: any) => [
        <BasicModal
          key='edit'
          id={params.id}
          userName={params.username}
          dateOfBirth={params.dateOfBirth}
          email={params.email}
          password={params.password}
          roleId={params.roleId}
          depId={params.depId}
        />,
        <div key='delete'>
            <ModalDelete
              callBack={(): void => {
                handleDelete(params.id)
              }}
              content={'bạn có muốn xoá người dùng này?'}
              question={'cảnh báo!!'}
            />
        </div>
      ]
    }
  ]

  
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
              isLoading={prop.loading}
              rows={prop.rows}
              columns={columns}
              maxWidth={'88%'}
              maxHeight={'65vh'}
              numberItems={6}
            />
          </Box>
        </>
    </UserContex.Provider>
  )
}
export default TableUser
