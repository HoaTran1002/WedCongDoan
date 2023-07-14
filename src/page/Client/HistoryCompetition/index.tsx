import React from 'react'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
import Layout from '~/components/layout/Layout'
import CrownImg from '~/assets/img/icons8-crown-96.png'
const HistoryCompetition = ():JSX.Element =>{
    return (
        <>
            <Layout>
                <Container maxWidth='xl'>
                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <Box>
                                <h2 className='color-primary'>LỊCH SỬ THAM GIA THI</h2>
                                <Box
                                    sx={{
                                        height:"3px",
                                        backgroundColor:"#1976D2",
                                        width:"100%"
                                    }}
                                ></Box>
                            </Box>
                        </Grid>
                        <Grid container item spacing={1}>
                            <Grid item md={4}>
                                <Box
                                    sx={{
                                        borderRadius:"5px",
                                        padding:"8px",
                                        backgroundColor:"#e0f0ff",
                                        display:"flex",
                                        gap:"10px"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor:"white",
                                            borderRadius:"3px",
                                            padding:"10px",
                                            display:"flex",
                                            flexDirection:"column",
                                            width:"70%"
                                        }}
                                    >
                                        <span>
                                            Tên cuộc thi: <span className='color-primary'>An toàn chuyển đổi số </span>
                                        </span>
                                        <span>
                                            Ngày thi : <span className='color-primary'>12 / 04 /2023</span>
                                        </span>
                                        <span>
                                            Thời gian bắt đầu : <span className='color-primary'>19:00</span>
                                        </span>
                                        <span>
                                            Thời gian kết thúc : <span className='color-primary'>19:22</span>
                                        </span>
                                        <span>
                                            Số câu đúng : <span className='color-primary'>2</span>
                                        </span>
                                        <span>
                                            số câu sai : <span className='color-primary'>1</span>
                                        </span>
                                    </Box>
                                    <Box
                                        sx={{
                                            backgroundColor:"white",
                                            borderRadius:"3px",
                                            padding:"10px",
                                            display:"flex",
                                            flexDirection:"column",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            gap:"20px"
                                        }}
                                    >
                                        <Button >Xem bài thi</Button>
                                        <Box
                                            className='color-primary'
                                            sx={{
                                                position:"relative",
                                                fontWeight:"500",
                                                fontSize:"16px",
                                                border:"1px solid #1976D2",
                                                borderRadius:"3px",
                                                padding:"5px 10px",
                                                cursor:"pointer"
                                            }}
                                        >
                                            <Box
                                                src={CrownImg}
                                                sx={{
                                                    height:"25px",
                                                    position:"absolute",
                                                    top:"-13px",
                                                    left:"-15px",
                                                    transform:"rotate(-45deg)"
                                                }}
                                                component='img'
                                            />
                                            XẾP HẠNG
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        </>
    )
}

export default HistoryCompetition