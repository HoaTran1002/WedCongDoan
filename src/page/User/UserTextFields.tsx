import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, MenuItem } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import useAxios from '~/hook/useAxios'
import { getAll } from '~/api/depApi'
import { getAllRole } from '~/api/roleApi'
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types'
import { DateValidationError } from '@mui/x-date-pickers'
import { Insert } from '~/api/userApi'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'

interface Dep {
  depId: number
  depName: string
}
interface Role {
  roleId: number
  roleName: string
}
export default function UserTextFields(): JSX.Element {
  const [cccd, setCCCD] = React.useState<string>('')
  const [userName, setUserName] = React.useState<string>('')
  const [pass, setPass] = React.useState<string>('')
  const [gmail, setGmail] = React.useState('')
  const [address, setAddress] = React.useState<string>('')
  const [birthDay, setBirthDay] = React.useState<string>('')
  const [dep, setDep] = React.useState<string>('')
  const [role, setRole] = React.useState<string>('')

  const [fetchStop, setFetchStop] = React.useState<boolean>(false)
  const [res, setRes] = React.useState<AxiosResponse | null>(null)
  const [e, setE] = React.useState<string>('')
  const [load, setLoad] = React.useState<boolean>(false)

  const [depData, ,] = useAxios(getAll)
  const [roleData, ,] = useAxios(getAllRole)
  const Deps = depData?.data
  const Roles = roleData?.data
  const onchangeUserName = function (event: React.ChangeEvent<HTMLInputElement>): void {
    setUserName(event.target.value)
  }
  const onchangeCCCD = function (event: React.ChangeEvent<HTMLInputElement>): void {
    setCCCD(event.target.value)
  }
  const onchangePass = function (event: React.ChangeEvent<HTMLInputElement>): void {
    setPass(event.target.value)
  }
  const onchangeAddress = function (event: React.ChangeEvent<HTMLInputElement>): void {
    setAddress(event.target.value)
  }
  const onchangeGmail = function (event: React.ChangeEvent<HTMLInputElement>): void {
    setGmail(event.target.value)
  }
  const onchangeBirthDay = function (
    value: string | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ): void {
    if (value) {
      const formattedDate = dayjs(value).format('YYYY/MM/DD')
      setBirthDay(formattedDate)
    }
  }
  const onchangeDep = function (event: React.ChangeEvent<HTMLInputElement>): void {
    setDep(event.target.value)
  }
  const onchangeRole = function (event: React.ChangeEvent<HTMLInputElement>): void {
    setRole(event.target.value)
  }

  const postUser = function (): void {
    const requestData = {
      userId: cccd,
      userName: userName,
      dateOfBirth: birthDay,
      email: gmail,
      password: pass,
      userAddress: address,
      roleId: role,
      depId: dep
    }

    const fetchData = async (): Promise<void> => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [response, error, loading] = await useAxios(Insert(requestData))

      setRes(response)
      setE(error)
      setLoad(loading)
    }
    fetchData()
  }
  if (fetchStop) {
    setFetchStop(false)
    postUser()
  }
  const onSubmitForm = (): void => {
    setFetchStop(true)
  }
  console.log('post:' + res)
  console.log('Lỗi:' + e)
  console.log('Loading:' + load)
  return (
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
        <TextField onChange={onchangeCCCD} id='outlined-basic' label='CCCD' variant='outlined' />
        <TextField id='filled-basic' label='Họ Và Tên' onChange={onchangeUserName} variant='outlined' />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker onChange={onchangeBirthDay} sx={{ width: '100%' }} label='Ngày Sinh' />
          </DemoContainer>
        </LocalizationProvider>
        <TextField onChange={onchangeGmail} id='outlined-basic' label='Gmail' variant='outlined' />
        <TextField onChange={onchangePass} id='filled-basic' label='Mật Khẩu' variant='outlined' />
        <TextField onChange={onchangeAddress} id='standard-basic' label='Địa Chỉ' variant='outlined' />

        <TextField onChange={onchangeRole} id='selectDep' label='Chọn Quyền' select>
          {Roles == null ? (
            <MenuItem value='10'>Ten</MenuItem>
          ) : (
            Roles.map((item: Role, index: number): JSX.Element => {
              return (
                <MenuItem sx={{ color: 'black' }} key={index} value={item.roleId}>
                  {item.roleName}
                </MenuItem>
              )
            })
          )}
        </TextField>
        <TextField onChange={onchangeDep} id='selectDep' label='Chọn Khoa' select>
          {Deps == null ? (
            <MenuItem value='10'>Ten</MenuItem>
          ) : (
            Deps.map((item: Dep, index: number): JSX.Element => {
              return (
                <MenuItem sx={{ color: 'black' }} key={index} value={item.depId}>
                  {item.depName}
                </MenuItem>
              )
            })
          )}
        </TextField>
      </Box>
      <Button
        onClick={onSubmitForm}
        sx={{ position: 'relative', left: '45%', right: '20%', marginTop: 2 }}
        variant='contained'
      >
        TẠO MỚI
      </Button>
    </>
  )
}
