import * as React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import useAxios from '~/hook/useAxios'
import TableUser from '~/page/UserManager/TableUser'

const Index = (): JSX.Element => {
  const [response, err, loader] = useAxios({
    url: '/Users',
    method: 'Get'
  })

  if (response) {
    console.log(response.data)
  }
  if (err) {
    console.log(err)
  }
  if (loader) {
    console.log(loader)
  }
  return (
    <>
      <LayoutAdmin>
        <TableUser />
      </LayoutAdmin>
    </>
  )
}

export default Index
