import * as React from 'react'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Layout from '~/components/layout/Layout'
import notFoundCompetition from '~/assets/img/players-competing-in-a-game-tournament.png'
import img_competition from '~/assets/img/competition_item.png'
import { Grid, Box, Container, Select, MenuItem, Button,InputLabel,FormControl } from '@mui/material'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Link, useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import SearchIcon from '@mui/icons-material/Search';
import { getAllDep } from '~/api/departmentApi'
import { getAllComp } from '~/api/competitionApi'
import useFetch from '~/hook/useFetch'
import { ICompetition, IDepartment } from '~/interface/Interface'
import PersonIcon from '@mui/icons-material/Person';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
interface Competition {
  comId: string
  comName: string
  startDate: string
  endDate: string
  userQuan: number
  examTimes: number
  depId: number
}

interface Department {
  depId: number
  depName: string
}
interface IDate {
  date: number,
  month: number,
  year: number
}
export default function Index(): JSX.Element {
  const navigate = useNavigate()
  const [getAllDeps, callAllDeps] = useFetch()
  const [getAllComps, callAllComps] = useFetch()
  const [compSearch, setCompSearch] = React.useState<string>('')
  const [compSearchResult, setCompSearchResult] = React.useState<string>('')
  const [depSelect, setDepSelect] = React.useState<string>('');
  const [searchStatus, setSearchStatus] = React.useState<boolean>(false)
  const [selectStatus, setSelectStatus] = React.useState<boolean>(false)
  const [listCompSearch, setListCompSearch] = React.useState<ICompetition[]>([])
  const [listCompDepSelect, setListCompDepSelect] = React.useState<ICompetition[]>([])
  const compareDateWithTimeString = (dateObj: IDate, timeString: string): boolean => {
    const date = new Date(timeString);
    const yearMatch = dateObj.year === date.getFullYear();
    const monthMatch = dateObj.month === date.getMonth() + 1;
    const dateMatch = dateObj.date === date.getDate();
    return yearMatch && monthMatch && dateMatch;
  };

  const isBeforeDate = (dateInput: string): boolean => {
    const date = new Date(dateInput);
    const currentDate = new Date();
    if (date > currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const removeDuplicates = (array: any[], keyFn: (item: any) => string): any[] => {
    const seen = new Set();
    return array?.filter((item) => {
      const key = keyFn(item);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  const listDayInHappening: IDate[] = getAllComps?.payload?.reduce((listNew: IDate[], current: ICompetition) => {
    const dateObj = new Date(current?.startDate)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    if (isBeforeDate(current?.endDate)) listNew.push({ date: day, month: month, year: year })
    return listNew;
  }, [])
  const listDayInBefore: IDate[] = getAllComps?.payload?.reduce((listNew: IDate[], current: ICompetition) => {
    const dateObj = new Date(current?.startDate)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    if (!isBeforeDate(current?.endDate)) listNew.push({ date: day, month: month, year: year })
    return listNew;
  }, [])

  listDayInHappening?.sort((a: IDate, b: IDate) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    if (a.month !== b.month) {
      return b.month - a.month;
    }
    return b.date - a.date;
  });

  listDayInBefore?.sort((a: IDate, b: IDate) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    if (a.month !== b.month) {
      return b.month - a.month;
    }
    return b.date - a.date;
  });
  const newListDayInHappening = removeDuplicates(listDayInHappening, (item) => `${item.date}-${item.month}-${item.year}`);
  const newListDayBefore = removeDuplicates(listDayInBefore, (item) => `${item.date}-${item.month}-${item.year}`);

  const getDepName = (id: number): string => {
    const dep = getAllDeps?.payload?.find((r: IDepartment) => r?.depId === id)
    return dep?.depName || ''
  }
  const formatDay = (dayOrigin: string): string => {
    const dateObj = new Date(dayOrigin)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${month.toString().padStart(2, '0')} / ${day
      .toString()
      .padStart(2, '0')} / ${year}`
  }
  const handleGoToExamComp = (id: number): void => {
    localStorage.setItem('competitionId', JSON.stringify(id))
    navigate(`/ListExamCompetition?id=${id}`)
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCompSearch(event.target.value)
  };
  
  const listCompetitionforDate = (date: number, month: number, year: number): JSX.Element => {
    const dayObj: IDate = { date: date, month: month, year: year };
    const listCom = getAllComps?.payload?.filter((r: ICompetition) =>
      compareDateWithTimeString(dayObj, r.startDate)
    )
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: '20px',
          mt: 4
        }}
      >
        {
          listCom?.map((r: ICompetition, index: number) => (
            <Box
              key={index}
              sx={{
                p: "10px 20px",
                borderRadius: "10px",
                backgroundColor: "#f0f9ff",
                position: "relative",
                transition: "all linear 0.2s",
                cursor: "pointer",
                '&:hover': {
                  backgroundColor: "#cdebff",
                }
              }}
              onClick={(): void => handleGoToExamComp(r.comId)}
            >
              <ComName>{r.comName}</ComName>
              <Box>
                <span>
                  Khoa tổ chức: &nbsp;
                </span>
                <TitleCompetition>
                  {getDepName(r.depId)}
                </TitleCompetition>
              </Box>
              <Box>
                <span>
                  Ngày bắt đầu  - Ngày kết thúc: &nbsp;
                </span>
                <TitleCompetition>
                  {formatDay(r.startDate)} - {formatDay(r.endDate)}
                </TitleCompetition>
              </Box>
              <Box>
                <span>
                  Thời gian thi: &nbsp;
                </span>
                <TitleCompetition>{r.examTimes} phút </TitleCompetition>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  right: "10px",
                  bottom: "10px",
                  color: "#1565c0"
                }}
              >
                <span>0/{r.userQuan}</span><PersonIcon />
              </Box>
            </Box>
          ))
        }
      </Box>
    )
  }
  
  const handleChangeSelectDep = (event: any):void => {
    setDepSelect(event.target.value as string);
    setSelectStatus(true)
    setSearchStatus(false)
    setCompSearch('')
    setCompSearchResult('')
  };
  const handleSearchCom = (): void => {
    if (compSearch.trim() !== '') {
      const listCompWhensearch = getAllComps?.payload?.filter((r: ICompetition) =>
        r.comName.toLowerCase().includes(compSearch)
      )
      setListCompSearch(listCompWhensearch);
      setCompSearchResult(compSearch)
      setSearchStatus(true)
      setDepSelect('')
      setSelectStatus(false)
    } else {
      setSearchStatus(false)
    }
    // console.log(compSearch, searchStatus, listCompSearch)
  }
  const handleResetStatus =():void=>{
    setSearchStatus(false)
    setCompSearch('')
    setCompSearchResult('')
    setDepSelect('')
    setSelectStatus(false)
  }
  const listCompForDepWhenSelect=(depId:number):JSX.Element[]=>{
    const listCompForDep = getAllComps?.payload?.filter((r:ICompetition)=>
      r.depId === Number(depId)
    )
    return (
       listCompForDep?.length === 0 ? (
          <Grid item md={12}>
            <Box
              sx={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontWeight:"500",
                fontSize:"25px",
                color:"#1565c0"
              }}
            >
              KHÔNG CÓ CUỘC THI NÀO TRONG KHOA NÀY
            </Box>
          </Grid>
      ):(
        listCompForDep?.map((r: ICompetition, index: number) => (
            <Grid key={index} item md={6}>
              <Box
                key={index}
                sx={{
                  p: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "#f0f9ff",
                  position: "relative",
                  transition: "all linear 0.2s",
                  cursor: "pointer",
                  '&:hover': {
                    backgroundColor: "#cdebff",
                  }
                }}
                onClick={(): void => handleGoToExamComp(r.comId)}
              >
                <ComName>{r.comName}</ComName>
                <Box>
                  <span>
                    Khoa tổ chức: &nbsp;
                  </span>
                  <TitleCompetition>
                    {getDepName(r.depId)}
                  </TitleCompetition>
                </Box>
                <Box>
                  <span>
                    Ngày bắt đầu  - Ngày kết thúc: &nbsp;
                  </span>
                  <TitleCompetition>
                    {formatDay(r.startDate)} - {formatDay(r.endDate)}
                  </TitleCompetition>
                </Box>
                <Box>
                  <span>
                    Thời gian thi: &nbsp;
                  </span>
                  <TitleCompetition>{r.examTimes} phút </TitleCompetition>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    right: "10px",
                    bottom: "10px",
                    color: "#1565c0"
                  }}
                >
                  <span>0/{r.userQuan}</span><PersonIcon />
                </Box>
              </Box>
          </Grid>
        ))
      )
    )
  }
  React.useEffect(() => {
    callAllDeps(getAllDep)
  }, [])

  React.useEffect(() => {
    callAllComps(getAllComp)
  }, [])
  React.useEffect(() => {
    localStorage.clear();
  }, [])
  return (
    <Layout>
      <Container maxWidth={'lg'}>
        <Grid container sx={{ mt: 3 }} spacing={1}>
          {/* Tìm kiếm cuộc thi */}
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                gap:"20px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px"
                }}
              >
                <Box
                  sx={{
                    borderRadius: "4px",
                    border: "1px solid #1565c0",
                    padding: "10px 5px",
                    display: "flex",
                    gap: "10px"
                  }}
                >
                  <Box
                    placeholder='Tìm cuộc thi'
                    component='input'
                    type="text"
                    sx={{
                      fontSize: "20px",
                      outline: "none",
                      border: "none"
                    }}
                    value={compSearch}
                    onChange={handleSearchChange}
                  />
                  <Button variant='contained' onClick={handleSearchCom} ><SearchIcon /></Button>
                </Box>
              </Box>
              <FormControl sx={{width:"250px"}} >
                <InputLabel id="demo-simple-select-label" sx={{padding:"0 10px",backgroundColor:"#fff",display:"inline-block"}}>Khoa tổ chức</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={depSelect}
                  label="Khoa tổ chức"
                  onChange={handleChangeSelectDep}
                >
                  <MenuItem value={''}>-- chọn khoa --</MenuItem>
                  {
                    getAllDeps?.payload?.map((r:IDepartment,index:number)=>(
                      <MenuItem key={index} value={r.depId}>{getDepName(r.depId)}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <Button sx={{padding:"15px 10px"}} variant='contained' onClick={handleResetStatus}>
                <RestartAltIcon/>
              </Button>
            </Box>
          </Grid>
          {
            searchStatus ? (
              <Grid item xs={12} md={12} >
                {/* Danh sách cuộc thi khi search */}
                <Grid container spacing={1}>
                  <Grid item md={12}>
                    <Box>
                      <Box
                        sx={{
                          fontWeight: "400",
                          color: "#1565c0",
                          fontSize: "23px"
                        }}
                      >
                        BẠN TÌM KIẾM CUỘC THI &quot; {compSearchResult} &quot;
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
                </Grid>
                <Grid item md={12}>
                  <Grid container spacing={2} sx={{mt:3}}>
                  {
                    listCompSearch.length === 0 ? (
                      <Grid item md={12}>
                        <Box
                          sx={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            fontWeight:"500",
                            fontSize:"25px",
                            color:"#1565c0"
                          }}
                        >
                          CUỘC THI BẠN TÌM KIẾM KHÔNG TỒN TẠI
                        </Box>
                      </Grid>
                    ):(
                      listCompSearch?.map((r: ICompetition, index: number) => (
                          <Grid key={index} item md={6}>
                            <Box
                              key={index}
                              sx={{
                                p: "10px 20px",
                                borderRadius: "10px",
                                backgroundColor: "#f0f9ff",
                                position: "relative",
                                transition: "all linear 0.2s",
                                cursor: "pointer",
                                '&:hover': {
                                  backgroundColor: "#cdebff",
                                }
                              }}
                              onClick={(): void => handleGoToExamComp(r.comId)}
                            >
                              <ComName>{r.comName}</ComName>
                              <Box>
                                <span>
                                  Khoa tổ chức: &nbsp;
                                </span>
                                <TitleCompetition>
                                  {getDepName(r.depId)}
                                </TitleCompetition>
                              </Box>
                              <Box>
                                <span>
                                  Ngày bắt đầu  - Ngày kết thúc: &nbsp;
                                </span>
                                <TitleCompetition>
                                  {formatDay(r.startDate)} - {formatDay(r.endDate)}
                                </TitleCompetition>
                              </Box>
                              <Box>
                                <span>
                                  Thời gian thi: &nbsp;
                                </span>
                                <TitleCompetition>{r.examTimes} phút </TitleCompetition>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  position: "absolute",
                                  right: "10px",
                                  bottom: "10px",
                                  color: "#1565c0"
                                }}
                              >
                                <span>0/{r.userQuan}</span><PersonIcon />
                              </Box>
                            </Box>
                        </Grid>
                      ))
                    )
                  }
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              selectStatus ? (
                <Grid item xs={12} md={12} >
                {/* Danh sách cuộc thi khi select */}
                <Grid container spacing={1}>
                  <Grid item md={12}>
                    <Box>
                      <Box
                        sx={{
                          fontWeight: "400",
                          color: "#1565c0",
                          fontSize: "23px"
                        }}
                      >
                        {getDepName(Number(depSelect)).toLocaleUpperCase()}
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
                </Grid>
                <Grid item md={12}>
                  <Grid container spacing={2} sx={{mt:3}}>
                    {
                      listCompForDepWhenSelect(Number(depSelect))
                    } 
                  </Grid>
                </Grid>
              </Grid>
              ):(
                <Grid item xs={12} md={12} >
                {/* Danh sách cuộc thi khi chưa search  */}
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <Box>
                      <Box
                        sx={{
                          fontWeight: "400",
                          color: "#1565c0",
                          fontSize: "23px"
                        }}
                      >
                        CÁC CUỘC THI ĐANG DIỄN RA
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
                    {
                      newListDayInHappening?.map((r: IDate, index: number) => (
                        <Grid key={index} container spacing={1}>
                          <Grid item md={3}>
                            <Box
                              sx={{
                                m: "20px 0",
                                borderRight: "2px solid #1565c0",
                                height: "100%"
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%"
                                }}
                              >
                                <span
                                  style={{
                                    position: "sticky",
                                    top: "80px",
                                    bottom: "20px",
                                    color: "#1565c0",
                                    fontSize: "60px",
                                    fontWeight: "500"
                                  }}
                                >
                                  {r.date}
                                  <span
                                    style={{
                                      position: "absolute",
                                      color: "#1565c0",
                                      fontSize: "20px",
                                      fontWeight: "400",
                                      top: "-15px",
                                      left: "-40px"
                                    }}
                                  >
                                    tháng {r.month}
                                  </span>
                                </span>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item md={9} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            {listCompetitionforDate(r.date, r.month, r.year)}
                          </Grid>
                          <Grid item md={12}>
                            <Box
                              sx={{
                                backgroundColor: "#1565c0",
                                height: "1px",
                                borderRadius: "3px",
                                width: "100%",
                                mt: 6
                              }}
                            >
                            </Box>
                          </Grid>
                        </Grid>
                      ))
                    }
                  </Grid>
                  <Grid item md={12}>
                    <Box
                      sx={{
                        mt: 6
                      }}
                    >
                      <Box
                        sx={{
                          fontWeight: "400",
                          color: "#1565c0",
                          fontSize: "23px"
                        }}
                      >
                        CÁC CUỘC THI TRƯỚC ĐÓ
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
                    {
                      newListDayBefore?.map((r: IDate, index: number) => (
                        <Grid key={index} container spacing={1}>
                          <Grid item md={3}>
                            <Box
                              sx={{
                                m: "20px 0",
                                borderRight: "2px solid #1565c0",
                                height: "100%"
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%"
                                }}
                              >
                                <span
                                  style={{
                                    position: "sticky",
                                    top: "90px",
                                    bottom: "20px",
                                    color: "#1565c0",
                                    fontSize: "60px",
                                    fontWeight: "500"
                                  }}
                                >
                                  {r.date}
                                  <span
                                    style={{
                                      position: "absolute",
                                      color: "#1565c0",
                                      fontSize: "20px",
                                      fontWeight: "400",
                                      top: "-15px",
                                      left: "-40px"
                                    }}
                                  >
                                    tháng {r.month}
                                  </span>
                                </span>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item md={9} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            {listCompetitionforDate(r.date, r.month, r.year)}
                          </Grid>
                          <Grid item md={12}>
                            <Box
                              sx={{
                                backgroundColor: "#1565c0",
                                height: "1px",
                                borderRadius: "3px",
                                width: "100%",
                                mt: 6
                              }}
                            >
                            </Box>
                          </Grid>
                        </Grid>
                      ))
                    }
                  </Grid>
                </Grid>
                </Grid>
              )
            )
          }
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
  font-size: 18px;
  line-height: 30px;
  height: 30px;
  margin: 0;
  color: #1976d2;
  vertical-align: middle;
  font-weight: 600;
  text-align: center;
`

const TitleCompetition = styled.span`
  font-size: 16px;
  color: #1565c0;
  font-weight: 600;
`

const ComName = styled.h2`
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        font-size:25px;
        line-height: 30px;
        height: 60px;
        margin: 0;
        color:#1976d2;
        vertical-align: middle;
        font-weight: 500;
`
