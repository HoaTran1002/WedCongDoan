import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton
} from '@mui/material'
import LoginImg from '~/assets/img/congDoanLogin.jpg'
import CongDoanLogo from '~/assets/img/logo_CongDoan.png'
import server from '~/api/axios'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '~/hook/useAuth'
import useFetch from '~/hook/useFetch'
import { getAllRole } from '~/api/roleApi'

function Copyright(props: any): JSX.Element {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'IDX_team @ '}
      <Link color='inherit' href='https://mui.com/'>
        WebsiteCongDoanHCM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()
export default function Login(): JSX.Element {
  const { profile } = useAuth()
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false)
  const [roleState, getRoleState] = useFetch()
  const handleClickShowPassword = (): void => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault()
  }
  React.useEffect(() => {
    getRoleState(getAllRole)
  }, [])
  const roleData = roleState.payload || []

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = {
      email: data.get('email'),
      password: data.get('password')
    }
    try {
      await server.post('/Users/Login', body)
      localStorage.setItem('Login',JSON.stringify('success'))
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  // navigate(location.state?.from || '/');
  if (profile?.roleId === 1 || profile?.roleId === 2) {
    return <Navigate to={'/CompetitionManage'} replace={true} />
  } else if (profile?.roleId == 3) {
    return <Navigate to={'/'} replace={true} />
  }
  // if(profile){
  //   return <Outlet />
  // }

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
              Đăng Nhập
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
              />
              {/* <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Mật khẩu'
                type='password'
                id='password'
                autoComplete='current-password'
              /> */}
              <FormControl sx={{ mt: 2, width: '100%' }} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <RemoveRedEyeIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Mật khẩu'
                  name='password'
                />
              </FormControl>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                ĐĂNG NHẬP
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/Register' variant='body2'>
                    {'Chưa có tài khoản, đăng ký ngay '}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
