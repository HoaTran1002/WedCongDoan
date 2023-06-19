import * as React from 'react'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { getAllDep } from '~/api/departmentApi'
import axios from 'axios'
// import BasicModal from './ModalEditUser'
import useFetch from '~/hook/Fetch'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import CircularProgress from '@mui/material/CircularProgress';
import BasicModal from './ModalEditDep'
import { Delete } from '~/api/departmentApi'

interface Department {
  depId: number,
  depName: string
}
const TableDepartment = (): JSX.Element => {
  const [response, err, loader] = useFetch(getAllDep)
  const [reset, setReset] = React.useState(false)
  const [id, setId] = React.useState<number>(0)
  const [res, error, loading] = useFetch(Delete(id))
  const [open, setOpen] = React.useState(false);
  const deps = response?.data
  if (response) {
    console.log(response.data)
  }
  if (err) {
    console.log(err)
  }
  if (loader) {
    console.log(loader)
  }
  const rows =
    deps?.map((dep: Department) => ({
      id: dep.depId,
      depName: dep.depName
    })) || []

  const handleDelete = (id: number): void => {
    setOpen(true)
    setId(id);
  }
  const handelReset = (): void => {
    if (reset) {
      setReset(false)
    } else {
      setReset(true)
    }
  }
  const handleClose = (): any => {
    setOpen(false);
  };
  const handleOK = (): any => {
    if (reset) {
      setReset(false)
    } else {
      setReset(true)
    }
    axios.delete(`/Departments?id=${id}`)
      .then((res) => {
        console.log(res.data);
        console.log('Xóa thành công');
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
      
  }
  React.useEffect(() => {
    if (response) {
      console.log(response.data)
    }
  }, [response]);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID ', width: 200 },
    { field: 'depName', headerName: 'Tên chuyên ngành', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params: any) => [
        <BasicModal
          key={1}
          id={params.row.id}
          depName={params.row.depName}
        />,
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
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Thông tin "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
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
      {loader == true ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Button onClick={handelReset} variant='contained' startIcon={<FlipCameraAndroidIcon />}>
            {' '}
            Reset{' '}
          </Button>
          <div style={{ height: 400, width: '100%' }}>
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
