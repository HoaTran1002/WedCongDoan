import React, { useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { Typography, Grid, Button, Stack, SxProps } from '@mui/material'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { blue, green } from '@mui/material/colors'

const Index = (): JSX.Element => {
  const Settings =[
    {name:"Giải thưởng",title:"Quản lý thông tin giải thưởng",to:'/PrizeManage'},
    {name:"Loại Giải thưởng",title:"Quản lý thông tin loại giải thưởng",to:'/PrizeTypeManage'},
    {name:"Khoa",title:"Quản lý thông tin Khoa",to:'/DepartmentManage'},
  ]

  return (
    <LayoutAdmin>
      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ m:"0 !important",width:"100% !important" }}>
        {
          Settings.map((r,index:number)=>(
            <Grid key={index} item md={6} xs={12}>
              <Box sx={cardStyle} className=''>
                <h2
                  className='color-primary'
                  style={{ margin: '0px', color: '#1565c0' }}
                >
                  {r.name}
                </h2>
                <p style={{ color: '#676767', fontSize: '20px' }}>
                  {r.title}
                </p>
                <div>
                  <Link to={r.to}>
                    <Button variant='contained'>Quản lý</Button>
                  </Link>
                </div>
              </Box>
            </Grid>
          ))
        }
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
