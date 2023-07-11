import * as React from 'react'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Layout from '~/components/layout/Layout'
import notFoundCompetition from '~/assets/img/players-competing-in-a-game-tournament.png'
import img_competition from '~/assets/img/competition_item.png'
import {
  Grid,
  Box,
  Button,
  SxProps,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tooltip
} from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link,useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import {getAllDep} from '~/api/departmentApi'
import {getAllComp} from '~/api/competitionApi'
import useFetch from '~/hook/useFetch'
interface Competition {
  comId:string,
  comName: string,
  startDate: string,
  endDate: string,
  userQuan: number,
  examTimes: number,
  depId: number
}

interface Department {
  depId: number,
  depName: string
}


export default function Index(): JSX.Element {
  const navigate = useNavigate();
  const [getAllDeps,callAllDeps] = useFetch();
  const [getAllComps,callAllComps] = useFetch();
  const [startIndex, setStartIndex] = React.useState(0);
  const [startDep, setStartDep] = React.useState(0);
  const [depId, setDepId] = React.useState(1);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const dataPerPageListCompetition = isMobile ? 2 : 4;

  
  React.useEffect(()=>{
    callAllDeps(getAllDep)
  },[])

  React.useEffect(()=>{
    callAllComps(getAllComp)
  },[])
  const listComp = getAllComps?.payload;
  const rowComp = listComp?.map((row:Competition)=>({
    comId:row.comId,
    comName: row.comName,
    startDate: row.startDate,
    endDate: row.endDate,
    userQuan: row.userQuan,
    examTimes: row.examTimes,
    depId: row.depId
  }))
  
  const rowDep = getAllDeps?.payload;
  const dataPerPageDeppartment = 10;
  const endIndex = startIndex + dataPerPageListCompetition;
  const endDep = startDep + dataPerPageDeppartment;
  const totalRows = rowComp?.filter((r:any) => r.depId == depId).length;
  const totalRowsDep = rowDep?.length;
  const listCompetition = rowComp?.filter((r:any) => r.depId === depId).slice(startIndex, endIndex);
  const listDep = rowDep?.slice(startDep, endDep);
  // console.log(rowComp)

  const formatDay = (dayOrigin: string): string => {
    const dateObj = new Date(dayOrigin);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month.toString().padStart(2, "0")} / ${day.toString().padStart(2, "0")} / ${year}`;
  }
  const handleNext = (): void => {
    setStartIndex(prevIndex => prevIndex + dataPerPageListCompetition);
  };

  const handlePrevious = (): void => {
    setStartIndex(prevIndex => prevIndex - dataPerPageListCompetition);
  };

  const handleNextDep = (): void => {
    setStartDep(prevDep => prevDep + dataPerPageDeppartment);
  };

  const handlePreviousDep = (): void => {
    setStartDep(prevDep => prevDep - dataPerPageDeppartment);
  };

  const handleChangeDep = (id: number): void => {
    setStartIndex(0);
    setDepId(id);
  }

  const handleGoToExamComp =(id:number):void =>{
    navigate(`/ListExamCompetition?id=${id}`)
  }

  
  return (
    <Layout>
      <Container maxWidth={'xl'}>
        <Grid container sx={{ mt: 3 }} spacing={1}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: "#1565c0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px ",
                borderRadius: "5px",
                fontSize: "18px",
                color: "white",
                fontWeight: "600"
              }}
            >
              Khoa Tổ Chức
            </Box>
            <Box
              component='ul'
              sx={{
                display:{xs:'none',md: "flex"},
                flexDirection: "column",
                listStyleType: "none",
                padding: "30px 10px 10px 10px ",
                margin: 0,
                height: "500px",
                mt: 2,
                backgroundColor: "#1565c0",
                borderRadius: "3px"
              }}
            >
              {
                listDep?.map((row:any) => (
                  <Box
                    key={row.depId}
                    component='li'
                    onClick={(): void => handleChangeDep(row.depId)}
                    className={`BlogCompetition ${depId == row.depId ? 'active' : ''}`}
                  >
                    {row.depName}
                  </Box>
                ))
              }

              <Box
                component='li'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "10px",
                  padding: "28px 10px 0px 10px"
                }}
              >
                <Box
                  component='button'
                  onClick={handlePreviousDep}
                  disabled={startDep === 0}
                  className='button-pre-next'
                >
                  <KeyboardArrowLeftIcon />
                </Box>
                <Box
                  component='button'
                  onClick={handleNextDep}
                  disabled={startDep + dataPerPageDeppartment >= totalRowsDep}
                  className='button-pre-next'
                >
                  <KeyboardArrowRightIcon />
                </Box>
              </Box>
            </Box>
            <Box
              component='ul'
              sx={{
                display: {xs:"flex",md:"none"},
                flexDirection: "column",
                listStyleType: "none",
                padding: "30px 10px 10px 10px ",
                margin: 0,
                height: "500px",
                mt: 2,
                backgroundColor: "#1565c0",
                borderRadius: "3px"
              }}
            >
              {
                listDep?.map((row:any) => (
                  <Box
                    key={row.depId}
                    component='li'
                    onClick={(): void => handleChangeDep(row.depId)}
                    className={`BlogCompetition_mobile ${depId == row.depId ? 'active' : ''}`}
                  >
                    {row.depName}
                  </Box>
                ))
              }

              <Box
                component='li'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "10px",
                  padding: "28px 10px 0px 10px"
                }}
              >
                <Box
                  component='button'
                  onClick={handlePreviousDep}
                  disabled={startDep === 0}
                  className='button-pre-next'
                >
                  <KeyboardArrowLeftIcon />
                </Box>
                <Box
                  component='button'
                  onClick={handleNextDep}
                  disabled={startDep + dataPerPageDeppartment >= totalRowsDep}
                  className='button-pre-next'
                >
                  <KeyboardArrowRightIcon />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                backgroundColor: "#1565c0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px ",
                borderRadius: "5px",
                fontSize: "18px",
                color: "white",
                fontWeight: "600"
              }}
            >
              Các cuộc thi đang diễn ra
            </Box>
            <Box
              sx={{
                mt: 2,
                backgroundColor: "#1565c0",
                height: "500px",
                borderRadius: "5px",
                padding: "8px"
              }}
            >
              {
                listCompetition?.length === 0 ? (
                  <Box
                    sx={{
                      borderRadius: "3px",
                      backgroundColor: "#e0f6ff",
                      height: "440px",
                      padding: "0 15px"
                    }}
                  >
                    <Box 
                      sx={{
                        display:"flex",
                        alignItems:"center",
                        flexDirection:"column"
                      }}
                    >
                      <Box
                        sx={{
                          height: {md:"400px",xs:"350px"},
                          width: "90%"
                        }}
                        component='img'
                        src={notFoundCompetition}
                      />
                      <Box 
                        className='color-primary'
                        sx={{
                          textAlign:"center",
                          padding:"10px",
                          fontWeight:"600",
                          fontSize:"20px"
                        }}
                      >
                        Chưa có cuộc thi nào diễn ra trong khoa này
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      borderRadius: "3px",
                      backgroundColor: "#e0f6ff",
                      height: "440px",
                      padding: "10px 15px",
                      overflow: {md:"unset",xs:"scroll"}
                    }}
                  >
                    <Grid container spacing={1} sx={{height:"100%"}}>
                      {listCompetition?.map((row:any, index:any) => (
                        <Grid key={index} item md={3} xs={12}>
                          <Box
                            sx={{
                              backgroundColor:"white",
                              borderRadius:"5px",
                              height:{md:"100%",xs:"auto"},
                              padding:"10px",
                              display:"flex",
                              gap:"20px",
                              cursor:"pointer",
                              flexDirection:{md:"column",xs:"column"}
                            }}
                            onClick={():void=>handleGoToExamComp(row.comId)}

                          >
                            <Box
                              component='img'
                              sx={{
                                height:{md:"auto",xs:"100%"},
                                width:{md:"100%",xs:"100%"},
                                display:{md:"block",xs:"none"}
                              }}
                              src={img_competition}
                            />
                            <Box
                              sx={{
                                display:"flex",
                                flexDirection:"column"
                              }}
                            >
                              <Box>
                                <TitleCompetition>Tên cuộc thi</TitleCompetition>
                                <Tooltip title={row.comName}  placement="top-end">
                                  <NameCompetition>
                                    {row.comName}
                                  </NameCompetition>
                                </Tooltip>
                              </Box>
                              <Box>
                                <TitleCompetition>Bắt đầu - Kết thúc</TitleCompetition>
                                <NameCompetition>
                                  {formatDay(row.startDate)} - {formatDay(row.endDate)}
                                </NameCompetition>
                              </Box>
                              <Box>
                                <TitleCompetition>Thời gian thi</TitleCompetition>
                                <NameCompetition>
                                  {row.examTimes} phút
                                </NameCompetition>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )
              }
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "10px",
                  padding: "15px 10px 0px 10px"
                }}
              >
                <Box
                  component='button'
                  onClick={handlePrevious}
                  disabled={startIndex === 0}
                  className='button-pre-next'
                >
                  <KeyboardArrowLeftIcon />
                </Box>
                <Box
                  component='button'
                  onClick={handleNext}
                  disabled={startIndex + dataPerPageListCompetition >= totalRows}
                  className='button-pre-next'
                >
                  <KeyboardArrowRightIcon />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}


const NameCompetition = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-size:18px;
  line-height: 30px;
  height: 30px;
  margin: 0;
  color:#1976d2;
  vertical-align: middle;
  font-weight: 600;
  text-align: center;
`

const TitleCompetition = styled.span`
  font-size:16px;
  color:#848484;
  font-weight:600;
  text-align: center;
  display: block;
`
