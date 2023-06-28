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
import {
  getAllPrize,
  EditPrize,
  InsertPrize,
  DeletePrize
} from '~/api/prizesApi'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import useFetch from '~/hook/useFetch'

//================================
interface Prize {
  priId: number
  priName: string
}
//===================================

const Index = (): JSX.Element => {
  const [prizeName, setPrizeName] = React.useState<string>('')
  const [prizeId, setPrizeId] = React.useState<number>(0)
  const [addOpen, setAddOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [allPrize, callAllPrize] = useFetch()
  const [editPrize, callEditPrize] = useFetch()
  const [deletePrize, callDeletePrize] = useFetch()
  const [insertPrize, callInsertPrize] = useFetch()

  const requestDataEdit: {
    priId: number
    priName: string
  } = {
    priId: prizeId,
    priName: prizeName
  }

  const requestDataInsert: {
    priName: string
  } = {
    priName: prizeName
  }

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
    callInsertPrize(async () => {
      try {
        await InsertPrize(requestDataInsert)
      } catch (error) {
        console.log(error)
      }
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
    const request: { _id: number } = {
      _id: prizeId
    }
    callDeletePrize(async () => {
      try {
        await DeletePrize(request)
      } catch (error) {
        console.log('thất bại')
      }
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
    callEditPrize(async () => {
      try {
        await EditPrize(requestDataEdit)
      } catch (error) {
        console.log('Thất bại')
      }
    })
    setEditOpen(false)
  }
  const handelEditClose = (): void => {
    if (editOpen) {
      setEditOpen(false)
    }
  }
  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        const data = await getAllPrize()
        callAllPrize(() => Promise.resolve(data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [addOpen, editOpen, deleteOpen])
  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        await callAllPrize(getAllPrize)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const prizes: Prize[] =
    allPrize.payload?.map((prize: Prize) => ({
      id: prize.priId,
      priName: prize.priName
    })) || []
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
        {allPrize.loading == true ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <h1 className='color-primary text-center'>Quản lý giải thưởng</h1>
            <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
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
            <div
              style={{ height: 400, width: '100%', backgroundColor: 'white' }}
            >
              <DataGrid
                rows={prizes}
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
