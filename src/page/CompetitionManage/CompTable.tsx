import React, { useState } from 'react'
import {
  Grid,
  Button,
  Tooltip,
  Snackbar
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '~/hook/useFetch'
import {
  getAllComp,
  UpdateIsDeleted
} from '~/api/competitionApi'
import SearchIcon from '@mui/icons-material/Search';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined'
import { getAllDep } from '~/api/depApi'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import MuiAlert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import { TableWithFixedColumn, ColumnsProps } from '~/components/TableFixed'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { formatDay } from '~/utils/dateUtils'
import useAuth from '~/hook/useAuth'
import { ICompetition,IDepartment } from '~/interface/Interface'
import { listWhenSearchDeepCheck } from '~/utils/stringUtils'
import ModalMessage from '~/components/ModalMessage'
const CompTable = (): JSX.Element => {
  const navigate = useNavigate();
  const {profile} = useAuth()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [compState, callComp] = useFetch()
  const [deps, depCall] = useFetch()
  const [deleteComp, deleteCompCall] = useFetch()
  const [openDelete, setOpenDelete] = React.useState(false)
  const [compId, setComId] = React.useState<number>(0)
  const depList = deps.payload || []
  const [loading, setLoading] = useState<boolean>(false)
  const [compSearch,setCompSearch] = React.useState<string>('')
  const [listCompetition,setListCompetition] = React.useState<any[]>([])
  
  const getNameDep = (idDep: number): string => {
    try {
      const dep: IDepartment = depList?.find((item: any) => item.depId == idDep)
      return dep.depName || 'null'
    } catch (error) {
      console.log(error)
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

  const handleSearch=():void=>{
    
    setListCompetition(
      listWhenSearchDeepCheck(compSearch,rows,'comName')
    )

    setCompSearch('')
  }
  const handleKeyPressEnter = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };
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
  const rows = compState?.payload
    ?.filter((item: ICompetition) =>   
    item.isDeleted !== 1
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
  React.useEffect(() => {
    depCall(getAllDep)
  }, [loading])
  React.useEffect(() => {
    callComp(getAllComp)
    
  }, [loading])
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
  return (
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
        <Box 
          sx={{
            backgroundColor:"white",
            borderRadius:"3px",
            padding:"10px",
            display:"flex",
            alignItems:{md:"center",xs:"flex-start"},
            gap:"30px",
            flexDirection:{md:"row",xs:"column"},
            m:"0 20px" 
          }}
        >
          <Box
            sx={{
              display:"flex",
              borderBottom:"1px solid #0057c1",
              gap:"10px",
              width:{xs:"100%",md:"auto"}
            }}
            onKeyDown={handleKeyPressEnter}
          >
            <Box 
              component='input'
              value={compSearch}
              sx={{
                fontSize:"18px",
                border:"none",
                outline:"none",
                width:{xs:"100%"}
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
          <Box
            sx={{
              display:"inline-flex",
              alignItems:"center",
              position:"relative",
              cursor:profile?.roleId === 1?"pointer":"default",
              borderRadius:"3px",
              transition:"all linear 0.2s",
              opacity:profile?.roleId === 1 ?'1':"0.5"
            }}
            onClick={():void=>{
              if(profile?.roleId === 1){
                navigate('/CompetitionCreate')
              }else return
            }}
          >
            <span
              className='icon-button'
              style={{
                transition:"all linear 0.2s",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"#007ecd",
                color:"white",
                padding:"5px",
              }}
            ><AddIcon/></span>
            <span
              style={{
                backgroundColor:"#def5ff",
                height:"100%",
                color:"#002fa7",
                fontWeight:"500",
                padding:"5px",
              }}
            >Thêm cuộc thi</span>
            
          </Box>
        </Box>
        <Box
          sx={{
            mt:"20px"
          }}
          >
            <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width:"100%",
                }}
              >
                <TableWithFixedColumn
                  isLoading={compState.loading || deps.loading}
                  rows={listCompetition}
                  columns={columns}
                  maxWidth={'95%'}
                  maxHeight={'65vh'}
                  numberItems={6}
                />
              </Box>
          </Box>
          <ModalMessage 
            open={openDelete}
            close={handleCloseDelete}
            header={'Thông báo'}
            title={'Bạn có chắc muốn xóa cuộc thi này?'}
            handleOK={(): void => handelDeleteComp(compId)}
          />
    </>
  )
}

export default CompTable
