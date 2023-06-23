import UpdateIcon from '@mui/icons-material/Update'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import React, { useState, useEffect } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link, useLocation } from 'react-router-dom'
import useFetch from '~/hook/useFetch'
import { getBlogId, editBlog, deleteBlog, getAllBlog } from '~/api/blogApi'
import Dropzone from 'react-dropzone'
const Index = (): JSX.Element => {
  let imageFile
  const [age, setAge] = React.useState('')
  const [blogName, setBlogName] = useState('')
  const [blogDetai, setBlogDetai] = useState('')
  const [imgName, setImgName] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  const numericId = parseInt(id, 10)
  const [blogId, setBlogId] = useState<number>(numericId)
  const [EditBlog, callEditBlog] = useFetch()
  const [DeleteBlog, callDeleteBlog] = useFetch()
  const [IdBlog, callIdBlog] = useFetch()

  const [getBlog, callBlogById] = useFetch()

  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value)
  }
  const handleContentChange = (value: string): any => {
    setBlogDetai(value)
  }
  const handleClickOpen = (): any => {
    setOpen(true)
    console.log(blogName, blogDetai, imgName, imgSrc)
  }

  const handleClickDelete = (): any => {
    const request: { _id: number } = {
      _id: blogId
    }
    callDeleteBlog(async () => {
      try {
        await deleteBlog(request)
      } catch (error) {
        console.log('thất bại')
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
        await editBlog(requestData)
      } catch (error) {
        console.log('Thất bại')
      }
    })
    const filePath = `src/assets/img/${imgName}`
    // saveAs(imageFile, filePath);
  }
  // const handleImageDrop = (acceptedFiles: any): any => {
  //   if (acceptedFiles && acceptedFiles.length > 0) {
  //     imageFile = acceptedFiles[0]
  //     // setSelectedImage(URL.createObjectURL(imageFile))
  //     setImgName(imageFile.path)
  //     setImgSrc(imageFile.path)
  //   }
  // };
  const request: { id: number } = { id: blogId }
  useEffect(() => {
    callBlogById(getBlogId)
  }, [])
  console.log('data===>>:' + getBlog.payload)
  // const data = getBlogId(blogId)

  // console.log(data)
  return (
    <>
      <LayoutAdmin>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Stack
              direction='row'
              spacing={20}
              alignItems='center'
              sx={{ marginTop: '20px' }}
            >
              <Typography
                variant='h4'
                sx={{ fontWeight: 500, color: '#1976d2' }}
              >
                Chi tiết blog
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} alignItems='center' gap={5}>
              <TextField
                id='filled-search'
                label='Tên Blog'
                type='search'
                variant='outlined'
                style={{ width: '100%' }}
                value={blogName}
                onChange={(e: any): any => {
                  setBlogName(e.target.value)
                }}
              />
              <TextField
                id='filled-search'
                label='Thanh phụ tiêu đề'
                type='search'
                variant='outlined'
                defaultValue='Thanh phu đề tiêu đề trang blog'
                style={{ width: '100%' }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
            <Stack direction={'row'} alignItems='center' gap={5}>
              <FormControl
                sx={{ m: 1, minWidth: 80 }}
                style={{ width: '100%' }}
              >
                <InputLabel id='demo-simple-select-autowidth-label'>
                  Cuộc thi
                </InputLabel>
                <Select
                  labelId='demo-simple-select-autowidth-label'
                  id='demo-simple-select-autowidth'
                  defaultValue={'21'}
                  onChange={handleChange}
                  label='Age'
                >
                  <MenuItem value={10}>Anh văn đầu vào</MenuItem>
                  <MenuItem value={21}>An toàn thông tin</MenuItem>
                  <MenuItem value={22}>Khảo sát</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{ m: 1, minWidth: 80 }}
                style={{ width: '100%' }}
              >
                <InputLabel id='demo-simple-select-autowidth-label'>
                  Tình trạng
                </InputLabel>
                <Select
                  labelId='demo-simple-select-autowidth-label'
                  id='demo-simple-select-autowidth'
                  defaultValue={'21'}
                  onChange={handleChange}
                  label='Age'
                >
                  <MenuItem value={10}>Ẩn trang blog</MenuItem>
                  <MenuItem value={21}>Hiện trang blog</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Dropzone
                // onDrop={handleImageDrop}
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
              {selectedImage ? (
                <div>
                  <h2 className='color-primary'>Ảnh bìa cho trang blog:</h2>
                  <img
                    className='selectedImage'
                    src={selectedImage}
                    alt='Selected'
                  />
                </div>
              ) : (
                <div>
                  <h2 className='color-primary'>Ảnh bìa cho trang blog:</h2>
                  <img
                    className='selectedImage'
                    src={`src/assets/img/${imgSrc}`}
                    alt='Selected'
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
            <Button
              variant='contained'
              startIcon={<UpdateIcon />}
              style={{ marginTop: '20px' }}
              onClick={handleClickOpen}
            >
              Cập nhâp blog
            </Button>
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
            <Button
              variant='contained'
              color='error'
              startIcon={<DeleteIcon />}
              style={{ marginTop: '20px' }}
              onClick={handleDeleteOpen}
            >
              Xóa trang blog
            </Button>
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
