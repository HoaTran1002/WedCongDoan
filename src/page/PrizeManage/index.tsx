import React, { useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import image from '~/assets/img/competion-1.jpg'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import {
  Button,
  SxProps,
  Stack,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { getAllPrizes } from '~/api/prizesApi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'

//================================
interface Prize {
  priId: number
  priName: string
}
//===================================

const Index = (): JSX.Element => {
  const [load, setLoad] = React.useState<boolean>(true)
  const [data, setData] = React.useState<any>()
  const [prizeName, setPrizeName] = React.useState<string>()
  const [prizeId, setPrizeId] = React.useState<number>()
  const [addOpen, setAddOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  // ==========================================
  const onchangePriName = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPrizeName(event.target.value)
    console.log(prizeName)
  }
  // ========================================
  const handelOpenAdd = (): void => {
    setAddOpen(true)
    setPrizeName('')
  }
  const handelAddOk = (): void => {
    const newData = {
      priName: prizeName
    }
    axios
      .post('/Prizes', newData)
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    setAddOpen(false)
  }
  const handelAddClose = (): void => {
    setAddOpen(false)
  }
  //=======================================
  const handleDeleteOpen = (id: number): void => {
    setPrizeId(id)
    setDeleteOpen(true)
  }
  const handleClose = (): any => {
    setDeleteOpen(false)
  }
  const handleDeleteOK = (): void => {
    axios
      .delete(`/Prizes?id=${prizeId}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    setDeleteOpen(false)
  }
  //=========================================
  const handleEditOpen = (id: number, name: string): void => {
    setPrizeId(id)
    setPrizeName(name)
    setEditOpen(true)
  }

  const handelEditOk = (): void => {
    const newData = {
      priId: prizeId,
      priName: prizeName
    }
    console.log(newData)
    axios
      .put('/Prizes', newData)
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    setEditOpen(false)
  }
  const handelEditClose = (): void => {
    if (editOpen) {
      setEditOpen(false)
    }
  }
  React.useEffect(() => {
    axios
      .get(`/Prizes`)
      .then((res) => {
        console.log(res.data)
        const rows =
          res.data?.map((prize: Prize) => ({
            id: prize.priId,
            priName: prize.priName
          })) || []
        setData(rows)
        setLoad(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [addOpen, editOpen, deleteOpen])
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID ', width: 200 },
    { field: 'priName', headerName: 'Tên giải thưởng', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params: any) => [
        <>
          <GridActionsCellItem
            key={1}
            icon={<EditIcon />}
            label='Edit'
            onClick={(): any =>
              handleEditOpen(params.row.id, params.row.priName)
            }
          />
          <Dialog
            open={editOpen}
            // open={editOpen}
            // onClose={handelEditClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Sửa tên chuyên ngành '}
            </DialogTitle>
            <DialogContent>
              <div style={{ margin: '10px 0' }}>
                <TextField
                  defaultValue={prizeName}
                  onChange={onchangePriName}
                  id='outlined-basic'
                  label='Tên chuyên ngành'
                  variant='outlined'
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handelEditOk} variant='contained'>
                OK
              </Button>
              <Button onClick={handelEditClose}>Trở về</Button>
            </DialogActions>
          </Dialog>
        </>,
        <>
          <GridActionsCellItem
            key={2}
            icon={<DeleteIcon />}
            label='Delete'
            onClick={(): void => handleDeleteOpen(params.row.id)}
          />
          <Dialog
            open={deleteOpen}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Xóa tên chuyên ngành'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Bạn muốn xóa chuyên ngành này ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(): any => handleDeleteOK()} variant='contained'>
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
    <LayoutAdmin>
      <>
        {load == true ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
              <h1 className='color-primary'>Quản lý giải thưởng</h1>
              <div>
                <Button
                  onClick={handelOpenAdd}
                  variant='contained'
                  startIcon={<AddIcon />}
                >
                  Thêm giải
                </Button>
                <Dialog
                  open={addOpen}
                  onClose={handleClose}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>
                    {'Thêm chuyên ngành '}
                  </DialogTitle>
                  <DialogContent>
                    <div style={{ margin: '10px 0' }}>
                      <TextField
                        onChange={onchangePriName}
                        id='outlined-basic'
                        label='Tên chuyên ngành'
                        variant='outlined'
                      />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handelAddOk} variant='contained'>
                      OK
                    </Button>
                    <Button onClick={handelAddClose}>Trở về</Button>
                  </DialogActions>
                </Dialog>
              </div>
              {/* <div>
                                <Button onClick={handelReset} variant='contained' startIcon={<FlipCameraAndroidIcon />}>
                                    Reset
                                </Button>
                            </div> */}
            </Stack>
            <div style={{ height: 400, width: '100%',backgroundColor:"white" }}>
              <DataGrid
                rows={data}
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
    </LayoutAdmin>
  )
}

export default Index
