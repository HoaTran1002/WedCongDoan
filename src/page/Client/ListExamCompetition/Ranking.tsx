import React from 'react'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
import medal_1st from '~/assets/img/1st_medal.png'
import medal_2nd from '~/assets/img/2nd_medal.png'
import medal_3rd from '~/assets/img/3rd_medal.png'

interface PropsRanking {
    listuser?: any;
    callback: any;
}
const Ranking = (props: PropsRanking): JSX.Element => {
    return (
        <>
            <Box
                onClick={props.callback}
                sx={{
                    top:0,
                    left:0,
                    right:0,
                    bottom:0,
                    position:"fixed",
                    zIndex:"60"
                }}
            >
                <Box
                    sx={{
                        position:"absolute",
                        top:0,
                        left:0,
                        right:0,
                        bottom:0,
                        background:"#000",
                        opacity:"0.3",
                        zIndex:"60"
                    }}
                >
                </Box>
                
                <Box
                    sx={{
                        position:"absolute",
                        backgroundColor:"white",
                        zIndex:"100",
                        top:"50%",
                        left:"50%",
                        transform:"translate(-50%,-50%)",
                        padding:"10px",
                        width:{xs:'90%',md:"40%"},
                        borderRadius:"5px"

                    }}
                >
                    <h3
                        className='color-primary'
                        style={{
                            textAlign:"center",
                            
                        }}
                    >
                        XẾP HẠNG
                    </h3>
                    <Box
                        sx={{
                            height:"400px",
                            overflowY:"scroll",
                            padding:"0px 5px",
                            '&::-webkit-scrollbar':{
                                display:"none"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                height:"90px",
                                width:"100%",
                                borderRadius:"5px",
                                padding:"10px",
                                border:"3px solid #ffc108",
                                backgroundColor:"#fff6de",
                                position:"relative",
                                overflow:"hidden"
                            }}
                        >
                            <Box
                                component='img'
                                src={medal_1st}
                                sx={{
                                    position:"absolute",
                                    top:"-5px",
                                    left:"0px"
                                }}
                            />
                            <Box
                                className='color-primary'
                                sx={{
                                    textAlign:"center",
                                    fontSize:"20px",
                                    fontWeight:"500"
                                }}
                            >
                                Huỳnh Đăng Khoa
                            </Box>
                            <Box>
                                <span>Thời gian hoàn thành: 15:23 </span>
                                <span>Trả lời đúng : 10 </span>
                                <span>Trả lời sai :20 </span>
                            </Box>
                        </Box>
                    </Box>
                </Box>


            </Box>
        </>
    )
}

export default Ranking 