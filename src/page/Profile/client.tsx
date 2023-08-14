import React from 'react'
import Layout from '~/components/layout/Layout'
import { Box, TextField, Grid, MenuItem, Button, Container } from '@mui/material'
import useAuth from '~/hook/useAuth'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { IUserDetails } from '~/context/AuthContext'
import { getAllUser, editUser } from '~/api/userApi'
import useFetch from '~/hook/useFetch'
import { IDepartment, IRole } from '~/interface/Interface'
import { getAllDep } from '~/api/departmentApi'
import { getAllRole } from '~/api/roleApi'
import ModalMessage from '~/components/ModalMessage'
import { isEmailValid } from '~/utils/stringUtils'
import MessageAlert from '~/components/MessageAlert'
import { useNavigate } from 'react-router-dom'
const ProfileClient = (): JSX.Element => {
    const navigate = useNavigate();
    const [edittUser, callEdittUser] = useFetch()
    const [allUsers, callAllUsers] = useFetch()
    const [departments, callAllDep] = useFetch()
    const [roles, callAllRole] = useFetch()
    const { profile } = useAuth();
    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [userName, setUserName] = React.useState<string | undefined>(profile?.userName)
    const [dayOfBrith, setDayOfBrith] = React.useState<Dayjs | any>(
        dayjs(profile?.dateOfBirth)
    )
    const [gmail, setGmail] = React.useState<string | undefined>(profile?.email)
    const [password, setPassword] = React.useState<string | undefined>('')
    const [deparment, setDepartment] = React.useState<number | undefined>(profile?.depId)
    const [role, setRole] = React.useState<number | undefined>(profile?.roleId)
    const [errorUserName, setErrorUserName] = React.useState<string>('')
    const [errorGmail, setErrorGmail] = React.useState<string>('')
    const [errorPassword, setErrorPassword] = React.useState<string>()
    const [errorRole, setErrorRole] = React.useState<string>('')
    const [errorDep, setErrorDep] = React.useState<string>('')
    const [message, setMessage] = React.useState<string>('')
    const [sererity, setServerity] = React.useState<string>('')
    const [errDateOfBirth, setErrDateOfBirth] = React.useState<string>('')
    const requestData: {
        userId: string | undefined
        userName: string | undefined
        dateOfBirth: string
        email: string | undefined
        password: string | undefined
        roleId: number
        depId: number
        isDeleted: number
        userAddress:string
    } = {
        userId: profile?.userId,
        userName: userName,
        dateOfBirth: dayOfBrith.format('YYYY-MM-DD'),
        email: gmail,
        password: password,
        roleId: Number(role),
        depId: Number(deparment),
        isDeleted: 0,
        userAddress:''
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
            condition: password === '',
            setError: setErrorPassword,
            errorMessage: 'Chưa nhập mật khẩu'
        },
        {
            condition: role === 0,
            setError: setErrorRole,
            errorMessage: 'Chưa chọn quyền người dùng'
        }
    ]
    const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(event.target.value)
    }
    const handleOpenModal = (): void => {
        setOpenModal(true)

    }
    const handleCloseModal = (): void => {
        setOpenModal(false)
    }
    const handleChangeGmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setGmail(event.target.value)
    }

    const handleChangePassWord = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const handleChangeDeparment = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDepartment(Number(event.target.value))
    }

    const onchangeDayOfBrith = (value: string | null): void => {
        setErrDateOfBirth('')
        if (value) {
            setDayOfBrith(value)
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
        try {
            await callEdittUser(async (): Promise<void> => {
                await editUser(requestData)
            })
            handleCloseModal();
            setMessage('Cập nhập thành công')
            setServerity('success')
        } catch (error) {
            setMessage('Cập nhập thất bại')
            setServerity('error')
        }
    }
    React.useEffect(() => {
        callAllUsers(getAllUser)
    }, [])
    React.useEffect(() => {
        callAllDep(getAllDep)
    }, [])
    React.useEffect(() => {
        callAllRole(getAllRole)
    }, [])
    React.useEffect(() => {
        const profileUser = allUsers?.payload?.find((r: IUserDetails) => r.userId === profile?.userId)
        setPassword(profileUser?.password)
    }, [allUsers?.loading])
    if (message !== '') {
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }
    return (
        <Layout>
            <Container maxWidth={'xl'}>
                <Grid container spacing={1} sx={{ width: "100% !important", m: 0 }}>
                    {
                        message && (
                            <MessageAlert message={message} severity={sererity} />
                        )
                    }
                    <ModalMessage
                        open={openModal}
                        close={handleCloseModal}
                        header={'Bạn có muốn cập nhập thông tin ?'}
                        handleOK={onSubmitFormEdit}
                    />
                    <Grid item md={12}>
                        <Box
                            sx={{
                                pl: "30px"
                            }}
                        >
                            <h1 className='color-primary' style={{ margin: 0, fontWeight: "400" }}>
                                Thông tin cơ bản
                            </h1>
                        </Box>
                    </Grid>
                    <Grid item md={8}>
                        <Box
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "3px",
                                padding: "10px",
                                display: "flex",
                                gap: "20px",
                                flexDirection: "column"
                            }}
                        >
                            <TextField
                                defaultValue={userName}
                                id='filled-basic'
                                label='Họ Và Tên'
                                onChange={handleChangeUserName}
                                variant='outlined'
                                error={Boolean(errorUserName)}
                                helperText={errorUserName}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        format='DD/MM/YYYY'
                                        value={dayOfBrith}
                                        onChange={onchangeDayOfBrith}
                                        sx={{ width: '100%' }}
                                        label='Ngày Sinh '
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <TextField
                                defaultValue={gmail}
                                onChange={handleChangeGmail}
                                id='outlined-basic'
                                label='Gmail'
                                variant='outlined'
                                error={Boolean(errorGmail)}
                                helperText={errorGmail}
                            />
                            <TextField
                                value={password}
                                onChange={handleChangePassWord}
                                id='filled-basic'
                                label='Mật Khẩu'
                                variant='outlined'
                                error={Boolean(errorPassword)}
                                helperText={errorPassword}
                            />
                            <TextField
                                value={deparment}
                                error={Boolean(errorDep)}
                                helperText={errorDep}
                                onChange={handleChangeDeparment}
                                id='selectDep'
                                label='Chọn Khoa'
                                select
                            >
                                {
                                    departments?.payload?.map((item: IDepartment, index: number): JSX.Element => {
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
                                }
                            </TextField>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "3px",
                                padding: "10px",
                                mr: 1,
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px"
                            }}
                        >
                            <Button
                                color='success'
                                variant='contained'
                                sx={{
                                    width: "100%"
                                }}
                                onClick={handleOpenModal}
                            >
                                Cập nhập
                            </Button>
                            <Button
                                color='primary'
                                variant='outlined'
                                sx={{
                                    width: "100%"
                                }}
                                onClick={(): void => {
                                    navigate('/')
                                }}
                            >
                                Trở về
                            </Button>
                        </Box>

                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default ProfileClient