import React from 'react'
import Layout from '~/components/layout/Layout'
import ImageMedal from '~/assets/img/medal.png'
import { useNavigate } from 'react-router-dom'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
const FinishedExam =():JSX.Element =>{
    const navigate = useNavigate();
    const handleGoHome =():void=>{
        navigate('/')
    }
    return (
        <>
            <Layout>
                <Container maxWidth={'md'}> 
                    <Grid container spacing={1} sx={{mt:3}}>
                        <Grid item md={4} xs={12}>
                            <Box
                                sx={{
                                    display:"flex",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    flexDirection:"column"
                                }}
                            >
                                <Box 
                                    component='img'
                                    src={ImageMedal}
                                    sx={{
                                        height:"300px"
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Box
                                 sx={{
                                    display:"flex",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    flexDirection:"column"
                                }}
                            >
                                <h1 style={{marginBottom:"0"}} className='color-primary'>Cảm ơn bạn đã tham gia cuộc thi </h1>
                                <Box
                                    component='p'
                                    sx={{

                                    }}
                                >
                                    Bài thi của bạn đã được lưu lại 
                                </Box>
                                <Box 
                                    sx={{
                                        display:"flex",
                                        justifyContent:"center",
                                        gap:"10px",
                                        mt:3
                                    }}
                                >
                                    <Button onClick={handleGoHome}>Trở về trang chủ</Button>
                                    <Button variant='outlined'>Xem lại bài thi</Button>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                </Container>
                
            </Layout>
        </>
    )
}

export default FinishedExam