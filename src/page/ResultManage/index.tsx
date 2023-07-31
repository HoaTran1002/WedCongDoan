import React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import {
  Typography,
  Grid,
  Button,
  Stack,
  Tooltip,
  Snackbar,
  Box
} from '@mui/material'
import { Link } from 'react-router-dom'
import { TableWithFixedColumn, ColumnsProps } from '~/components/TableFixed'
import { getAllComp } from '~/api/competitionApi'
import { getAllDep } from '~/api/departmentApi'
import { Loader } from '~/components/loader'
import useFetch from '~/hook/useFetch'
import PersonIcon from '@mui/icons-material/Person'
import { ICompetition, IDepartment } from '~/interface/Interface'
import ModalResultManage from './ModalResultManage'
import DensitySmallIcon from '@mui/icons-material/DensitySmall'
import { formatDay } from '~/utils/dateUtils'
const ResultManage = (): JSX.Element => {
  const [compState, callComp] = useFetch()
  const [deps, depCall] = useFetch()
  const [openModalListUser, setOpenModalListUser] =
    React.useState<boolean>(false)
  const [comId, setComId] = React.useState<number>(0)

  const getNameDep = (idDep: number): string => {
    try {
      const dep: IDepartment = deps?.payload?.find(
        (item: any) => item.depId == idDep
      )
      return dep.depName || 'null'
    } catch (error) {
      console.log('lỗi')
    }
    return 'null'
  }

  const handleCloseModalListUser = (): void => {
    setOpenModalListUser(false)
  }
  const handleOpenModalListUser = (comId: number): void => {
    setComId(comId)
    setOpenModalListUser(true)
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
        <Tooltip
          key='detailUser'
          title='Danh sách thí sinh'
          placement='top-start'
        >
          <Button
            sx={{ width: 50 }}
            variant='outlined'
            onClick={(): void => handleOpenModalListUser(params.comId)}
          >
            <PersonIcon />
          </Button>
        </Tooltip>
      ]
    }
  ]
  const rows =
    compState.payload?.map((item: ICompetition) => ({
      comId: item.comId,
      comName: item.comName,
      startDate: formatDay(item.startDate),
      endDate: formatDay(item.endDate),
      examTimes: item.examTimes,
      userQuan: item.userQuan,
      depName: getNameDep(item.depId)
    })) || []
  React.useEffect(() => {
    depCall(getAllDep)
  }, [])
  React.useEffect(() => {
    callComp(getAllComp)
  }, [])

  return (
    <LayoutAdmin>
      <Grid container>
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
              Kết quả cuộc thi
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} style={{ margin: 10 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <TableWithFixedColumn
              rows={rows.reverse()}
              columns={columns}
              maxWidth={1100}
              maxHeight={450}
            />
          </Box>
        </Grid>
        {openModalListUser && (
          <ModalResultManage
            close={handleCloseModalListUser}
            comId={comId}
            type='listUsers'
          />
        )}
      </Grid>
    </LayoutAdmin>
  )
}

export default ResultManage
