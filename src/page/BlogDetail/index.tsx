import AddIcon from '@mui/icons-material/Add'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
const textPagagrap = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea error ut necessitatibus praesentium tempore doloribus eaque maxime autem nobis aperiam aliquid minus, ratione perferendis optio unde nemo totam iure repellat.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ut corporis natus alias quisquam aut inventore neque non nam delectus accusamus, iste repudiandae animi eum quibusdam ullam eius saepe velit.


`
const Index = (): JSX.Element => {
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent): void => {
    setAge(event.target.value)
  }
  return (
    <>
      <LayoutAdmin>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
            <Stack direction='row' spacing={20} alignItems='center' sx={{ marginTop: '20px' }}>
              <Typography variant='h4' sx={{ fontWeight: 500, color: '#1976d2' }}>
                Chi tiết blog
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
          <Grid xs={12} style={{ marginTop: '10px' }}>
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
          <Grid xs={12} style={{ marginTop: '10px' }}>
            <TextField
              id='standard-multiline-static'
              label='Nội dung trang blog'
              multiline
              rows={15}
              variant='outlined'
              style={{ width: '100%' }}
              defaultValue={textPagagrap}
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

export default Index
