import React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Stack, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { SelectChangeEvent } from '@mui/material/Select'
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
                Tạo một cuộc thi mới
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={12} style={{ marginTop: '10px' }}>
            <Stack direction={'row'} alignItems='center' gap={5}>
              <TextField
                id='filled-search'
                label='Tên cuộc thi '
                type='search'
                variant='outlined'
                style={{ width: '100%' }}
              />
              <FormControl sx={{ m: 1, minWidth: 80 }} style={{ width: '100%' }}>
                <InputLabel id='demo-simple-select-autowidth-label'>Quy mô</InputLabel>
                <Select
                  labelId='demo-simple-select-autowidth-label'
                  id='demo-simple-select-autowidth'
                  value={age}
                  onChange={handleChange}
                  label='Age'
                >
                  <MenuItem value={10}>Khoa</MenuItem>
                  <MenuItem value={21}>Trường</MenuItem>
                  <MenuItem value={22}>Lớp</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid xs={12} style={{ marginTop: '10px' }}>
            <Stack direction={'row'} gap={5} style={{ width: '100%' }}>
              <Stack direction={'row'} justifyContent='space-around' style={{ width: '100%' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label='Ngày bắt đầu' />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label='Ngày kết thúc' />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
              <Stack direction={'row'} style={{ width: '100%' }} justifyContent='space-around'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker label='Thời gian bắt đầu' />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker label='Thời gian kết thúc' />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
            </Stack>
          </Grid>
          <Grid>
            <Button variant='contained' endIcon={<AddIcon />} style={{ marginTop: '20px' }}>
              Thêm
            </Button>
          </Grid>
        </Grid>
      </LayoutAdmin>
    </>
  )
}

export default Index
