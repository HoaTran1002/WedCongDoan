import React, { useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { SelectChangeEvent } from '@mui/material/Select'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Insert } from '~/api/blogApi'
import { saveAs } from 'file-saver'
import base_url from '~/config/env'

axios.defaults.baseURL = base_url

const Index = (): JSX.Element => {
  let imageFile: any
  const [age, setAge] = useState('')
  const [blogName, setBlogName] = useState('')
  const [content, setContent] = useState('')
  const [imgName, setImgName] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [open, setOpen] = React.useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value)
  }
  const handleContentChange = (value: any): any => {
    setContent(value)
  }

  const handleImageDrop = (acceptedFiles: any): any => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const imageFile = acceptedFiles[0]
      const objectURL = URL.createObjectURL(imageFile)
      // setSelectedImage(() => objectURL)
      setImgName(imageFile.path)
      setImgSrc(imageFile.path)
    }
  }

  const handleClickOpen = (): void => {
    setOpen(true)
    console.log(blogName, content, imgName, imgSrc)
  }

  const handleClose = (): void => {
    setOpen(false)
  }
  const handleOK = (): void => {
    setOpen(false)

    const newBlog = {
      blogName: blogName,
      blogDetai: content,
      imgName: imgName,
      imgSrc: imgSrc
    }

    const requestData = Insert(newBlog)
    console.log(requestData)
    axios
      .post(requestData.enp, requestData.body, { headers: requestData.headers })
      .then((response) => {
        console.log('Insert successful')
        // Xử lý response
      })
      .catch((error) => {
        console.error('Insert failed', error)
        // Xử lý lỗi
      })
    const filePath = `src/assets/img/${imgName}`
    saveAs(imageFile, filePath)
  }
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
                Thêm blog mới
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
                onChange={(e: any): any => {
                  setBlogName(e.target.value)
                }}
              />
              <TextField
                id='filled-search'
                label='Thanh phụ tiêu đề'
                type='search'
                variant='outlined'
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
                  value={age}
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
                  value={age}
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
                // accept='image/*'
                multiple={false}
              >
                {({ getRootProps, getInputProps }): any => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <span style={{ fontStyle: 'italic' }}>
                      * Lưu ý chỉ chọn được 1 ảnh
                    </span>
                    <p className='layout_drag_image'>
                      <AddRoundedIcon />
                      Kéo thả ảnh, hoặc nhấn để chọn ảnh
                    </p>
                  </div>
                )}
              </Dropzone>
              {selectedImage && (
                <div>
                  <h2 className='color-primary'>Ảnh bìa cho trang blog:</h2>
                  <img
                    className='selectedImage'
                    src={selectedImage}
                    alt='Selected'
                  />
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
            <ReactQuill
              value={content}
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
          <Grid item>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              style={{ marginTop: '20px' }}
              onClick={handleClickOpen}
            >
              Thêm blog
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
                  Bạn muốn thêm mới trang Blog ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Link to={'/BlogManage?opensucess=true'}>
                  <Button variant="contained" onClick={handleOK}>
                    OK
                  </Button>
                </Link>
                <Button onClick={handleClose}>Trở về</Button>
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
