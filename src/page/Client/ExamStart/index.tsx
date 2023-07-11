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
interface Question{
    idQues:number,
    contentQues:string,
    typeQues:string,
    AnsOfQues:string
}

const listQuestion: Question[]=[
    {
        idQues: 1,
        contentQues: 'Tôi đi học ngày 12 tháng 5, tôi mấy tuổi?',
        typeQues: 'radio',
        AnsOfQues: '15 tuổi - 21 tuổi - 72 tuổi - 99 tuổi',
      },
      {
        idQues: 2,
        contentQues: 'Hãy cho biết tên địa danh nổi tiếng ở Paris?',
        typeQues: 'radio',
        AnsOfQues: 'Eiffel Tower - Louvre Museum - Champs-Élysées - Notre-Dame Cathedral',
      },
      {
        idQues: 3,
        contentQues: 'Ngôn ngữ chính thức của Brazil là gì?',
        typeQues: 'radio',
        AnsOfQues: 'Tiếng Bồ Đào Nha - Tiếng Tây Ban Nha - Tiếng Pháp - Tiếng Anh',
      },
      {
        idQues: 4,
        contentQues: 'Ai là người đầu tiên bước chân lên Mặt Trăng?',
        typeQues: 'radio',
        AnsOfQues: 'Neil Armstrong - Buzz Aldrin - Michael Collins - Alan Shepard',
      },
      {
        idQues: 5,
        contentQues: 'Thủ đô của Nhật Bản là gì?',
        typeQues: 'radio',
        AnsOfQues: 'Tokyo - Osaka - Kyoto - Hiroshima',
      },
      {
        idQues: 6,
        contentQues: 'Ai là tác giả cuốn tiểu thuyết "Đại gia Gatsby"?',
        typeQues: 'radio',
        AnsOfQues: 'F. Scott Fitzgerald - Ernest Hemingway - Harper Lee - J.R.R. Tolkien',
      },
      {
        idQues: 7,
        contentQues: 'Bộ phim nào là bộ phim đầu tiên trong Vũ trụ Điện ảnh Marvel?',
        typeQues: 'radio',
        AnsOfQues: 'Iron Man - Thor - Captain America: The First Avenger - The Incredible Hulk',
      },
      {
        idQues: 8,
        contentQues: 'Quốc gia nào được biết đến với biệt danh "Đất nước mặt trời mọc"?',
        typeQues: 'radio',
        AnsOfQues: 'Nhật Bản - Hàn Quốc - Trung Quốc - Thái Lan',
      },
      {
        idQues: 9,
        contentQues: 'Ai là vị vua của ngôi trường Iron Throne trong series truyền hình Game of Thrones?',
        typeQues: 'radio',
        AnsOfQues: 'Robert Baratheon - Joffrey Baratheon - Tommen Baratheon - Stannis Baratheon',
      },
      {
        idQues: 10,
        contentQues: 'Điện thoại di động nào được công ty Apple sản xuất?',
        typeQues: 'radio',
        AnsOfQues: 'iPhone - Galaxy - Pixel - Xperia',
      },
      {
        idQues: 11,
        contentQues: 'Loạt phim nào là loạt phim hoàn thành của đạo diễn Christopher Nolan?',
        typeQues: 'radio',
        AnsOfQues: 'The Dark Knight Trilogy - The Matrix Trilogy - The Bourne Trilogy - The Lord of the Rings Trilogy',
      },
      {
        idQues: 12,
        contentQues: 'Ai là người sáng lập công ty Microsoft?',
        typeQues: 'radio',
        AnsOfQues: 'Bill Gates - Steve Jobs - Mark Zuckerberg - Larry Page',
      },
      {
        idQues: 13,
        contentQues: 'Quốc gia nào là chủ nhà của Giải vô địch bóng đá World Cup 2018?',
        typeQues: 'radio',
        AnsOfQues: 'Nga - Pháp - Đức - Brazil',
      },
      {
        idQues: 14,
        contentQues: 'Ai là người thứ 45 giữ chức vụ Tổng thống Hoa Kỳ?',
        typeQues: 'radio',
        AnsOfQues: 'Donald Trump - Joe Biden - Barack Obama - George W. Bush',
      },
      {
        idQues: 15,
        contentQues: 'Quốc gia nào là quê hương của nhà hát La Scala?',
        typeQues: 'radio',
        AnsOfQues: 'Ý - Pháp - Đức - Nga',
      },
      {
        idQues: 16,
        contentQues: 'Tên đầy đủ của tổ chức phi lợi nhuận được viết tắt là "UNICEF" là gì?',
        typeQues: 'radio',
        AnsOfQues: 'Fonds des Nations unies pour l\'enfance - United Nations International Children\'s Emergency Fund - Universal Children\'s Fund - Union for Child Education',
      },
      {
        idQues: 17,
        contentQues: 'Ai là nhà khoa học phát minh ra đèn điện?',
        typeQues: 'radio',
        AnsOfQues: 'Thomas Edison - Alexander Graham Bell - Albert Einstein - Isaac Newton',
      },
      {
        idQues: 18,
        contentQues: 'Quốc gia nào là quê hương của nhà văn người Nga Leo Tolstoy?',
        typeQues: 'radio',
        AnsOfQues: 'Nga - Pháp - Đức - Ý',
      },
      {
        idQues: 19,
        contentQues: 'Ai là tác giả cuốn tiểu thuyết "Harry Potter"?',
        typeQues: 'radio',
        AnsOfQues: 'J.K. Rowling - Stephenie Meyer - Suzanne Collins - George R.R. Martin',
      },
      {
        idQues: 20,
        contentQues: 'Quốc gia nào có diện tích lãnh thổ lớn nhất trên thế giới?',
        typeQues: 'radio',
        AnsOfQues: 'Nga - Trung Quốc - Canada - Mỹ',
      },
      {
        idQues: 21,
        contentQues: 'Các ngôn ngữ lập trình phổ biến là?',
        typeQues: 'checkbox',
        AnsOfQues: 'C++ - Java - Python - JavaScript',
      },
      {
        idQues: 22,
        contentQues: 'Các môn học khoa học gồm?',
        typeQues: 'checkbox',
        AnsOfQues: 'Toán học - Hóa học - Vật lý - Sinh học',
      },
      {
        idQues: 23,
        contentQues: 'Những ngày trong tuần là?',
        typeQues: 'checkbox',
        AnsOfQues: 'Thứ Hai - Thứ Ba - Thứ Tư - Thứ Năm - Thứ Sáu - Thứ Bảy - Chủ Nhật',
      },
      {
        idQues: 24,
        contentQues: 'Những ngôn ngữ lập trình web là?',
        typeQues: 'checkbox',
        AnsOfQues: 'HTML - CSS - JavaScript - PHP - Python',
      },
      {
        idQues: 25,
        contentQues: 'Các môn học xã hội gồm?',
        typeQues: 'checkbox',
        AnsOfQues: 'Lịch sử - Địa lý - Văn học - Khoa học xã hội',
      },
]

