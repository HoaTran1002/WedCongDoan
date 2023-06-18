import React from 'react'
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
  Stack,
  Tooltip
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { Link } from 'react-router-dom'
import useFetch from '~/hook/useFetch'
import { getAllComp } from '~/api/competitionApi'
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined'
import { color } from '@mui/system'
function createData(
  comName: string,
  examTimes: string,
  starDay: string,
  endDay: string,
  userQuan: string,
  dep: string
): {
  comName: string
  examTimes: string
  starDay: string
  endDay: string
  userQuan: string
  dep: string
} {
  return { comName, examTimes, starDay, endDay, userQuan, dep }
}

const CompTable = (): JSX.Element => {
  const [compState, callComp] = useFetch()
  React.useEffect(() => {
    callComp(getAllComp)
  }, [])
  const rows = compState.payload || []

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid xs={12}>
        <Stack direction='row' spacing={20} alignItems='center' sx={{ marginTop: '20px' }}>
          <Typography variant='h4' sx={{ fontWeight: 500, color: '#1976d2' }}>
            Danh sách cuộc thi
          </Typography>
          <Link to={'/CompetitionCreate'} style={{ textDecoration: 'none' }}>
            <Button variant='contained' startIcon={<AddIcon />}>
              Thêm cuộc thi mới
            </Button>
          </Link>
        </Stack>
      </Grid>
      <Grid xs={12} style={{ marginTop: '10px' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
          <Table sx={{ Width: '100%', overflow: 'scroll' }} aria-label='simple table'>
            <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff', width: '100%' }}>
              <TableRow>
                <TableCell sx={{ minWidth: 300 }}>Tên cuộc thi </TableCell>
                <TableCell sx={{ minWidth: 200 }}>Ngày bắt đầu</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Ngày kết thúc</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Thời gian làm bài</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Số lượng thí sinh</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Đơn vị tổ chức</TableCell>
                <TableCell sx={{ position: 'sticky', top: 0, zIndex: 1 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow key={row.comName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.comName}
                  </TableCell>
                  <TableCell align='left'>{row.startDate}</TableCell>
                  <TableCell align='left'>{row.endDate}</TableCell>
                  <TableCell align='left'>{row.examTimes}</TableCell>
                  <TableCell align='left'>{row.userQuan}</TableCell>
                  <TableCell align='left'>{row.depId}</TableCell>
                  <TableCell align='left'>
                    <Tooltip title='Xem đề thi' placement='top-start'>
                      <Link to={`/Tests/Competition/${row.comId}`}>
                        <Button style={{ width: 50 }} variant='outlined'>
                          <ArticleOutlinedIcon />
                        </Button>
                      </Link>
                    </Tooltip>
                  </TableCell>
                  <TableCell align='left'>
                    <Tooltip title='Xem giải thưởng' placement='top-start'>
                      <Link to={`/Prize/Competition/${row.comId}`}>
                        <Button style={{ width: 50 }} variant='outlined'>
                          <MilitaryTechOutlinedIcon />
                        </Button>
                      </Link>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
export default CompTable
