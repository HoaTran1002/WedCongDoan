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
import {
  deleteCompetitions,
  getAllComp,
  UpdateIsDeleted
} from '~/api/competitionApi'
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined'
import { color } from '@mui/system'
import { getAllDep } from '~/api/depApi'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import MuiAlert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { TableWithFixedColumn, ColumnsProps } from '~/components/TableFixed'
import { Loader } from '~/components/loader'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { formatDay } from '~/utils/dateUtils'
//interface
interface ICompetition {
  comId: number
  comName: string
  startDate: string
  endDate: string
  examTimes: number
  userQuan: number
  depId: number
  isDeleted: number
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
  const [openDelete, setOpenDelete] = React.useState(false)
  const [compId, setComId] = React.useState<number>(0)
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
  const handleClickOpenDelete = (id: number): void => {
    setComId(id)
    setOpenDelete(true)
  }

  const handleCloseDelete = (): void => {
    setOpenDelete(false)
  }
  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
  }

  const handelDeleteComp = (idComp: number): void => {
    const requestDelete: { _id: number } = { _id: idComp }
    deleteCompCall(async () => {
      try {
        await UpdateIsDeleted(requestDelete)
        setShowSuccess(true)
        setLoading((r) => !r)
        setOpenDelete(false)
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
        // <Tooltip key='edit' title='chỉnh sửa' placement='top-start'>
        //   <Button
        //     onClick={(): void => handleClickOpenDelete(params.comId)}
        //     style={{ width: 50 }}
        //     variant='outlined'
        //     color='error'
        //   >
        //     <DeleteOutlinedIcon />
        //   </Button>
        // </Tooltip>,
        <Tooltip key='delete' title='xoá cuộc thi' placement='top-start'>
          <Button
            onClick={(): void => handleClickOpenDelete(params.comId)}
            style={{ width: 50 }}
            variant='outlined'
            color='error'
          >
            <DeleteOutlinedIcon />
          </Button>
        </Tooltip>
      ]
    }
  ]
  const rows =
    compState.payload
      ?.filter((item: ICompetition) => item.isDeleted !== 1)
      .map((item: ICompetition) => ({
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
          <Loader />
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
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Thông báo'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Bạn có chắc muốn xóa cuộc thi này
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(): void => handelDeleteComp(compId)}
              variant='outlined'
            >
              Xóa
            </Button>
            <Button onClick={handleCloseDelete}>Trở về</Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  )
}

export default CompTable
