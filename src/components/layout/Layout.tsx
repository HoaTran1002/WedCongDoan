import { Container } from '@mui/material'
import React from 'react'
import BarApp from '../BarApp'

type Props = {
  children: any | JSX.Element
}
const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <BarApp />
      <Container sx={{ mt: 10 }} maxWidth='lg'>
        {children}
      </Container>
    </>
  )
}

export default Layout
