import * as React from 'react'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteUsers } from '~/api/userApi'
import useFetch from '~/hook/useFetch'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { deleteCompPrizes, getAllByComID } from '~/api/CompetitionsPrizesAPI'
import { getAllPrizeTypes } from '~/api/prizeTypesApi'
import ModalAdd from '~/components/ModalAdd'
import { Box , Snackbar } from '@mui/material'
import TextFields from './TextFields'
import { useParams } from 'react-router-dom'
import MuiAlert from '@mui/material/Alert'
import BasicModal from './ModalEdit'
import { getAllPrize} from '~/api/prizesApi'
import { Loader } from '~/components/loader'
import MessageAlert from '~/components/MessageAlert'

interface CompPrizes {
  cpid: number
  priId: number
  comId: number
  priTid: number
  quantity: number
  prizeDetail: string
}

const PrizeData = (): JSX.Element => {
  const [message, setMessage] = React.useState<string>('')
  const [severity, setSeverity] = React.useState<string>('')
  const [deleteCompPrizState, callDelete] = useFetch()
  const [stateCompPri, callCompPrize] = useFetch()
  const [prizeType, callPrizeTypes] = useFetch()
  const [prizeState, callPrizes] = useFetch()
  const [change, setChange] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false);
  const [idPrize,setIdPrize] = React.useState('')
  const { comId } = useParams()

  const CompPrizes = stateCompPri?.payload
  const prizeTypes = prizeType?.payload
  const prizes = prizeState?.payload
  const paramId: { id: string } = { id: comId ? comId : '' }
  const handleChange =():void=>{
    setChange(r=>!r)
  }
  const handleClickOpenDelete = (id:string):void => {
    setIdPrize(id)
    setOpenDelete(true);
  };

  const handleCloseDelete = ():void => {
    setChange(r=>!r)
    setOpenDelete(false);
  };
  const showNotification = (message:string, severity:string):void => {
    setMessage(message);
    setSeverity(severity);
  };
  const handleDelete = (id: string): void => {
    const request: { _id: string } = {
      _id: id
    }
    try {
      callDelete(async () => {
        deleteCompPrizes(request)
      })
      showNotification('Xóa thành công','success')
    } catch (error) {
      showNotification('Xóa thất bại','error')
    }
    setChange(r=>!r)
    setOpenDelete(false);
  }

  const getPrizeTypeName = (priTid: number): string => {
    const prizeType = prizeTypes?.find((type: any) => type.priTid === priTid)
    return prizeType?.priTname || 'chưa có loại giải'
  }

  const getPrizeName = (PriID: number): string => {
    const prize = prizes?.find((type: any) => type.priId === PriID)
    return prize?.priName || 'chưa có giải'
  }
  
  const rows =
    CompPrizes?.map((compPri: CompPrizes) => ({
      id: compPri.cpid,
      PriID: getPrizeName(compPri.priId),
      PriIDNumber: compPri.priId,
      ComID: compPri.comId,
      PrizTID: getPrizeTypeName(compPri.priTid),
      PrizTIDNumber: compPri.priTid,
      Quantity: compPri.quantity,
      PrizeDetail: compPri.prizeDetail
    })) || []
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'PrizTID', headerName: 'Loại Giải Thưởng', width: 200 },
    { field: 'PriID', headerName: 'Tên Giải Thưởng', width: 200 },
    {
      field: 'Quantity',
      headerName: 'Số Lượng',
      width: 200
    },
    {
      field: 'PrizeDetail',
      headerName: 'Chi Tiết Giải Thưởng',
      width: 300,
      renderCell: (params) => (
        <div
          style={{
            width: '300px',
            maxHeight: '100%',
            overflow: 'visible',
            whiteSpace: 'pre-wrap'
          }}
        >
          {params.value}
        </div>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params: any) => [
        <BasicModal
          handleChange={handleChange}
          key={params.row.id}
          comId={params.row.ComID}
          cpid={params.row.id}
          PrizTId={params.row.PrizTIDNumber}
          priId={params.row.PriIDNumber}
          Quantity={params.row.Quantity}
          PrizeDetail={params.row.PrizeDetail}
          id={''}
        />,
        <GridActionsCellItem
          key={2}
          icon={<DeleteIcon />}
          label='Delete'
          onClick={(): void =>handleClickOpenDelete(params.id)}
        />
      ]
    }
  ]
  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (comId) {
        callCompPrize(async (): Promise<void> => {
          return getAllByComID(paramId)
        })
      }
    }
    fetchData()
  }, [change, comId])

  React.useEffect(() => {
    callPrizeTypes(getAllPrizeTypes)
  }, [change])
  React.useEffect(() => {
    callPrizes(getAllPrize)
  }, [change])
  return (
    <>
      {message && <MessageAlert message={message} severity={severity}/>}
      <LayoutAdmin>
        <>
          <Box
            sx={{
              width:"100%",
              display:"flex",
              justifyContent:"center",
              mt:3,
              color:"#1976d2",
              fontWeight:"500",
              fontSize:"30px"
            }}
          >
            Quản lý phần thưởng cuộc thi
          </Box>
            {stateCompPri.loading || deleteCompPrizState.loading ? (
              <Loader />
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1
                  }}
                >
                  <ModalAdd Title='Thêm Giải Thưởng'>
                    {(handleClose):JSX.Element =>  (
                      <TextFields
                        handleChange={handleChange}
                        edit={false}
                        cpid={''}
                        priId={''}
                        comId={''}
                        priTid={''}
                        quantity={''}
                        prizeDetail={''}
                        close={handleClose}
                        showNotification={showNotification}
                      />
                    )}
                  </ModalAdd>
                </Box>
                <div style={{ height: 400, width: '100%',backgroundColor:"white" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                      }
                    }}
                    checkboxSelection
                    pageSizeOptions={[5, 10]}
                  />
                </div>
              </>
            )}
        </>
      </LayoutAdmin>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thông báo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa giải thưởng này 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={():void=>handleDelete(idPrize)} variant='outlined'>
            Xóa
          </Button>
          <Button onClick={handleCloseDelete}>Trở về</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PrizeData