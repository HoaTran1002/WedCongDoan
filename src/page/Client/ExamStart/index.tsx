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
    const [quesitionCheck,setQuesitionCheck] = React.useState<number>(listQuestion[0].idQues)
    const [quesContain,setQuesContain] = React.useState(listQuestion.find(r=>r.idQues === listQuestion[0].idQues))

    const changeQuestion= (id:number):void=>{
        setQuesitionCheck(id)
    }

    React.useEffect(() => {
        setQuesContain(listQuestion.find(r=>r.idQues === quesitionCheck))
    }, [quesitionCheck]);
    return (
        <>
            <Box 
                sx={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}
            >
                <Box
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between"
                    }}
                >
                    <Box 
                        sx={{
                            width:"100%"
                        }}
                    >
                        <Box>
                            <span>Cuộc thi: &nbsp;</span>
                            <span >Công nghệ chuyển đổi số</span>
                        </Box>
                        <Box>
                            <span>Đề thi: &nbsp;</span>
                            <span >1</span>
                        </Box>
                        
                    </Box>
                    <Box>
                        <span>Thời gian còn lại: &nbsp;</span>
                        <span >90 : 00 </span>
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <Button variant='contained'>Nộp bài</Button>
                        <Button>Thoát</Button>
                    </Box>
                </Box>
            </Box>
            <Container maxWidth={'xl'}>
                <Grid container spacing={2} sx={{mt:3}}>
                    <Grid item md={3}>
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
                    <Grid item md={9}>
                        <Box
                            sx={{
                                backgroundColor:"#1565c0",
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
                                        sx={{

                                        }}
                                    >
                                        <KeyboardArrowLeftIcon/> 
                                    </Box>
                                    <Box
                                        component='button'
                                        sx={{

                                        }}
                                    >
                                        {quesContain?.idQues}
                                    </Box>
                                    <Box
                                        component='button'
                                        sx={{

                                        }}
                                    >
                                        <KeyboardArrowRightIcon/> 
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ExamStart
