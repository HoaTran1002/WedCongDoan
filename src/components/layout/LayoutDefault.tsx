import { Container } from '@mui/material'
import React from 'react'
import BarApp from '../BarApp'

type Props = {
  children: string | JSX.Element
}
const LayoutDefault = ({ children }: Props): JSX.Element => {
  return (
    <>
      <BarApp/>
      {children}
    </>
  )
}

export default LayoutDefault
