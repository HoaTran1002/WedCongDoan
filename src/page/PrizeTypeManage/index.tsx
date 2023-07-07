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
import { Link } from 'react-router-dom'
import axios from '~/api/axios'
import CircularProgress from '@mui/material/CircularProgress'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import useFetch from '~/hook/useFetch'
import {
  getAllPrizeTypes,
  InsertPrizeTypes,
  DeletePrizeTypes,
  EditPrizeTypes
} from '~/api/prizeTypesApi'

//================================
interface PrizeType {
  priTid: number
  priTname: string
}
//===================================

const Index = (): JSX.Element => {
  const [prizeTName, setPrizeTName] = React.useState<string>('')
  const [prizeTId, setPrizeTId] = React.useState<number>(0)
  const [addOpen, setAddOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [allPrizeT, callAllPrizeT] = useFetch()
  const [editPrizeT, callEditPrizeT] = useFetch()
  const [deletePrizeT, callDeletePrizeT] = useFetch()
  const [insertPrizeT, callInsertPrizeT] = useFetch()

  const requestDataEdit: {
    priTid: number
    priTname: string
  } = {
    priTid: prizeTId,
    priTname: prizeTName
  }

  const requestDataInsert: {
    priTname: string
  } = {
    priTname: prizeTName
  }

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
    callInsertPrizeT(async () => {
      try {
        await InsertPrizeTypes(requestDataInsert)
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
    setPrizeTId(id)
    setDeleteOpen(true)
  }
  const handleClose = (): any => {
    setDeleteOpen(false)
  }
  const handleDeleteOK = (): void => {
    const request: { _id: number } = {
      _id: prizeTId
    }
    callDeletePrizeT(async () => {
      try {
        await DeletePrizeTypes(request)
      } catch (error) {
        console.log('thất bại')
      }
    })
    setDeleteOpen(false)
  }
  //=========================================
  const handleEditOpen = (id: number, name: string): void => {
    setEditOpen(true)
    setPrizeTId(id)
    setPrizeTName(name)
  }

  const handelEditOk = (): void => {
    callEditPrizeT(async () => {
      try {
        await EditPrizeTypes(requestDataEdit)
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
        const data = await getAllPrizeTypes()
        callAllPrizeT(() => Promise.resolve(data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [addOpen, editOpen, deleteOpen])
  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        await callAllPrizeT(getAllPrizeTypes)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const prizesT: PrizeType[] =
    allPrizeT.payload?.map((prizeT: PrizeType) => ({
      id: prizeT.priTid,
      priTname: prizeT.priTname
    })) || []
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID ', width: 200 },
    { field: 'priTname', headerName: 'Tên giải thưởng', width: 200 },
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
              handleEditOpen(params.row.id, params.row.priTname)
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
        <>
          <h1 className='color-primary text-center'>
            Quản lý loại giải thưởng
          </h1>
          {allPrizeT.loading == true ? (
              <Box 
              sx={{
                 display: 'flex',
                 width:"100%",
                 height:"500px",
                 justifyContent:"center",
                 alignItems:"center"
              }}
            >
              <CircularProgress />
            </Box>
            ) : (
              <>
                <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
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
                </Stack>
                <div
                  style={{ height: 400, width: '100%', backgroundColor: 'white' }}
                >
                  <DataGrid
                    rows={prizesT}
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
            )
          }
        </>
      </>
    </LayoutAdmin>
  )
}

export default Index
