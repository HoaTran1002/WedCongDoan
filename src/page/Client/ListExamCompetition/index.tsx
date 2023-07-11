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
import { Link, useNavigate } from 'react-router-dom'
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

import { getAllCompExam } from '~/api/competitionExam'
import { getAllExam } from '~/api/exam'
import { getAllComp } from '~/api/competitionApi'
import { getAllDep } from '~/api/departmentApi'
import useFetch from '~/hook/useFetch'
export default function Index(): JSX.Element {
    const navigate = useNavigate();
    const [getAllCompExams, callAllCompExams] = useFetch();
    const [getAllExams, callAllExams] = useFetch();
    const [getAllComps,callAllComps] = useFetch();
    const [getAllDeps,callAllDeps] = useFetch();
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get('id')
    const [comId, setComId] = React.useState<number>(Number(id))
    const [open, setOpen] = React.useState(true);
    const [openExam, setOpenExam] = React.useState(false);

    React.useEffect(() => {
        callAllExams(getAllExam);
    }, [])
    React.useEffect(() => {
        callAllCompExams(getAllCompExam);
    }, [])
    React.useEffect(() => {
        callAllComps(getAllComp);
    }, [])
    React.useEffect(() => {
        callAllDeps(getAllDep);
    }, [])
    

    const competition = getAllComps?.payload?.find((r:any)=>r.comId === comId);
    const listExam = getAllExams?.payload;
    const listComExam = getAllCompExams?.payload?.filter((r: any) => r.comId === comId);
    const listDep = getAllDeps?.payload;
    console.log(competition)
    const getExamName=(id:number):string=>{
        const exam = listExam?.find((r:any)=>r.examId === id)
        return exam.examName || '';
    }

    const getDepName=(id:number):string=>{
        const dep = listDep?.find((r:any)=>r.depId === id)
        return dep?.depName || '';
    }
    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleClickExamOpen = (): void => {
        setOpenExam(true);
    };

    const handleCloseExam = (): void => {
        setOpenExam(false);
    };

    const handleOkExam = (): void => {
        setOpenExam(false)
        navigate('/ExamStart');
    }
    const formatDay = (dayOrigin: string): string => {
        const dateObj = new Date(dayOrigin);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        return `${month.toString().padStart(2, "0")} / ${day.toString().padStart(2, "0")} / ${year}`;
      }
    return (
        <>
            <Layout>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{ mt: 3 }} spacing={1} >
                        <Grid item md={4} xs={12}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: '10px'
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize: "19px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Khoa:
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: "20px",
                                            fontWeight: "600",
                                            color: "#666"
                                        }}
                                    >
                                        {getDepName(competition?.depId)}
                                    </Box>

                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize: "19px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Cuộc thi:
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: "20px",
                                            fontWeight: "600",
                                            color: '#666'
                                        }}
                                    >
                                        {competition?.comName}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize: "19px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Ngày bắt đầu:
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: "20px",
                                            fontWeight: "600",
                                            color: '#666'
                                        }}
                                    >
                                        {formatDay(competition?.startDate)}
                                    </Box>

                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize: "19px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Ngày kết thúc:
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: "20px",
                                            fontWeight: "600",
                                            color: '#666'
                                        }}
                                    >
                                        {formatDay(competition?.endDate)}
                                    </Box>

                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "10px"
                                    }}
                                >
                                    <Box
                                        className='color-primary'
                                        sx={{
                                            fontSize: "19px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Thời gian:
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: "20px",
                                            fontWeight: "600",
                                            color: '#666'
                                        }}
                                    >
                                        {competition?.examTimes} phút
                                    </Box>

                                </Box>
                            </Box>
                        </Grid>

                        <Grid item md={8} xs={12}>
                            <Box
                                sx={{
                                    backgroundColor: "#e0f6ff",
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "5px"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <span
                                        className='color-primary'
                                        style={{
                                            fontSize: "22px",
                                            fontWeight: "600"
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
                                        backgroundColor: "white",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        padding: "10px",
                                        justifyContent:"space-evenly",
                                        gap:'20px'
                                    }}
                                >
                                    {
                                        listComExam?.map((row: any,index:number) => (
                                            <Box
                                                key={index}
                                                component='div'
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    borderRadius: "3px",
                                                    overflow: "hidden",
                                                    width: "120px",
                                                    cursor: "pointer"
                                                }}
                                                onClick={handleClickExamOpen}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: "#e0f6ff",
                                                        padding: "10px"
                                                    }}
                                                >
                                                    <DescriptionOutlinedIcon
                                                        sx={{
                                                            width: '100%',
                                                            height: '100%',
                                                            color: "#1565c0"
                                                        }}
                                                    />
                                                </Box>
                                                <span
                                                    style={{
                                                        color: "white",
                                                        backgroundColor: "#1565c0",
                                                        display: "block",
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    {getExamName(row.examId)}
                                                </span>
                                            </Box>
                                        ))
                                    }

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
                                Khi nhấn vào đề thi xác nhận thi là lúc bắt đầu tính thời gian làm bài<br />
                                Khi hết thời gian làm bài hệ thống sẽ không nhận bất cứ bài thi nào nữa<br />
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