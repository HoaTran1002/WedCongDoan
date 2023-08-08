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
import SearchIcon from '@mui/icons-material/Search';
const ResultManage = (): JSX.Element => {
  const [compState, callComp] = useFetch()
  const [deps, depCall] = useFetch()
  const [openModalListUser, setOpenModalListUser] =
    React.useState<boolean>(false)
  const [comId, setComId] = React.useState<number>(0)
  const [compSearch,setCompSearch] = React.useState<string>('')
  const [listCompetition,setListCompetition] = React.useState<any[]>([]) 

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


    const handleSearch=():void=>{
      setListCompetition(
        compState?.payload
          ?.filter((item: ICompetition) =>   
          item.isDeleted !== 1 &&
          item.comName.trim().toLowerCase()?.includes(compSearch.trim().toLowerCase())
        )
        ?.map((item: ICompetition) => ({
          comId: item.comId,
          comName: item.comName,
          startDate: formatDay(item.startDate),
          endDate: formatDay(item.endDate),
          examTimes: item.examTimes,
          userQuan: item.userQuan,
          depName: getNameDep(item.depId)
        }))
        .reverse()
      )
  
      setCompSearch('')
    }
    const handleKeyPressEnter = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter') {
        handleSearch()
      }
    };
  React.useEffect(() => {
    depCall(getAllDep)
  }, [])
  React.useEffect(() => {
    callComp(getAllComp)
  }, [])
  React.useEffect(()=>{
    setListCompetition(
      compState?.payload
      ?.filter((item: ICompetition) => item.isDeleted !== 1)
      .map((item: ICompetition) => ({
        comId: item.comId,
        comName: item.comName,
        startDate: formatDay(item.startDate),
        endDate: formatDay(item.endDate),
        examTimes: item.examTimes,
        userQuan: item.userQuan,
        depName: getNameDep(item.depId)
      })).reverse()
    )
  },[compState?.loading])
  return (
    <LayoutAdmin>
      <Grid container spacing={1}>
      <Grid item xs={12} style={{ margin: 10 }}>
              <Box 
                sx={{
                  backgroundColor:"white",
                  borderRadius:"3px",
                  padding:"10px",
                  display:"flex",
                  alignItems:"center",
                  gap:"30px"
                }}
              >
                <Box
                  sx={{
                    display:"flex",
                    borderBottom:"1px solid #0057c1",
                    gap:"10px"
                  }}
                  onKeyDown={handleKeyPressEnter}
                >
                  <Box 
                    component='input'
                    value={compSearch}
                    sx={{
                      fontSize:"18px",
                      border:"none",
                      outline:"none"
                    }}
                    placeholder='Tìm kiếm cuộc thi'
                    onChange={(e):void=>setCompSearch(e.target.value)}
                  />
                  <Box
                    onClick={handleSearch}
                  >
                    <SearchIcon/>
                  </Box>
                </Box>
              </Box>
            </Grid>
        <Grid item xs={12} style={{ margin: 10 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <TableWithFixedColumn
              rows={listCompetition}
              columns={columns}
              maxWidth={'95%'}
              maxHeight={'65vh'}
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
