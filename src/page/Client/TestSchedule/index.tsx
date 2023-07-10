import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Layout from '~/components/layout/Layout'
import { Button, IconButton, Stack, Tab, Tabs, Container, Grid } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import RemoveIcon from '@mui/icons-material/Remove'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

interface Competition{
  nameCom: string,
  dayStart: string,
  dayEnd: string,
  timeExam: number
}

const rows: Competition[] = [
  {
    nameCom: 'Cuộc thi an toàn thông tin ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    timeExam: 90,
  },
  {
    nameCom: 'Cuộc thi an toàn chuyển đổi số ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    timeExam: 90,
  },
  {
    nameCom: 'Cuộc thi dự án mới ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    timeExam: 90,
  },
  {
    nameCom: 'trắc nghiệm thực tập sinh  ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    timeExam: 90,
  },
  {
    nameCom: 'thiết kế web ',
    dayStart: '12/04/2023',
    dayEnd: '12/05/2023',
    timeExam: 90,
  },
]
export default function Index(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = ():void => {
    setOpen(true);
  };

  const handleClose = ():void => {
    setOpen(false);
  };
  return (
    <Layout>
      <>
        <Container maxWidth={'lg'}>
          <TableContainer sx={{mt:3,backgroundColor:"#"}} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tên cuộc thi </TableCell>
                  <TableCell align="right">Ngày bắt đầu</TableCell>
                  <TableCell align="right">Ngày kết thúc</TableCell>
                  <TableCell align="right">Thời gian thi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row,index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nameCom}
                    </TableCell>
                    <TableCell align="right">{row.dayStart}</TableCell>
                    <TableCell align="right">{row.dayEnd}</TableCell>
                    <TableCell align="right">{row.timeExam}</TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display:"flex",
                          gap:"10px",
                          alignItems:"center",
                          justifyContent:"center"
                        }}
                      >
                        <Link to={'/ListExamCompetition'}>
                          <Button variant='outlined'>
                            Xem chi tiết
                          </Button>
                        </Link>
                        <Button onClick={handleClickOpen} variant='outlined' color='error'>
                          Hủy lịch thi
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle  id="alert-dialog-title">
          {"Thông báo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn đang hủy lịch thi mà bạn đã đăng ký trước đó<br/>
            Bạn có chắc muốn hủy lịch thi này ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained'onClick={handleClose}>
            Hủy 
          </Button>
          <Button  onClick={handleClose}>Trở về</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}
