import React from 'react'
import styled from 'styled-components'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
import Layout from '~/components/layout/Layout'
import CrownImg from '~/assets/img/icons8-crown-96.png'
import useFetch from '~/hook/useFetch'
import { getAllResult } from '~/api/resultApi'
import { getAllCompUser } from '~/api/CompetitionUser'
import { getAllComp } from '~/api/competitionApi'
import { IResult,ICompetitionUser,ICompetition } from '~/interface/Interface'
import useAuth from '~/hook/useAuth'
import { useNavigate } from 'react-router-dom'
import { formatDay } from '~/utils/dateUtils'
import WatchExam from './WatchExam'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
interface IHistoryList{
    comId:number,
    cuid:number,
    falseAns:number,
    trueAns:number,
    startTimes:string,
    endTimes:string,
    userId:string
}

const HistoryCompetition = ():JSX.Element =>{
    const {profile} = useAuth()
    const navigate = useNavigate();
    const [allResults,callAllResults] = useFetch()
    const [allCompUser,callAllComUser]= useFetch()
    const [allCompetition,callAllCompetition] = useFetch()
    const [openWatchExam,setOpenWatchExam] = React.useState(false)
    const [comIdWatchExam,setComIdWatchExam] = React.useState(0)
    const competitionUserList = allCompUser?.payload?.filter((r:ICompetitionUser)=>r.userId === profile?.userId)

    const mergeHistoryList = allResults?.payload?.reduce((newList:IHistoryList[],curr:IResult)=>{
        const cuid = curr.cuid
        const matching = competitionUserList?.find((item:any) => item.cuid === cuid);
        if (matching) {
            newList.push({ ...curr, ...matching });
        }
        return newList;
    },[])

    const getNameCompetition = (comId:number):string=>{
        const item = allCompetition?.payload?.find((r:ICompetition)=>r.comId === comId);

        return item?.comName
    }
    const formatTime= (timeString:string):string =>{
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime;
    }
    const handleOpenWatchExam =(cuid:number):void=>{
        setComIdWatchExam(cuid)
        setOpenWatchExam(true)
    }
    const handleCloseWatchExam =():void=>{
        setOpenWatchExam(false)
    }
    React.useEffect(()=>{
        localStorage.clear()
    })
    React.useEffect(()=>{
        callAllResults(getAllResult)
    },[])
    React.useEffect(()=>{
        callAllComUser(getAllCompUser)
    },[])
    React.useEffect(()=>{
        callAllCompetition(getAllComp)
    },[])
    return (
        <>
            <Layout>
                <Container maxWidth='xl'>
                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12}>
                            <Box>
                                <h2 className='color-primary'>LỊCH SỬ THAM GIA THI</h2>
                                <Box
                                    sx={{
                                        height:"3px",
                                        backgroundColor:"#1976D2",
                                        width:"100%"
                                    }}
                                ></Box>
                            </Box>
                        </Grid>
                        <Grid container item spacing={1}>
                            {
                                mergeHistoryList?.length === 0?(
                                    <Box 
                                        className='color-primary'
                                        sx={{
                                            fontWeight1:"500",
                                            fontSize:"30px",
                                            display:"flex",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            width:"100%",
                                            mt:5
                                        }}
                                    >
                                        <span>Bạn chưa thi cuộc thi nào</span>
                                    </Box>
                                ):(
                                    mergeHistoryList?.reverse()?.map((row:IHistoryList,index:number)=>(
                                        <Grid key={index} item md={3} xs={12}>
                                            <Box
                                                sx={{
                                                    borderRadius:"5px",
                                                    padding:"8px",
                                                    backgroundColor:"#e0f0ff",
                                                    display:"flex",
                                                    flexDirection:"column",
                                                    gap:"10px"
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor:"white",
                                                        borderRadius:"3px",
                                                        padding:"10px",
                                                        display:"flex",
                                                        flexDirection:"column",
                                                        width:"100%"
                                                    }}
                                                >
                                                    <span>
                                                        Tên cuộc thi: <TitleName>{getNameCompetition(row.comId)}</TitleName>
                                                    </span>
                                                    <span>
                                                        Ngày thi : <TitleName>{formatDay(row.startTimes)}</TitleName>
                                                    </span>
                                                    <span>
                                                        Thời gian bắt đầu : <TitleName>{formatTime(row.startTimes)}</TitleName>
                                                    </span>
                                                    <span>
                                                        Thời gian kết thúc : <TitleName>{formatTime(row.endTimes)}</TitleName>
                                                    </span>
                                                    <span>
                                                        Số câu đúng : <span className='color-primary'>{row.trueAns}</span>
                                                    </span>
                                                    <span>
                                                        số câu sai : <span className='color-primary'>{row.falseAns}</span>
                                                    </span>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        backgroundColor:"white",
                                                        borderRadius:"3px",
                                                        padding:"10px",
                                                        display:"flex",
                                                        flexDirection:'row',
                                                        alignItems:"center",
                                                        justifyContent:"space-evenly",
                                                        gap:"20px"
                                                    }}
                                                >
                                                    <Button 
                                                        onClick={():void=>handleOpenWatchExam(row.cuid)}
                                                        variant='outlined'
                                                    >
                                                        Xem bài thi <RemoveRedEyeOutlinedIcon sx={{ml:1}} />
                                                    </Button>
                                                    <Box
                                                        className='color-primary'
                                                        onClick={():void=>{
                                                            localStorage.setItem('competitionId',JSON.stringify(row.comId))
                                                            navigate(`/ListExamCompetition?id=${row.comId}`)
                                                        }}
                                                        sx={{
                                                            position:"relative",
                                                            fontWeight:"500",
                                                            fontSize:"16px",
                                                            border:"1px solid #1976D2",
                                                            borderRadius:"3px",
                                                            padding:"5px 10px",
                                                            cursor:"pointer"
                                                        }}
                                                    >
                                                        <Box
                                                            src={CrownImg}
                                                            sx={{
                                                                height:"25px",
                                                                position:"absolute",
                                                                top:"-13px",
                                                                left:"-15px",
                                                                transform:"rotate(-45deg)"
                                                            }}
                                                            component='img'
                                                        />
                                                        XẾP HẠNG
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))
                                )
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
            {
                openWatchExam && (
                    <>
                        <WatchExam 
                            cuid={comIdWatchExam}
                            close={handleCloseWatchExam}
                        />
                    </>
                )
            }
        </>
    )
}

export default HistoryCompetition

const TitleName = styled.span`
  font-size: 16px;
  color: #1565c0;
  font-weight: 600;
`
