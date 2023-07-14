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
import { getAllCompetitionBlog } from '~/api/CompetitionBlog'
import { getAllBlog } from '~/api/blogApi'
import { getAllUser } from '~/api/userApi'
import useFetch from '~/hook/useFetch'
import { Loader, LoaderBlogMain, LoaderBlogSub } from '~/components/loader'

interface Blog {
  blogId: number,
  blogName: string,
  imgSrc: string,
}


interface CompetitionBlog extends Blog {
  id: number,
  comId: number,
  useId: string,
  postDate: string,
  blog: Blog
}



const Home = (): JSX.Element => {
  const [startIndex, setStartIndex] = React.useState(0);
  const dataPerPage = 4;
  const endIndex = startIndex + dataPerPage;

  const [allUser, callAllUser] = useFetch()
  const [allBlog, callAllBlogs] = useFetch()
  const [allBlogCompetition, callAllBlogCompetition] = useFetch()
  const listUser = allUser?.payload



  React.useEffect((): void => {
    callAllBlogs(getAllBlog)
  }, [allBlog.error])
  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        const data = await getAllUser();
        callAllUser(() => Promise.resolve(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [])


  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        const data = await getAllCompetitionBlog();
        callAllBlogCompetition(() => Promise.resolve(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [])

  const blogs = allBlog.payload || [];
  const itemBlogs = allBlogCompetition.payload || [];

  const itemBlogsCompetition = itemBlogs.map((item: any) => ({
    ...item,
    ...blogs.find((elem: any) => elem.blogId === item.blogId)
  }));
  const totalRows = itemBlogsCompetition.length;
  const visibleRows = itemBlogsCompetition.slice(startIndex, endIndex);
  const handleNext = (): void => {
    setStartIndex(prevIndex => prevIndex + dataPerPage);
  };

  const handlePrevious = (): void => {
    setStartIndex(prevIndex => prevIndex - dataPerPage);
  };

  const getUserName = (userId: string): string => {
    const user = listUser?.find((r: any) => r.userId === userId)
    return user?.userName
  }

  const formatDay = (dayOrigin: string): string => {
    const dateObj = new Date(dayOrigin);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month.toString().padStart(2, "0")} / ${day.toString().padStart(2, "0")} / ${year}`;
  }

  return (

    <Layout>
      <Box
        className='carousel-wrapper'
        sx={{
          display: { xs: 'none', md: 'block' }
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
                <Box component='span' className='title-home-page_heading'>
                  ĐẠI HỘI CÔNG ĐOÀN CÁC CẤP TIẾN TỚI ĐẠI HỘI CÔNG ĐOÀN XII CÔNG ĐOÀN THÀNH PHỐ HỒ CHÍ MINH
                </Box>
                <span className='line'></span>
              </Box>
              <Grid container sx={{ marginTop: '20px' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                  allBlog.loading || allBlogCompetition.loading ?
                    (
                      itemBlogsCompetition.map((row: any, index: any) => (
                        <Grid key={index} item xs={12} md={6}>
                          <LoaderBlogMain key='load' />
                        </Grid>
                      ))
                    ) :
                    (
                      itemBlogsCompetition.map((row: any, index: any) => (
                        <Grid key={index} item xs={12} md={6}>
                          <Box sx={styleBlogWarp}>
                            <Box
                              sx={{
                                position: 'relative',
                                height: "170px"
                              }}
                            >
                              <img
                                src={`data:image/jpeg;base64,${row.imgSrc}`}
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
                                to={`/HomeBlogDetail?id=${row.blogId}`}
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
                                  Ngày đăng: <span style={{ color: 'black', fontSize: '16px' }}>{formatDay(row.postDate)}</span>
                                </span>
                                <span style={{ display: 'block', fontSize: '13px', color: '#999' }}>
                                  Tác giả:
                                  <span style={{ color: 'black', fontSize: '16px' }}>
                                    {getUserName(row.userId)}
                                  </span>
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      ))
                    )
                }
              </Grid>
            </Grid >
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
                {
                  allBlog.loading || allBlogCompetition.loading ?
                    (
                      visibleRows.map((row: any, index: any) => (
                        <Grid key={index} item xs={12}>
                          <LoaderBlogSub />
                        </Grid>
                      ))
                    ) :
                    (
                      visibleRows.map((row: any, index: any) => (
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
                                src={`data:image/jpeg;base64,${row.imgSrc}`}
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
                                  gap: '10px',
                                  color: "#999"
                                }}
                              >
                                <span>
                                  {getUserName(row.userId)}
                                </span>
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  <AccessTimeFilledIcon sx={{ fontSize: "14px" }} />&nbsp;
                                  {formatDay(row.postDate)}
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
                      ))
                    )
                }
              </Grid>

              <Box
                sx={{
                  padding: "10px 0",
                  display: "flex",
                  flexDirection: "column",
                  mt: "30px"
                }}
              >
                <span className='title-home-page_heading'>
                  CÁC CUỘC THI ĐANG DIỄN RA
                </span>
                <span className='line'></span>
              </Box>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                  allBlog.loading || allBlogCompetition.loading ?
                    (
                      visibleRows.map((row: any, index: any) => (
                        <Grid key={index} item xs={12}>
                          <LoaderBlogSub />
                        </Grid>
                      ))
                    ) :
                    (
                      visibleRows.map((row: any, index: any) => (
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
                                src={`data:image/jpeg;base64,${row.imgSrc}`}
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
                                  gap: '10px',
                                  color: "#999"
                                }}
                              >
                                <span>
                                  {getUserName(row.userId)}
                                </span>
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  <AccessTimeFilledIcon sx={{ fontSize: "14px" }} />&nbsp;
                                  {formatDay(row.postDate)}
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
                      ))
                    )
                }
              </Grid>
            </Grid>
          </Grid>
        </Container >
      </div>
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
    </Layout>
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
