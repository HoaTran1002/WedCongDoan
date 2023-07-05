import React from 'react'
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
  TextField
, Snackbar } from '@mui/material'
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

import MuiAlert from '@mui/material/Alert'
import { DateValidationError } from '@mui/x-date-pickers/models'

const label = { inputProps: { 'aria-label': 'Switch demo' } }
const Index = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)

  const [dep, setDep] = React.useState<string>('')
  const [errDep, setErrDep] = React.useState<string>('')
  const [comNameValue, setComName] = React.useState<string>('')
  const [errComName, setErrComName] = React.useState<string>('')
  const [examTimesValue, setExamTimes] = React.useState<string>('')
  const [errExamTimes, setErrExamTimes] = React.useState<string>('')
  const [startDateValue, setStartDate] = React.useState<string>('')
  const [errStartDate, setErrStartDate] = React.useState<string | null>(null)
  const [endDateValue, setEndDate] = React.useState<string>('')
  const [errEndDate, setErrEndDate] = React.useState<string | null>(null)
  const [userQuanValue, setUerQuan] = React.useState<string>('')
  const [errUserQuan, setErrUserQuan] = React.useState<string>('')

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
    const value = event.target.value
    if (String(value) == '') {
      setErrDep('vui lòng chọn một khoa')
    }
  }
  const comNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setComName(event.target.value)
    const value = event.target.value
    if (String(value) == '') {
      setErrComName('vui lòng nhập tên cuộc thi')
    } else {
      setErrComName('')
    }
  }
  const examTimesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setExamTimes(event.target.value)
    const value = event.target.value
    if (String(value) == '') {
      setErrExamTimes('nhập tên cuộc thi dô')
    } else {
      setErrExamTimes('')
    }
  }

  const startDateChange = (value: string | null): void => {
    if (value) {
      const formattedDate = dayjs(value).format('YYYY-MM-DDTHH:mm:ss.SSS' + 'Z')
      setStartDate(formattedDate)
      const values = formattedDate
      if (String(values) == '') {
        setErrStartDate('chọn ngày bắt đầu')
      } else {
        setErrEndDate(null)
      }
    }
  }
  const endDateChange = (value: string | null): void => {
    const formattedDate = dayjs(value).format('YYYY-MM-DDTHH:mm:ss.SSS' + 'Z')
    setEndDate(formattedDate)

    const values = formattedDate
    if (String(values) == null) {
      setErrEndDate('nhập ngày kết thúc')
    } else {
      setErrEndDate(null)
    }
  }
  const userQuanChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUerQuan(event.target.value)
    const values = event.target.value
    if (String(values) == '') {
      setErrUserQuan('nhập số lượng thí sinh')
    } else {
      setErrUserQuan('')
    }
  }

  const submitAddComp = (): void => {
    const errorConditions = [
      {
        condition: dep === '',
        setError: setErrDep,
        errorMessage: 'Chọn khoa tổ chức'
      },
      {
        condition: comNameValue === '',
        setError: setErrComName,
        errorMessage: 'Nhập tên cuộc thi'
      },
      {
        condition: examTimesValue === '',
        setError: setErrExamTimes,
        errorMessage: 'Nhập thời gian thi'
      },
      {
        condition: startDateValue === null,
        setError: setErrStartDate,
        errorMessage: 'Chọn ngày bắt đầu'
      },
      {
        condition: endDateValue === null,
        setError: setErrEndDate,
        errorMessage: 'Chọn ngày kết thúc'
      },
      {
        condition: userQuanValue === '',
        setError: setErrUserQuan,
        errorMessage: 'Nhập số lượng thí sinh'
      }
    ]

    for (const condition of errorConditions) {
      if (condition.condition) {
        condition.setError(condition.errorMessage)
      }
    }

    const hasError = errorConditions.some((condition) => condition.condition)

    if (hasError) {
      return
    }

    // Tiếp tục xử lý khi không có lỗi
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

  return (
    <>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <MuiAlert
          onClose={handleCloseSuccess}
          severity='success'
          elevation={6}
          variant='filled'
        >
          Acction successful!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <MuiAlert
          onClose={handleCloseError}
          severity='error'
          elevation={6}
          variant='filled'
        >
          Acction Failed!
        </MuiAlert>
      </Snackbar>
      <LayoutAdmin>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
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
                error={Boolean(errComName)}
                helperText={errComName}
              />
              <FormControl
                sx={{ m: 1, minWidth: 80 }}
                style={{ width: '100%' }}
              >
                <InputLabel id='demo-simple-select-autowidth-label'>
                  Khoa
                </InputLabel>
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
              <Stack
                direction={'row'}
                spacing={2}
                justifyContent='flex-start'
                style={{ width: '100%' }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker
                      slotProps={{
                        textField: {
                          helperText: errStartDate
                        }
                      }}
                      onChange={startDateChange}
                      label='Ngày bắt đầu'
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker
                      slotProps={{
                        textField: {
                          helperText: errEndDate
                        }
                      }}
                      onChange={endDateChange}
                      label='Ngày kết thúc'
                    />
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
                <TextField
                  onChange={examTimesChange}
                  label='Thời gian thi'
                  error={Boolean(errExamTimes)}
                  helperText={errExamTimes}
                />
                <TextField
                  onChange={userQuanChange}
                  label='Số lượng thí sinh'
                  error={Boolean(errUserQuan)}
                  helperText={errUserQuan}
                />
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
            <Button
              onClick={submitAddComp}
              variant='contained'
              endIcon={<AddIcon />}
              style={{ marginTop: '20px' }}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </LayoutAdmin>
    </>
  )
}

export default Index
