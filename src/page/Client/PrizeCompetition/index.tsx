import React from 'react'
import Layout from '~/components/layout/Layout'
import {
    Grid,
    Box,
    Typography,
    SxProps,
    Container,
    Button
} from '@mui/material'
import styled from 'styled-components'
import { getAllPrizeTypes } from '~/api/prizeTypesApi'
import { getAllPrize } from '~/api/prizesApi'
import { getAllCompPrizes } from '~/api/CompetitionsPrizesAPI'
import { getAllComp } from '~/api/competitionApi'
import { getAllDep } from '~/api/departmentApi'
import useFetch from '~/hook/useFetch'
import BoardPrize from './BoardPrize'
import { ICompetition, ICompetitionPrize } from '~/interface/Interface'
const PrizeCompetition = (): JSX.Element => {
    const [allPrizeT,callAllPrizeT] = useFetch()
    const [allPrize,callAllPrize] = useFetch()
    const [allPrizeComp,callAllPrizeComp] = useFetch()
    const [allComp,callAllComp] = useFetch()
    const [openBoard,setOpenBoard] = React.useState<boolean>(false)
    const [comIdCheck,setComIdCheck] = React.useState<number>(0)

    const listCompetitionHasPrize:ICompetition[] = allComp?.payload?.filter((rComp:ICompetition)=>
        allPrizeComp?.payload?.find((rCompP:ICompetitionPrize)=>rCompP.comId == rComp.comId)
    )

    const handleCloseBoardPrize= ():void=>{
        setOpenBoard(false)
    }
    const handleOpenBoardPrize = (comId:number):void=>{
        setComIdCheck(comId)
        
        setOpenBoard(true)
    }
    React.useEffect(()=>{
        callAllPrize(getAllPrize)
    },[])
    React.useEffect(()=>{
        callAllPrizeT(getAllPrizeTypes)
    },[])
    React.useEffect(()=>{
        callAllPrizeComp(getAllCompPrizes)
    },[])
    React.useEffect(()=>{
        callAllComp(getAllComp)
    },[])
    return (
        <>
            <Layout>
                <Container maxWidth={'lg'}>
                    <Grid container spacing={1}>
                        <Grid item md={12} >
                            <Box
                                sx={{
                                    mt:3,
                                    position: "sticky",
                                    top: "58px",
                                    zIndex: "10"
                                }}
                            >
                                <Box
                                    sx={{
                                        fontWeight: "400",
                                        color: "#1565c0",
                                        fontSize: "23px",
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        backgroundColor: "white"
                                    }}
                                >
                                    CÁC GIẢI THƯỞNG HẤP DẪN CÁC CUỘC THI 
                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: "#1565c0",
                                        height: "1px",
                                        borderRadius: "3px"
                                    }}
                                >
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={12}>
                            <Grid container spacing={1}>
                                {
                                    listCompetitionHasPrize?.map((r:ICompetition,index:number)=>(
                                        <Grid key={index} item md={4} xs={12}>
                                            <Box 
                                                sx={{
                                                    backgroundColor:"#eef7ff",
                                                    padding:"10px",
                                                    borderRadius:"5px",
                                                    display:"flex",
                                                    flexDirection:"column",gap:"20px"
                                                }}
                                            > 
                                                <BlogName>{r.comName}</BlogName>
                                                <span
                                                    style={{
                                                        color:"#666"
                                                    }}
                                                >
                                                    Khoa tổ chức: &nbsp;
                                                    <span 
                                                        className="color-primary"
                                                        style={{
                                                            fontWeight:"500",
                                                            fontSize:"17px"
                                                        }}
                                                    >
                                                        Công nghệ thông tin 
                                                    </span>
                                                </span>
                                                <Box sx={{display:"flex",justifyContent:"flex-end"}}>
                                                    <Button onClick={():void=>handleOpenBoardPrize(r.comId)}>
                                                        Xem giải thưởng
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Layout>
            {
                openBoard && (<BoardPrize close={handleCloseBoardPrize} comId={comIdCheck} />)
            }
        </>
    )
}

export default PrizeCompetition


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