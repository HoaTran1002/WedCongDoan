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
function Blogs(
  id: number,
  blogName: string,
  imgName: string,
  imgSrc: string,
  author: string,
  postDay: string,
  blogDetail: string,
): any { return { id, blogName, imgName, imgSrc, author, postDay, blogDetail } }

const row = [
  Blogs(1, 'An toàn thông tin An toàn thông tin An toàn thông tin An toàn thông tin An toàn thông tin', 'Ảnh thi trắc nghiệm an toàn thông tin', `${imageItemBlog}`, 'Công đoàn', '20-04-2023',
    'loreamsad sajdhfa l akjshdf s hdaskjdh  kajhsgd kj askjhd  akshjd kljashdoiqw   duoasydoqa ouayshd ioasudioasu asoi; duaiosu dasoidyu iouwqs ahdo; oisayhd ioasudf í hasouyhd hoiasyhiod sh oiashid ioaaosihfd oiafhasquoighh absfjib oiashf'),
  Blogs(2, 'Chuyển đổi số IDX', 'Ảnh thi trắc nghiệm an toàn thông tin', `${imageItemBlog}`, 'Công đoàn', '20-04-2023',
    'loreamsad sajdhfa l akjshdf s hdaskjdh  kajhsgd kj askjhd  akshjd kljashdoiqw   duoasydoqa ouayshd ioasudioasu asoi; duaiosu dasoidyu iouwqs ahdo; oisayhd ioasudf í hasouyhd hoiasyhiod sh oiashid ioaaosihfd oiafhasquoighh absfjib oiashf'),
  Blogs(
    3,
    'Tuyên truyền phòng chống ma túy',
    'Ảnh thi trắc nghiệm an toàn thông tin',
    `${imageItemBlog}`,
    'Công đoàn',
    '20-04-2023',
    'loreamsad sajdhfa l akjshdf s hdaskjdh  kajhsgd kj askjhd  akshjd kljashdoiqw   duoasydoqa ouayshd ioasudioasu asoi; duaiosu dasoidyu iouwqs ahdo; oisayhd ioasudf í hasouyhd hoiasyhiod sh oiashid ioaaosihfd oiafhasquoighh absfjib oiashf'
  ),
  Blogs(
    4,
    'Bảo vệ trẻ em khỏi người xấu',
    'Ảnh thi trắc nghiệm an toàn thông tin',
    `${imageItemBlog}`,
    'Công đoàn',
    '20-04-2023',
    'loreamsad sajdhfa l akjshdf s hdaskjdh  kajhsgd kj askjhd  akshjd kljashdoiqw   duoasydoqa ouayshd ioasudioasu asoi; duaiosu dasoidyu iouwqs ahdo; oisayhd ioasudf í hasouyhd hoiasyhiod sh oiashid ioaaosihfd oiafhasquoighh absfjib oiashf'
  ),
  Blogs(
    5,
    'Tôi Yêu Thiên Nhiên sologan Doanh nghiệp xanh ',
    'Ảnh thi trắc nghiệm an toàn thông tin',
    `${imageItemBlog}`,
    'Công đoàn',
    '20-04-2023',
    'loreamsad sajdhfa l akjshdf s hdaskjdh  kajhsgd kj askjhd  akshjd kljashdoiqw   duoasydoqa ouayshd ioasudioasu asoi; duaiosu dasoidyu iouwqs ahdo; oisayhd ioasudf í hasouyhd hoiasyhiod sh oiashid ioaaosihfd oiafhasquoighh absfjib oiashf'
  ),
  Blogs(
    6,
    'Báo Cáo hệ thống chuyên ngành công nghệ thông tin Báo Cáo hệ thống chuyên ngành công nghệ thông tinBáo Cáo hệ thống chuyên ngành công nghệ thông tin ',
    'Ảnh thi trắc nghiệm an toàn thông tin',
    `${imageItemBlog}`,
    'Công đoàn',
    '20-04-2023',
    'loreamsad sajdhfa l akjshdf s hdaskjdh  kajhsgd kj askjhd  akshjd kljashdoiqw   duoasydoqa ouayshd ioasudioasu asoi; duaiosu dasoidyu iouwqs ahdo; oisayhd ioasudf í hasouyhd hoiasyhiod sh oiashid ioaaosihfd oiafhasquoighh absfjib oiashf'
  )
]
const Home = (): JSX.Element => {
  const [startIndex, setStartIndex] = React.useState(0);
  const dataPerPage = 4;
  const endIndex = startIndex + dataPerPage;
  const totalRows = row.length;
  const visibleRows = row.slice(startIndex, endIndex);


  const handleNext = (): void => {
    setStartIndex(prevIndex => prevIndex + dataPerPage);
  };

  const handlePrevious = (): void => {
    setStartIndex(prevIndex => prevIndex - dataPerPage);
  };

  return (
    <>
      <Layout>
        <Box 
          className='carousel-wrapper'
          sx={{
            display:{xs:'none',md:'block'}
          }}
        >
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            stopOnHover={false}
            interval={2000}
          >
            <div className='carousel-items-banner'>
              <img src={image1} alt="Image1" />
            </div>
            <div className='carousel-items-banner'>
              <img src={image2} alt="Image2" />
            </div>
            <div className='carousel-items-banner'>
              <img src={image3} alt="Image3" />
            </div>
            <div className='carousel-items-banner'>
              <img src={image4} alt="Image3" />
            </div>
          </Carousel>
        </Box>
        <div className='banner_home_page_info' >
          <Container maxWidth="lg">
            <Grid
              container
              sx={{ marginTop: '20px' }}
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item md={8} xs={12}>
                <Box
                  sx={{
                    padding: "10px 0",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <span className='title-home-page_heading'>
                    ĐẠI HỘI CÔNG ĐOÀN CÁC CẤP TIẾN TỚI ĐẠI HỘI CÔNG ĐOÀN XII CÔNG ĐOÀN THÀNH PHỐ HỒ CHÍ MINH
                  </span>
                  <span className='line'></span>
                </Box>
                <Grid container sx={{ marginTop: '20px' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {row.map((row, index) => (
                    <Grid key={index} item xs={12} md={6}>
                      <Box sx={styleBlogWarp}>
                        <Box
                          sx={{
                            position: 'relative',
                            height: "170px"
                          }}
                        >
                          <img
                            src={row.imgSrc}
                            alt='img page'
                            style={{
                              width: '100%',
                              height: "100%",
                              objectFit: "cover"
                            }}
                          />
                        </Box>
                        <Box sx={{ padding: '10px' }}>
                          <Link
                            to={'/HomeBlogDetail'}
                            style={{
                              textDecoration: "none",
                              display: "inline-block",

                            }}
                          >
                            <BlogName>{row.blogName}</ BlogName>
                          </Link>
                          <Box
                            sx={{
                              margin: "5px 0"
                            }}
                          >
                            <span style={{ display: 'block', fontSize: '13px', color: '#999' }}>
                              Ngày đăng: <span style={{ color: 'black', fontSize: '16px' }}>{row.postDay}</span>
                            </span>
                            <span style={{ display: 'block', fontSize: '13px', color: '#999' }}>
                              Tác giả:
                              <span style={{ color: 'black', fontSize: '16px' }}>
                                {row.author}
                              </span>
                            </span>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item md={4} xs={12}>
                <Box
                  sx={{
                    padding: '10px',
                    backgroundColor: '#1976D2',
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography variant='h6' sx={{ color: 'white', fontSize: '16px' }}>
                    VĂN BẢN MỚI
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px"
                    }}
                  >
                    <Box
                      onClick={handlePrevious}
                      component='button'
                      disabled={startIndex === 0}
                      sx={buttonPreNext}
                    >
                      <KeyboardArrowLeftIcon />
                    </Box>
                    <Box
                      onClick={handleNext}
                      component='button'
                      disabled={startIndex + dataPerPage >= totalRows}
                      sx={buttonPreNext}
                    >
                      <KeyboardArrowRightIcon />
                    </Box>
                  </Box>
                </Box>
                <Grid container sx={{ marginTop: '20px' }} rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {visibleRows.map((row, index) => (
                    <Grid key={index} item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: '10px'
                        }}
                      >
                        <Box
                          sx={{
                            height: "90px",
                            width: "120px",
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              width: '100%',
                              objectFit: "cover"
                            }}
                            component='img'
                            src={row.imgSrc}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: '20px',
                              color: "#999"
                            }}
                          >
                            <span>
                              {row.author}
                            </span>

                            <span
                              style={{
                                display: "flex",
                                alignItems: "center"
                              }}
                            >
                              <AccessTimeFilledIcon sx={{ fontSize: "14px" }} />&nbsp;{row.postDay}
                            </span>
                          </span>
                          <Link
                            to={'/HomeBlogDetail'}
                            style={{
                              textDecoration: "none",
                              display: "inline-block",

                            }}
                          >
                            <BlogName>{row.blogName}</ BlogName>
                          </Link>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box
                  sx={{
                    padding: "10px 0",
                    display: "flex",
                    flexDirection: "column",
                    mt:"30px"
                  }}
                >
                  <span className='title-home-page_heading'>
                    CÁC CUỘC THI ĐANG DIỄN RA 
                  </span>
                  <span className='line'></span>
                </Box>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {visibleRows.map((row, index) => (
                    <Grid key={index} item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: '10px'
                        }}
                      >
                        <Box
                          sx={{
                            height: "90px",
                            width: "120px",
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              width: '100%',
                              objectFit: "cover"
                            }}
                            component='img'
                            src={row.imgSrc}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: '20px',
                              color: "#999"
                            }}
                          >
                            <span>
                              {row.author}
                            </span>

                            <span
                              style={{
                                display: "flex",
                                alignItems: "center"
                              }}
                            >
                              <AccessTimeFilledIcon sx={{ fontSize: "14px" }} />&nbsp;{row.postDay}
                            </span>
                          </span>
                          <Link
                            to={'#'}
                            style={{
                              textDecoration: "none",
                              display: "inline-block",

                            }}
                          >
                            <BlogName>{row.blogName}</ BlogName>
                          </Link>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Layout>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px"
        }}
      >
        <Button
          href="#"
          sx={{
            backgroundColor: "#d2e6fd",
            color: "#1976d2",
            borderRadius: "50%",
            padding: "0",
            width: "50px",
            height: "50px",
            minWidth: "auto",
            '&:hover': {
              backgroundColor: "#d2e6fd"
            }
          }}
        >
          <KeyboardDoubleArrowUpIcon />
        </Button>
      </div>
    </>
  )
}
const BlogName = styled.h2`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-size:18px;
  line-height: 30px;
  height: 60px;
  margin: 0;
  color:#1976d2;
  vertical-align: middle;
`
const BlogInfo = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-size:15px;
  line-height: 23px;
  height: 69px;
  margin: 0;
  margin-top: 8px;
  text-align: justify;
`
const styleBlogWarp: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  mb: 2,
  gap: "10px",
  transition: "0.1s all linear",
  cursor: "default",
  position: "relative",
  top: 0,
  boxShadow: "rgba(0, 0, 0, 0.1) -3px 4px 14px 0px",
  '&:hover': {
    boxShadow: "rgba(0, 0, 0, 0.3) -3px 4px 14px 0px",
    top: "-2px"
  }
}

const buttonPreNext: SxProps = {
  fontWeight: 'bold',
  fontSize: '15px',
  color: '#1976d2',
  outline: "none",
  border: "none",
  cursor: "pointer"
}

export default Home
