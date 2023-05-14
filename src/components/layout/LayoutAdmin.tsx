import { Container } from '@mui/material'
import React from 'react'
import BarAppAdmin from '../BarAppAdmin'
type Props = {
  children: string | JSX.Element
}
const LayoutAdmin = ({ children }: Props): JSX.Element => {
  return (
    <>
      <BarAppAdmin />
      <Container sx={{ mt: 10 }} maxWidth='md'>
        {children}
      </Container>
    </>
  )
}

export default LayoutAdmin
