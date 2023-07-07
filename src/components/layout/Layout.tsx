import { Container } from '@mui/material'
import React from 'react'
import BarApp from '../BarApp'
import BarAppFooter from '../BarAppFooter'

type Props = {
  children: any | JSX.Element
}
const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <BarApp />
      {children}
      <BarAppFooter/>
    </>
  )
}

export default Layout