const ExamStart = (): JSX.Element => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get('id')
    const [examId, setExamId] = React.useState<number>(Number(id))
    const [openSubmitExam,setOpenSubmitExam] = React.useState(false)
    const [openExitExam,setOpenExitExam] = React.useState(false)
    const [openNavbar,setOpenNavbar] = React.useState(false)
    const [quesitionCheck,setQuesitionCheck] = React.useState<number>(listQuestion[0].idQues)
    const [quesContain,setQuesContain] = React.useState(listQuestion.find(r=>r.idQues === listQuestion[0].idQues))
    const [timeLeft, setTimeLeft] = React.useState<number>(() => {
        const startTime = localStorage.getItem("startTime");
        if (startTime) {
          const timePassed = (Date.now() - Number(startTime)) / 1000;
          const timeRemaining = Math.max(60 * 60 - timePassed, 0);
          return timeRemaining;
        }
        return 60 * 60;
    });

    const formatTime = (time:number):string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
    };

    const changeQuestion= (id:number):void=>{
        setQuesitionCheck(id)
    }

    const handelPrevQues= (id:number):void=>{
        setQuesitionCheck(id - 1)
    }
    const handelNextQues= (id:number):void=>{
        setQuesitionCheck(id + 1)
    }

    const handleCloseSubmitExam =():void=>{
        setOpenSubmitExam(false)
    }

    const handleOpenSubmitExam =():void=>{
        setOpenSubmitExam(true)
    }

    const handleOKSubmitExam =():void=>{
        setOpenSubmitExam(false)
    }

    const handleCloseExitExam =():void=>{
        setOpenExitExam(false)
    }

    const handleOpenExitExam =():void=>{
        setOpenExitExam(true)
    }

    const handleOKExitExam =():void=>{
        setOpenExitExam(false)
        navigate('/ListExamCompetition')
    }
    const handelCloseNavbar=():void=>{
        setOpenNavbar(false)
    }
    const handelOpenNavbar=():void=>{
        setOpenNavbar(true)
    }
    React.useEffect(() => {
        if (!localStorage.getItem("startTime")) {
          localStorage.setItem("startTime", Date.now().toString());
        }
        
        const intervalId = setInterval(() => {
            setTimeLeft((timeLeft) => {
                if (timeLeft === 0) {
                  localStorage.removeItem("startTime");
                  return 0;
                }
                return Math.max(timeLeft - 1, 0);
              });
        }, 1000);
        
        return () => clearInterval(intervalId);
      }, []);

    React.useEffect(() => {
        setQuesContain(listQuestion.find(r=>r.idQues === quesitionCheck))
    }, [quesitionCheck]);
    return (
        <>
            <Box 
                sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                    padding:'10px',
                    backgroundColor:"#e1eef4"
                }}
            >
                <Box
                    sx={{
                        display:{xs:'flex',md:"none"},
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                    onClick={handelOpenNavbar}
                >
                    <MenuIcon className='color-primary' sx={{fontSize:"30px"}}/>
                </Box>
                <Box
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between",
                        gap:"50px"
                    }}
                >
                    <Box 
                        sx={{
                            display:{xs:"none",md:"block"},
                            width:"100%",
                            flex:"1"
                        }}
                    >
                        <Box>
                            <span 
                                style={{
                                    color:"#666",
                                    fontWeight:"600",
                                    fontSize:"17px"
                                }}
                            >
                                Khoa: &nbsp;
                            </span>
                            <span style={{color:"#1160ba",fontWeight:"600",fontSize:"18px"}}>Công nghệ Thông tin</span>
                        </Box>
                        <Box>
                            <span 
                                style={{
                                    color:"#666",
                                    fontWeight:"600",
                                    fontSize:"17px"
                                }}
                            >
                                Cuộc thi: &nbsp;
                            </span>
                            <span style={{color:"#1160ba",fontWeight:"600",fontSize:"18px"}}>Công nghệ chuyển đổi số</span>
                        </Box>
                        <Box>
                            <span 
                                style={{
                                    color:"#666",
                                    fontWeight:"600",
                                    fontSize:"17px"
                                }}
                            >
                                Đề thi: &nbsp;
                            </span>
                            <span style={{color:"#1160ba",fontWeight:"600",fontSize:"18px"}}>1</span>
                        </Box>
                        
                    </Box>
                    <Box>
                        <Box
                            component='span'
                            sx={{
                                display:{xs:"none",md:"inline"},
                                color:"#666",
                                fontWeight:"600",
                                fontSize:"17px"
                            }}
                        >
                            Thời gian còn lại: &nbsp;
                        </Box>
                        <div style={{color:"#1160ba",fontWeight:"600",fontSize:"30px"}}>{formatTime(timeLeft)}</div>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display:"flex",
                        gap:{xs:'10px',md:"20px"},
                        flexDirection:'row',
                        mr:{xs:0,md:5}
                    }}
                >
                    <Button variant='contained' onClick={handleOpenSubmitExam}>Nộp bài</Button>
                    <Button variant='outlined' onClick={handleOpenExitExam}>Thoát</Button>
                </Box>
            </Box>
            <Box
                className={`${openNavbar ? 'active_open_navbar_mobile_Exam':''}`}
                sx={navbarMoblie}
            >
                <Box 
                    sx={{
                        position:"absolute",
                        right:0,
                        top:0,
                        padding:"10px"
                    }}
                    onClick={handelCloseNavbar}
                >
                    <CloseIcon sx={{color:"red",fontSize:"30px"}}/>
                </Box>
                <Box 
                    sx={{
                        mt:6
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor:"#e0f6ff",
                            display:"flex",
                            alignItems:"center",
                            flexDirection:"column",
                            borderRadius:"5px",
                            padding:"10px",
                            gap:"10px",
                            height:"70vh"
                        }}
                    >
                        <Box
                            component='span'
                            sx={{
                                display:"block",
                                color:"#1565c0",
                                fontSize:"19px",
                                fontWeight:"600"
                            }}
                        >
                            Số câu hỏi
                        </Box>
                        <Box
                            sx={{
                                backgroundColor:"white",
                                borderRadius:"5px",
                                width:"100%",
                                height:"100%",
                                padding:"8px",
                                display:"flex",
                                alignItems:"flex-start",
                                alignContent:"flex-start",
                                justifyContent:"space-evenly",
                                flexWrap:"wrap",
                                gap:'15px',
                                overflowY:"scroll"
                            }}
                        >
                            {
                                listQuestion.map((row,index)=>(
                                    <Box
                                        key={index}
                                        className={row.idQues === quesitionCheck ? 'button-exam-ques-active' : ''}
                                        component='button'
                                        onClick={():void=>changeQuestion(row.idQues)}
                                        sx={{
                                            borderRadius:"5px",
                                            border:"2px solid #1565c0",
                                            backgroundColor:"#e0f6ff",
                                            fontSize:"16px",
                                            width:"40px",
                                            height:"40px",
                                            color:"#1565c0",
                                            cursor:"pointer",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}
                                    >
                                        {row.idQues}
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                    <Box 
                        sx={{
                            width:"100%",
                            padding:'10px'
                        }}
                    >
                        <Box>
                            <span 
                                style={{
                                    color:"#666",
                                    fontWeight:"600",
                                    fontSize:"17px"
                                }}
                            >
                                Khoa: &nbsp;
                            </span>
                            <span style={{color:"#1160ba",fontWeight:"600",fontSize:"18px"}}>Công nghệ Thông tin</span>
                        </Box>
                        <Box>
                            <span 
                                style={{
                                    color:"#666",
                                    fontWeight:"600",
                                    fontSize:"17px"
                                }}
                            >
                                Cuộc thi: &nbsp;
                            </span>
                            <span style={{color:"#1160ba",fontWeight:"600",fontSize:"18px"}}>Công nghệ chuyển đổi số</span>
                        </Box>
                        <Box>
                            <span 
                                style={{
                                    color:"#666",
                                    fontWeight:"600",
                                    fontSize:"17px"
                                }}
                            >
                                Đề thi: &nbsp;
                            </span>
                            <span style={{color:"#1160ba",fontWeight:"600",fontSize:"18px"}}>1</span>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
            <Container maxWidth={'xl'}>
                <Grid container spacing={2} sx={{mt:1}}>
                    <Grid item md={3} sx={{display:{xs:"none",md:"block"}}}>
                        <Box
                            sx={{
                                backgroundColor:"#e0f6ff",
                                display:"flex",
                                alignItems:"center",
                                flexDirection:"column",
                                borderRadius:"5px",
                                padding:"10px",
                                gap:"10px",
                                height:"70vh",
                                overflowY:"scroll",
                                "&::-webkit-scrollbar":{
                                    display:"none"
                                }
                            }}
                        >
                            <Box
                                component='span'
                                sx={{
                                    display:"block",
                                    color:"#1565c0",
                                    fontSize:"19px",
                                    fontWeight:"600"
                                }}
                            >
                                Số câu hỏi
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor:"white",
                                    borderRadius:"5px",
                                    width:"100%",
                                    height:"100%",
                                    padding:"8px",
                                    display:"flex",
                                    alignItems:"flex-start",
                                    alignContent:"flex-start",
                                    justifyContent:"space-evenly",
                                    flexWrap:"wrap",
                                    gap:'15px',
                                }}
                            >
                                {
                                    listQuestion.map((row,index)=>(
                                        <Box
                                            key={index}
                                            className={row.idQues === quesitionCheck ? 'button-exam-ques-active' : ''}
                                            component='button'
                                            onClick={():void=>changeQuestion(row.idQues)}
                                            sx={{
                                                borderRadius:"5px",
                                                border:"2px solid #1565c0",
                                                backgroundColor:"#e0f6ff",
                                                fontSize:"16px",
                                                width:"40px",
                                                height:"40px",
                                                color:"#1565c0",
                                                cursor:"pointer",
                                                display:"flex",
                                                alignItems:"center",
                                                justifyContent:"center"
                                            }}
                                        >
                                            {row.idQues}
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <Box
                            sx={{
                                backgroundColor:"#3f89de",
                                display:"flex",
                                alignItems:"flex-start",
                                flexDirection:"column",
                                borderRadius:"5px",
                                padding:"10px",
                                gap:"10px",
                                height:"80vh"
                            }}
                        >
                            <Box
                                component='span'
                                sx={{
                                    color:"white",
                                    fontWeight:"600",
                                    fontSize:"19px",
                                    lineHeight:"30px"
                                }}
                            >
                                Câu {quesContain?.idQues}: {quesContain?.contentQues}
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor:"white",
                                    position:"relative",
                                    borderRadius:"5px",
                                    width:"100%",
                                    height:"100%",
                                    padding:"15px 30px 70px",
                                    display:"flex",
                                    flexDirection:"column"
                                }}
                            >
                                {
                                    quesContain?.typeQues === 'radio'?(
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="radio-buttons-group"
                                            >
                                                {
                                                    quesContain?.AnsOfQues.split('-').map((row,index)=>(
                                                        <FormControlLabel
                                                            key={index}
                                                            value={row}
                                                            control={<Radio />}
                                                            label={row}
                                                        />
                                                    ))
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    ):(
                                        <FormGroup key={quesContain?.idQues}>
                                            {
                                                quesContain?.AnsOfQues.split('-').map((row,index)=>(
                                                    <FormControlLabel
                                                        key={index} 
                                                        control={<Checkbox/>} 
                                                        label={row} 
                                                    />
                                                ))
                                            }
                                        </FormGroup>
                                    )
                                }
                                <Box
                                    sx={{
                                        position:"absolute",
                                        bottom:"20px",
                                        right:"20px",
                                        display:"flex",
                                        alignItems:"center",
                                        gap:"20px"
                                    }}
                                >
                                    <Box
                                        component='button'
                                        disabled={quesitionCheck === listQuestion[0].idQues}
                                        sx={btn_next_prev}
                                        onClick={():void=>handelPrevQues(quesitionCheck)}
                                    >
                                        <KeyboardArrowLeftIcon/> 
                                    </Box>
                                    <Box
                                        component='button'
                                        sx={{
                                            width:"35px",
                                            height:"35px",
                                            border:"none",
                                            outline:"none",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            fontSize:"18px",
                                            fontWeight:"600",
                                            color:"#3f89de",
                                            borderRadius:"10px",
                                            backgroundColor:"#e0f6ff"
                                        }}
                                    >
                                        {quesContain?.idQues}
                                    </Box>
                                    <Box
                                        component='button'
                                        disabled={quesitionCheck === listQuestion.length}
                                        sx={btn_next_prev}
                                        onClick={():void=>handelNextQues(quesitionCheck)}
                                    >
                                        <KeyboardArrowRightIcon/> 
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
                    Bạn đang thoát phòng thi, bài thi của bạn vẫn sẽ tiếp tục <br/>
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
                    position:"fixed",
                    top:0,
                    right:0,
                    left:0,
                    bottom:0,
                    backgroundColor:"black",
                    opacity:"0.3",
                    display: openNavbar ? "block" : "none",
                    transition:"all 0.2s linear"
                }}
            >

            </Box>
        </>
    )
}

export default ExamStart

const btn_next_prev:SxProps={
    border:"none",
    color:"white",
    backgroundColor:"#3f89de",
    borderRadius:"50px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    outline:"none",
    cursor:"pointer",
    padding:"5px 15px",
    '&:disabled':{
        opacity:"0.6"
    }
}

const navbarMoblie:SxProps={
    position:"fixed",
    top:0,
    bottom:0,
    left:0,
    width:"300px",
    backgroundColor:"white",
    zIndex:"20",
    transition:"all 0.2s linear",
    transform:"translateX(-100%)",
    opacity:"0"
}
