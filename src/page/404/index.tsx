import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

export default function Error(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <img
              src='https://www.suntorypepsico.vn/Content/Portal/img/news/page404.png'
              alt='not found'
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
        <Button variant='contained'>Back Home</Button>
      </Container>
    </Box>
  )
}
