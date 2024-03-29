import UpdateIcon from '@mui/icons-material/Update'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import React, { useState, useEffect } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getBlogId, editBlog, deleteBlog } from '~/api/blogApi'
import {getAllComp} from '~/api/competitionApi'
import {getAllCompetitionBlog,EditCompetitionBlog,DeleteCompetitionBlog} from '~/api/CompetitionBlog'
import Dropzone from 'react-dropzone'
import useFetch from '~/hook/useFetch'
const Index = (): JSX.Element => {
  const navigate = useNavigate();
  
  const [blogName, setBlogName] = useState('')
  const [comBlogUserId, setComBlogUserId] = useState(0)
  const [userId, setUserId] = useState('')
  const [postDate, setPostDate] = useState('')
  const [blogDetai, setBlogDetai] = useState('')
  const [imgName, setImgName] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [imageFile, setImageFile] = useState<string | null>();
  const [selectedImage, setSelectedImage] = useState(null)
  const [comId,setComId] = useState<string>('');
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  const [blogId, setBlogId] = useState<number>(Number(id))
  const [EditBlog, callEditBlog] = useFetch()
  const [DeleteBlog, callDeleteBlog] = useFetch()
  const [DeleteComBlog, callDeleteComBlog] = useFetch()
  const [getBlog, callBlogById] = useFetch()
  const [getComs, callAllComs] = useFetch()
  const [getComBlogs, callAllComBlogs] = useFetch()
  
  const handleChange = (event: SelectChangeEvent): void => {
    setComId(event.target.value)
  }
  const handleContentChange = (value: string): any => {
    setBlogDetai(value)
  }
  const handleClickOpen = (): any => {
    setOpen(true)
  }

  const handleClickDelete = (): any => {
    const request: { _id: number } = {
      _id: blogId
    }

    const requestComBlog: { _id: number } = {
      _id: comBlogUserId
    }
    callDeleteComBlog(async () => {
      try {
        await DeleteCompetitionBlog(requestComBlog)
      } catch (error) {
        console.log(error)
      }
    })
    callDeleteBlog(async () => {
      try {
        await deleteBlog(request)
      } catch (error) {
        console.log(error)
      }
    })
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const handleDeleteOpen = (): void => {
    setOpenDelete(true)
  }
  const handleDeleteClose = (): void => {
    setOpenDelete(false)
  }

  const requestData: {
    blogId: number
    blogName: string
    blogDetai: string
    imgName: string
    imgSrc: string
  } = {
    blogId: blogId,
    blogName: blogName,
    blogDetai: blogDetai,
    imgName: imgName,
    imgSrc: imgSrc
  }


  const handleOK = (): void => {
    setOpen(false)
    callEditBlog(async () => {
      try {
        if (selectedImage) {
          const reader = new FileReader();
          reader.onload = async (): Promise<void> => {
            const imgSrc = reader.result as string;
            await editBlog({
              ...requestData,
              imgSrc: imgSrc.split(',')[1],
            });
          };
          reader.readAsDataURL(selectedImage);
        } else {
          await editBlog(requestData);
        }

        if (blogId) {
          await EditCompetitionBlog({
            id:comBlogUserId,
            comId: parseInt(comId),
            blogId: blogId,
            userId:userId,
            postDate: postDate
          });
        }
      } catch (error) {
        console.log(error)
      }
    })
  }
  const handleImageDrop = (acceptedFiles: any): any => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const imageFile = acceptedFiles[0]
      setSelectedImage(imageFile)
      setImageFile(URL.createObjectURL(imageFile))
      setImgName(imageFile.path)
      setImgSrc(imageFile.path)
    }
  };
  
  useEffect(() => {
    const request: { id: number } = { id: blogId };
    callBlogById(async () => {
      try {
        const response = await getBlogId(request);
        await setBlogName(response.blogName);
        await setBlogDetai(response.blogDetai);
        await setImgName(response.imgName);
        await setImgSrc(response.imgSrc);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);


  useEffect(() => {
    callAllComs(getAllComp);
  }, []);

  useEffect(() => {
    callAllComBlogs(getAllCompetitionBlog);
  }, []);

  useEffect(()=>{
    const listCompetitionBlog = getComBlogs?.payload || [];
    const competitionBlog = listCompetitionBlog.find((r:any)=>r.blogId === blogId)
    setComId(competitionBlog?.comId)
    setComBlogUserId(competitionBlog?.id)
    setUserId(competitionBlog?.userId)
    setPostDate(competitionBlog?.postDate)
  },[])
  return (
    <>
      <LayoutAdmin>
        <Box>
          <Stack
            direction='row'
            spacing={20}
            alignItems='center'
            sx={{  paddingTop: '20px',paddingBottom:"20px" }}
          >
            <Typography
              variant='h4'
              sx={{ fontWeight: 500, color: '#1976d2' }}
            >
              Chi tiết blog
            </Typography>
          </Stack>
          <Box
            sx={{
              backgroundColor: "white",
              padding: "0 10px"
            }}
          >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid
                item
                xs={12}
              >
                <Stack direction={'row'} alignItems='center' gap={5}>
                  <TextField
                    id='filled-search'
                    label='Tên Blog'
                    type='search'
                    variant='outlined'
                    value={blogName}
                    style={{ width: '100%' }}
                    onChange={(e: any): any => {
                      setBlogName(e.target.value)
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Dropzone
                    onDrop={handleImageDrop}
                    accept={{ image: ['image/*'] }}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }): any => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <span style={{ fontStyle: 'italic' }}>
                          * Lưu ý chỉ chọn được 1 ảnh
                        </span>
                        <p className='layout_drag_image'>
                          <AddIcon />
                          Kéo thả ảnh, hoặc nhấn vào đây để chọn ảnh
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  {imageFile ? (
                    <div>
                      <h2 className='color-primary'>Ảnh bìa cho trang blog:</h2>
                      <Box
                        component='img'
                        src={imageFile}
                        alt='Selected'
                        sx={{
                          width:{xs:"100% !important",md:"450px !important"},
                          height:{xs:"auto !important",md:"250px !important"},
                          objectFit:"cover !important"
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className='color-primary'>Ảnh bìa cho trang blog:</h2>
                      <Box 
                        component='img'
                        src={`data:image/jpeg;base64,${imgSrc}`}
                        alt='ảnh '
                        sx={{ 
                          width:{xs:"100% !important",md:"450px !important"},
                          height:{xs:"auto !important",md:"250px !important"},
                          objectFit:"cover !important" 
                        }} 
                      />
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '10px' }}>
                <ReactQuill
                  value={blogDetai}
                  onChange={handleContentChange}
                  modules={modules}
                  formats={[
                    'header',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'blockquote',
                    'list',
                    'bullet',
                    'indent',
                    'link',
                    'image'
                  ]}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 10 }}>
                <Stack 
                  sx={{
                    gap:"10px",
                    flexDirection:{md:"row",xs:"column"}
                  }}
                  
                >
                  <Button
                    variant='contained'
                    startIcon={<UpdateIcon />}
                    style={{ marginTop: '20px' }}
                    onClick={handleClickOpen}
                  >
                    Cập nhâp blog
                  </Button>
                  <Button
                    variant='contained'
                    color='error'
                    startIcon={<DeleteIcon />}
                    style={{ marginTop: '20px' }}
                    onClick={handleDeleteOpen}
                  >
                    Xóa trang blog
                  </Button>
                  <Button sx={{ marginTop: '20px'}} variant='outlined' onClick={():void=>navigate('/BlogManage')}>
                    Trở về
                  </Button>
                </Stack>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>{'Thông tin '}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      Bạn muốn cập nhập trang Blog ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Link to={'/BlogManage?updatesucess=true'}>
                      <Button onClick={handleOK} variant='contained'>
                        OK
                      </Button>
                    </Link>
                    <Button onClick={handleClose}>Trở về</Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={openDelete}
                  onClose={handleDeleteClose}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>{'Thông tin '}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      Bạn muốn xóa trang Blog ?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Link to={'/BlogManage?deletesucess=true'}>
                      <Button onClick={handleClickDelete} variant='contained'>
                        OK
                      </Button>
                    </Link>
                    <Button onClick={handleDeleteClose}>Trở về</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </LayoutAdmin>
    </>
  )
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ]
}
export default Index
