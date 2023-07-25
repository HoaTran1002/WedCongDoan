import * as React from 'react'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'

import useFetch from '~/hook/useFetch'
import Button from '@mui/material/Button'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { deleteCompPrizes, getAllByComID } from '~/api/CompetitionsPrizesAPI'
import { getAllPrizeTypes } from '~/api/prizeTypesApi'
import ModalAdd from '~/components/ModalAdd'
import { Box, Snackbar } from '@mui/material'
import TextFields from './TextFields'
import { useParams } from 'react-router-dom'
import MuiAlert from '@mui/material/Alert'
import BasicModal from './ModalEdit'
import { getAllPrize } from '~/api/prizesApi'
import { Loader } from '~/components/loader'
import { useState } from 'react'
import MessageAlert from '~/components/MessageAlert'
import ModalDelete from '~/components/ModalDelete'
import { padding } from '@mui/system'

interface CompPrizes {
  cpid: number
  priId: number
  comId: number
  priTid: number
  quantity: number
  prizeDetail: string
}
interface ILoadingContext {
  statusLoading: boolean
  setLoading: () => void
  setMessageEdit?: () => void
  setMessageAdd?: () => void
}
export const LoadingContext = React.createContext<ILoadingContext>({
  statusLoading: false,
  setLoading: (): void => {
    return
  },
  setMessageEdit: (): void => {
    return
  },
  setMessageAdd: (): void => {
    return
  }
})
const PrizeData = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [deleteCompPrizState, callDelete] = useFetch()
  const [stateCompPri, callCompPrize] = useFetch()
  const [prizeType, callPrizeTypes] = useFetch()
  const [prizeState, callPrizes] = useFetch()
  const [change, setChange] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<string>('')
  const { comId } = useParams()
  const handleChange = (): void => {
    setChange((r) => !r)
  }
  const paramId: { id: string } = { id: comId ? comId : '' }
  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (comId) {
        callCompPrize(async (): Promise<void> => {
          return getAllByComID(paramId)
        })
      }
    }

    fetchData()
  }, [change, comId, loading])

  React.useEffect(() => {
    callPrizeTypes(getAllPrizeTypes)
  }, [change])
  React.useEffect(() => {
    callPrizes(getAllPrize)
  }, [change, loading])

  const CompPrizes = stateCompPri?.payload
  const prizeTypes = prizeType?.payload
  const prizes = prizeState?.payload

  const handleDelete = async (id: string): Promise<void> => {
    const request: { _id: string } = {
      _id: id
    }

    try {
      await callDelete(async (): Promise<void> => {
        await deleteCompPrizes(request)
      })
      setSeverity('info')
      setMessage('đã xoá giải thưởng!')
      setLoading(!loading)
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
      width: 175,
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

        <ModalDelete
          key={params.row.id}
          callBack={(): void => {
            handleDelete(params.id)
          }}
          content={'xoá giải thưởng này?'}
          question={'cảnh báo!!'}
        />
        // <GridActionsCellItem
        //   key={2}
        //   icon={<DeleteIcon />}
        //   label='Delete'
        //   onClick={(): void => {
        //     handleDelete(params.id)
        //     setChange((r) => !r)
        //   }}
        // />
      ]
    }
  ]
  if (message != null) {
    setTimeout(async (): Promise<void> => {
      await setMessage('')
    }, 3000)
  }

  const loadingParams: ILoadingContext = {
    statusLoading: loading,
    setLoading: () => {
      setLoading(!loading)
    },
    setMessageEdit: (): void => {
      setSeverity('info')
      setMessage('chỉnh sửa thành công')
    },
    setMessageAdd: (): void => {
      setSeverity('success')
      setMessage('đã thêm giải thưởng!')
    }
  }
  return (
    <LoadingContext.Provider value={loadingParams}>
      <>
        {message && <MessageAlert message={message} severity={severity} />}
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
            Acction successful!
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
            Acction Failed!
          </MuiAlert>
        </Snackbar>
        <LayoutAdmin>
          <>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                mt: 3,
                color: '#1976d2',
                fontWeight: '500',
                fontSize: '30px'
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
                    {(handleClose): JSX.Element => (
                      <TextFields
                        handleChange={handleChange}
                        edit={false}
                        cpid={''}
                        priId={''}
                        comId={''}
                        priTid={''}
                        quantity={''}
                        prizeDetail={''}
                        // close={handleClose}
                      />
                    )}
                  </ModalAdd>
                </Box>
                <div
                  style={{
                    height: 400,
                    width: '100%',
                    backgroundColor: 'white'
                  }}
                >
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
    </LoadingContext.Provider>
  )
}

export default PrizeData
