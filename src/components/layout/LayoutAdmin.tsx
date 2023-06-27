import { Box, Container } from '@mui/material'
import React from 'react'
import BarAppAdmin from '../BarAppAdmin'
type Props = {
  children: string | JSX.Element
}
const LayoutAdmin = ({ children }: Props): JSX.Element => {
  return (
    <>
      <BarAppAdmin />
      <Box 
        sx={{
          ml:{xs : '0',md:'250px'},
          backgroundColor:"#e7f0f9",
          height:"100vh"
        }}
      >
        <Container sx={{ mt: 10 }} maxWidth='lg'>
          {children}
        </Container>
      </Box>
    </>
  )
}

export default LayoutAdmin
