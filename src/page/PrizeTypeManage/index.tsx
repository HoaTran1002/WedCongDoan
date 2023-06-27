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
import axios from '~/api/axios'
import CircularProgress from '@mui/material/CircularProgress'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'

//================================
interface Prize {
  priTid: number
  priTname: string
}
//===================================

const Index = (): JSX.Element => {
  const [load, setLoad] = React.useState<boolean>(true)
  const [data, setData] = React.useState<any>()
  const [prizeTName, setPrizeTName] = React.useState<string>()
  const [prizeTId, setPrizeTId] = React.useState<number>()
  const [addOpen, setAddOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  // ==========================================
  const onchangePriName = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPrizeTName(event.target.value)
  }
  // ========================================
  const handelOpenAdd = (): void => {
    setAddOpen(true)
    setPrizeTName('')
  }
  const handelAddOk = (): void => {
    const newData = {
      priTname: prizeTName
    }
    axios
      .post('/PrizeTypes', newData)
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
    setPrizeTId(id)
    setDeleteOpen(true)
  }
  const handleClose = (): any => {
    setDeleteOpen(false)
  }
  const handleDeleteOK = (): void => {
    axios
      .delete(`/PrizeTypes?id=${prizeTId}`)
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
    setPrizeTId(id)
    setPrizeTName(name)
    setEditOpen(true)
  }

  const handelEditOk = (): void => {
    const newData = {
      priTid: prizeTId,
      priTname: prizeTName
    }
    console.log(newData)
    axios
      .put('/PrizeTypes', newData)
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
      .get(`/PrizeTypes`)
      .then((res) => {
        console.log(res.data)
        const rows =
          res.data?.map((prize: Prize) => ({
            id: prize.priTid,
            priName: prize.priTname
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
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Sửa tên loại giải thưởng '}
            </DialogTitle>
            <DialogContent>
              <div style={{ margin: '10px 0' }}>
                <TextField
                  defaultValue={prizeTName}
                  onChange={onchangePriName}
                  id='outlined-basic'
                  label='Tên loại giải thưởng'
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
              {'Xóa tên loại giải thưởng'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Bạn muốn xóa loại giải thưởng này ?
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
              <h1 className='color-primary'>Quản lý loại giải thưởng</h1>
              <div>
                <Button
                  onClick={handelOpenAdd}
                  variant='contained'
                  startIcon={<AddIcon />}
                >
                  Thêm loại giải thưởng
                </Button>
                <Dialog
                  open={addOpen}
                  onClose={handleClose}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>
                    {'Loại giải thưởng mới'}
                  </DialogTitle>
                  <DialogContent>
                    <div style={{ margin: '10px 0' }}>
                      <TextField
                        onChange={onchangePriName}
                        id='outlined-basic'
                        label='Tên loại giải'
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
            <div
              style={{ height: 400, width: '100%', backgroundColor: 'white' }}
            >
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
