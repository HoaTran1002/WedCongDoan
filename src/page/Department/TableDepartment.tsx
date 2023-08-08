import * as React from 'react'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { deleteDepartmentsById, getAllDep } from '~/api/departmentApi'
import useFetch from '~/hook/useFetch'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import CircularProgress from '@mui/material/CircularProgress'
import BasicModal from './ModalEditDep'
import {Loader} from '~/components/loader'
import { TableWithFixedColumn,ColumnsProps } from '~/components/TableFixed'
import { IDepartment } from '~/interface/Interface'
import { LoadingContext } from '.'
const TableDepartment = (): JSX.Element => {
  const [reset, setReset] = React.useState(false)
  const [id, setId] = React.useState<number>(0)
  const [open, setOpen] = React.useState(false)
  const [depState, getAllDepCall] = useFetch()
  const [depDeleteState, deleteDepByIdCall] = useFetch()
  const deps = depState.payload
  const loadingParams = React.useContext(LoadingContext)
  const rows =
  deps?.map((dep: IDepartment) => ({
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
      loadingParams.setLoading()
    })
  }
  
  React.useEffect(() => {
    getAllDepCall(getAllDep)
  }, [loadingParams])
  const columns: ColumnsProps[] = [
    { field: 'id', headerName: 'ID ' },
    { field: 'depName', headerName: 'Tên chuyên ngành'},
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: any) => [
        <BasicModal key='edit' id={params?.id} depName={params?.depName} />,
        <>
          <Tooltip
            key='delete'
            title='Xóa'
            placement='top-start'
          >
            <Button
              style={{ width: 50 }}
              variant='outlined'
              color='error'
              onClick={(): void => handleDelete(params?.id)}
            >
              <DeleteIcon />
            </Button>
          </Tooltip >
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
    <TableWithFixedColumn
      rows={rows}
      columns={columns}
      isLoading={depState?.loading}
      maxWidth={'95%'}
      maxHeight={'65vh'}
    />
  )
}

export default TableDepartment
