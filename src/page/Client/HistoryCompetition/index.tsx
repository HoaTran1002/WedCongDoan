import React from 'react'
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
import WatchExam from './WatchExam'

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
    const formatDay = (dayOrigin: string): string => {
        const dateObj = new Date(dayOrigin);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        return `${month.toString().padStart(2, "0")} / ${day.toString().padStart(2, "0")} / ${year}`;
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
                                mergeHistoryList?.map((row:IHistoryList,index:number)=>(
                                    <Grid key={index} item md={4} xs={12}>
                                        <Box
                                            sx={{
                                                borderRadius:"5px",
                                                padding:"8px",
                                                backgroundColor:"#e0f0ff",
                                                display:"flex",
                                                gap:"10px",
                                                flexDirection:{xs:'column',md:'row'}
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor:"white",
                                                    borderRadius:"3px",
                                                    padding:"10px",
                                                    display:"flex",
                                                    flexDirection:"column",
                                                    width:{xs:'100%',md:'70%'}
                                                }}
                                            >
                                                <span>
                                                    Tên cuộc thi: <span className='color-primary'>{getNameCompetition(row.comId)}</span>
                                                </span>
                                                <span>
                                                    Ngày thi : <span className='color-primary'>{formatDay(row.startTimes)}</span>
                                                </span>
                                                <span>
                                                    Thời gian bắt đầu : <span className='color-primary'>{formatTime(row.startTimes)}</span>
                                                </span>
                                                <span>
                                                    Thời gian kết thúc : <span className='color-primary'>{formatTime(row.endTimes)}</span>
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
                                                    flexDirection:{xs:'row',md:'column'},
                                                    alignItems:"center",
                                                    justifyContent:"center",
                                                    gap:"20px"
                                                }}
                                            >
                                                <Button 
                                                    onClick={():void=>handleOpenWatchExam(row.cuid)}
                                                >
                                                    Xem bài thi
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