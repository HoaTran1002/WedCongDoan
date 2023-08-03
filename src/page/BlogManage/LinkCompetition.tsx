import React from 'react'
import {
  Grid,
  Box,
  Typography,
  SxProps,
  Container,
  Button,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { getAllComp } from '~/api/competitionApi'
import { getAllCompUser } from '~/api/CompetitionUser'
import {
  InsertCompetitionBlog,
  getAllCompetitionBlog,
  EditCompetitionBlog,
  DeleteCompetitionBlog
} from '~/api/CompetitionBlog'
import { getAllBlog } from '~/api/blogApi'
import useFetch from '~/hook/useFetch'
import {
  IBlog,
  ICompetition,
  ICompetitionBlogsUser,
  ICompetitionUser
} from '~/interface/Interface'
import MessageAlert from '~/components/MessageAlert'
import useAuth from '~/hook/useAuth'
import { Loader } from '~/components/loader'
interface PropLinkCompetition {
  blogId: number
  close: () => void
}

const LinkCompetition = (props: PropLinkCompetition): JSX.Element => {
  const { profile } = useAuth()
  const [allComps, callAllComps] = useFetch()
  const [allCompsBlogs, callAllCompsBlogs] = useFetch()
  const [allBlog, callAllBlog] = useFetch()
  const [allInserCompetitionBlog, callInserCompetitionBlog] = useFetch()
  const [editCompetitionBlog, callEditCompetitionBlog] = useFetch()
  const [deleteCompetitionBlog, callDeleteCompetitionBlog] = useFetch()
  const [checkCompetition, setCheckCompetition] = React.useState<boolean>(false)
  const [competitionId, setCompetitionId] = React.useState<number>(0)
  const [message, setMessage] = React.useState<string>('')
  const [severity, setSeverity] = React.useState<string>('')
  const blogs: IBlog[] = allBlog.payload || []
  const itemBlog: IBlog =
    allBlog?.payload?.find((r: IBlog) => r.blogId === props.blogId) || []

  const mergeListCompetition = allComps?.payload?.reduce(
    (newList: ICompetition[], curr: ICompetition) => {
      const idCom = curr.comId
      const check = allCompsBlogs?.payload?.find(
        (r: ICompetitionBlogsUser) => r.comId === idCom
      )
      if (!check) newList.push(curr)
      return newList
    },
    []
  )
  const listBlogNoLink = blogs.reduce((newList: number[], curr: IBlog) => {
    const blogIdCurr = curr.blogId
    if (
      allCompsBlogs?.payload?.find(
        (r: ICompetitionBlogsUser) => r.blogId === blogIdCurr
      ) === undefined
    )
      newList.push(Number(blogIdCurr))
    return newList
  }, [])
  const itemBlogCompetitionHasLink: ICompetitionBlogsUser =
    allCompsBlogs?.payload?.find(
      (r: ICompetitionBlogsUser) => r.blogId === props.blogId
    )
  // console.log(itemBlogCompetitionHasLink);
  const handleChangeComId = (comIdNew: number): void => {
    if (competitionId === comIdNew) {
      setCheckCompetition(false)
    } else {
      setCheckCompetition(true)
    }
    setCompetitionId(comIdNew)
  }
  const getCompetitionName = (comId: number): string => {
    const comp: ICompetition = allComps?.payload?.find(
      (r: ICompetition) => r.comId === comId
    )
    return comp?.comName
  }
  const handelAddCompBlogOK = (): void => {
    const requesData: ICompetitionBlogsUser = {
      blogId: props.blogId,
      postDate: new Date().toISOString(),
      userId: profile?.userId,
      comId: competitionId
    }
    try {
      callInserCompetitionBlog(
        async () => await InsertCompetitionBlog(requesData)
      )
      setMessage('Liên kết thành công')
      setSeverity('success')
      props.close()
    } catch (error) {
      console.log(error)
      setMessage('Liên kết không thành công')
      setSeverity('error')
    }
  }
  const handelEditCompBlogOK = (): void => {
    const requesData = {
      id: itemBlogCompetitionHasLink.id,
      blogId: itemBlogCompetitionHasLink.blogId,
      postDate: itemBlogCompetitionHasLink.postDate,
      userId: itemBlogCompetitionHasLink.userId,
      comId: competitionId
    }
    try {
      callEditCompetitionBlog(async () => await EditCompetitionBlog(requesData))
      setMessage('Sửa thành công')
      setSeverity('success')
      props.close()
    } catch (error) {
      console.log(error)
      setMessage('Sửa không thành công')
      setSeverity('error')
    }
  }
  const handelDeleteCompBlogOK = (): void => {
    const request: { _id: number | undefined } = {
      _id: itemBlogCompetitionHasLink?.id
    }
    callDeleteCompetitionBlog(async () => {
      try {
        await DeleteCompetitionBlog(request)
      } catch (error) {
        console.log('thất bại')
      }
    })
    props.close()
  }
  React.useEffect(() => {
    callAllComps(getAllComp)
  }, [])
  React.useEffect(() => {
    callAllCompsBlogs(getAllCompetitionBlog)
  }, [])
  React.useEffect(() => {
    callAllBlog(getAllBlog)
  }, [])
  if (message !== '') {
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }
  return (
    <>
      {message && <MessageAlert message={message} severity={severity} />}
      {allCompsBlogs?.loading && allBlog?.loading && allComps?.loading ? (
        <Loader height='500px' />
      ) : listBlogNoLink.find((r) => r === itemBlog.blogId) !== undefined ? (
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'fixed',
            zIndex: '999 '
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#000',
              opacity: '0.3',
              zIndex: '60'
            }}
            onClick={props.close}
          ></Box>

          <Box
            sx={{
              position: 'absolute',
              backgroundColor: 'white',
              zIndex: '100',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              padding: '10px',
              width: { xs: '90%', md: '60%' },
              borderRadius: '5px'
            }}
          >
            <Box
              component='span'
              sx={{
                display: 'inline-block',
                position: 'absolute',
                right: '0',
                top: '0',
                padding: '10px',
                cursor: 'pointer'
              }}
              onClick={props.close}
            >
              <CloseIcon sx={{ fontSize: '30px', color: '#ff1a1a' }} />
            </Box>
            <h3
              className='color-primary'
              style={{
                textAlign: 'center'
              }}
            >
              LIÊN KẾT
            </h3>
            <Box
              sx={{
                width: '100%'
              }}
            >
              {allBlog?.loading ? (
                <Loader height='500px' />
              ) : (
                <Grid container spacing={1}>
                  <Grid item md={6} xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>
                        Tên blog: &nbsp;
                        <span
                          className='color-primary'
                          style={{ fontWeight: '500' }}
                        >
                          {itemBlog?.blogName}
                        </span>
                      </span>
                      {/* <Box
                            component='img'
                            src={`data:image/jpeg;base64,${itemBlog?.imgSrc}`}
                            sx={{
                              width: '100%',
                              height: '250px',
                              objectFit: 'cover',
                              m: '20px 0'
                            }}
                          /> */}
                    </Box>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box>
                      <h3
                        className='color-primary'
                        style={{ textAlign: 'center', marginTop: '0' }}
                      >
                        Các cuộc thi chưa liên kết
                      </h3>
                    </Box>
                    {
                      <Box
                        sx={{
                          height: '300px',
                          overflowY: 'scroll',
                          padding: '0 5px'
                        }}
                      >
                        {mergeListCompetition?.map(
                          (r: ICompetition, index: number) =>
                            competitionId === r.comId && checkCompetition ? (
                              <Box
                                key={index}
                                sx={{
                                  border: '1px solid #1976d2',
                                  borderRadius: '5px',
                                  padding: '10px',
                                  fontSize: '19px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  color: '#1976d2',
                                  backgroundColor: '#d5eaff',
                                  mb: 1
                                }}
                                onClick={(): void => handleChangeComId(r.comId)}
                              >
                                {r.comName}
                              </Box>
                            ) : (
                              <Box
                                key={index}
                                sx={{
                                  border: '1px solid #1976d2',
                                  borderRadius: '5px',
                                  padding: '10px',
                                  fontSize: '19px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  color: '#777',
                                  mb: 1
                                }}
                                onClick={(): void => {
                                  setCompetitionId(r.comId)
                                  setCheckCompetition(true)
                                }}
                              >
                                {r.comName}
                              </Box>
                            )
                        )}
                      </Box>
                    }
                    <Box
                      sx={{
                        m: '10px 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box
                        component='button'
                        sx={{
                          backgroundColor: '#00b903',
                          color: 'white',
                          width: '100%',
                          fontWeight: '500',
                          fontSize: '20px',
                          border: 'none',
                          padding: '10px 0',
                          cursor: 'pointer',
                          outline: 'none',
                          borderRadius: '5px',
                          '&:disabled': {
                            backgroundColor: '#767676',
                            cursor: 'default'
                          }
                        }}
                        disabled={!checkCompetition}
                        onClick={handelAddCompBlogOK}
                      >
                        Xác nhận liên kết
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'fixed',
            zIndex: '999 '
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#000',
              opacity: '0.3',
              zIndex: '60'
            }}
            onClick={props.close}
          ></Box>

          <Box
            sx={{
              position: 'absolute',
              backgroundColor: 'white',
              zIndex: '100',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              padding: '10px',
              width: { xs: '90%', md: '60%' },
              borderRadius: '5px'
            }}
          >
            <Box
              component='span'
              sx={{
                display: 'inline-block',
                position: 'absolute',
                right: '0',
                top: '0',
                padding: '10px',
                cursor: 'pointer'
              }}
              onClick={props.close}
            >
              <CloseIcon sx={{ fontSize: '30px', color: '#ff1a1a' }} />
            </Box>
            <h3
              className='color-primary'
              style={{
                textAlign: 'center'
              }}
            >
              LIÊN KẾT
            </h3>
            <Box
              sx={{
                width: '100%'
              }}
            >
              <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>
                      Tên blog: &nbsp;
                      <span
                        className='color-primary'
                        style={{ fontWeight: '500' }}
                      >
                        {itemBlog?.blogName}
                      </span>
                    </span>
                    {/* <Box
                          component='img'
                          src={`data:image/jpeg;base64,${itemBlog?.imgSrc}`}
                          sx={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'cover',
                            m: '20px 0'
                          }}
                        /> */}
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box>
                    <h3
                      className='color-primary'
                      style={{ textAlign: 'center', marginTop: '0' }}
                    >
                      Các cuộc thi chưa liên kết
                    </h3>
                  </Box>
                  {
                    <Box
                      sx={{
                        height: '300px',
                        overflowY: 'scroll',
                        padding: '0 5px'
                      }}
                    >
                      <Box
                        sx={{
                          border: '1px solid #009912',
                          borderRadius: '5px',
                          padding: '10px',
                          fontSize: '19px',
                          fontWeight: '500',
                          color: '#009912',
                          backgroundColor: '#d9ffe0',
                          mb: 1,
                          cursor: 'default',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <CheckCircleIcon />
                        {getCompetitionName(itemBlogCompetitionHasLink?.comId)}
                      </Box>
                      {mergeListCompetition?.map(
                        (r: ICompetition, index: number) =>
                          competitionId === r.comId && checkCompetition ? (
                            <Box
                              key={index}
                              sx={{
                                border: '1px solid #1976d2',
                                borderRadius: '5px',
                                padding: '10px',
                                fontSize: '19px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                color: '#1976d2',
                                backgroundColor: '#d5eaff',
                                mb: 1
                              }}
                              onClick={(): void => handleChangeComId(r.comId)}
                            >
                              {r.comName}
                            </Box>
                          ) : (
                            <Box
                              key={index}
                              sx={{
                                border: '1px solid #1976d2',
                                borderRadius: '5px',
                                padding: '10px',
                                fontSize: '19px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                color: '#777',
                                mb: 1
                              }}
                              onClick={(): void => {
                                setCompetitionId(r.comId)
                                setCheckCompetition(true)
                              }}
                            >
                              {r.comName}
                            </Box>
                          )
                      )}
                    </Box>
                  }
                  <Box
                    sx={{
                      m: '10px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      component='button'
                      sx={{
                        backgroundColor: '#00b903',
                        color: 'white',
                        width: '100%',
                        fontWeight: '500',
                        fontSize: '20px',
                        border: 'none',
                        padding: '10px 0',
                        cursor: 'pointer',
                        outline: 'none',
                        '&:disabled': {
                          backgroundColor: '#767676',
                          cursor: 'default'
                        }
                      }}
                      disabled={!checkCompetition}
                      onClick={handelEditCompBlogOK}
                    >
                      Sửa liên kết
                    </Box>
                    <Box
                      component='button'
                      sx={{
                        backgroundColor: '#c00000',
                        color: 'white',
                        width: '100%',
                        fontWeight: '500',
                        fontSize: '20px',
                        border: 'none',
                        padding: '10px 0',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                      onClick={handelDeleteCompBlogOK}
                    >
                      Xóa liên kết
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default LinkCompetition
