import { Box, Container } from '@mui/material'
import React from 'react'
import BarAppAdmin from '../BarAppAdmin'
import useAuth from '~/hook/useAuth'
type Props = {
  children: string | JSX.Element
}
const LayoutAdmin = ({ children }: Props): JSX.Element => {
  const { widthMin } = useAuth()
  return (
    <>
      <BarAppAdmin />
      <Box
        sx={{
          width:{md:widthMin
            ? 'var(--width-main-content-max)'
            : 'var(--width-main-content-min)',
          xs:"100vw"} ,
          ml:{md: widthMin
            ? 'var(--width-left-navbar-min)'
            : 'var(--width-left-navbar-max)',
          xs:"0"}
        }}
      >
        <Box sx={{ mt: 10, width: '100%' }}>{children}</Box>
      </Box>
    </>
  )
}

export default LayoutAdmin
