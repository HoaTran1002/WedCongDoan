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
  DialogActions,Tooltip
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
import MessageAlert from '~/components/MessageAlert'
import SearchIcon from '@mui/icons-material/Search';
import { TableWithFixedColumn, ColumnsProps } from '~/components/TableFixed'

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
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = React.useState('')
  const [severity, setSeverity] = React.useState('')

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
  }
  // ========================================
  const handelOpenAdd = (): void => {
    setAddOpen(true)
    setPrizeName('')
  }
  const handelAddOk = (): void => {
    callInsertPrize(async () => {
      await InsertPrize(requestDataInsert)
      setLoading(!loading)
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
        console.log(error)
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
        console.log(error)
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
  }, [addOpen, editOpen, deleteOpen, loading])
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
    allPrize?.payload?.map((prize: Prize) => ({
      id: prize.priId,
      priName: prize.priName
    })) || []
  const columns: ColumnsProps[] = [
    { field: 'id', headerName: 'ID ' },
    { field: 'priName', headerName: 'Tên giải thưởng' },
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
              onClick={(): void =>
                handleEditOpen(params.id, params.priName)
              }
            >
              <EditIcon />
            </Button>

          </Tooltip>
          <Dialog
            open={editOpen}
            // open={editOpen}
            // onClose={handelEditClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Sửa tên giải thưởng '}
            </DialogTitle>
            <DialogContent>
              <div style={{ margin: '10px 0' }}>
                <TextField
                  defaultValue={prizeName}
                  onChange={onchangePriName}
                  id='outlined-basic'
                  label='Tên giải thưởng'
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
              onClick = {():void => handleDeleteOpen(params.id)}
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
            {'Xóa giải thưởng'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Bạn muốn xóa giải thưởng này ?
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
            {/* <Box
                    sx={{
                      display:"flex",
                      borderBottom:"1px solid #0057c1",
                      gap:"10px"
                    }}
                    onKeyDown={handleKeyPressEnter}
                  >
                    <Box 
                      component='input'
                      value={compSearch}
                      sx={{
                        fontSize:"18px",
                        border:"none",
                        outline:"none"
                      }}
                      placeholder='Tìm giải thưởng'
                      onChange={(e):void=>setCompSearch(e.target.value)}
                    />
                    <Box
                      onClick={handleSearch}
                    >
                      <SearchIcon/>
                    </Box>
                  </Box> */}
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
              >Thêm giải thưởng</span>

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
              isLoading={allPrize.loading}
              rows={prizes}
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
          {'Thêm giải thưởng '}
        </DialogTitle>
        <DialogContent>
          <div style={{ margin: '10px 0' }}>
            <TextField
              onChange={onchangePriName}
              id='outlined-basic'
              label='Tên giải thưởng'
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
