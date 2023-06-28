import * as React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'

import TableUser from '~/page/User/TableUser'
import BasicModal from './ModalAddUser'

const Index = (): JSX.Element => {
  return (
    <>
      <LayoutAdmin>
        <>
          <h1 className='color-primary text-center'>Quản lý người dùng</h1>
          <BasicModal />
          <TableUser />
        </>
      </LayoutAdmin>
    </>
  )
}

export default Index
