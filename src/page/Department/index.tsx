import * as React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'

import TableDepartment from '~/page/Department/TableDepartment'
import BasicModal from './ModalAddDep'
import {
  Box,
  SxProps,
  Pagination
} from '@mui/material'
interface ILoadingContext {
  statusLoading: boolean
  setLoading: () => void
}

export const LoadingContext = React.createContext<ILoadingContext>({
  statusLoading: true,
  setLoading: () => {
    return
  }
})
const Index = (): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const loadingParams: ILoadingContext = {
    statusLoading: loading,

    setLoading: () => {
      console.log('okeee')
      setLoading(!loading)
    }
  }
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
            {/* <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid #0057c1",
                gap: "10px"
              }}
              onKeyDown={handleKeyPressEnter}
            >
              <Box
                component='input'
                value={compSearch}
                sx={{
                  fontSize: "18px",
                  border: "none",
                  outline: "none"
                }}
                placeholder='Tìm kiếm cuộc thi'
                onChange={(e): void => setCompSearch(e.target.value)}
              />
              <Box
                onClick={handleSearch}
              >
                <SearchIcon />
              </Box>
            </Box> */}
            <BasicModal />
          </Box>
          <Box
            sx={{
              mt:"20px",
              display:"flex",
              justifyContent:"center"
            }}
          >
            <TableDepartment/>
          </Box>
        </LoadingContext.Provider>
      </LayoutAdmin>
    </>
  )
}

export default Index