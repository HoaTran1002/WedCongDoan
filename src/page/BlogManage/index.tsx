import React, { useState, useEffect } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { Grid, Button, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import useFetch from '~/hook/useFetch'
import { getAllBlog } from '~/api/blogApi'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import styled from 'styled-components'
import { Loader } from '~/components/loader'
import { getAllCompetitionBlog } from '~/api/CompetitionBlog'
import LinkIcon from '@mui/icons-material/Link'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import { IBlog, ICompetitionBlogsUser } from '~/interface/Interface'
import LinkCompetition from './LinkCompetition'
import MessageAlert from '~/components/MessageAlert'
import SearchIcon from '@mui/icons-material/Search';
const Index = (): JSX.Element => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [getBlog, callBlog] = useFetch()
  const [allCompetitionBlog, callAllCompetitionBlogs] = useFetch()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const openFromUrl = queryParams.get('opensucess') === 'true'
  const deleteFromUrl = queryParams.get('deletesucess') === 'true'
  const updateFromUrl = queryParams.get('updatesucess') === 'true'
  const [open, setOpen] = React.useState(openFromUrl)
  const [openDelete, setOpenDelete] = React.useState(deleteFromUrl)
  const [openUpdate, setOpenUpdate] = React.useState(updateFromUrl)
  const [openLinkCompetition, setOpenLinkCompetition] = React.useState(false)
  const [change, setChange] = React.useState<boolean>(false)
  const [blogIdCheck, setBlogIdCheck] = React.useState(0)
  const [listBlog,setListBlog] = React.useState<IBlog[]>([])
  const [blogSearch,setBlogSearch] = React.useState<string>('')
  const listBlogNoLink = listBlog?.reduce((newList: number[], curr: IBlog) => {
    const blogIdCurr = curr.blogId
    if (
      allCompetitionBlog?.payload?.find(
        (r: ICompetitionBlogsUser) => r.blogId === blogIdCurr
      ) === undefined
    )
      newList.push(Number(blogIdCurr))
    return newList
  }, [])
  const productsPerPage = 6
  const totalPages = Math.ceil(listBlog?.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = listBlog?.slice(startIndex, endIndex)
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setCurrentPage(page)
  }
  const handleOpenLinkCom = (blogId: number): void => {
    console.log(blogId)
    setBlogIdCheck(blogId)
    setOpenLinkCompetition(true)
  }
  const handleCloseLinkCom = (): void => {
    setChange((r) => !r)
    setOpenLinkCompetition(false)
  }
  const handleSearch=():void=>{
    setListBlog(
      getBlog?.payload
        ?.filter((item: IBlog) => 
        item.blogName.trim().toLowerCase()?.includes(blogSearch.trim().toLowerCase())
      )
      ?.map((item: IBlog) => ({
        blogId:item.blogId,
        blogName:item.blogName,
        BlogDetail:item.BlogDetail,
        imgSrc:item.imgSrc,
        imgName:item.imgName
      }))
      .reverse()
    )

    setBlogSearch('')
  }
  const handleKeyPressEnter = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };
  React.useEffect(() => {
    callAllCompetitionBlogs(getAllCompetitionBlog)
  }, [change])
  React.useEffect(() => {
    callBlog(getAllBlog)
  }, [change])
  React.useEffect(()=>{
    setListBlog(
      getBlog?.payload
        ?.filter((item: IBlog) => 
        item.blogName.trim().toLowerCase()?.includes(blogSearch.trim().toLowerCase())
      )
      ?.map((item: IBlog) => ({
        blogId:item.blogId,
        blogName:item.blogName,
        BlogDetail:item.BlogDetail,
        imgSrc:item.imgSrc,
        imgName:item.imgName
      }))
      .reverse()
    )
  },[getBlog?.loading])
  return (
    <LayoutAdmin>
      <>
        {getBlog.loading ? (
          <Loader height='500px' />
        ) : (
          <Grid 
            container 
            spacing={{ xs: 2, sm: 2, md: 3 }} 
            sx={{
              backgroundColor: 'white',
              pb: '20px',
              m: '10px 0 0 0 !important',
              pl: '0px !important',
              pt: '0px !important',
              width:"100% !important"}}
            >
            <>
              {openFromUrl && (
                <MessageAlert message='Thêm thành công' severity='success' />
              )}
              {deleteFromUrl && (
                <MessageAlert message='Xóa thành công' severity='success' />
              )}
              {updateFromUrl && (
                <MessageAlert message='Sửa thành công' severity='success' />
              )}
              <Grid item xs={12} style={{ margin: 10 }}>
                    <Box 
                      sx={{
                        backgroundColor:"white",
                        borderRadius:"3px",
                        padding:"10px",
                        display:"flex",
                        alignItems:"center",
                        gap:"30px"
                      }}
                    >
                      <Box
                        sx={{
                          display:"flex",
                          borderBottom:"1px solid #0057c1",
                          gap:"10px"
                        }}
                        onKeyDown={handleKeyPressEnter}
                      >
                        <Box 
                          component='input'
                          value={blogSearch}
                          sx={{
                            fontSize:"18px",
                            border:"none",
                            outline:"none"
                          }}
                          placeholder='Tìm kiếm bài blog'
                          onChange={(e):void=>setBlogSearch(e.target.value)}
                        />
                        <Box
                          onClick={handleSearch}
                        >
                          <SearchIcon/>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display:"inline-flex",
                          alignItems:"center",
                          position:"relative",
                          cursor:"pointer",
                          borderRadius:"3px",
                          transition:"all linear 0.2s",
                        }}
                        onClick={(): void => {
                          navigate('/BlogCreate')
                        }}
                      >
                        <span
                          className='icon-button'
                          style={{
                            transition:"all linear 0.2s",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            backgroundColor:"#007ecd",
                            color:"white",
                            padding:"5px",
                          }}
                        ><AddIcon/></span>
                        <span
                          style={{
                            backgroundColor:"#def5ff",
                            height:"100%",
                            color:"#002fa7",
                            fontWeight:"500",
                            padding:"5px",
                          }}
                        >Thêm trang blog</span>
                        
                      </Box>
                    </Box>
              </Grid>
              {currentProducts?.length === 0 ? (
                <Grid item xs={12} md={12}>
                  <Box
                    className='color-primary'
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '20px',
                      flexDirection: { md: 'row', xs: 'column' }
                    }}
                  >
                    <span style={{ fontWeight: '500', fontSize: '22px' }}>
                      Không có blog nào tại đây
                    </span>
                  </Box>
                </Grid>
              ) : (
                <>
                  {currentProducts?.map((row: any, index: number) => (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      key={index}
                      sx={{
                        marginTop: '10px'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          position: 'relative',
                          flexDirection: 'column',
                          width: '100%',
                          borderRadius: '5px',
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          sx={{
                            height: '180px',
                            flex: 'none',
                            objectFit: 'cover',
                            cursor: 'pointer'
                          }}
                          onClick={(): void => {
                            navigate(`/BlogDetail?id=${row.blogId}`)
                          }}
                        >
                          <img
                            src={`data:image/jpeg;base64,${row.imgSrc}`}
                            alt={row.imgName}
                            style={{
                              height: '100%',
                              width: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </Box>
                        <div
                          style={{
                            backgroundColor: '#ecf5ff',
                            padding: '10px',
                            width: '100%',
                            position: 'relative'
                          }}
                        >
                          <BlogName
                            onClick={(): void => {
                              navigate(`/BlogDetail?id=${row.blogId}`)
                            }}
                          >
                            {row.blogName}
                          </BlogName>
                          {listBlogNoLink.some((r) => r === row.blogId) ? (
                            <Box
                              sx={{
                                backgroundColor: '#fff2f2',
                                border: '1px solid #e20000',
                                padding: '3px 5px',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '3px',
                                justifyContent: 'space-between',
                                mt: 3
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: '#e20000'
                                }}
                              >
                                <span style={{ fontWeight: '500' }}>
                                  Chưa liên kết cuộc thi{' '}
                                </span>
                                <LinkOffIcon />
                              </Box>
                              <Box
                                sx={{
                                  fontWeight: '500',
                                  color: '#e20000',
                                  cursor: 'pointer'
                                }}
                                onClick={(): void =>
                                  handleOpenLinkCom(row.blogId)
                                }
                              >
                                Liên kết
                              </Box>
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                backgroundColor: '#eeffea',
                                border: '1px solid #098700',
                                padding: '3px 5px',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '3px',
                                justifyContent: 'space-between',
                                mt: 3
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  color: '#098700'
                                }}
                              >
                                <span style={{ fontWeight: '500' }}>
                                  Đã liên kết với cuộc thi{' '}
                                </span>
                                <LinkIcon />
                              </Box>
                              <Box
                                sx={{
                                  fontWeight: '500',
                                  color: '#098700',
                                  cursor: 'pointer'
                                }}
                                onClick={(): void =>
                                  handleOpenLinkCom(row.blogId)
                                }
                              >
                                Xem
                              </Box>
                            </Box>
                          )}
                          {openLinkCompetition && (
                            <LinkCompetition
                              blogId={blogIdCheck}
                              close={handleCloseLinkCom}
                            />
                          )}
                        </div>
                      </Box>
                    </Grid>
                  ))}
                  <Box
                    sx={{
                      padding: '15px 0',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      color='primary'
                      page={currentPage}
                      onChange={handlePageChange}
                    />
                  </Box>
                </>
              )}
            </>
          </Grid>
        )}
      </>
    </LayoutAdmin>
  )
}

export default Index
const BlogName = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-size: 20px;
  line-height: 30px;
  height: 60px;
  margin: 7px 0;
  color: #1565c0;
  vertical-align: middle;
  font-weight: bold;
  cursor: pointer;
`
