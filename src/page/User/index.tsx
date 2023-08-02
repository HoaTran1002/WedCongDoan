import * as React from 'react'
import { createContext, useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'

import TableUser from '~/page/User/TableUser'
import BasicModal from './ModalAddUser'
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
  const [loading, setLoading] = useState<boolean>(false)

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
          <h1 className='color-primary text-center'>Quản lý người dùng</h1>
          <BasicModal />
          <TableUser />
        </LoadingContext.Provider>
      </LayoutAdmin>
    </>
  )
}

export default Index
