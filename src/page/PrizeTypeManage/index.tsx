import React, { useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'

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
  DialogActions,
  Tooltip
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
import { TableWithFixedColumn,ColumnsProps } from '~/components/TableFixed'

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
  const columns: ColumnsProps[] = [
    { field: 'id', headerName: 'ID ' },
    { field: 'priTname', headerName: 'Tên loại giải thưởng'},
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: any) => [
        <>
          <Tooltip
            key='edit'
            title='Sửa'
            placement='top-start'
          >
            <Button
              style={{ width: 50 }}
              variant='outlined'
              onClick={(): any =>
                handleEditOpen(params.id, params.priTname)
              }
            >
              <EditIcon />
            </Button>

          </Tooltip>
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
          <Tooltip
            key='delete'
            title='Xóa'
            placement='top-start'
          >
            <Button
              style={{ width: 50 }}
              variant='outlined'
              color='error'
              onClick={(): void => handleDeleteOpen(params.id)}
            >
              <DeleteIcon />
            </Button>
          </Tooltip >
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
        <Grid
          container
          rowSpacing={1}
          sx={{ width: "100% !important" }}
        >
          <Grid item xs={12} style={{ margin: 10 }}>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "3px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "30px"
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: "3px",
                  transition: "all linear 0.2s",
                }}
                onClick={handelOpenAdd}
              >
                <span
                  className='icon-button'
                  style={{
                    transition: "all linear 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#007ecd",
                    color: "white",
                    padding: "5px",
                  }}
                ><AddIcon /></span>
                <span
                  style={{
                    backgroundColor: "#def5ff",
                    height: "100%",
                    color: "#002fa7",
                    fontWeight: "500",
                    padding: "5px",
                  }}
                >Thêm loại giải thưởng</span>

              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} style={{ margin: 0, padding: "0" }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: "100%",
            }}
          >
            <TableWithFixedColumn
              isLoading={allPrizeT?.loading}
              rows={prizesT}
              columns={columns}
              maxWidth={'95%'}
              maxHeight={'70vh'}
            />
          </Box>
        </Grid>
        </Grid>
              
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
        </>
    </LayoutAdmin>
  )
}

export default Index
