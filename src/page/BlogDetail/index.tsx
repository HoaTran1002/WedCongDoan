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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '~/hook/useFetch'
import { getById, Edit ,Delete } from '~/api/blogApi';
import Dropzone from 'react-dropzone';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5237/api'

const Index = (): JSX.Element => {
  let imageFile
  const [age, setAge] = React.useState('')
  const [blogId, setBlogId] = useState('');
  const [blogName, setBlogName] = useState('');
  const [blogDetai, setBlogDetai] = useState('');
  const [imgName, setImgName] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [response, err, loader] = useFetch(getById(Number(id)))
  const [res, error, loading] = useFetch(Delete(Number(id)))
  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value)
  }
  const handleContentChange = (value: any): any => {
    setBlogDetai(value)
  }
  const handleClickOpen = (): any => {
    setOpen(true)
    console.log(blogName, blogDetai, imgName, imgSrc)
  }
  const handleClickDelete = (): any => {
    if (res) {
      console.log('Xóa thành công')
    }
  }
  const handleClose = (): any => {
    setOpen(false);
  };
  const handleDeleteOpen = (): any => {
    setOpenDelete(true);
  };
  const handleDeleteClose = (): any => {
    setOpenDelete(false);
  };
  const handleOK = (): any => {
    setOpen(false)
    const updateBlog = {
      blogId: blogId,
      blogName: blogName,
      blogDetai: blogDetai,
      imgName: imgName,
      imgSrc: imgSrc
    }

    const requestData = Edit(updateBlog);
    console.log(requestData);
    axios.put(requestData.enp, requestData.body, { headers: requestData.headers })
      .then(response => {
        console.log('Sửa successful');
        // Xử lý response
      })
      .catch(error => {
        console.error('sửa failed', error);
        // Xử lý lỗi
      })
    const filePath = `src/assets/img/${imgName}`
    // saveAs(imageFile, filePath);
  }
  const handleImageDrop = (acceptedFiles: any): any => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      imageFile = acceptedFiles[0]
      // setSelectedImage(URL.createObjectURL(imageFile))
      setImgName(imageFile.path)
      setImgSrc(imageFile.path)
    }
  }
  useEffect(() => {
    if (response && response.data) {
      setBlogId(response.data.blogId)
      setBlogName(response.data.blogName)
      setBlogDetai(response.data.blogDetai)
      setImgName(response.data.imgName)
      setImgSrc(response.data.imgSrc)
    }
  }, [response])

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
            <Button variant='contained' color='error' startIcon={<DeleteIcon />} style={{ marginTop: '20px' }} onClick={handleDeleteOpen}>
              Xóa trang blog
            </Button>
            <Dialog
              open={openDelete}
              onClose={handleDeleteClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Thông tin "}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
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
