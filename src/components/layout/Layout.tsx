import { Container } from '@mui/material'
import React from 'react'
import Header from '../Header'
type Props = {
  children: string | JSX.Element
}
const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <div>
        <Header />
      </div>
      <Container maxWidth='md'>{children}</Container>
    </>
  )
}

export default Layout
