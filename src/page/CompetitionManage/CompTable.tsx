import React, { useState } from 'react'
import {
  Typography,
  Grid,
  Button,
  Stack,
  Tooltip,
  Snackbar
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { Link } from 'react-router-dom'
import useFetch from '~/hook/useFetch'
import { deleteCompetitions, getAllComp } from '~/api/competitionApi'
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined'
import { color } from '@mui/system'
import { getAllDep } from '~/api/depApi'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import MuiAlert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { TableWithFixedColumn, ColumnsProps } from '~/components/TableFixed'
import { Loader } from '~/components/loader'

//interface
interface Competition {
  comId: number
  comName: string
  startDate: string
  endDate: string
  examTimes: number
  userQuan: number
  depId: number
}
interface IDep {
  depId: number
  depName: string
}
const CompTable = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [compState, callComp] = useFetch()
  const [deps, depCall] = useFetch()
  const [deleteComp, deleteCompCall] = useFetch()
  const depList = deps.payload || []
  const [loading, setLoading] = useState<boolean>(false)
  React.useEffect(() => {
    depCall(getAllDep)
  }, [loading])
  React.useEffect(() => {
    callComp(getAllComp)
  }, [loading])

  const getNameDep = (idDep: number): string => {
    try {
      const dep: IDep = depList?.find((item: any) => item.depId == idDep)
      return dep.depName || 'null'
    } catch (error) {
      console.log('lỗi')
    }
    return 'null'
  }
  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
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
  const handelDeleteComp = (idComp: number): void => {
    const requestDelete: { _id: number } = { _id: idComp }
    deleteCompCall(async () => {
      try {
        await deleteCompetitions(requestDelete)
        setShowSuccess(true)
        setLoading
      } catch (error) {
        setShowError(true)
      }
    })
  }
  const columns: ColumnsProps[] = [
    {
      field: 'comId',
      headerName: 'Id'
    },
    {
      field: 'comName',
      headerName: 'Tên cuộc thi'
    },
    {
      field: 'startDate',
      headerName: 'Ngày bắt đầu'
    },
    {
      field: 'endDate',
      headerName: 'Ngày kết thúc'
    },
    {
      field: 'examTimes',
      headerName: 'Thời gian làm bài'
    },
    {
      field: 'userQuan',
      headerName: 'Số lượng thí sinh'
    },
    {
      field: 'depName',
      headerName: 'Đơn vị tổ chức'
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: any) => [
        <Tooltip key='detailExam' title='Xem đề thi' placement='top-start'>
          <Link to={`/Tests/Competition/${params.comId}`}>
            <Button style={{ width: 50 }} variant='outlined'>
              <ArticleOutlinedIcon />
            </Button>
          </Link>
        </Tooltip>,
        <Tooltip
          key='detailPrize'
          title='Xem giải thưởng'
          placement='top-start'
        >
          <Link to={`/Prize/Competition/${params.comId}`}>
            <Button style={{ width: 50 }} variant='outlined'>
              <MilitaryTechOutlinedIcon />
            </Button>
          </Link>
        </Tooltip>,
        <Tooltip key='delete' title='xoá cuộc thi' placement='top-start'>
          <Button
            onClick={(): void => handelDeleteComp(params.comId)}
            style={{ width: 50 }}
            variant='outlined'
          >
            <DeleteOutlinedIcon />
          </Button>
        </Tooltip>
      ]
    }
  ]

  const rows =
    compState.payload?.map((item: Competition) => ({
      comId: item.comId,
      comName: item.comName,
      startDate: formatDay(item.startDate),
      endDate: formatDay(item.endDate),
      examTimes: item.examTimes,
      userQuan: item.userQuan,
      depName: getNameDep(item.depId)
    })) || []

  return (
    <>
      <Grid item xs={12}>
        <Stack>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 500,
              color: '#1976d2',
              display: 'flex',
              justifyContent: 'center',
              marginTop: 2
            }}
          >
            Danh sách cuộc thi
          </Typography>
        </Stack>
      </Grid>

      <>
        <>
          <Snackbar
            open={showSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
          >
            <MuiAlert
              onClose={handleCloseSuccess}
              severity='success'
              elevation={6}
              variant='filled'
            >
              Thao tác thành công
            </MuiAlert>
          </Snackbar>
          <Snackbar
            open={showError}
            autoHideDuration={3000}
            onClose={handleCloseSuccess}
          >
            <MuiAlert
              onClose={handleCloseError}
              severity='error'
              elevation={6}
              variant='filled'
            >
              Thao tác thất bại
            </MuiAlert>
          </Snackbar>
        </>
        {compState.loading || deps.loading ? (
          <Box
            sx={{
              position: 'relative',
              marginTop: 20,
              top: '30%',
              width: '100%',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
              //  background: '#f5f5f5', /* Màu nền (tùy chọn) */
            }}
          >
            <CircularProgress
            //  sx={{
            //    color: '#ff4081', /* Màu của phần tử loading (tùy chọn) */
            //  }}
            />
          </Box>
        ) : (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <>
              <Link
                to={'/CompetitionCreate'}
                style={{
                  textDecoration: 'none',
                  marginLeft: 40,
                  display: 'inline-block'
                }}
              >
                <Button variant='outlined' startIcon={<AddIcon />}>
                  Thêm cuộc thi mới
                </Button>
              </Link>
              <Grid item xs={12} style={{ margin: 10 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <TableWithFixedColumn
                    rows={rows}
                    columns={columns}
                    maxWidth={1100}
                    maxHeight={400}
                  />
                </Box>
              </Grid>
            </>
          </Grid>
        )}
      </>
    </>
  )
}
export default CompTable
