import React from 'react'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
import medal_1st from '~/assets/img/1st_medal.png'
import medal_2nd from '~/assets/img/2nd_medal.png'
import medal_3rd from '~/assets/img/3rd_medal.png'
import useFetch from '~/hook/useFetch'
import { getAllUser } from '~/api/userApi'
import { IUser } from '~/interface/Interface'
import { getTimeDifference, getTimeDifferenceSeconds } from '~/utils/dateUtils'
import CloseIcon from '@mui/icons-material/Close';
import useAuth from '~/hook/useAuth'
interface PropsRanking {
    listuser?: any;
    callback: any;
}
export interface IUserResult {
    comId: number
    cuid: number
    endTimes: string
    falseAns: number
    resId: number
    startTimes: string
    trueAns: number
    userId: string
}
const Ranking = (props: PropsRanking): JSX.Element => {
    const [allUsers, callAllUsers] = useFetch()
    const {profile}=useAuth();
    const getNameUserById = (userId: string): string => {
        const user = allUsers?.payload?.find((r: IUser) => r.userId === userId)
        return user?.userName || ''
    }
    
    const newlistUser = props.listuser?.sort((a:IUserResult,b:IUserResult)=>{
        if (a.trueAns !== b.trueAns) {
            return b.trueAns - a.trueAns;
        } else {
        const timeDiffA = getTimeDifferenceSeconds(a.startTimes, a.endTimes);
        const timeDiffB = getTimeDifferenceSeconds(b.startTimes, b.endTimes);
        return timeDiffA - timeDiffB;
        }
    })
    React.useEffect(() => {
        callAllUsers(getAllUser)
    }, [])
    return (
        <>
            <Box
                
                sx={{
                    top:0,
                    left:0,
                    right:0,
                    bottom:0,
                    position:"fixed",
                    zIndex:"60"
                }}
            >
                <Box
                    sx={{
                        position:"absolute",
                        top:0,
                        left:0,
                        right:0,
                        bottom:0,
                        background:"#000",
                        opacity:"0.3",
                        zIndex:"60"
                    }}
                    onClick={props.callback}
                >
                </Box>
                
                <Box
                    sx={{
                        position:"absolute",
                        backgroundColor:"white",
                        zIndex:"100",
                        top:"50%",
                        left:"50%",
                        transform:"translate(-50%,-50%)",
                        padding:"10px",
                        width:{xs:'90%',md:"40%"},
                        borderRadius:"5px"

                    }}
                >
                    <Box
                        component='span'
                        sx={{
                            display: "inline-block",
                            position: "absolute",
                            right: "0",
                            top: "0",
                            padding: "10px",
                            cursor: "pointer"
                        }}
                        onClick={props.callback}
                    >
                        <CloseIcon sx={{ fontSize: "30px", color: "#ff1a1a" }} />
                    </Box>
                    <h3
                        className='color-primary'
                        style={{
                            textAlign:"center",
                            
                        }}
                    >
                        XẾP HẠNG
                    </h3>
                    <Box
                        sx={{
                            height:"400px",
                            overflowY:"scroll",
                            padding:"0px 5px",
                            '&::-webkit-scrollbar':{
                                display:"none"
                            }
                        }}
                    >
                        {
                            newlistUser?.map((r:IUserResult,index:number)=>(
                                index === 0 ?(
                                    <Box
                                        key={index}
                                        sx={{
                                            height:"90px",
                                            width:"100%",
                                            borderRadius:"5px",
                                            padding:"10px",
                                            border:"3px solid #ffc108",
                                            backgroundColor:"#fff6de",
                                            position:"relative",
                                            overflow:"hidden",
                                            mb:3
                                        }}
                                    >
                                        <Box
                                            component='img'
                                            src={medal_1st}
                                            sx={{
                                                position:"absolute",
                                                top:"-5px",
                                                left:"0px"
                                            }}
                                        />
                                        <Box
                                            className='color-primary'
                                            sx={{
                                                textAlign:"center",
                                                fontSize:"20px",
                                                fontWeight:"500"
                                            }}
                                        >
                                            {getNameUserById(r.userId)} 
                                            {profile?.userId === r.userId &&(' (Bạn)')}
                                        </Box>
                                        <Box
                                            sx={{
                                                display:"flex",
                                                gap:"30px",
                                                alignItems:"center",
                                                justifyContent:"center"
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight:"500",
                                                    fontSize:"17px"
                                                }}
                                            >
                                                Thời gian hoàn thành: {`${getTimeDifference(r.startTimes,r.endTimes).hours.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes,r.endTimes).minutes.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes,r.endTimes).seconds.toString().padStart(2, '0')}s`}
                                            </span>
                                            <span>Trả lời đúng : <span style={{fontWeight:"600",color:"green"}}>{r.trueAns}</span> </span>
                                            <span>Trả lời sai :<span style={{fontWeight:"600",color:"red"}}>{r.falseAns}</span> </span>
                                        </Box>
                                    </Box>
                                ):index === 1 ?(
                                    <Box
                                        key={index}
                                        sx={{
                                            height:"90px",
                                            width:"100%",
                                            borderRadius:"5px",
                                            padding:"10px",
                                            border:"3px solid #c3c3c3",
                                            backgroundColor:"#f7f7f7",
                                            position:"relative",
                                            overflow:"hidden",
                                            mb:3
                                        }}
                                    >
                                        <Box
                                            component='img'
                                            src={medal_2nd}
                                            sx={{
                                                position:"absolute",
                                                top:"-5px",
                                                left:"0px"
                                            }}
                                        />
                                        <Box
                                            className='color-primary'
                                            sx={{
                                                textAlign:"center",
                                                fontSize:"20px",
                                                fontWeight:"500"
                                            }}
                                        >
                                            {getNameUserById(r.userId)} 
                                            {profile?.userId === r.userId &&(' (Bạn)')}
                                        </Box>
                                        <Box
                                        sx={{
                                            display:"flex",
                                            gap:"30px",
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight:"500",
                                                    fontSize:"17px"
                                                }}
                                            >
                                                Thời gian hoàn thành: {`${getTimeDifference(r.startTimes,r.endTimes).hours.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes,r.endTimes).minutes.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes,r.endTimes).seconds.toString().padStart(2, '0')}s`}
                                            </span>
                                            <span>Trả lời đúng : <span style={{fontWeight:"600",color:"green"}}>{r.trueAns}</span> </span>
                                            <span>Trả lời sai :<span style={{fontWeight:"600",color:"red"}}>{r.falseAns}</span> </span>
                                        </Box>
                                    </Box>
                                ):index === 2 ?(
                                    <Box
                                        key={index}
                                        sx={{
                                            height:"90px",
                                            width:"100%",
                                            borderRadius:"5px",
                                            padding:"10px",
                                            border:"3px solid #d3852c",
                                            backgroundColor:"#fff0d7",
                                            position:"relative",
                                            overflow:"hidden",
                                            mb:3
                                        }}
                                    >
                                        <Box
                                            component='img'
                                            src={medal_3rd}
                                            sx={{
                                                position:"absolute",
                                                top:"-5px",
                                                left:"0px"
                                            }}
                                        />
                                        <Box
                                            className='color-primary'
                                            sx={{
                                                textAlign:"center",
                                                fontSize:"20px",
                                                fontWeight:"500"
                                            }}
                                        >
                                            {getNameUserById(r.userId)} 
                                            {profile?.userId === r.userId &&(' (Bạn)')}
                                        </Box>
                                        <Box
                                            sx={{
                                                display:"flex",
                                                gap:"30px",
                                                alignItems:"center",
                                                justifyContent:"center"
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight:"500",
                                                    fontSize:"17px"
                                                }}
                                            >
                                                Thời gian hoàn thành: {`${getTimeDifference(r.startTimes,r.endTimes).hours.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes,r.endTimes).minutes.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes,r.endTimes).seconds.toString().padStart(2, '0')}s`}
                                            </span>
                                            <span>Trả lời đúng : <span style={{fontWeight:"600",color:"green"}}>{r.trueAns}</span> </span>
                                            <span>Trả lời sai :<span style={{fontWeight:"600",color:"red"}}>{r.falseAns}</span> </span>
                                        </Box>
                                    </Box>
                                ):(
                                    <Box
                                        key={index}
                                        sx={{
                                            height:"90px",
                                            width:"100%",
                                            borderRadius:"5px",
                                            padding:"10px",
                                            border:"3px solid #3586ff",
                                            backgroundColor:"#e7f4ff",
                                            position:"relative",
                                            overflow:"hidden",
                                            mb:3
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position:"absolute",
                                                top:"0px",
                                                left:"20px",
                                                fontWeight:"600",
                                                fontSize:"19px",
                                                color:"#1a75ff"
                                            }}
                                        >
                                            {index + 1}th
                                        </Box>
                                        <Box
                                            className='color-primary'
                                            sx={{
                                                textAlign:"center",
                                                fontSize:"20px",
                                                fontWeight:"500"
                                            }}
                                        >
                                            {getNameUserById(r.userId)} 
                                            {profile?.userId === r.userId &&(' (Bạn)')}
                                        </Box>
                                        <Box
                                            sx={{
                                                display:"flex",
                                                gap:"30px",
                                                alignItems:"center",
                                                justifyContent:"center"
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight:"500",
                                                    fontSize:"17px"
                                                }}
                                            >
                                                Thời gian hoàn thành: {`${getTimeDifference(r.startTimes,r.endTimes).hours.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes,r.endTimes).minutes.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes,r.endTimes).seconds.toString().padStart(2, '0')}s`}
                                            </span>
                                            <span>Trả lời đúng : <span style={{fontWeight:"600",color:"green"}}>{r.trueAns}</span> </span>
                                            <span>Trả lời sai :<span style={{fontWeight:"600",color:"red"}}>{r.falseAns}</span> </span>
                                        </Box>
                                    </Box>
                                )
                                
                            ))
                        }
                    </Box>
                </Box>


            </Box>
        </>
    )
}

export default Ranking 