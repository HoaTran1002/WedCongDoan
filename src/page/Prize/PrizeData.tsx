import * as React from 'react'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteUsers } from '~/api/userApi'
import useFetch from '~/hook/useFetch'
import Button from '@mui/material/Button'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { deleteCompPrizes, getAllByComID } from '~/api/CompetitionsPrizesAPI'
import { getAll } from '~/api/prizeTypesApi'
import ModalAdd from '~/components/ModalAdd'
import { Box } from '@mui/material'
import TextFields from './TextFields'
import { useParams } from 'react-router-dom'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import BasicModal from './ModalEdit'
import { getAllPrizes } from '~/api/prizesApi'

interface CompPrizes {
  cpid: number
  priId: number
  comId: number
  priTid: number
  quantity: number
  prizeDetail: string
}

const PrizeData = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [reset, setReset] = React.useState(false)
  const [deleteCompPrizState, callDelete] = useFetch()
  const [stateCompPri, callCompPrize] = useFetch()
  const [prizeType, callPrizeTypes] = useFetch()
  const [prizeState, callPrizes] = useFetch()

  const { comId } = useParams()

  const paramId: { id: string | undefined } = { id: comId }
  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (comId) {
        callCompPrize(async (): Promise<void> => {
          return getAllByComID(paramId)
        })
      }
    }

    fetchData()
  }, [reset, comId])

  React.useEffect(() => {
    callPrizeTypes(getAll)
  }, [reset])
  React.useEffect(() => {
    callPrizes(getAllPrizes)
  }, [reset])

  const CompPrizes = stateCompPri?.payload
  const prizeTypes = prizeType?.payload
  const prizes = prizeState?.payload

  const handleDelete = (id: string): void => {
    const request: { _id: string } = {
      _id: id
    }

    // Thực hiện xóa hàng dữ liệu với ID tương ứng

    try {
      callDelete(async () => {
        deleteCompPrizes(request)
      })
      setShowSuccess(true)
    } catch (error) {
      setShowError(true)
    }
  }
  const getPrizeTypeName = (priTid: number): string => {
    const prizeType = prizeTypes?.find((type: any) => type.priTid === priTid)
    return prizeType?.priTname || 'chưa có loại giải'
  }
  const getPrizeName = (PriID: number): string => {
    const prize = prizes?.find((type: any) => type.priId === PriID)
    return prize?.priName || 'chưa có loại giải'
  }
  const handelReset = (): void => {
    if (reset) {
      setReset(false)
    } else {
      setReset(true)
    }
  }
  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
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
        <div style={{ width: '300px', maxHeight: '100%', overflow: 'visible', whiteSpace: 'pre-wrap' }}>
          {params.value}
        </div>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params: any) => [
        // <GridActionsCellItem key={1} icon={<EditIcon />} label='Edit' />,

        <BasicModal
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
          onClick={(): void => handleDelete(params.id)}
        />
      ]
    }
  ]
  return (
    <>
      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <MuiAlert onClose={handleCloseSuccess} severity='success' elevation={6} variant='filled'>
          Acction successful!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={showError} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <MuiAlert onClose={handleCloseError} severity='error' elevation={6} variant='filled'>
          Acction Failed!
        </MuiAlert>
      </Snackbar>
      <LayoutAdmin>
        <>
          {stateCompPri.loading || deleteCompPrizState.loading ? (
            <h1>đang tải xuống ...</h1>
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
                <Button onClick={handelReset} variant='contained' startIcon={<FlipCameraAndroidIcon />}>
                  Reset
                </Button>
                <ModalAdd Title='Thêm Giải Thưởng'>
                  <TextFields edit={false} priId={''} comId={''} priTid={''} quantity={''} prizeDetail={''} />
                </ModalAdd>
              </Box>

              <div style={{ height: 400, width: '100%' }}>
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
    </>
  )
}

export default PrizeData
