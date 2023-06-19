import React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Stack, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { SelectChangeEvent } from '@mui/material/Select'
import { getAllDep } from '~/api/depApi'
import useFetch from '~/hook/useFetch'
import dayjs from 'dayjs'
import { insert } from '~/api/competitionApi'

import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

const label = { inputProps: { 'aria-label': 'Switch demo' } }
const Index = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)

  const [dep, setDep] = React.useState<string>('')
  const [comNameValue, setComName] = React.useState<string>('')
  const [examTimesValue, setExamTimes] = React.useState<string>('')
  const [startDateValue, setStartDate] = React.useState<string>('')
  const [endDateValue, setEndDate] = React.useState<string>('')
  const [userQuanValue, setUerQuan] = React.useState<string>('')

  const [depState, callDep] = useFetch()
  const [comp, callComp] = useFetch()

  React.useEffect((): void => {
    callDep(getAllDep)
  }, [depState.loading])

  const dataDep = depState.payload || [
    { depId: 1, depName: 'Công Nghệ Thông Tin' },
    { depId: 2, depName: 'Công Nghệ Thực Phẩm' },
    { depId: 3, depName: 'Quản Trị Kinh Doanh' },
    { depId: 4, depName: 'Ngôn Ngữ Anh' },
    { depId: 5, depName: 'Luật' }
  ]
  
  console.log(depState.loading)
  const request: {
    comName: string
    examTimes: string
    startDate: string
    endDate: string
    userQuan: string
    depId: string
  } = {
    comName: comNameValue,
    examTimes: examTimesValue,
    startDate: startDateValue,
    endDate: endDateValue,
    userQuan: userQuanValue,
    depId: dep
  }
  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
  }

  const handleChange = (event: SelectChangeEvent): void => {
    setDep(event.target.value)
  }
  const comNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setComName(event.target.value)
  }
  const examTimesChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setExamTimes(event.target.value)
  }

  const startDateChange = (value: string | null): void => {
    if (value) {
      const formattedDate = dayjs(value).format('YYYY-MM-DDTHH:mm:ss.SSS' + 'Z')
      setStartDate(formattedDate)
    }
  }
  const endDateChange = (value: string | null): void => {
    if (value) {
      const formattedDate = dayjs(value).format('YYYY-MM-DDTHH:mm:ss.SSS' + 'Z')
      setEndDate(formattedDate)
    }
  }
  const userQuanChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUerQuan(event.target.value)
  }
  const submitAddComp = (): void => {
    callComp(async () => {
      try {
        await insert(request)
        setShowSuccess(true)
      } catch (error) {
        console.error(error)
        setShowError(true)
      }
    })
  }
  console.log('status' + comp.payload)
  return (
    <>
      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <MuiAlert onClose={handleCloseSuccess} severity='success' elevation={6} variant='filled'>
          Acction successful!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={showError} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <MuiAlert onClose={handleCloseError} severity='error' elevation={6} variant='filled'>
          Acction Failed!
        </MuiAlert>
      </Snackbar>
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
                onChange={comNameChange}
                id='filled-search'
                label='Tên cuộc thi '
                type='search'
                variant='outlined'
                style={{ width: '100%' }}
              />
              <FormControl sx={{ m: 1, minWidth: 80 }} style={{ width: '100%' }}>
                <InputLabel id='demo-simple-select-autowidth-label'>Khoa</InputLabel>
                <Select
                  labelId='demo-simple-select-autowidth-label'
                  id='demo-simple-select-autowidth'
                  value={dep}
                  onChange={handleChange}
                  label='Khoa'
                >
                  {dataDep.map((item: any) => (
                    <MenuItem key={item.depId} value={item.depId}>
                      {item.depName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid xs={12} style={{ marginTop: '10px' }}>
            <Stack direction={'row'} gap={5} style={{ width: '100%' }}>
              <Stack direction={'row'} spacing={2} justifyContent='flex-start' style={{ width: '100%' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker onChange={startDateChange} label='Ngày bắt đầu' />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker onChange={endDateChange} label='Ngày kết thúc' />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
              <Stack
                direction={'row'}
                sx={{ marginTop: 0.5 }}
                spacing={2}
                style={{ width: '100%' }}
                justifyContent='flex-start'
              >
                <TextField onChange={examTimesChange} label='Thời gian thi' />
                <TextField onChange={userQuanChange} label='Số lượng thí sinh' />
              </Stack>
            </Stack>
          </Grid>
          {/* <Grid xs={12} style={{ marginTop: '100px' }}>
            <Stack direction={'row'} gap={'20px'}>
              <Typography variant='h4' sx={{ fontWeight: 500, color: '#1976d2' }}>
                Giải cá nhân
              </Typography>
              <Switch {...label} defaultChecked />
            </Stack>
            <div style={{ marginTop: '20px' }}>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={gold} alt='' style={{ width: 30 }} />
                <span style={{ display: 'inline-block', width: '180px', fontWeight: 500, color: '#1976d2' }}>
                  Hạng nhất
                </span>
                <TextField
                  id='filled-search'
                  label='Tên giải thưởng'
                  type='search'
                  variant='outlined'
                  style={{ width: '100%' }}
                />
                <TextField
                  id='filled-search'
                  label='Số lượng'
                  type='number'
                  variant='outlined'
                  style={{ width: '300px' }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={siver} alt='' style={{ width: 30 }} />
                <span style={{ display: 'inline-block', width: '180px', fontWeight: 500, color: '#1976d2' }}>
                  Hạng nhì
                </span>
                <TextField
                  id='filled-search'
                  label='Tên giải thưởng'
                  type='search'
                  variant='outlined'
                  style={{ width: '100%' }}
                />
                <TextField
                  id='filled-search'
                  label='Số lượng'
                  type='number'
                  variant='outlined'
                  style={{ width: '300px' }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={bronze} alt='' style={{ width: 30 }} />
                <span style={{ display: 'inline-block', width: '180px', fontWeight: 500, color: '#1976d2' }}>
                  Hạng ba
                </span>
                <TextField
                  id='filled-search'
                  label='Tên giải thưởng'
                  type='search'
                  variant='outlined'
                  style={{ width: '100%' }}
                />
                <TextField
                  id='filled-search'
                  label='Số lượng'
                  type='number'
                  variant='outlined'
                  style={{ width: '300px' }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={khuyenkhich} alt='' style={{ width: 30 }} />
                <span style={{ display: 'inline-block', width: '180px', fontWeight: 500, color: '#1976d2' }}>
                  Khuyến khích
                </span>
                <TextField
                  id='filled-search'
                  label='Tên giải thưởng'
                  type='search'
                  variant='outlined'
                  style={{ width: '100%' }}
                />
                <TextField
                  id='filled-search'
                  label='Số lượng'
                  type='number'
                  variant='outlined'
                  style={{ width: '300px' }}
                />
              </Stack>
            </div>
          </Grid>
          <Grid xs={12} style={{ marginTop: '100px' }}>
            <Stack direction={'row'} gap={'20px'}>
              <Typography variant='h4' sx={{ fontWeight: 500, color: '#1976d2' }}>
                Giải tập thể
              </Typography>
              <Switch {...label} defaultChecked />
            </Stack>
            <div style={{ marginTop: '20px' }}>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={gold} alt='' style={{ width: 30 }} />
                <span style={{ display: 'inline-block', width: '180px', fontWeight: 500, color: '#1976d2' }}>
                  Hạng nhất
                </span>
                <TextField
                  id='filled-search'
                  label='Tên giải thưởng'
                  type='search'
                  variant='outlined'
                  style={{ width: '100%' }}
                />
                <TextField
                  id='filled-search'
                  label='Số lượng'
                  type='number'
                  variant='outlined'
                  style={{ width: '300px' }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={siver} alt='' style={{ width: 30 }} />
                <span style={{ display: 'inline-block', width: '180px', fontWeight: 500, color: '#1976d2' }}>
                  Hạng nhì
                </span>
                <TextField
                  id='filled-search'
                  label='Tên giải thưởng'
                  type='search'
                  variant='outlined'
                  style={{ width: '100%' }}
                />
                <TextField
                  id='filled-search'
                  label='Số lượng'
                  type='number'
                  variant='outlined'
                  style={{ width: '300px' }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={bronze} alt='' style={{ width: 30 }} />
                <span style={{ display: 'inline-block', width: '180px', fontWeight: 500, color: '#1976d2' }}>
                  Hạng ba
                </span>
                <TextField
                  id='filled-search'
                  label='Tên giải thưởng'
                  type='search'
                  variant='outlined'
                  style={{ width: '100%' }}
                />
                <TextField
                  id='filled-search'
                  label='Số lượng'
                  type='number'
                  variant='outlined'
                  style={{ width: '300px' }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={khuyenkhich} alt='' style={{ width: 30 }} />
                <span style={{ display: 'inline-block', width: '180px', fontWeight: 500, color: '#1976d2' }}>
                  Khuyến khích
                </span>
                <TextField
                  id='filled-search'
                  label='Tên giải thưởng'
                  type='search'
                  variant='outlined'
                  style={{ width: '100%' }}
                />
                <TextField
                  id='filled-search'
                  label='Số lượng'
                  type='number'
                  variant='outlined'
                  style={{ width: '300px' }}
                />
              </Stack>
            </div>
          </Grid> */}
          <Grid>
            <Button onClick={submitAddComp} variant='contained' endIcon={<AddIcon />} style={{ marginTop: '20px' }}>
              Thêm
            </Button>
          </Grid>
        </Grid>
      </LayoutAdmin>
    </>
  )
}

export default Index
