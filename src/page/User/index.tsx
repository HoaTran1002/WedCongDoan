import { Button } from '@mui/material'
import * as React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'

import TableUser from '~/page/User/TableUser'
import BasicModal from './ModalAddUser'

const Index = (): JSX.Element => {
  return (
    <>
      <LayoutAdmin>
        <>
          <BasicModal />
          <TableUser />
        </>
      </LayoutAdmin>
    </>
  )
}

export default Index
