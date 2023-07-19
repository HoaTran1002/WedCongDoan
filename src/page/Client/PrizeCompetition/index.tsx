import React from 'react'
import Layout from '~/components/layout/Layout'
import {
    Grid,
    Box,
    Typography,
    SxProps,
    Container,
    Button
} from '@mui/material'
const PrizeCompetition = (): JSX.Element => {

    return (
        <>
            <Layout>
                <Container maxWidth={'lg'}>
                    <Grid container spacing={1}>
                        <Grid item md={12} spacing={2}>
                            <Box
                                sx={{
                                    mt:3,
                                    position: "sticky",
                                    top: "58px",
                                    zIndex: "10"
                                }}
                            >
                                <Box
                                    sx={{
                                        fontWeight: "400",
                                        color: "#1565c0",
                                        fontSize: "23px",
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        backgroundColor: "white"
                                    }}
                                >
                                    CÁC GIẢI THƯỞNG HẤP DẪN CÁC CUỘC THI 
                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: "#1565c0",
                                        height: "1px",
                                        borderRadius: "3px"
                                    }}
                                >
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
        </>
    )
}

export default PrizeCompetition