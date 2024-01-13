import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { green } from '@mui/material/colors'
import LoginImg from '~/assets/img/congDoanLogin.jpg'
import Paper from '@mui/material/Paper'
import CongDoanLogo from '~/assets/img/logo_CongDoan.png'
import useFetch from '~/hook/useFetch'
import { getAllUser,insert } from '~/api/userApi'
import { useNavigate } from 'react-router-dom'
import server from '~/api/axios'
import { isEmailValid,validatePassword } from '~/utils/stringUtils'
const theme = createTheme()

export default function Register(): JSX.Element {
  const navigate = useNavigate(); 
  const [insertUser,callInsertUser] = useFetch();
  const [errorUsername,setErrorUsername] = React.useState<string>('');
  const [errorEmail,setErrorEmail] = React.useState<string>('');
  const [errorPassword,setErrorPassword] = React.useState<string>('');
  const [errorPasswordConflim,setErrorPasswordConflim] = React.useState<string>('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setErrorUsername('')
    setErrorEmail('')
    setErrorPassword('')
    setErrorPasswordConflim('')
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const errorConditions = [
      {
        condition: data.get('username') as string === '',
        setError: setErrorUsername,
        errorMessage: 'Chưa nhập tên người dùng'
      },
      {
        condition: !isEmailValid(data.get('email') as string),
        setError: setErrorEmail,
        errorMessage: 'Email không hợp lệ'
      },
      {
        condition: data.get('email') as string === '',
        setError: setErrorEmail,
        errorMessage: 'Chưa nhập gmail'
      },
      {
        condition: !validatePassword(data.get('password') as string),
        setError: setErrorPassword,
        errorMessage:'Mật khẩu phải có ít nhất 1 ký tự viết hoa, 1 chữ số, 1 ký tự đặc biệt và tối thiểu 5 ký tự tối đa 9 ký tự'
      },
      {
        condition: data.get('password') as string === '',
        setError: setErrorPassword,
        errorMessage: 'Chưa nhập password'
      },
      {
        condition: data.get('password') as string !== data.get('passwordComflim'),
        setError: setErrorPasswordConflim,
        errorMessage: 'Mật khẩu nhập lại không chính xác'
      },
      
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
    const requestData: {
      userName: string 
      dateOfBirth: string
      email: string  
      password: string  
      roleId: number
      depId: number
      isDeleted: number
    } = {
      userName: data.get('username') as string  ,
      dateOfBirth: new Date().toISOString(),
      email: data.get('email')  as string ,
      password: data.get('password') as string ,
      roleId: 3,
      depId: 1,
      isDeleted: 0
    }
    try{
      await callInsertUser(async (): Promise<void> => {
        await insert(requestData)
      })
      navigate('/login')
    }catch(er){
      console.log(er)
      return;
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box
              component='img'
              src={CongDoanLogo}
              sx={{
                height: '70px'
              }}
            />
            <Typography component='h1' variant='h5'>
              Đăng Ký
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete='given-name'
                    name='username'
                    required
                    fullWidth
                    id='username'
                    label='Username'
                    error={Boolean(errorUsername)}
                    helperText={errorUsername}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    required 
                    fullWidth 
                    id='email' 
                    label='Địa chỉ email' 
                    name='email' 
                    autoComplete='email' 
                    error={Boolean(errorEmail)}
                    helperText={errorEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Mật khẩu'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    error={Boolean(errorPassword)}
                    helperText={errorPassword}
                  
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='passwordComflim'
                    label='Nhập lại mật khẩu'
                    type='password'
                    id='passwordComflim'
                    autoComplete='new-password'
                    error={Boolean(errorPasswordConflim)}
                    helperText={errorPasswordConflim}
                  />
                </Grid>
              </Grid>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Đăng ký
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/Login' variant='body2'>
                    Đã có tài khoản? Đăng nhập
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
