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
import { Link,useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
export default function Index(): JSX.Element {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [openExam, setOpenExam] = React.useState(false);

    const handleClickOpen = ():void => {
        setOpen(true);
    };

    const handleClose = ():void => {
        setOpen(false);
    };

    const handleClickExamOpen = ():void => {
        setOpenExam(true);
    };

    const handleCloseExam = ():void => {
        setOpenExam(false);
    };

    const handleOkExam =():void =>{
        setOpenExam(false)
        navigate('/ExamStart');
    }

    return (
        <>
            <Layout>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{ mt: 3 }} spacing={1} >
                        <Grid item md={4} xs={12}>
                            <Box
                                sx={{
                                    display:"flex",
                                    flexDirection:"column",
                                    gap:"10px"
                                }}
                            >
                                <Box 
                                    sx={{
                                        display:"flex",
                                        gap:'10px'
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize:"19px",
                                            fontWeight:"600"
                                        }}
                                    >
                                        Khoa: 
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize:"20px",
                                            fontWeight:"600",
                                            color:"#666"
                                        }}
                                    >
                                        Công nghệ thông tin 
                                    </Box>
                                
                                </Box>
                                <Box 
                                    sx={{
                                        display:"flex",
                                        flexDirection:"column"
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize:"19px",
                                            fontWeight:"600"
                                        }}
                                    >
                                        Cuộc thi: 
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize:"20px",
                                            fontWeight:"600",
                                            color:'#666'
                                        }}
                                    >
                                        Chuyển đổi số công nghệ thông tin 
                                    </Box>
                                </Box>
                                <Box 
                                    sx={{
                                        display:"flex",
                                        flexDirection:"column"
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize:"19px",
                                            fontWeight:"600"
                                        }}
                                    >
                                        Ngày bắt đầu: 
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize:"20px",
                                            fontWeight:"600",
                                            color:'#666'
                                        }}
                                    >
                                        12 / 03 / 2023
                                    </Box>
                                
                                </Box>
                                <Box 
                                    sx={{
                                        display:"flex",
                                        flexDirection:"column"
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize:"19px",
                                            fontWeight:"600"
                                        }}
                                    >
                                        Ngày kết thúc: 
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize:"20px",
                                            fontWeight:"600",
                                            color:'#666'
                                        }}
                                    >
                                        15 / 03/ 2023
                                    </Box>
                                
                                </Box>
                                <Box 
                                    sx={{
                                        display:"flex",
                                        flexDirection:"row",
                                        gap:"10px"
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize:"19px",
                                            fontWeight:"600"
                                        }}
                                    >
                                        Thời gian: 
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize:"20px",
                                            fontWeight:"600",
                                            color:'#666'
                                        }}
                                    >
                                        90 phút
                                    </Box>
                                
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item md={8} xs={12}>
                            <Box
                                sx={{
                                    backgroundColor:"#e0f6ff",
                                    width:"100%",
                                    padding:"8px",
                                    borderRadius:"5px"
                                }}
                            >
                                <Box
                                    sx={{
                                        display:'flex',
                                        alignItems:"center",
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <span
                                        className='color-primary'
                                        style={{
                                            fontSize:"22px",
                                            fontWeight:"600"
                                        }}
                                    >
                                        Đề thi
                                    </span>
                                    <Tooltip title="Quy định thi">
                                        <IconButton onClick={handleClickOpen}>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box 
                                    sx={{
                                        backgroundColor:"white",
                                        display:"flex",
                                        flexWrap:"wrap",
                                        padding:"10px"
                                    }}
                                >
                                    <Box
                                        component='div'
                                        sx={{
                                            display:"flex",
                                            flexDirection:"column",
                                            borderRadius:"3px",
                                            overflow:"hidden",
                                            width:"120px",
                                            cursor:"pointer"
                                        }}
                                        onClick={handleClickExamOpen}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor:"#e0f6ff",
                                                padding:"10px"
                                            }}
                                        >
                                            <DescriptionOutlinedIcon
                                                sx={{ 
                                                    width: '100%',
                                                    height: '100%',
                                                    color:"#1565c0"
                                                }}
                                            />
                                        </Box>
                                        <span
                                            style={{
                                                color:"white",
                                                backgroundColor:"#1565c0",
                                                display:"block",
                                                textAlign:"center"
                                            }}
                                        >
                                            Đề 1
                                        </span>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" className='color-primary'>
                            {"Quy định khi thi "}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Khi nhấn vào đề thi xác nhận thi là lúc bắt đầu tính thời gian làm bài<br/>
                                Khi hết thời gian làm bài hệ thống sẽ không nhận bất cứ bài thi nào nữa<br/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Đã hiểu
                            </Button>
                        </DialogActions>
                    </Dialog>


                    <Dialog
                        open={openExam}
                        onClose={handleCloseExam}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" className='color-primary'>
                            {"Tham gia thi"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                               Bạn muốn tham gia tại đề thi này
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant='contained' onClick={handleOkExam}>
                                Bắt đầu thi
                            </Button>
                            <Button onClick={handleCloseExam}>
                                Trở về
                            </Button>
                        </DialogActions>
                    </Dialog>


                </Container>
            </Layout>
        </>
    )
}