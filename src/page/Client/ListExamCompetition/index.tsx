import React from 'react'
import Layout from '~/components/layout/Layout'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {
  Grid,
  Box,
  Typography,
  SxProps,
  Container,
  Button
} from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CrownImg from '~/assets/img/icons8-crown-96.png'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import useAuth from '~/hook/useAuth'
import { getAllCompExam } from '~/api/competitionExam'
import { getAllExam } from '~/api/exam'
import { getAllComp } from '~/api/competitionApi'
import { getAllDep } from '~/api/departmentApi'
import { getAllResult } from '~/api/resultApi'
import useFetch from '~/hook/useFetch'
import { getAllCompUser, insertCompUser } from '~/api/CompetitionUser'
import Ranking from './Ranking'
import MessageAlert from '~/components/MessageAlert'
import {
  IResult,
  ICompetition,
  ICompetitionUser,
  ICompetitionExam,
  IDepartment,
  IUser
} from '~/interface/Interface'
import { formatDay } from '~/utils/dateUtils'
interface IUserResult {
  comId: number
  cuid: number
  endTimes: string
  falseAns: number
  resId: number
  startTimes: string
  trueAns: number
  userId: string
}
export default function Index(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = useAuth()
  const [getAllCompExams, callAllCompExams] = useFetch()
  const [getAllExams, callAllExams] = useFetch()
  const [getAllComps, callAllComps] = useFetch()
  const [getAllDeps, callAllDeps] = useFetch()
  const [getAllInsertCompUsers, callAllInsertCompUsers] = useFetch()
  const [getAllCompUsers, callAllCompUsers] = useFetch()
  const [getAllResults, callAllResults] = useFetch()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  const [comId, setComId] = React.useState<number>(Number(id))
  const [open, setOpen] = React.useState(true)
  const [openExam, setOpenExam] = React.useState(false)
  const [hasJoin, setHasJoin] = React.useState(false)
  const [openRank, setOpenRank] = React.useState(false)
  const competition:ICompetition = getAllComps?.payload?.find((r: ICompetition) => r.comId === comId)
  const [message,setMessage] = React.useState('')
  const [openDayBeforeAfter,setOpenDayBeforeAfter]=React.useState(false)
  const listComExam = getAllCompExams?.payload?.filter(
    (r: ICompetitionExam) => r.comId === comId
  )
  const listUserInComp: ICompetitionUser[] = getAllCompUsers?.payload?.filter((r: ICompetitionUser) => r.comId === comId)
  const listUserHasJoinComp = getAllResults?.payload?.reduce((newList: IUserResult[], curr: IResult) => {
      const itemCompUser = listUserInComp?.find((r: ICompetitionUser) => r.cuid === curr.cuid)
      if (itemCompUser !== undefined)
          newList.push({
              ...curr,
              ...itemCompUser
          })
      return newList
  }, [])
  const listDep = getAllDeps?.payload
  const getDepName = (id: number): string => {
    const dep = listDep?.find((r: IDepartment) => r.depId === id)
    return dep?.depName || ''
  }
  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleClickExamOpen = (): void => {
    if(isBeforeDate(competition?.startDate)){
      setMessage('Cuộc thi chưa bắt đầu')
      setOpenDayBeforeAfter(true)
    }else if(!isBeforeDate(competition?.endDate)){
      setMessage('Cuộc thi đã kết thúc')  
      setOpenDayBeforeAfter(true)
    }else{
      const competitionId = localStorage.getItem('competitionId')
      const item = getAllCompUsers?.payload?.find(
        (r: ICompetitionUser) =>
          Number(r.comId) === Number(competitionId) &&
          r.userId === profile?.userId
      )
      const check = getAllResults?.payload?.find(
        (r: IResult) => Number(r?.cuid) === item?.cuid
      )
      if (check === undefined) {
        setOpenExam(true)
      }
    }
  }

  const handleCloseDayBeforeAfter =():void=>{
    setOpenDayBeforeAfter(false)
  }
  const isBeforeDate = (dateInput:string):boolean => {
    const date = new Date(dateInput);
    const currentDate = new Date();
    console.log(date,currentDate)
    if (date > currentDate) {
      return true;
    } else {
      return false;
    }
  };
  const handleCloseExam = (): void => {
    setOpenExam(false)
  }

  const handleWatchRank = (): void => {
    setOpenRank(true)
  }
  const handleExitRank = (): void => {
    setOpenRank(false)
  }
  React.useEffect(() => {
    callAllExams(getAllExam)
  }, [])
  React.useEffect(() => {
    callAllCompExams(getAllCompExam)
  }, [])
  React.useEffect(() => {
    callAllComps(getAllComp)
  }, [])
  React.useEffect(() => {
    callAllDeps(getAllDep)
  }, [])
  React.useEffect(() => {
    callAllCompUsers(getAllCompUser)
  }, [])
  React.useEffect(() => {
    callAllResults(getAllResult)
  }, [])
  React.useEffect(() => {
    const competitionId = localStorage.getItem('competitionId')
    const item = getAllCompUsers?.payload?.find(
      (r: IUser) =>
        Number(r.comId) === Number(competitionId) &&
        r.userId === profile?.userId
    )
    const check = getAllResults?.payload?.find(
      (r: IResult) => Number(r?.cuid) === item?.cuid
    )
    if (check === undefined) setHasJoin(false)
    else setHasJoin(true)
  }, [getAllCompUsers?.loading, getAllResults?.loading])
  React.useEffect(() => {
    const comId = localStorage.getItem('competitionId')
    if (Number(id) !== Number(comId)) {
      navigate('/*')
    }
  }, [location, navigate]) 
  const requestData: {
    comId: number
    userId?: string
  } = {
    comId: comId,
    userId: profile?.userId
  }
  
  const handleOkExam = (): void => {
    setOpenExam(false)
    const randomIndex = Math.floor(Math.random() * listComExam.length)
    const randomElement = listComExam[randomIndex]
    const query = { id: String(randomElement.examId), comId: String(comId) }

    const checked = getAllCompUsers?.payload?.some(
      (r: ICompetitionUser) => r.comId === comId && r.userId === profile?.userId
    )
    if (!checked) {
      callAllInsertCompUsers(async () => {
        try {
          await insertCompUser(requestData)
          console.log('thành công')
        } catch (error) {
          console.log(error)
        }
      })
    }
    localStorage.setItem('examRdId', JSON.stringify(randomElement.examId))
    const queryParams = new URLSearchParams(query).toString()
    navigate(`/ExamStart?${queryParams}`)
  }
  
  function formatTime(dayOrigin: string): string {
    const date = new Date(dayOrigin);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
  return (
    <>
      <Layout>
        <Container maxWidth={'lg'}>
          <Grid container sx={{ mt: 3 }} spacing={1}>
            <Grid item md={4} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '10px'
                  }}
                >
                  <Box
                    className='color-primary'
                    sx={{
                      fontSize: '19px',
                      fontWeight: '600'
                    }}
                  >
                    Khoa:
                  </Box>
                  <Box
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#666'
                    }}
                  >
                    {getDepName(competition?.depId)}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box
                    className='color-primary'
                    sx={{
                      fontSize: '19px',
                      fontWeight: '600'
                    }}
                  >
                    Cuộc thi:
                  </Box>
                  <Box
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#666'
                    }}
                  >
                    {competition?.comName}
                  </Box>
                </Box>
              
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box
                    className='color-primary'
                    sx={{
                      fontSize: '19px',
                      fontWeight: '600'
                    }}
                  >
                    Thời gian bắt đầu:
                  </Box>
                  <Box
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#666'
                    }}
                  >
                    {formatDay(competition?.startDate)} - {formatTime(competition?.startDate)}
                  </Box>
                </Box>
                
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box
                    className='color-primary'
                    sx={{
                      fontSize: '19px',
                      fontWeight: '600'
                    }}
                  >
                    Thời gian kết thúc:
                  </Box>
                  <Box
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#666'
                    }}
                  >
                    {formatDay(competition?.endDate)} - {formatTime(competition?.endDate)}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px'
                  }}
                >
                  <Box
                    className='color-primary'
                    sx={{
                      fontSize: '19px',
                      fontWeight: '600'
                    }}
                  >
                    Thời gian:
                  </Box>
                  <Box
                    sx={{
                      fontSize: '20px',
                      fontWeight: '600',
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
                  backgroundColor: '#e0f6ff',
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    className='color-primary'
                    style={{
                      fontSize: '22px',
                      fontWeight: '600'
                    }}
                  >
                    Quy định
                  </span>
                  <Tooltip title='Quy định thi'>
                    <IconButton onClick={handleClickOpen}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              {
                (listComExam?.length === 0) ?
                  (
                    <Box
                      sx={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        flexDirection:"column"
                      }}
                    >
                      <h2 
                        className='color-primary'
                        style={{
                          padding:"50px 0",
                          textAlign:"center"
                        }}
                      >Hãy đợi thông báo từ ban tổ chức</h2>
                      <Link to={'/ListCompetition'}>
                        <Button variant='outlined'>TRỞ VỀ</Button>
                      </Link>
                    </Box>
                  ) :
                  (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '300px',
                        gap: '30px'
                      }}
                    >
                      {hasJoin ? (
                        <p>Bạn đã tham gia cuộc thi này</p>
                      ) : (
                        <Button onClick={handleClickExamOpen} variant='contained'>
                          VÀO THI
                        </Button>
                      )}

                      <Link to={'/ListCompetition'}>
                        <Button variant='outlined'>TRỞ VỀ</Button>
                      </Link>
                      {hasJoin && (
                        <Box
                          className='color-primary'
                          sx={{
                            position: 'relative',
                            fontWeight: '500',
                            fontSize: '16px',
                            border: '1px solid #1976D2',
                            borderRadius: '3px',
                            padding: '5px 10px',
                            cursor: 'pointer'
                          }}
                          onClick={handleWatchRank}
                        >
                          <Box
                            src={CrownImg}
                            sx={{
                              height: '25px',
                              position: 'absolute',
                              top: '-13px',
                              left: '-15px',
                              transform: 'rotate(-45deg)'
                            }}
                            component='img'
                          />
                          XẾP HẠNG
                        </Box>
                      )}
                    </Box>
                  )

              }

            </Grid>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title' className='color-primary'>
              {'Quy định khi thi '}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Khi nhấn vào đề thi xác nhận thi là lúc bắt đầu tính thời gian
                làm bài
                <br />
                Khi hết thời gian làm bài hệ thống sẽ không nhận bất cứ bài thi
                nào nữa
                <br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Đã hiểu</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDayBeforeAfter}
            onClose={handleCloseDayBeforeAfter}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title' className='color-primary'>
              {'Thông báo'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                <span style={{color:"#000"}}>{message}</span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDayBeforeAfter}>Đã hiểu</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openExam}
            onClose={handleCloseExam}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title' className='color-primary'>
              {'Tham gia thi'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Bạn muốn tham gia cuộc thi này
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' onClick={handleOkExam}>
                Bắt đầu thi
              </Button>
              <Button onClick={handleCloseExam}>Trở về</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Layout>
      {openRank && (
        <>
          <Ranking  callback={handleExitRank} listuser={listUserHasJoinComp} />
        </>
      )}
    </>
  )
}
