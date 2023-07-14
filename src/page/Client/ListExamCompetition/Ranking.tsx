import React from 'react'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'


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
                        width:"40%",
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
                            height:"400px"
                        }}
                    >


                    </Box>
                </Box>


            </Box>
        </>
    )
}

export default Ranking 