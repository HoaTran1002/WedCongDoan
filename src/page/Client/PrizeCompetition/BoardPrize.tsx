import React from 'react'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
import { getAllCompPrizes } from '~/api/CompetitionsPrizesAPI';
import useFetch from '~/hook/useFetch';
import { ICompetitionPrize, IPrize } from '~/interface/Interface';
import { getAllPrize } from '~/api/prizesApi';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
interface PropsPrizeComp {
    comId?: number;
    close: ()=>void;
}
const BoardPrize = (props: PropsPrizeComp): JSX.Element => {
    const [allCompPrizes,callAllCompPrizes] = useFetch();
    const [allPrize,callAllPrize]=useFetch();
    const listPrizeInComId = allCompPrizes?.payload?.filter((r:ICompetitionPrize)=>r.comId === props.comId)


    const getNamePrize = (prizeId:number):string=>{
        const itemPT:IPrize = allPrize?.payload?.find((r:IPrize)=> r.priId ===prizeId );
        return itemPT?.priName;
    }
    React.useEffect(()=>{
        callAllCompPrizes(getAllCompPrizes)
    },[])
    React.useEffect(()=>{
        callAllPrize(getAllPrize)
    },[])
    return (
        <>
            <Box
                onClick={props.close}
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
                        onClick={props.close}
                    >
                        <CloseIcon sx={{ fontSize: "30px", color: "#ff1a1a" }} />
                    </Box>
                    <h3
                        className='color-primary'
                        style={{
                            marginBottom:"30px",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            gap:"5px"
                        }}
                    >
                       <span>GIẢI THƯỞNG </span><EmojiEventsIcon/>
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
                            listPrizeInComId?.map((r:ICompetitionPrize,index:number)=>(
                                <Box 
                                    key={index}
                                    sx={{
                                        display:"flex",
                                        flexDirection:"column",
                                        mb:4,
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }}
                                >
                                    <h4 className="color-primary" style={{margin:"0"}}>
                                        {getNamePrize(r.priId)}
                                    </h4>
                                    <Box
                                        sx={{
                                            padding:"10px",
                                            textAlign:"center"
                                        }}
                                    >
                                        {r.prizeDetail}
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default BoardPrize 