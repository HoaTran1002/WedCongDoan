import * as React from 'react'
import { createContext, useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import {
  Box,
  SxProps,
  Pagination
} from '@mui/material'
import TableUser from '~/page/User/TableUser'
import BasicModal from './ModalAddUser'
import { IRole, IUserDetails } from '~/interface/Interface'
import useFetch from '~/hook/useFetch'
import { formatDay } from '~/utils/dateUtils'
import { getAllUser } from '~/api/userApi'
import { listWhenSearchDeepCheck } from '~/utils/stringUtils'
import SearchIcon from '@mui/icons-material/Search';
import { getAllRole } from '~/api/roleApi'
interface ILoadingContext {
  statusLoading: boolean
  setLoading: () => void
}

export const LoadingContext = createContext<ILoadingContext>({
  statusLoading: true,
  setLoading: () => {
    return
  }
})

const Index = (): JSX.Element => {
  const [userState, call] = useFetch()
  const [roles, callAllRole] = useFetch()
  const [loading, setLoading] = useState<boolean>(false)
  const [keySearch,setKeySearch] = useState<string>('')
  const [listUser,setListUser] =  useState<IUserDetails[]>([])
  const users = userState?.payload
  const getNameRole = (roleId:number):string=>{
    const item:IRole = roles?.payload?.find((r:IRole)=>r.roleId === roleId)
    return item?.roleName;
  }
  
  
  const rows = users
  ?.filter((user: IUserDetails) => user.isDeleted !== 1)
  .sort((a:IUserDetails, b:IUserDetails) => a.roleId - b.roleId)
  .map((user: IUserDetails) => ({
    id: user.userId,
    username: user.userName,
    dateOfBirth: user.dateOfBirth,
    email: user.email,
    password: user.password,
    roleId: user.roleId,
    depId: user.depId,
    dateOfBirthToShow:formatDay( user.dateOfBirth),
    roleIdToShow:getNameRole(user.roleId) 
  }))
  const loadingParams: ILoadingContext = {
    statusLoading: loading,
    setLoading: () => {
      setLoading(!loading)
    }
  }
  const handleSearch=():void=>{
    const listUserWhenSearch:IUserDetails[] = listWhenSearchDeepCheck(keySearch,rows,'username')
    setListUser(
      listUserWhenSearch?.reverse()
    )
    setKeySearch('')
  }
  const handleKeyPressEnter = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };
  React.useEffect(() => {
    call(getAllUser)
  }, [loading, loadingParams.statusLoading])
  React.useEffect(()=>{
    callAllRole(getAllRole)
  },[])
  React.useEffect(()=>{
    setListUser(
      userState?.payload
      ?.filter((user: IUserDetails) => user.isDeleted !== 1)
      .sort((a:IUserDetails, b:IUserDetails) => a.roleId - b.roleId)
      .map((user: IUserDetails) => ({
        id: user.userId,
        username: user.userName,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        password: user.password,
        roleId: user.roleId,
        depId: user.depId,
        dateOfBirthToShow:formatDay( user.dateOfBirth),
        roleIdToShow:getNameRole(user.roleId) 
      }))
    )
  },[userState?.loading])
  
  return (
    <>
      <LayoutAdmin>
        <LoadingContext.Provider value={loadingParams}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "3px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              gap: "30px",
              m:"0 20px" 
            }}
          >
            <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid #0057c1",
                gap: "10px"
              }}
              onKeyDown={handleKeyPressEnter}
            >
              <Box
                component='input'
                value={keySearch}
                sx={{
                  fontSize: "18px",
                  border: "none",
                  outline: "none"
                }}
                placeholder='Tìm kiếm người dùng'
                onChange={(e): void => setKeySearch(e.target.value)}
              />
              <Box
                onClick={handleSearch}
              >
                <SearchIcon />
              </Box>
            </Box>
            <BasicModal />
          </Box>
          <Box
          sx={{
            mt:"20px"
          }}
          >
          <TableUser rows={listUser} loading={userState.loading}/>
          </Box>
        </LoadingContext.Provider>
      </LayoutAdmin>
    </>
  )
}

export default Index
