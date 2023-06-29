import React from 'react'
import Layout from '~/components/layout/Layout'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import image1 from '~/assets/img/bg_home_page.jpg'
import image2 from '~/assets/img/bg_home_page_1.jpg'
import image3 from '~/assets/img/bg_home_page_2.png'
import image4 from '~/assets/img/bg_home_page_3.jpg'
import imageItemBlog from '~/assets/img/blog_item_img.jpg'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const blog = {
    id:1,
    blogName:'Tiêu đề số 1',
    blogDetail:`
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat eum dolorum deserunt quasi dignissimos quaerat distinctio ducimus cupiditate eveniet amet! Necessitatibus accusamus iste at. Praesentium dolores voluptatibus quis. Ipsa, temporibus?
    `,
    imgSrc:`${image1}`,
    author:'Công đoàn ',
    dayPost:'24-03-2023'
}
const Index = (): JSX.Element => {
    return(
        <>
            <Layout>
            <Container maxWidth={'xl'}>
                <Grid 
                    container
                    sx={{ marginTop: '20px' }}
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item md={9}>
                        <Box
                            sx={{
                                backgroundColor:"#e0efff",
                                padding:"10px"
                            }}
                        >
                            <Box
                                sx={{
                                    display:"flex",
                                    flexDirection:'column',
                                    alignItems:"center",
                                    gap:"20px"
                                }}
                            >
                                <Box
                                    component='img'
                                    src={blog.imgSrc}
                                    sx={{
                                        width:"100%",
                                        borderRadius:"5px",
                                        maxHeight:"300px"
                                    }}
                                />
                                <Box 
                                    sx={{
                                        width:"100%",
                                        borderRadius:"10px",
                                        backgroundColor:"white",
                                        padding:"10px"
                                    }}
                                >
                                    <span>Tác giả <span>{blog.author}</span></span>
                                </Box>
                                <Box 
                                    sx={{
                                        width:"100%",
                                        borderRadius:"10px",
                                        backgroundColor:"white",
                                        padding:"10px"
                                    }}
                                >
                                    <p>
                                        {blog.blogDetail}
                                    </p>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <Box
                            sx={{
                                backgroundColor:"#e0efff"
                            }}
                        >
                            ssss
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            </Layout>
        </>
    )
}

export default Index