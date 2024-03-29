import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, MenuItem, Snackbar } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import MuiAlert from '@mui/material/Alert'
import { getAllDep } from '~/api/departmentApi'
import { getAllRole } from '~/api/roleApi'
import dayjs, { Dayjs } from 'dayjs'

import useFetch from '~/hook/useFetch'
import { editUser, insert } from '~/api/userApi'
import MessageAlert from '~/components/MessageAlert'
import { LoadingContext } from '.'
import { isEmailValid,validatePassword } from '~/utils/stringUtils'
import { UserContex } from './TableUser'
import { UsecontexModalAdd } from './ModalAddUser'

interface Dep {
  depId: number
  depName: string
}
interface Role {
  roleId: number
  roleName: string
}
export default function UserTextFields(prop: {
  edit: boolean
  id: string
  userName: string
  dateOfBirth: string
  email: string
  password: string
  roleId: number
  depId: number
}): JSX.Element {
  const [cccd, setCCCD] = React.useState<string>(prop.id || '')
  const [userName, setUserName] = React.useState<string>(prop.userName || '')
  const [pass, setPass] = React.useState<string>(prop.password || '')
  const [gmail, setGmail] = React.useState(prop.email || '')
  const [dep, setDep] = React.useState<number>(prop.depId || 0)
  const [role, setRole] = React.useState<number>(prop.roleId || 0)
  const [errorCccd, setErrorCccd] = React.useState<string>('')
  const [errorUserName, setErrorUserName] = React.useState<string>('')
  const [errorGmail, setErrorGmail] = React.useState<string>('')
  const [errorPassword, setErrorPassword] = React.useState<string>('')
  const [errorRole, setErrorRole] = React.useState<string>('')
  const [errorDep, setErrorDep] = React.useState<string>('')
  const [errDateOfBirth, setErrDateOfBirth] = React.useState<string>('')
  const [birthDay, setBirthDay] = React.useState<Dayjs | any>(
    dayjs(prop.dateOfBirth)
  )
  const [showError, setShowError] = React.useState(false)
  const [userInsert, callInsertUser] = useFetch()
  const [EdittUser, callEdittUser] = useFetch()
  const [departments, callAllDep] = useFetch()
  const [roles, callAllRole] = useFetch()
  const [message, setMessage] = React.useState<string>('')
  const [severity, setSeverity] = React.useState<string>('')

  const loadingParams = React.useContext(LoadingContext)
  const Roles: Role[] = roles.payload || []
  const Deps: Dep[] = departments.payload || []
  
  const onchangeUserName = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setErrorUserName('')
    setUserName(event.target.value)
  }
  const onchangePass = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setErrorPassword('')
    setPass(event.target.value)
  }
  const onchangeGmail = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setErrorGmail('')
    setGmail(event.target.value)
  }
  const onchangeBirthDay = function (value: string | null): void {
    setErrDateOfBirth('')
    if (value) {
      setBirthDay(value)
    }
  }
  const onchangeDep = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setErrorDep('')
    setDep(Number(event.target.value))
  }
  const onchangeRole = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setErrorRole('')
    setRole(Number(event.target.value))
  }
  const requestDataEdit: {
    userId: string | undefined
    userName: string
    dateOfBirth: string
    email: string
    password: string
    roleId: number
    depId: number
    isDeleted: number
    userAddress:string | undefined
  } = {
    userId: cccd,
    userName: userName,
    dateOfBirth: birthDay.format('YYYY-MM-DD'),
    email: gmail,
    password: pass,
    roleId: Number(role),
    depId: Number(dep),
    isDeleted: 0,
    userAddress:''
  }
  const requestDataInsert: {
    userName: string
    dateOfBirth: string
    email: string
    password: string
    roleId: number
    depId: number
  } = {
    userName: userName,
    dateOfBirth: birthDay.format('YYYY-MM-DD'),
    email: gmail,
    password: pass,
    roleId: Number(role),
    depId: Number(dep),
  }
  const errorConditions = [
    {
      condition: userName === '',
      setError: setErrorUserName,
      errorMessage: 'Chưa nhập tên người dùng'
    },
    {
      condition: gmail === '',
      setError: setErrorGmail,
      errorMessage: 'Chưa nhập gmail'
    },
    {
      condition: !isEmailValid(gmail),
      setError: setErrorGmail,
      errorMessage: 'Email không đúng định dạng'
    },
    {
      condition:!validatePassword(pass),
      setError:setErrorPassword,
      errorMessage:'Mật khẩu phải có ít nhất 1 ký tự viết hoa, 1 chữ số, 1 ký tự đặc biệt và tối thiểu 5 ký tự tối đa 9 ký tự'
    },
    {
      condition: pass === '',
      setError: setErrorPassword,
      errorMessage: 'Chưa nhập mật khẩu'
    },
    {
      condition: dep === 0,
      setError: setErrorDep,
      errorMessage: 'Chưa chọn khoa'
    },
    {
      condition: birthDay.$d == 'Invalid Date',
      setError: setErrDateOfBirth,
      errorMessage: 'Chưa chọn ngày sinh'
    },
    {
      condition: role === 0,
      setError: setErrorRole,
      errorMessage: 'Chưa chọn quyền người dùng'
    },
  ]
  const userContextParams = React.useContext(UserContex)
  const modalPrams = React.useContext(UsecontexModalAdd)
  const onSubmitFormInsert = async (): Promise<void> => {
    for (const condition of errorConditions) {
      if (condition.condition) {
        condition.setError(condition.errorMessage)
      }
    }

    const hasError = errorConditions.some((condition) => condition.condition)
    if (hasError) {
      return
    }
    
    try{
      await callInsertUser(async (): Promise<void> => {
        await insert(requestDataInsert)
      })
      setMessage('đã thêm người Dùng!')
      setSeverity('success')
      modalPrams.offModal
      loadingParams.setLoading()
    }catch{
      setMessage('Thêm người dùng thất bại!')
      setSeverity('error')
    }
  }

  const onSubmitFormEdit = async (): Promise<void> => {
    for (const condition of errorConditions) {
      if (condition.condition) {
        condition.setError(condition.errorMessage)
      }
    }

    const hasError = errorConditions.some((condition) => condition.condition)
    if (hasError) {
      return
    }
    await callEdittUser(async (): Promise<void> => {
      await editUser(requestDataEdit)
    })
    modalPrams.offModal
    userContextParams.alertEdit()
    loadingParams.setLoading()
  }
  React.useEffect(() => {
    const fetchDataDep = async (): Promise<any> => {
      try {
        const data = await getAllDep()
        callAllDep(() => Promise.resolve(data))
      } catch (error) {
        console.log(error)
      }
    }
    const fetchDataRole = async (): Promise<any> => {
      try {
        const data = await getAllRole()
        callAllRole(() => Promise.resolve(data))
      } catch (error) {
        console.log(error)
      }
    }

    fetchDataRole()
    fetchDataDep()
  }, [])
  if (message !== '') {
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  return (
    <>
      {message && <MessageAlert message={message} severity={severity} />}
      {prop.edit ? (
        <>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1, width: '45%' },

              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gridTemplateColumns: { sm: '1fr 1fr' },
              gap: 2
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              disabled
              value={cccd}
              id='outlined-error-helper-text'
              label='ID người dùng'
            />
            <TextField
              defaultValue={userName}
              id='filled-basic'
              label='Họ Và Tên'
              onChange={onchangeUserName}
              variant='outlined'
              error={Boolean(errorUserName)}
              helperText={errorUserName}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  format='DD/MM/YYYY'
                  value={birthDay}
                  onChange={onchangeBirthDay}
                  sx={{ width: '100%' }}
                  label='Ngày Sinh '
                />
              </DemoContainer>
            </LocalizationProvider>

            <TextField
              defaultValue={gmail}
              onChange={onchangeGmail}
              id='outlined-basic'
              label='Gmail'
              variant='outlined'
              error={Boolean(errorGmail)}
              helperText={errorGmail}
            />
            <TextField
              defaultValue={pass}
              onChange={onchangePass}
              id='filled-basic'
              label='Mật Khẩu'
              variant='outlined'
              error={Boolean(errorPassword)}
              helperText={errorPassword}
            />
            <TextField
              value={role}
              error={Boolean(errorRole)}
              helperText={errorRole}
              onChange={onchangeRole}
              id='selectDep'
              label='Chọn Quyền'
              select
            >
              {Roles == null ? (
                <MenuItem value='10'>Ten</MenuItem>
              ) : (
                Roles.map((item: Role, index: number): JSX.Element => {
                  return (
                    <MenuItem
                      sx={{ color: 'black' }}
                      key={index}
                      value={item.roleId}
                    >
                      {item.roleName}
                    </MenuItem>
                  )
                })
              )}
            </TextField>
            <TextField
              value={dep}
              error={Boolean(errorDep)}
              helperText={errorDep}
              onChange={onchangeDep}
              id='selectDep'
              label='Chọn Khoa'
              select
            >
              {Deps == null ? (
                <MenuItem value='10'>Ten</MenuItem>
              ) : (
                Deps.map((item: Dep, index: number): JSX.Element => {
                  return (
                    <MenuItem
                      sx={{ color: 'black' }}
                      key={index}
                      value={item.depId}
                    >
                      {item.depName}
                    </MenuItem>
                  )
                })
              )}
            </TextField>
          </Box>
          <Button
            onClick={onSubmitFormEdit}
            sx={{
              position: 'relative',
              left: '45%',
              right: '20%',
              marginTop: 2
            }}
            variant='contained'
          >
            LƯU CHỈNH SỬA
          </Button>
        </>
      ) : (
        <>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1, width: '45%' },
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gridTemplateColumns: { sm: '1fr 1fr' },
              gap: 2
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              id='filled-basic'
              label='Họ Và Tên'
              onChange={onchangeUserName}
              variant='outlined'
              error={Boolean(errorUserName)}
              helperText={errorUserName}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  slotProps={{
                    textField: {
                      className: errDateOfBirth ? 'errorMessage' : '',
                      helperText: errDateOfBirth
                    }
                  }}
                  onChange={onchangeBirthDay}
                  sx={{ width: '100%' }}
                  label='Ngày Sinh'
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              onChange={onchangeGmail}
              id='outlined-basic'
              type='email'
              label='Gmail'
              variant='outlined'
              error={Boolean(errorGmail)}
              helperText={errorGmail}
            />
            <TextField
              onChange={onchangePass}
              id='filled-basic'
              label='Mật Khẩu'
              variant='outlined'
              error={Boolean(errorPassword)}
              helperText={errorPassword}
            />
            <TextField
              onChange={onchangeRole}
              id='selectDep'
              label='Chọn Quyền'
              select
              defaultValue={''}
              error={Boolean(errorRole)}
              helperText={errorRole}
            >
              {Roles == null ? (
                <MenuItem value='10'>Ten</MenuItem>
              ) : (
                Roles.map((item: Role, index: number): JSX.Element => {
                  return (
                    <MenuItem
                      sx={{ color: 'black' }}
                      key={index}
                      value={item.roleId}
                    >
                      {item.roleName}
                    </MenuItem>
                  )
                })
              )}
            </TextField>
            <TextField
              onChange={onchangeDep}
              id='selectDep'
              label='Chọn Khoa'
              select
              defaultValue={''}
              error={Boolean(errorDep)}
              helperText={errorDep}
            >
              {Deps == null ? (
                <MenuItem value='10'>Ten</MenuItem>
              ) : (
                Deps.map((item: Dep, index: number): JSX.Element => {
                  return (
                    <MenuItem
                      sx={{ color: 'black' }}
                      key={index}
                      value={item.depId}
                    >
                      {item.depName}
                    </MenuItem>
                  )
                })
              )}
            </TextField>
          </Box>
          <Button
            onClick={onSubmitFormInsert}
            sx={{
              position: 'relative',
              left: '45%',
              right: '20%',
              marginTop: 2
            }}
            variant='contained'
          >
            TẠO MỚI
          </Button>
        </>
      )}
    </>
  )
}
