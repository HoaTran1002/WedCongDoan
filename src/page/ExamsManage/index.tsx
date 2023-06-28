import React, { useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import image from '~/assets/img/competion-1.jpg'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { Button, SxProps, Stack, Grid, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { getAllExam, EditExam, DeleteExam} from '~/api/exam'
import useFetch from '~/hook/useFetch'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'

//================================
interface Exam {
    examId: number,
    examName: string
}
//===================================

const Index = (): JSX.Element => {
    const [examName, setExamName] = React.useState<string>('')
    const [examId, setExamId] = React.useState<number>(0)
    const [addOpen, setAddOpen] = React.useState(false)
    const [editOpen, setEditOpen] = React.useState<boolean>(false)
    const [deleteOpen, setDeleteOpen] = React.useState(false)
    const [allExam,callAllExam] = useFetch();
    const [editExam,callEditExam] = useFetch();
    const [deleteExam,callDeleteExam] = useFetch();

    const requestData: {
        examId: number 
        examName: string
      } = {
        examId: examId,
        examName: examName
    }

    // ==========================================
    const onchangeExamName = function (event: React.ChangeEvent<HTMLInputElement>): void {
        setExamName(event.target.value)
    }
    // ========================================
    const handelOpenAdd = (): void => {
        setAddOpen(true)
        setExamName('')
    }
    const handelAddOk = (): void => {
        const newData = {
            examName: examName
        }
        axios.post('/Exams', newData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setAddOpen(false)
    }
    const handelAddClose = (): void => {
        setAddOpen(false)
    }
    //=======================================
    const handleDeleteOpen = (id: number): void => {
        setExamId(id)
        setDeleteOpen(true)
    }
    const handleClose = (): any => {
        setDeleteOpen(false);
    };
    const handleDeleteOK= (): void => {
        const request: { _id: number } = {
            _id: examId
          }
          callDeleteExam(async () => {
            try {
              await DeleteExam(request)
            } catch (error) {
              console.log('thất bại')
            }
          })
        setDeleteOpen(false)
    }
    //=========================================
    const handleEditOpen = (id:number,name:string):void =>{
        setExamId(id)
        setExamName(name)
        setEditOpen(true)
    }

    const handelEditOk = (): void => {
        callEditExam(async () => {
            try {
                await EditExam(requestData)
            } catch (error) {
                console.log('Thất bại')
            }
        })
        setEditOpen(false)
    }
    const handelEditClose = (): void => {
        if(editOpen){
            setEditOpen(false)
        }
    }

    


    React.useEffect(() => {
        const fetchData = async () :Promise<any> => {
            try {
              const data = await getAllExam();
              callAllExam(() => Promise.resolve(data));
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
    }, [addOpen,editOpen,deleteOpen]);
    React.useEffect(() => {
        const fetchData = async () :Promise<any> => {
            try {
              await callAllExam(getAllExam)
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
    }, []);
    const exams: Exam[] = allExam.payload?.map((exam: Exam) => ({
        id: exam.examId,
        examName: exam.examName
      })) || []
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID ', width: 200 },
        { field: 'examName', headerName: 'Tên đề thi', width: 200 },
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
                        onClick={(): any => handleEditOpen(params.row.id,params.row.examName)}
                    />
                    <Dialog
                        open={editOpen}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Sửa tên đề thi "}
                        </DialogTitle>
                        <DialogContent>
                        <div style={{margin:"10px 0"}}>
                            <TextField
                                defaultValue={examName}
                                onChange={onchangeExamName}
                                id='outlined-basic'
                                label='Tên đề thi'
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
                </>
                ,
                <>
                    <GridActionsCellItem
                        key={2}
                        icon={<DeleteIcon />}
                        label='Delete'
                        onClick={(): void => handleDeleteOpen(params.row.id)}
                    />
                    <Dialog
                        open={deleteOpen}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Xóa đề thi "}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Bạn muốn xóa đề thi này ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={():any=>handleDeleteOK()} variant='contained'>
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
                {allExam.loading == true ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                    <h1 className='color-primary text-center'>Quản lý đề thi</h1>
                        <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
                            <div>
                                <Button onClick={handelOpenAdd} variant='contained' startIcon={<AddIcon />}>
                                    Thêm đề thi
                                </Button>
                                <Dialog
                                    open={addOpen}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Đề thi mới"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <div style={{margin:"10px 0"}}>
                                            <TextField
                                                onChange={onchangeExamName}
                                                id='outlined-basic'
                                                label='Tên đề thi'
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
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={exams}
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