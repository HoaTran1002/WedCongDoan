import * as React from 'react'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { deleteDepartmentsById, getAllDep } from '~/api/departmentApi'
import useFetch from '~/hook/useFetch'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import CircularProgress from '@mui/material/CircularProgress'
import BasicModal from './ModalEditDep'
import {Loader} from '~/components/loader'

interface Department {
  depId: number
  depName: string
}
const TableDepartment = (): JSX.Element => {
  const [reset, setReset] = React.useState(false)
  const [id, setId] = React.useState<number>(0)
  const [open, setOpen] = React.useState(false)
  const [depState, getAllDepCall] = useFetch()
  const [depDeleteState, deleteDepByIdCall] = useFetch()
  const deps = depState.payload
  
  const rows =
  deps?.map((dep: Department) => ({
    id: dep.depId,
    depName: dep.depName
  })) || []
  
  const handleDelete = (id: number): void => {
    setOpen(true)
    setId(id)   
  }
  const handelReset = (): void => {
    if (reset) {
      setReset(false)
    } else {
      setReset(true)
    }
  }
  const handleClose = (): any => {
    setOpen(false)
  }
  const handleOK = (): any => {
    if (reset) {
      setReset(false)
    } else {
      setReset(true)
    }
    const request: { _id: number } = { _id: id }
    deleteDepByIdCall(async () => {
      await deleteDepartmentsById(request)
      window.location.reload()
    })
  }
  
  React.useEffect(() => {
    getAllDepCall(getAllDep)
  }, [reset])
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID ', width: 200 },
    { field: 'depName', headerName: 'Tên chuyên ngành', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params: any) => [
        <BasicModal key={1} id={params.row.id} depName={params.row.depName} />,
        <>
          <GridActionsCellItem
            key={2}
            icon={<DeleteIcon />}
            label='Delete'
            onClick={(): void => handleDelete(params.row.id)}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{'Thông tin '}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Bạn muốn xóa chuyên ngành này ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOK} variant='contained'>
                OK
              </Button>
              <Button onClick={handleClose}>Trở về</Button>
            </DialogActions>
          </Dialog>
        </>
      ]
    }
  ]
  return (
    <>
      {depState.loading == true ? (
        <Loader />
      ) : (
        <>
          <Button
            onClick={handelReset}
            variant='contained'
            startIcon={<FlipCameraAndroidIcon />}
          >
            Reset
          </Button>
          <div style={{ height: 400, width: '100%',backgroundColor:"white" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 6 }
                }
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </>
      )}
    </>
  )
}

export default TableDepartment
