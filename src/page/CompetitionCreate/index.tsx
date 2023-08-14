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
  TextField,
  Snackbar,
  Box,
  FormHelperText
} from '@mui/material'
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
import MessageAlert from '~/components/MessageAlert'
import { useNavigate } from 'react-router-dom'

const label = { inputProps: { 'aria-label': 'Switch demo' } }
const Index = (): JSX.Element => {
  const [message, setMessage] = React.useState('')
  const [serverity, setServerity] = React.useState('')
  const navigate = useNavigate()
  const [dep, setDep] = React.useState<string>('')
  const [errDep, setErrDep] = React.useState<string>('')
  const [comNameValue, setComName] = React.useState<string>('')
  const [errComName, setErrComName] = React.useState<string>('')
  const [examTimesValue, setExamTimes] = React.useState<string>('')
  const [errExamTimes, setErrExamTimes] = React.useState<string>('')
  const [startDateValue, setStartDate] = React.useState<string>('')
  const [endDateValue, setEndDate] = React.useState<string>('')
  const [errStartDate, setErrStartDate] = React.useState<string | null>(null)
  const [errEndDate, setErrEndDate] = React.useState<string | null>(null)
  const [userQuanValue, setUerQuan] = React.useState<string>('')
  const [errUserQuan, setErrUserQuan] = React.useState<string>('')

  const [depState, callDep] = useFetch()
  const [comp, callComp] = useFetch()

  React.useEffect((): void => {
    callDep(getAllDep)
  }, [depState.loading])

  const dataDep = depState?.payload || [
    { depId: 1, depName: 'Công Nghệ Thông Tin' },
    { depId: 2, depName: 'Công Nghệ Thực Phẩm' },
    { depId: 3, depName: 'Quản Trị Kinh Doanh' },
    { depId: 4, depName: 'Ngôn Ngữ Anh' },
    { depId: 5, depName: 'Luật' }
  ]

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

  const handleChange = (event: SelectChangeEvent): void => {
    setDep(event.target.value)
    setErrDep('')
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
      setErrStartDate('')
    }
  }
  const endDateChange = (value: string | null): void => {
    const formattedDate = dayjs(value).format('YYYY-MM-DDTHH:mm:ss.SSS' + 'Z')
    setEndDate(formattedDate)
    setErrEndDate('')
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
  if (message !== '') {
    setTimeout(() => {
      setMessage('')
    }, 3000)
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
        condition: startDateValue === '',
        setError: setErrStartDate,
        errorMessage: 'nhập ngày bắt đầu'
      },
      {
        condition: endDateValue === '',
        setError: setErrEndDate,
        errorMessage: 'nhập ngày kết thúc'
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

    callComp(async () => {
      try {
        await insert(request)
        await setMessage('Thêm trang blog thành công')
        await setServerity('success')
        await navigate('/CompetitionManage')
      } catch (error) {
        console.error(error)
        setMessage('Thêm trang blog thất bại')
        setServerity('error')
      }
    })
  }
  return (
    <>
      {message && <MessageAlert message={message} severity={serverity} />}
      <LayoutAdmin>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            width:"100% !important",
            m:"0 !important"
          }}
        >
          <Grid item xs={12}>
            <Stack
              direction='row'
              spacing={20}
              alignItems='center'
              sx={{ marginTop: '20px' }}
            >
              <Typography
                variant='h4'
                sx={{ fontWeight: 400, color: '#1976d2' }}
              >
                Tạo một cuộc thi mới
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
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
              {errDep !== '' ? (
                <FormControl
                  sx={{ m: 1, minWidth: 80 }}
                  style={{ width: '100%' }}
                  error
                >
                  <InputLabel id='demo-simple-select-error-label'>
                    Khoa
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-error-label'
                    id='demo-simple-select-error'
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
                  <FormHelperText>{errDep}</FormHelperText>
                </FormControl>
              ) : (
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
                    error={Boolean(errDep)}
                  >
                    {dataDep.map((item: any) => (
                      <MenuItem key={item.depId} value={item.depId}>
                        {item.depName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
            <Stack direction={'row'} gap={5} style={{ width: '100%' }}>
              <Stack
                direction={'row'}
                spacing={2}
                justifyContent='flex-start'
                style={{ width: '100%' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DateTimePicker
                        slotProps={{
                          textField: {
                            className: errStartDate ? 'errorMessage' : '',
                            helperText: errStartDate
                          }
                        }}
                        onChange={startDateChange}
                        label='Ngày bắt đầu'
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DateTimePicker
                        slotProps={{
                          textField: {
                            className: errEndDate ? 'errorMessage' : '',
                            helperText: errEndDate
                          }
                        }}
                        onChange={endDateChange}
                        label='Ngày kết thúc'
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
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
          <Grid item xs={12}>
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
