import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Layout from '~/components/layout/Layout'
import notFoundCompetition from '~/assets/img/players-competing-in-a-game-tournament.png'
import {
  Grid,
  Box,
  Button,
  SxProps,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom'

interface ListCompetition {
  nameCom: string,
  dayStart: string,
  dayEnd: string,
  userQuantity: number,
  timeExam: number,
  depId: number
}

interface Department {
  depId: number,
  depName: string
}

const rowDep: Department[] = [
  {
    depId: 1,
    depName: 'Công nghệ thông tin'
  },
  {
    depId: 2,
    depName: 'Công nghệ hóa học'
  },
  {
    depId: 3,
    depName: 'Công nghệ thực phẩm'
  },
  {
    depId: 4,
    depName: 'Công nghệ may'
  },
  {
    depId: 5,
    depName: 'Du lịch lữ hành'
  },
  {
    depId: 6,
    depName: 'Quản trị kinh doanh'
  },
  {
    depId: 7,
    depName: 'Ngân hàng'
  },
  {
    depId: 8,
    depName: 'Luật'
  },
  {
    depId: 9,
    depName: 'Khoa học dữ liệu '
  },
  {
    depId: 10,
    depName: 'An toàn thông tin '
  },
  {
    depId: 11,
    depName: 'Cơ sở hạ tầng'
  },
]

const row: ListCompetition[] = [
  {
    nameCom: 'Cuộc thi an toàn thông tin ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 1
  },
  {
    nameCom: 'Cuộc thi an toàn chuyển đổi số ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 2
  },
  {
    nameCom: 'Cuộc thi dự án mới ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 1
  },
  {
    nameCom: 'trắc nghiệm thực tập sinh  ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 4
  },
  {
    nameCom: 'thiết kế web ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 3
  },
  {
    nameCom: 'Lập trình web online',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 1
  },
  {
    nameCom: 'Lập trình web online',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 9
  },
  {
    nameCom: 'Lập trình web online',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 1
  },
  {
    nameCom: 'Lập trình web online',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 8
  },
  {
    nameCom: 'Lập trình web online',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    userQuantity: 50,
    timeExam: 90,
    depId: 3
  }
]

export default function Index(): JSX.Element {
  const [startIndex, setStartIndex] = React.useState(0);
  const [startDep, setStartDep] = React.useState(0);
  const [depId, setDepId] = React.useState(1);

  const dataPerPageListCompetition = 7;
  const dataPerPageDeppartment = 10;
  const endIndex = startIndex + dataPerPageListCompetition;
  const endDep = startDep + dataPerPageDeppartment;
  const totalRows = row.filter(r => r.depId === depId).length;
  const totalRowsDep = rowDep.length;
  const listCompetition = row.slice(startIndex, endIndex).filter(r => r.depId === depId);
  const listDep = rowDep.slice(startDep, endDep);
  const handleNext = (): void => {
    setStartIndex(prevIndex => prevIndex + dataPerPageListCompetition);
  };

  const handlePrevious = (): void => {
    setStartDep(prevIndex => prevIndex - dataPerPageListCompetition);
  };

  const handleNextDep = (): void => {
    setStartDep(prevDep => prevDep + dataPerPageDeppartment);
  };

  const handlePreviousDep = (): void => {
    setStartDep(prevDep => prevDep - dataPerPageDeppartment);
  };

  const handleChangeDep = (id: number): void => {
    setDepId(id);
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
                listDep.map((row) => (
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
                listDep.map((row) => (
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
                listCompetition.length === 0 ? (
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
                          width: "100%"
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
                      padding: "0 15px",
                      overflow: {md:"unset",xs:"scroll"}
                    }}
                  >
                    <Table 
                      sx={{ 
                        minWidth: {md:"100%",xs:"780px"},
                      }}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">STT</TableCell>
                          <TableCell>Tên cuộc thi</TableCell>
                          <TableCell align="center">Ngày bắt đầu</TableCell>
                          <TableCell align="center">Ngày kết thúc</TableCell>
                          <TableCell align="center">Thời gian làm bài</TableCell>
                          <TableCell align="center">Số lượng</TableCell>
                          <TableCell align="center"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listCompetition.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{ 
                              '&:last-child td, &:last-child th': { border: 0 } ,
                               
                            }}
                          >
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell component="td" scope="row">
                              {row.nameCom}
                            </TableCell>
                            <TableCell align="center">{row.dayStart}</TableCell>
                            <TableCell align="center">{row.dayEnd}</TableCell>
                            <TableCell align="center">{row.timeExam}</TableCell>
                            <TableCell align="center">{row.userQuantity}</TableCell>
                            <TableCell align="center">
                              <Link to={'/ListExamCompetition'}>
                                <Button>
                                  Xem
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
