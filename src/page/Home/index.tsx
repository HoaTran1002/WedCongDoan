import React from 'react'
import Layout from '~/components/layout/Layout'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '~/assets/img/bg_home_page.jpg'
import image2 from '~/assets/img/bg_home_page_1.jpg'
import image3 from '~/assets/img/bg_home_page_2.png'
import image4 from '~/assets/img/bg_home_page_3.jpg'
import imageItemBlog from '~/assets/img/blog_item_img.jpg'
import { Grid, Box, Typography, SxProps } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function Blogs(
  id: number,
  blogName: string,
  imgName: string,
  imgSrc: string,
  author: string,
  postDay: string
) { return { id, blogName, imgName, imgSrc, author, postDay } }

const row = [
  Blogs(1, 'An toàn thông tin', 'Ảnh thi trắc nghiệm an toàn thông tin', `${imageItemBlog}`, 'Công đoàn', '20-04-2023'),
  Blogs(2, 'Chuyển đổi số IDX', 'Ảnh thi trắc nghiệm an toàn thông tin', `${imageItemBlog}`, 'Công đoàn', '20-04-2023'),
  Blogs(3, 'Tuyên truyền phòng chống ma túy', 'Ảnh thi trắc nghiệm an toàn thông tin', `${imageItemBlog}`, 'Công đoàn', '20-04-2023'),
  Blogs(4, 'Bảo vệ trẻ em khỏi người xấu', 'Ảnh thi trắc nghiệm an toàn thông tin', `${imageItemBlog}`, 'Công đoàn', '20-04-2023'),
  Blogs(5, 'Tôi Yêu Thiên Nhiên sologan Doanh nghiệp xanh ', 'Ảnh thi trắc nghiệm an toàn thông tin', `${imageItemBlog}`, 'Công đoàn', '20-04-2023'),
  Blogs(6, 'Báo Cáo hệ thống chuyên ngành công nghệ thông tin Báo Cáo hệ thống chuyên ngành công nghệ thông tinBáo Cáo hệ thống chuyên ngành công nghệ thông tin ', 'Ảnh thi trắc nghiệm an toàn thông tin', `${imageItemBlog}`, 'Công đoàn', '20-04-2023'),
]
const Home = (): JSX.Element => {
  return (
    <>
      <Layout>
        <div className="carousel-wrapper">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            stopOnHover={false}
            interval={2000}
          >
            <div className='carousel-items-banner'>
              <img src={image1} alt="Image 1" />
            </div>
            <div className='carousel-items-banner'>
              <img src={image2} alt="Image 2" />
            </div>
            <div className='carousel-items-banner'>
              <img src={image3} alt="Image 3" />
            </div>
            <div className='carousel-items-banner'>
              <img src={image4} alt="Image 3" />
            </div>
          </Carousel>
        </div>
        <div className="banner_home_page_info">
          <Grid container sx={{ marginTop: "20px" }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={8}  >
              <Box sx={{ padding: "10px", backgroundColor: "#1976D2" }}>
                <Typography variant="h6" sx={{ color: "white", fontSize: "14px" }}>
                  ĐẠI HỘI CÔNG ĐOÀN CÁC CẤP TIẾN TỚI ĐẠI HỘI CÔNG ĐOÀN XII CÔNG ĐOÀN THÀNH PHỐ HỒ CHÍ MINH
                </Typography>
              </Box>
              <Grid container sx={{ marginTop: "20px" }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {
                row.map((row) => (
                  <Grid  item xs={4}>
                    <Box sx={styleBlogWarp}>
                      <Box sx={{ position: "relative" ,backgroundColor:"black"}}>
                        <img src={row.imgSrc} alt="" style={{ width: "100%" }} />
                        <Author>
                          {row.author}
                        </Author>
                      </Box>
                      <Box sx={{ padding: "10px" }}>
                        <BogName>
                          {row.blogName}
                        </BogName>
                        <span style={{display:"block",fontSize:"13px", color:"#999"}}>Ngày đăng: <span style={{color:"black",fontSize:"16px"}}>{row.postDay}</span> </span>
                        <Link to={'#'} >
                          <Typography sx={linkMore}>
                            Xem thêm <ArrowForwardIcon sx={{fontSize:"16px"}} />
                          </Typography>
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                ))
              }
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ padding: "10px", backgroundColor: "#1976D2" }}>
                <Typography variant="h6" sx={{ color: "white", fontSize: "16px" }}>
                  VĂN BẢN MỚI 
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Layout>
    </> 
  )
}
const Author = styled.span`
  position:absolute;
  background-color:#1976d2;
  top: -10px;
  left: 0px;
  border-radius:50px;
  color:white;
  font-size:12px;
  padding:3px 10px;
  `

const BogName = styled.h2`
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-size:14px;
  height:43px;
`

const styleBlogWarp :SxProps = {
  height:"300px",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between",
  boxShadow:"rgba(0, 0, 0, 0.1) -3px 4px 14px 0px",
  mb:2
}

const linkMore :SxProps={
  fontWeight:"bold",
  fontSize:"15px",
  color:"#1976d2",
  textDecoration:"none",
  display:"flex",
  alignItems:"center",
  gap:"10px",
  justifyContent:"flex-end"
}
export default Home
