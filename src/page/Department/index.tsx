import * as React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'

import TableDepartment from '~/page/Department/TableDepartment'
import BasicModal from './ModalAddDep'

const Index = (): JSX.Element => {
  return (
    <>
      <LayoutAdmin>
        <>
          <BasicModal />
          <TableDepartment/>
        </>
      </LayoutAdmin>
    </>
  )
}

export default Index