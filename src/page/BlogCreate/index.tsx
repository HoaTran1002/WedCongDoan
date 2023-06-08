import React,{ useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Stack, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SelectChangeEvent } from '@mui/material/Select'


const ImageResize = require('quill-image-resize-module-react').default;
Quill.register('modules/imageResize', ImageResize);
const Index = (): JSX.Element => {
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value)
  }
  const handleContentChange = (value:any):any => {
    setContent(value);
    console.log(value)
  };
  const [content, setContent] = useState('');
  console.log(content)
  return (
    <>
      <LayoutAdmin>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
            <Stack direction='row' spacing={20} alignItems='center' sx={{ marginTop: '20px' }}>
              <Typography variant='h4' sx={{ fontWeight: 500, color: '#1976d2' }}>
                Thêm blog mới
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Stack direction={'row'} alignItems='center' gap={5}>
              <TextField
                id='filled-search'
                label='Tên Blog'
                type='search'
                variant='outlined'
                style={{ width: '100%' }}
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
          <Grid xs={12} style={{ marginTop: '10px' }}>
            <Stack direction={'row'} alignItems='center' gap={5}>
              <FormControl sx={{ m: 1, minWidth: 80 }} style={{ width: '100%' }}>
                <InputLabel id='demo-simple-select-autowidth-label'>Cuộc thi</InputLabel>
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
              <FormControl sx={{ m: 1, minWidth: 80 }} style={{ width: '100%' }}>
                <InputLabel id='demo-simple-select-autowidth-label'>Tình trạng</InputLabel>
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
          <Grid xs={12} style={{ marginTop: '10px' }}>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={modules}
              formats={[
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image'
              ]}
              
            />

          </Grid>
          <Grid>
            <Button variant='contained' startIcon={<AddIcon />} style={{ marginTop: '20px' }}>
              Thêm blog
            </Button>
          </Grid>
        </Grid>
      </LayoutAdmin>
    </>
  )
}

const modules ={
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
  imageResize: {
    displayStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white'
    },
    modules: ['Resize', 'DisplaySize', 'Toolbar']
  }
};

export default Index
