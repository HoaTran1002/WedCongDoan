import React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import CompTable from '~/page/CompetitionManage/CompTable'
const Index = (): JSX.Element => {
  return (
    <>
      <LayoutAdmin>
        <CompTable/>
      </LayoutAdmin>
    </>
  )
}

export default Index
