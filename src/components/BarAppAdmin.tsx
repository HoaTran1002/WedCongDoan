import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import GridViewIcon from '@mui/icons-material/GridView'
import { Link } from 'react-router-dom'
import { IndeterminateCheckBoxOutlined } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import WebIcon from '@mui/icons-material/Web'
import AppsIcon from '@mui/icons-material/Apps'
import { blue, yellow } from '@mui/material/colors'

const drawerWidth = 250
const pages = [
  { name: 'CUỘC THI', to: '/CompetitionManage', icon: <GridViewIcon /> },
  { name: 'USER', to: '/User', icon: <PersonIcon /> },
  { name: 'BLOG', to: '/BlogManage', icon: <WebIcon /> },
  { name: 'QUẢN LÝ THÔNG TIN', to: '/SettingManage', icon: <AppsIcon /> },
  { name: 'CLIENT', to: '/' }
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export default function Index(): JSX.Element {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null)
  }
  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        sx={{
          zIndex: 2,
          paddingTop: '5.5%',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: '260px',
          backgroundColor: blue[100],
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column'
          }}
        >
          {pages.map((page, index) => (
            <Link
              key={index}
              style={{ color: 'white', textDecoration: 'none' }}
              to={page.to}
            >
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                startIcon={page.icon}
                sx={{
                  padding: '10px',
                  background: blue[100],
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#1769ba',
                    borderRadius: 'none',
                    boxShadow: 'none'
                  },
                  borderRadius: '0',
                  textDecoration: 'none',
                  width: '100%',
                  color: blue[900]
                }}
                variant='contained'
              >
                {page.name}
              </Button>
            </Link>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: '100vw',
          zIndex: '10',
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          height: '75px',
          backgroundColor: blue[400],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            width: '260px',
            height: '100%',
            justifyContent: 'center',
            background: blue[400],
            border: 1.5,
            borderColor: 'white',
            borderTop: 0,
            borderLeft: 0,
            borderBottom: 0
          }}
          alignItems={'center'}
        >
          <Box
            component='img'
            sx={{
              height: '50px'
            }}
            alt='The house from the offer.'
            src='https://api.congdoantphochiminh.org.vn/Upload/Multimedia/Images/20221229150859445_logo%20DAI%20HOI%20XII%20CONG%20DOAN%20TP%20-%20png.png'
          />
        </Box>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 0, display: { md: 'flex' }, mr: 5 }}>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Remy Sharp' />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      {/* <AppBar position='fixed' open={open}>
        <Toolbar sx={{ display: 'flex' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component='img'
            sx={{
              height: 50,
              width: 70
            }}
            alt='The house from the offer.'
            src='https://api.congdoantphochiminh.org.vn/Upload/Multimedia/Images/20221229150859445_logo%20DAI%20HOI%20XII%20CONG%20DOAN%20TP%20-%20png.png'
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Link
                key={index}
                style={{ color: 'white', textDecoration: 'none' }}
                to={page.to}
              >
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{
                    ml: 1,
                    mr: 1,
                    my: 2,
                    background: 'transparent',
                    boxShadow: 'none',
                    display: 'block',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderRadius: 'none',
                      boxShadow: 'none'
                    },
                    color: '#fff',
                    textDecoration: 'none'
                  }}
                  style={{ backgroundColor: '#1769ba' }}
                  variant='contained'
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: { md: 'flex' } }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {pages.map((page, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText>
                  <Button href={page.to}>{page.name}</Button>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
