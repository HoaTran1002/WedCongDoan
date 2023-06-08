import AddIcon from '@mui/icons-material/Add'
import UpdateIcon from '@mui/icons-material/Update';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import React,{useState} from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Index = (): JSX.Element => {
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value)
  }
  const handleContentChange = (value:any):any => {
    setContent(value);
  };
  const [content, setContent] = useState('');
  return (
    <>
      <LayoutAdmin>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Stack direction='row' spacing={20} alignItems='center' sx={{ marginTop: '20px' }}>
              <Typography variant='h4' sx={{ fontWeight: 500, color: '#1976d2' }}>
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
                defaultValue='Tựa đề trang blog'
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
              <FormControl sx={{ m: 1, minWidth: 80 }} style={{ width: '100%' }}>
                <InputLabel id='demo-simple-select-autowidth-label'>Cuộc thi</InputLabel>
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
              <FormControl sx={{ m: 1, minWidth: 80 }} style={{ width: '100%' }}>
                <InputLabel id='demo-simple-select-autowidth-label'>Tình trạng</InputLabel>
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
          <Grid item xs={12} style={{ marginTop: '10px' }}>
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
          <Grid item xs={12}>
            <Button variant='contained' startIcon={<UpdateIcon />} style={{ marginTop: '20px' }}>
              Cập nhập
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
  ]
};
export default Index
