import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Layout from '~/components/layout/Layout'
import { Button, IconButton, Stack, Tab, Tabs } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import RemoveIcon from '@mui/icons-material/Remove'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

function createData(
  name: string,
  date: string,
  time: string,
  status: string
): {
  name: string
  date: string
  time: string
  status: string
} {
  return { name, date, time, status }
}
function createDataResult(
  name: string,
  date: string,
  time: string
): {
  name: string
  date: string
  time: string
} {
  return { name, date, time }
}
const rowsDataHistoryAndResult = [
  createDataResult('Frozen yoghurt', '12/12/2023', '19h30 - 20h30'),
  createDataResult('Ice cream sandwich', '12/12/2023', '19h30 - 20h30'),
  createDataResult('Eclair', '12/12/2023', '19h30 - 20h30'),
  createDataResult('Cupcake', '12/12/2023', '19h30 - 20h30'),
  createDataResult('Gingerbread', '12/12/2023', '19h30 - 20h30')
]
const rows = [
  createData('Frozen yoghurt', '12/12/2023', '19h30 - 20h30', 'đang bắt đầu'),
  createData('Ice cream sandwich', '12/12/2023', '19h30 - 20h30', 'đang bắt đầu'),
  createData('Eclair', '12/12/2023', '19h30 - 20h30', 'đang bắt đầu'),
  createData('Cupcake', '12/12/2023', '19h30 - 20h30', 'đang bắt đầu'),
  createData('Gingerbread', '12/12/2023', '19h30 - 20h30', 'đang bắt đầu')
]

export default function Index(): JSX.Element {
  return (
    <Layout>
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, background: '#1976D2' }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>TÊN CUỘC THI</TableCell>
                <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                  NGÀY THI
                </TableCell>
                <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                  THỜI GIAN
                </TableCell>
                <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                  TRẠNG THÁI
                </TableCell>
                <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                  THỰC HIỆN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: '#1976D2', color: '#fff' }}
                >
                  <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                    {row.date}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                    {row.time}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                    {row.status}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontSize: 16 }} align='center'>
                    <Stack direction='row' spacing={2} sx={{ justifyContent: 'center' }}>
                      <IconButton
                        aria-label='delete'
                        sx={{
                          color: '#1976D2',
                          background: '#fff',
                          borderRadius: 1,
                          fontSize: 16,
                          height: '30px',
                          width: '150px'
                        }}
                      >
                        <VisibilityIcon /> Xem thông tin
                      </IconButton>
                      {/* <IconButton
                      aria-label='delete'
                      sx={{
                        color: '#1976D2',
                        background: '#fff',
                        borderRadius: 1,
                        fontSize: 16,
                        height: '30px',
                        width: '150px'
                      }}
                    >
                      <VisibilityIcon /> Vào phòng thi
                    </IconButton> */}
                      <IconButton
                        aria-label='delete'
                        sx={{
                          color: '#1976D2',
                          background: '#fff',
                          borderRadius: 1,
                          fontSize: 16,
                          height: '30px',
                          width: '80px'
                        }}
                      >
                        <RemoveIcon /> Huỷ
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer sx={{ marginTop: 3 }} component={Paper}>
          <Table sx={{ minWidth: 650, background: '#1976D2' }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>TÊN CUỘC THI</TableCell>
                <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                  NGÀY THI
                </TableCell>
                <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                  THỜI GIAN
                </TableCell>

                <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                  THỰC HIỆN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: '#1976D2', color: '#fff' }}
                >
                  <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                    {row.date}
                  </TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center', fontSize: 16 }} align='right'>
                    {row.time}
                  </TableCell>

                  <TableCell sx={{ color: '#fff', fontSize: 16 }} align='center'>
                    <Stack direction='row' spacing={2} sx={{ justifyContent: 'center' }}>
                      <IconButton
                        aria-label='delete'
                        sx={{
                          color: '#1976D2',
                          background: '#fff',
                          borderRadius: 1,
                          fontSize: 16,
                          height: '30px',
                          width: '150px'
                        }}
                      >
                        <VisibilityIcon /> Kết quả thi
                      </IconButton>
                      {/* <IconButton
                      aria-label='delete'
                      sx={{
                        color: '#1976D2',
                        background: '#fff',
                        borderRadius: 1,
                        fontSize: 16,
                        height: '30px',
                        width: '150px'
                      }}
                    >
                      <VisibilityIcon /> Vào phòng thi
                    </IconButton> */}
                      <IconButton
                        aria-label='delete'
                        sx={{
                          color: '#1976D2',
                          background: '#fff',
                          borderRadius: 1,
                          fontSize: 16,
                          height: '30px',
                          width: '80px'
                        }}
                      >
                        <RemoveIcon /> Huỷ
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </Layout>
  )
}
