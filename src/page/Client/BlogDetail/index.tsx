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
import { Link,useNavigate,useParams } from 'react-router-dom'
import styled from 'styled-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { getAllBlog, getBlogId } from '~/api/blogApi'
import { getAllUser } from '~/api/userApi'
import { getAllCompetitionBlog } from '~/api/CompetitionBlog'
import { Loader,LoaderBlogSub,LoaderBlogDetail } from '~/components/loader'
import useFetch from '~/hook/useFetch'


const Index = (): JSX.Element => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [blogId, setBlogId] = React.useState<number>(Number(id))
    const [blogDetai, setBlogDetai] = useState('')
    const [blogName, setBlogName] = useState('')
    const [imgName, setImgName] = useState('')
    const [imgSrc, setImgSrc] = useState('')
    const [getBlog, callBlogById] = useFetch()
    const [allUser, callAllUser] = useFetch()
    const [getAllBlogs, callAllBlogs] = useFetch()
    const [allBlogCompetition, callAllBlogCompetition] = useFetch()
    console.log(blogId,id)

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
    React.useEffect((): void => {
        callAllBlogs(getAllBlog)
    }, [id])
    

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
    }, [id])
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
    }, [id])
    const listComBlog = allBlogCompetition?.payload;
    const listBlogs = getAllBlogs?.payload;
    const listUser = allUser?.payload
    const comBlog = listComBlog?.find((r: any) => r.blogId === blogId)
    const [startIndex, setStartIndex] = React.useState(0);
    const dataPerPage = 6;
    const endIndex = startIndex + dataPerPage;
    const itemBlogsCompetition = (listComBlog ?? []).map((item: any) => ({
        ...item,
        ...listBlogs?.find((elem: any) => elem.blogId === item.blogId)
    }));
    const visibleRows = itemBlogsCompetition.slice(startIndex, endIndex);
    React.useEffect(() => {
        const request: { id: number } = { id: blogId };
        callBlogById(async () => {
            try {
                const response = await getBlogId(request);
                await setBlogName(response.blogName);
                await setBlogDetai(response.blogDetai);
                await setImgName(response.imgName);
                await setImgSrc(response.imgSrc);
            } catch (error) {
                console.log(error);
            }
        });
    }, [id]);
    React.useEffect(()=>{
        setBlogId(Number(id))
    },[id])
    return (
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
                            {
                                getAllBlogs?.loading ? (
                                    <LoaderBlogDetail/>
                                ):(
                                    <Box
                                        sx={{
                                            backgroundColor: "#e0efff",
                                            padding: "10px"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: 'column',
                                                alignItems: "center",
                                                gap: "20px"
                                            }}
                                        >
                                            <Box
                                                component='img'
                                                src={`data:image/jpeg;base64,${imgSrc}`}
                                                sx={{
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                    maxHeight: "300px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    borderRadius: "10px",
                                                    backgroundColor: "white",
                                                    padding: "10px",
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}
                                            >
                                                <h2 className='color-primary'>{blogName}</h2>
                                                <span>
                                                    Tác giả &nbsp;
                                                    <span
                                                        className='color-primary'
                                                        style={{
                                                            fontWeight: 500,
                                                            fontSize: "17px"
                                                        }}
                                                    >
                                                        {getUserName(comBlog?.userId)}
                                                    </span>
                                                </span>
                                                <span>
                                                    Ngày đăng: &nbsp;
                                                    <span
                                                        className='color-primary'
                                                        style={{
                                                            fontWeight: 500,
                                                            fontSize: "17px"
                                                        }}
                                                    >
                                                        {formatDay(comBlog?.postDate)}
                                                    </span>
                                                </span>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    borderRadius: "10px",
                                                    backgroundColor: "white",
                                                    padding: "10px"
                                                }}
                                            >
                                                <div dangerouslySetInnerHTML={{ __html: blogDetai }} />
                                            </Box>
                                        </Box>
                                    </Box>

                                )
                            }
                        </Grid>
                        <Grid item md={3}>
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
                                    getAllBlogs?.loading ? (
                                        visibleRows.map((row: any, index: any) => (
                                            <Grid key={index} item xs={12}>
                                                <LoaderBlogSub/>
                                            </Grid>
                                        ))
                                    ):(
                                        visibleRows.map((row: any, index: any) => (
                                            <Grid key={index} item xs={12}>
                                                <Box
                                                
                                                    onClick={():void =>{ 
                                                        navigate(`/HomeBlogDetail/${row.blogId}`)
                                                    }}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: '10px',
                                                        cursor:"pointer"
                                                        
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
                                                                <AccessTimeFilledIcon sx={{ fontSize: "14px" }} />
                                                                &nbsp;
                                                                {formatDay(row.postDate)}
                                                            </span>
                                                        </span>
                                                        <Box
                                                            component='span'
                                                            style={{
                                                                textDecoration: "none",
                                                                display: "inline-block",
                                                            }}
                                                        >
                                                            <BlogName>{row.blogName}</ BlogName>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))
                                    )
                                }
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>

            </Layout>
        </>
    )
}

export default Index

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