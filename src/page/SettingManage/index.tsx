import React, { useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { Typography, Grid, Button, Stack, SxProps } from '@mui/material'
import image from '~/assets/img/competion-1.jpg'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { blue, green } from '@mui/material/colors'

const Index = (): JSX.Element => {
  return (
    <LayoutAdmin>
      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box sx={cardStyle} className=''>
            <h2
              className='color-primary'
              style={{ margin: '0px', color: '#1565c0' }}
            >
              Giải thưởng
            </h2>
            <p style={{color:"#676767",fontSize:"20px"}}>Quản lý thông tin giải thưởng</p>
            <div>
              <Link to={'/PrizeManage'}>
                <Button variant='contained'>Quản lý</Button>
              </Link>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={cardStyle} className=''>
            <h2
              className='color-primary'
              style={{ margin: '0px', color: '#1565c0' }}
            >
              Loại Giải thưởng
            </h2>
            <p style={{color:"#676767",fontSize:"20px"}}>Thông tin loại giải thưởng</p>
            <div>
              <Link to={'/PrizeTypeManage'}>
                <Button variant='contained'>Quản lý</Button>
              </Link>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={cardStyle} className=''>
            <h2
              className='color-primary'
              style={{ margin: '0px', color: '#1565c0' }}
            >
              Đề thi
            </h2>
            <p style={{color:"#676767",fontSize:"20px"}}>Quản lý thông tin đề thi</p>
            <div>
              <Link to={'/ExamsManage'}>
                <Button variant='contained'>Quản lý</Button>
              </Link>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={cardStyle} className=''>
            <h2
              className='color-primary'
              style={{ margin: '0px', color: '#1565c0' }}
            >
              Khoa
            </h2>
            <p style={{color:"#676767",fontSize:"20px"}}>Quản lý thông tin khoa</p>
            <div>
              <Link to={'/DepartmentManage'}>
                <Button variant='contained'>Quản lý</Button>
              </Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </LayoutAdmin>
  )
}

export default Index

const cardStyle: SxProps = {
  padding: '30px 20px',
  borderRadius: '5px',
  backgroundColor: '#d4ecff',
  mt: 2
}
