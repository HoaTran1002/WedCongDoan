import React, { useState } from 'react'
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { getAllCompUser } from '~/api/CompetitionUser'
import { getAllQues } from '~/api/question'
import { InsertPickerQuestion } from '~/api/PickerQuestions'
import useFetch from '~/hook/useFetch'
import TimerCount from './timeCounting'
import useAuth from '~/hook/useAuth'
import { getAllComp } from '~/api/competitionApi'
import {InsertResult} from '~/api/resultApi'
interface Question {
    idQues: number,
    contentQues: string,
    typeQues: string,
    AnsOfQues: string
}

const ExamStart = (): JSX.Element => {
    const navigate = useNavigate();
    const { profile } = useAuth();
    // const [getAllComExams,callAllComExams] = useFetch()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get('id')
    const comId = Number(queryParams.get('comId'))
    const [examId, setExamId] = React.useState<number>(Number(id))
    const [getAllQue, callAllQue] = useFetch()
    const [getAllCompUsers, callCompUsers] = useFetch()
    const [getAllIPickerQuestions, callIPickerQuestions] = useFetch()
    const [getAllIResult, callIResult] = useFetch()
    const [getAllComps,callAllComps] = useFetch();
    const [openSubmitExam, setOpenSubmitExam] = React.useState(false)
    const [openExitExam, setOpenExitExam] = React.useState(false)
    const [openNavbar, setOpenNavbar] = React.useState(false)
    const questions = getAllQue?.payload?.filter((r: any) => r.examId === examId)
    const [remainingQuestion, setRemainingQuestion] = useState<any>([])
    const competitionUserId = getAllCompUsers?.payload?.find((r: any) => r.comId === comId && r.userId === profile?.userId)
    const firstElement = questions?.find(() => true);
    const [idQuesExam, setIdQuesExam] = React.useState<number>(0)
    const [examIndex, setExamIndex] = React.useState<number>(1)
    const [quesContain, setQuesContain] = React.useState(firstElement)
    const [questionActive, setQuestionActive] = React.useState<any>([])
    const [pickerQuestion, setPickerQuestion] = React.useState<any>([])
    const [defaultCheck, setDefaultCheck] = React.useState<string>('')
    const [competition,setCompetition] = React.useState<any>([])
    const [change, setChange] = React.useState<boolean>(true)
    const [examTimes,setExamTimes] = React.useState(isNaN(parseInt(competition?.examTimes)) ? 0 : parseInt(competition?.examTimes));
    // localStorage.setItem('ansOfQues', JSON.stringify(newListQuestions))
    // console.log(listNewQuestion,questions)

    // console.log(examTimes)
    // console.log(getAllQue?.payload?.filter((r:any)=>r.examId === examId))

    //===========================================
    const changeQuestion = (id: number, index: number): void => {
        setExamIndex(index + 1)
        const ques = questions?.find((r: any) => r.quesId === id);
        setIdQuesExam(id)
        setQuestionActive(ques)
        console.log(id, ques)
    }
    const handelPrevQues = (id: number, index: number): void => {
        const ques = questions?.find((r: any) => r.quesId === id);
        setQuestionActive(ques)
        setExamIndex(index - 1)
    }
    const handelNextQues = (id: number, index: number): void => {
        const ques = questions?.find((r: any) => r.quesId === id);
        setQuestionActive(ques)
        setExamIndex(index + 1)
    }

    //==================================================
    const handleCloseSubmitExam = (): void => {
        setOpenSubmitExam(false)
    }

    const handleOpenSubmitExam = (): void => {
        setOpenSubmitExam(true)
    }



    const handleOKSubmitExam = (): void => {
        const endTime = new Date().toISOString();
        const beginTime = localStorage.getItem('beginTime')
        const localStorageData = localStorage.getItem('ansOfQues');
        const ansOfQues = localStorageData ? JSON.parse(localStorageData) : [];
        const mergedArr = [...ansOfQues, ...questions].filter(
            (item) =>
                !ansOfQues.some((x:any) => x.quesId === item.quesId) ||
                !questions.some((x:any) => x.quesId === item.quesId)
        );
        console.log(mergedArr)
        if(mergedArr.length !== 0){
            console.log('thiếu câu hỏi')
            setRemainingQuestion(mergedArr)
        }else{
            console.log(ansOfQues,questions);
            // localStorage.removeItem('ansOfQues')
            // callIPickerQuestions(async () => {
            //     try {
            //         for (const item of ansOfQues) {
            //             await InsertPickerQuestion({
            //                 quesId: item.quesId,
            //                 cuid: competitionUserId?.cuid,
            //                 answer: item.answer,
            //             });
            //         }
            //         console.log('Thành công');
            //     } catch (error) {
            //         console.log(error);
            //     }
            // })

            const trueAnswer = ansOfQues.reduce((count:number,curr:any)=>{
                const itemQues = questions.find((r:any)=>r.quesId === curr.quesId)
                if(curr.answer === itemQues.trueAnswer) count++
                return count;
            },0)

            const falseAnswer = ansOfQues.reduce((count:number,curr:any)=>{
                const itemQues = questions.find((r:any)=>r.quesId === curr.quesId)
                if(curr.answer !== itemQues.trueAnswer) count++
                return count;
            },0)

            callIResult(async () => {
                try {
                    await InsertResult({
                        cuid:competitionUserId?.cuid,
                        endTimes:String(endTime),
                        startTimes:String(beginTime),
                        falseAns:falseAnswer,
                        trueAns:trueAnswer
                    });
                }catch (error) {
                    console.log(error);
                }
            }
            )
            // console.log(trueAnswer,falseAnswer,beginTime,endTime,competitionUserId?.cuid)

            // navigate('/FinishedExam')
        }
        setOpenSubmitExam(false)
    }

    const handleCloseExitExam = (): void => {
        setOpenExitExam(false)
    }

    const handleOpenExitExam = (): void => {
        setOpenExitExam(true)
    }

    const handleOKExitExam = (): void => {
        setOpenExitExam(false)
        navigate(`/ListExamCompetition?id=${comId}`)
    }

    //=======================================
    const handelCloseNavbar = (): void => {
        setOpenNavbar(false)
    }
    const handelOpenNavbar = (): void => {
        setOpenNavbar(true)
    }
    //=======================================
    const handleChangeAnswerQuestion = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const ansOfQuesString = localStorage.getItem('ansOfQues');
        const ansOfQues = ansOfQuesString ? JSON.parse(ansOfQuesString) : [];
        const index = ansOfQues?.findIndex((r: any) => r.quesId === idQuesExam);
        const mergedArr = [...ansOfQues, ...questions].filter(
            (item) =>
                !ansOfQues.some((x:any) => x.quesId === item.quesId) ||
                !questions.some((x:any) => x.quesId === item.quesId)
        );
        console.log(ansOfQues, index, idQuesExam)
        if (ansOfQues.find((r: any) => r.quesId === idQuesExam) !== undefined || index !== -1) {
            ansOfQues[index] = {
                quesId: idQuesExam,
                answer: event.target.value
            }
            // console.log('trùng')
        } else {
            ansOfQues.push({
                quesId: idQuesExam,
                answer: event.target.value,
            })
            // console.log('không trùng')
        }
        if(mergedArr.length !== 0){
            setRemainingQuestion(mergedArr)
        }
        console.log(remainingQuestion)
        localStorage.setItem('ansOfQues', JSON.stringify(ansOfQues))
        setChange(r => !r)
    }

    React.useEffect(()=>{
        setExamTimes(isNaN(parseInt(competition?.examTimes)) ? 0 : parseInt(competition?.examTimes))
    },[competition])
    // console.log(competition)
    // React.useEffect(() => {
    //     setQuesContain(listQuestion.find(r=>r.idQues === quesitionCheck))
    // }, [quesitionCheck]);
    // React.useEffect(()=>{
    //     callAllComExams(getAllCompExam)
    // })



    React.useEffect(() => {
        // console.log(questions)
        setQuestionActive(firstElement)
        setIdQuesExam(firstElement?.quesId)
        // localStorage.setItem('ansOfQues',JSON.stringify(questions))
    }, [getAllQue?.loading])
    React.useEffect(() => {
        callCompUsers(getAllCompUser)
    }, []);
    React.useEffect(() => {
        callAllQue(getAllQues)
    }, []);
    React.useEffect(() => {
        const ansOfQuesString = localStorage.getItem('ansOfQues');
        const ansOfQues = ansOfQuesString ? JSON.parse(ansOfQuesString) : [];
        const itemPicker = ansOfQues.find((r: any) => r.quesId === idQuesExam);
        if (itemPicker) {
            setDefaultCheck(itemPicker.answer.trim());
        } else {
            setDefaultCheck('');
        }
        setPickerQuestion(ansOfQues);
        // console.log(ansOfQues, idQuesExam, itemPicker, defaultCheck);
    }, [idQuesExam, change]);
    React.useEffect(() => {
        if(!localStorage.getItem('beginTime')){
            localStorage.setItem('beginTime', new Date().toISOString());
        }
        callAllComps(getAllComp);    
    }, [])
    React.useEffect(() => {
        setCompetition(getAllComps?.payload?.find((r:any)=>r.comId === comId))
    }, [getAllComps?.payload])
    // const competition = getAllComps?.payload?.find((r:any)=>r.comId === comId);
    // console.log(competition)
     // React.useEffect(()=>{
    //     const ansOfQuesString = localStorage.getItem('ansOfQues');
    //     const ansOfQues = ansOfQuesString ? JSON.parse(ansOfQuesString) : [];
    //     console.log(ansOfQues)
    //     setPickerQuestion(ansOfQues)
    // },[])
    // React.useEffect(()=>{
    //     localStorage.setItem('ansOfQues', JSON.stringify([]));
    // },[])
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: '10px',
                    backgroundColor: "#e1eef4"
                }}
            >
                <Box
                    sx={{
                        display: { xs: 'flex', md: "none" },
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onClick={handelOpenNavbar}
                >
                    <MenuIcon className='color-primary' sx={{ fontSize: "30px" }} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "50px"
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "none", md: "block" },
                            width: "100%",
                            flex: "1"
                        }}
                    >
                        <Box>
                            <span
                                style={{
                                    color: "#666",
                                    fontWeight: "600",
                                    fontSize: "17px"
                                }}
                            >
                                Khoa: &nbsp;
                            </span>
                            <span style={{ color: "#1160ba", fontWeight: "600", fontSize: "18px" }}>Công nghệ Thông tin</span>
                        </Box>
                        <Box>
                            <span
                                style={{
                                    color: "#666",
                                    fontWeight: "600",
                                    fontSize: "17px"
                                }}
                            >
                                Cuộc thi: &nbsp;
                            </span>
                            <span style={{ color: "#1160ba", fontWeight: "600", fontSize: "18px" }}>Công nghệ chuyển đổi số</span>
                        </Box>
                        <Box>
                            <span
                                style={{
                                    color: "#666",
                                    fontWeight: "600",
                                    fontSize: "17px"
                                }}
                            >
                                Đề thi: &nbsp;
                            </span>
                            <span style={{ color: "#1160ba", fontWeight: "600", fontSize: "18px" }}>1</span>
                        </Box>

                    </Box>
                    {
                        ( examTimes !== 0)?(
                            <>
                                <TimerCount examTimes={examTimes} />
                            </>
                        ):
                        (
                            <TimerCount examTimes={0} />
                        )
                    }
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: '10px', md: "20px" },
                        flexDirection: 'row',
                        mr: { xs: 0, md: 5 }
                    }}
                >
                    <Button variant='contained' onClick={handleOpenSubmitExam}>Nộp bài</Button>
                    <Button variant='outlined' onClick={handleOpenExitExam}>Thoát</Button>
                </Box>
            </Box>
            <Box
                className={`${openNavbar ? 'active_open_navbar_mobile_Exam' : ''}`}
                sx={navbarMoblie}
            >
                <Box
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        padding: "10px"
                    }}
                    onClick={handelCloseNavbar}
                >
                    <CloseIcon sx={{ color: "red", fontSize: "30px" }} />
                </Box>
                <Box
                    sx={{
                        mt: 6
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#e0f6ff",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            borderRadius: "5px",
                            padding: "10px",
                            gap: "10px",
                            height: "70vh"
                        }}
                    >
                        <Box
                            component='span'
                            sx={{
                                display: "block",
                                color: "#1565c0",
                                fontSize: "19px",
                                fontWeight: "600"
                            }}
                        >
                            Số câu hỏi
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "5px",
                                width: "100%",
                                height: "100%",
                                padding: "8px",
                                display: "flex",
                                alignItems: "flex-start",
                                alignContent: "flex-start",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                                gap: '15px',
                                overflowY: "scroll"
                            }}
                        >
                            {
                                questions?.map((row: any, index: any) => (

                                    <Box
                                        key={index}
                                        className={index + 1 === examIndex ? 'button-exam-ques-active' : ''}
                                        component='button'
                                        onClick={(): void => changeQuestion(row.quesId, index)}
                                        sx={{
                                            borderRadius: "5px",
                                            border: remainingQuestion.some((x:any)=>x.quesId === row.quesId)?"2px solid red":"2px solid #1565c0",
                                            backgroundColor:remainingQuestion.some((x:any)=>x.quesId === row.quesId)?'#ffebeb':'#e0f6ff',
                                            fontSize: "16px",
                                            width: "40px",
                                            height: "40px",
                                            color: remainingQuestion.some((x:any)=>x.quesId === row.quesId)?'red':'#1565c0',
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                            
                                        }}
                                    >
                                        {index + 1}
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            padding: '10px'
                        }}
                    >
                        <Box>
                            <span
                                style={{
                                    color: "#666",
                                    fontWeight: "600",
                                    fontSize: "17px"
                                }}
                            >
                                Khoa: &nbsp;
                            </span>
                            <span style={{ color: "#1160ba", fontWeight: "600", fontSize: "18px" }}>Công nghệ Thông tin</span>
                        </Box>
                        <Box>
                            <span
                                style={{
                                    color: "#666",
                                    fontWeight: "600",
                                    fontSize: "17px"
                                }}
                            >
                                Cuộc thi: &nbsp;
                            </span>
                            <span style={{ color: "#1160ba", fontWeight: "600", fontSize: "18px" }}>Công nghệ chuyển đổi số</span>
                        </Box>
                        <Box>
                            <span
                                style={{
                                    color: "#666",
                                    fontWeight: "600",
                                    fontSize: "17px"
                                }}
                            >
                                Đề thi: &nbsp;
                            </span>
                            <span style={{ color: "#1160ba", fontWeight: "600", fontSize: "18px" }}>1</span>
                        </Box>

                    </Box>
                </Box>
            </Box>
            <Container maxWidth={'xl'}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
                        <Box
                            sx={{
                                backgroundColor: "#e0f6ff",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                borderRadius: "5px",
                                padding: "10px",
                                gap: "10px",
                                height: "70vh",
                                overflowY: "scroll",
                                "&::-webkit-scrollbar": {
                                    display: "none"
                                }
                            }}
                        >
                            <Box
                                component='span'
                                sx={{
                                    display: "block",
                                    color: "#1565c0",
                                    fontSize: "19px",
                                    fontWeight: "600"
                                }}
                            >
                                Số câu hỏi
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    padding: "8px",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    alignContent: "flex-start",
                                    justifyContent: "flex-start",
                                    flexWrap: "wrap",
                                    gap: '15px',
                                }}
                            >
                                {
                                    questions?.map((row: any, index: number) => (
                                        <Box
                                            key={index}
                                            className={index + 1 === examIndex ? 'button-exam-ques-active' : ''}
                                            component='button'
                                            onClick={(): void => changeQuestion(row.quesId, index)}
                                            sx={{
                                                borderRadius: "5px",
                                                border: "2px solid #1565c0",
                                                backgroundColor: "#e0f6ff",
                                                fontSize: "16px",
                                                width: "40px",
                                                height: "40px",
                                                color: "#1565c0",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <Box
                            sx={{
                                backgroundColor: "#3f89de",
                                display: "flex",
                                alignItems: "flex-start",
                                flexDirection: "column",
                                borderRadius: "5px",
                                padding: "10px",
                                gap: "10px",
                                height: "80vh"
                            }}
                        >
                            <Box
                                component='div'
                                sx={{
                                    color: "white",
                                    fontWeight: "600",
                                    fontSize: "20px",
                                    lineHeight: "30px",
                                    width:"100%"
                                }}
                            >
                                <span>Câu {examIndex}: {questionActive?.quesDetail}</span>

                                {
                                    remainingQuestion?.find((r:any)=>r.quesId === idQuesExam)?
                                    (
                                        <Box
                                            sx={{
                                                backgroundColor:"#ffebeb",
                                                color:"red",
                                                fontWeight:"500",
                                                width:"100%",
                                                fontSize:"15px",
                                                padding:"2px 10px",
                                                borderRadius:"5px",
                                                
                                            }}
                                        >
                                            Câu hỏi bắt buộc
                                        </Box>
                                    ):(<></>)
                                }
                                
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    position: "relative",
                                    borderRadius: "5px",
                                    width: "100%",
                                    height: "100%",
                                    padding: "15px 30px 70px",
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                {
                                    questionActive?.quesTId === 1 ? (
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="radio-buttons-group"
                                                value={defaultCheck}
                                                onChange={handleChangeAnswerQuestion}
                                            >
                                                {
                                                    questionActive?.ansOfQues.split('<====>').map((row: any, index: number) => (
                                                        <FormControlLabel
                                                            key={index}
                                                            value={row.trim()}
                                                            control={<Radio />}
                                                            label={row}
                                                        />
                                                    ))
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    ) : (
                                        <FormGroup key={quesContain?.quesId}>
                                            {
                                                questionActive?.ansOfQues?.split('<====>').map((row: any, index: number) => (
                                                    <FormControlLabel
                                                        key={index}
                                                        control={<Checkbox />}
                                                        label={row.trim()}
                                                    />
                                                ))
                                            }
                                        </FormGroup>
                                    )
                                }
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: "20px",
                                        right: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "20px"
                                    }}
                                >
                                    <Box
                                        component='button'
                                        disabled={examIndex === 1}
                                        sx={btn_next_prev}
                                        onClick={(): void => handelPrevQues(questions, examIndex)}
                                    >
                                        <KeyboardArrowLeftIcon />
                                    </Box>
                                    <Box
                                        component='button'
                                        sx={{
                                            width: "35px",
                                            height: "35px",
                                            border: "none",
                                            outline: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            color: "#3f89de",
                                            borderRadius: "10px",
                                            backgroundColor: "#e0f6ff"
                                        }}
                                    >
                                        {examIndex}
                                    </Box>
                                    <Box
                                        component='button'
                                        disabled={examIndex === questions?.length}
                                        sx={btn_next_prev}
                                        onClick={(): void => handelNextQues(idQuesExam, examIndex)}
                                    >
                                        <KeyboardArrowRightIcon />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={openSubmitExam}
                onClose={handleCloseSubmitExam}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thông báo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn muốn nộp bài thi của mình ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleOKSubmitExam}>
                        NỘP BÀI
                    </Button>
                    <Button onClick={handleCloseSubmitExam}>THOÁT</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openExitExam}
                onClose={handleCloseExitExam}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Cảnh báo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn đang thoát phòng thi, bài thi của bạn vẫn sẽ tiếp tục <br />
                        Bạn có muốn thoát không ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleOKExitExam}>
                        THOÁT
                    </Button>
                    <Button onClick={handleCloseExitExam}>Ở LẠI</Button>
                </DialogActions>
            </Dialog>
            <Box
                onClick={handelCloseNavbar}
                sx={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    backgroundColor: "black",
                    opacity: "0.3",
                    display: openNavbar ? "block" : "none",
                    transition: "all 0.2s linear"
                }}
            >

            </Box>
        </>
    )
}

export default ExamStart

const btn_next_prev: SxProps = {
    border: "none",
    color: "white",
    backgroundColor: "#3f89de",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    cursor: "pointer",
    padding: "5px 15px",
    '&:disabled': {
        opacity: "0.6"
    }
}

const navbarMoblie: SxProps = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    width: "300px",
    backgroundColor: "white",
    zIndex: "20",
    transition: "all 0.2s linear",
    transform: "translateX(-100%)",
    opacity: "0"
}
