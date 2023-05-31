import React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import {
  Typography,
  Paper,
  Grid,
  TableContainer,
  TableBody,
  TableCell,
  Table,
  TableHead,
  TableRow,
  Button,
  Stack
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
function createData(
  name: string,
  dateStart: string,
  dateEnd: string,
  timeStart: string,
  timeEnd: string,
  scale: string
): {
  name: string
  dateStart: string
  dateEnd: string
  timeStart: string
  timeEnd: string
  scale: string
} {
  return { name, dateStart, dateEnd, timeStart, timeEnd, scale }
}

const rows = [
  createData('Khảo sát an toàn thông tin', '20/03/2023', '20/03/2023', '10:00:00', '11:00:00', 'Khoa'),
  createData('Khảo sát chất lượng anh văn đầu vào', '20/03/2023', '20/03/2023', '10:00:00', '11:00:00', 'Khoa'),
  createData('Kiểm Tra anh văn đầu vào', '20/03/2023', '20/03/2023', '10:00:00', '11:00:00', 'Lớp'),
  createData(
    'Khảo sát chất lượng giảng dạy của trường HUFI',
    '20/03/2023',
    '20/03/2023',
    '10:00:00',
    '11:00:00',
    'Trường'
  )
]

const Index = (): JSX.Element => {
  return (
    <>
      <LayoutAdmin>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
            <Stack direction='row' spacing={20} alignItems='center' sx={{ marginTop: '20px' }}>
              <Typography variant='h4' sx={{ fontWeight: 500, color: '#1976d2' }}>
                Danh sách cuộc thi
              </Typography>
              <Button href='/CompetitionCreate' variant='contained' startIcon={<AddIcon />}>
                Thêm cuộc thi mới
              </Button>
            </Stack>
          </Grid>
          <Grid xs={12} style={{ marginTop: '10px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: '100%' }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên cuộc thi </TableCell>
                    <TableCell>Ngày bắt đầu</TableCell>
                    <TableCell>Ngày kết thúc</TableCell>
                    <TableCell>Thời gian bắt đầu</TableCell>
                    <TableCell>Thời gian kết thúc</TableCell>
                    <TableCell>Quy mô</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.dateStart}</TableCell>
                      <TableCell align='right'>{row.dateEnd}</TableCell>
                      <TableCell align='right'>{row.timeStart}</TableCell>
                      <TableCell align='right'>{row.timeEnd}</TableCell>
                      <TableCell align='right'>{row.scale}</TableCell>
                      <TableCell align='right'>
                        <Button href='/Competition' variant='outlined'>
                          Xem chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </LayoutAdmin>
    </>
  )
}

export default Index
