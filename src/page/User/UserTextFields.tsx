import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, MenuItem } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { getAll } from '~/api/depApi'
import { getAllRole } from '~/api/roleApi'

import dayjs, { locale } from 'dayjs'

import Fetch from '~/hook/Fetch'
import useFetch from '~/hook/useFetch'
import { editUser, insert } from '~/api/userApi'
import base_url from '~/config/env'

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
  userAddress: string
  roleId: number
  depId: number
}): JSX.Element {
  const [cccd, setCCCD] = React.useState<string>(prop.id || '')
  const [userName, setUserName] = React.useState<string>(prop.userName || '')
  const [pass, setPass] = React.useState<string>(prop.password || '')
  const [gmail, setGmail] = React.useState(prop.email || '')
  const [address, setAddress] = React.useState<string>(prop.userAddress || '')
  const [birthDay, setBirthDay] = React.useState<string>(prop.dateOfBirth || '')
  const [dep, setDep] = React.useState<number>(prop.depId || 0)
  const [role, setRole] = React.useState<number>(prop.roleId || 0)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)

  const [depData, ,] = Fetch(getAll)
  const [roleData, ,] = Fetch(getAllRole)
  const Deps = depData?.data
  const Roles = roleData?.data
  const [userInsert, callInsertUser] = useFetch()
  const [EdittUser, callEdittUser] = useFetch()
  let formattedDateOfBirth: string | null = null
  if (birthDay) {
    formattedDateOfBirth = dayjs(birthDay).format('MM-DD-YYYY')
  }

  console.log('date of birth:' + formattedDateOfBirth)
  const onchangeUserName = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setUserName(event.target.value)
  }
  const onchangeCCCD = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setCCCD(event.target.value)
  }
  const onchangePass = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPass(event.target.value)
  }
  const onchangeAddress = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setAddress(event.target.value)
  }
  const onchangeGmail = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setGmail(event.target.value)
  }
  const onchangeBirthDay = function (value: string | null): void {
    if (value) {
      const formattedDate = dayjs(value).format('YYYY-MM-DD')
      setBirthDay(formattedDate)
    }
  }
  const onchangeDep = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setDep(Number(event.target.value))
  }
  const onchangeRole = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setRole(Number(event.target.value))
  }
  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
  }
  const requestData: {
    userId: string
    userName: string
    dateOfBirth: string
    email: string
    password: string
    userAddress: string
    roleId: number
    depId: number
  } = {
    userId: cccd,
    userName: userName,
    dateOfBirth: birthDay,
    email: gmail,
    password: pass,
    userAddress: '',
    roleId: Number(role),
    depId: Number(dep)
  }

  const onSubmitForm = (): void => {
    callInsertUser(async () => {
      try {
        console.log(requestData)
        await insert(requestData)
        await setShowSuccess(true)
        window.location.reload()
      } catch (error) {
        setShowError(true)
      }
    })
  }
  const onSubmitFormEdit = (): void => {
    callEdittUser(async () => {
      try {
        await editUser(requestData)
        await setShowSuccess(true)
        window.location.reload()
      } catch (error) {
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
              defaultValue={cccd}
              onChange={onchangeCCCD}
              id='outlined-basic'
              label='CCCD'
              variant='outlined'
            />
            <TextField
              defaultValue={userName}
              id='filled-basic'
              label='Họ Và Tên'
              onChange={onchangeUserName}
              variant='outlined'
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  // defaultValue={formattedDateOfBirth}
                  // defaultValue={formattedDateOfBirth}
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
            />
            <TextField
              defaultValue={pass}
              onChange={onchangePass}
              id='filled-basic'
              label='Mật Khẩu'
              variant='outlined'
            />
            <TextField
              defaultValue={address}
              onChange={onchangeAddress}
              id='standard-basic'
              label='Địa Chỉ'
              variant='outlined'
            />

            <TextField
              value={role}
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
              onChange={onchangeCCCD}
              id='outlined-basic'
              label='CCCD'
              variant='outlined'
            />
            <TextField
              id='filled-basic'
              label='Họ Và Tên'
              onChange={onchangeUserName}
              variant='outlined'
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  onChange={onchangeBirthDay}
                  sx={{ width: '100%' }}
                  label='Ngày Sinh'
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              onChange={onchangeGmail}
              id='outlined-basic'
              label='Gmail'
              variant='outlined'
            />
            <TextField
              onChange={onchangePass}
              id='filled-basic'
              label='Mật Khẩu'
              variant='outlined'
            />
            {/* <TextField onChange={onchangeAddress} id='standard-basic' label='Địa Chỉ' variant='outlined' /> */}

            <TextField
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
            onClick={onSubmitForm}
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
