import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import image404 from '~/assets/img/person-working-collaboratively-online.png'
import { Link } from 'react-router-dom'
export default function Error(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#dcf7ff'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: { md: '500px', xs: '100%' },
          height: { md: '400px', xs: 'auto' }
        }}
      >
        <Box
          component='img'
          src={image404}
          alt='not found'
          sx={{
            width: '100%',
            height: '100%'
          }}
        />
        <h2
          className='color-primary'
          style={{
            fontSize: '22px'
          }}
        >
          Nothing here, &nbsp;
          <Link
            className='color-primary'
            style={{
              textDecoration: 'none'
            }}
            to={'/'}
          >
            go to home
          </Link>
        </h2>
      </Box>
    </Box>
  )
}
