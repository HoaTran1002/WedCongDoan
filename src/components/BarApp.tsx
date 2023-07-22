import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import List from '@mui/material/List'
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
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { Image } from '@mui/icons-material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { ButtonGroup, Stack , Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Index from '~/page'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../assets/img/logo_CongDoan.png'
import avata from '~/assets/img/avata.jpg'
import bannerExam from '../assets/img/cuoc_thi_cong_doan_banner.png'
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import useAuth from '~/hook/useAuth'
const drawerWidth = 250
const pages = [
  { name: 'TRANG CHỦ', to: '/', iconComponent: <HomeIcon /> },
  { name: 'DANH SÁCH CUỘC THI', to: '/Listcompetition', iconComponent: <FormatListBulletedIcon /> },
  { name: 'GIẢI THƯỞNG', to: '/PrizeCompetition', iconComponent: <FormatListBulletedIcon /> },
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
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export default function SideBar(): JSX.Element {
  const theme = useTheme()
  const navigate = useNavigate()
  const {profile} = useAuth()
  const [open, setOpen] = React.useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

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

  const handleGoToHistoryComp = ():void =>{
    navigate('/HistoryCompetition')
  }
  const getOneCharacter= (userName?:string):string | undefined=>{
    const lastPartOfName = userName?.split(" ").slice(-1)[0];
    return lastPartOfName?.charAt(0);
  }
  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: "center",
          padding: "5px 10px",
          backgroundColor: "#eeeeee",
          justifyContent: "space-between",
          height: "40px"
        }}
      >
        <span>
          <span style={{ fontWeight: "500" }}>Email: &nbsp;</span>
          vanphongcongdoantphcm@gmail.com - ldld@tphcm.gov.vn
        </span>
        <span style={{ display: "flex", gap: "10px" }}>
          <Box
            component='a'
            href='https://www.facebook.com/congdoanthanhphohochiminh'
            target='_blank'
            sx={{
              color: "#0e91f3",
              display: "flex",
              alignItems: "center"
            }}
          >
            <FacebookIcon />
          </Box>
          <Box
            component='a'
            href='https://www.youtube.com/c/C%C3%B4ng%C4%91o%C3%A0nTh%C3%A0nhph%E1%BB%91H%E1%BB%93Ch%C3%ADMinh/featured'
            target='_blank'
            sx={{
              color: "red",
              display: "flex",
              alignItems: "center"

            }}
          >
            <YouTubeIcon />
          </Box>
        </span>
      </Box>
      <Box
        sx={{
          height: { xs: '150px', md: '120px' },
          display: "flex",
          backgroundColor: "#fbfbfb"
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: '10px',
            alignItems: "center",
            gap: "10px"
          }}

        >
          <Box
            sx={{
              height: '80px',
              width: '80px',
            }}
          >
            <Box
              component='img'
              src={logo}
              sx={{
                height: "100%"
              }}
            />
          </Box>
          <Box>
            <Box
              component='span'
              sx={{
                fontWeight: "500",
                color: "#1565c0",
                fontSize: "16px",
                textAlign: { xs: "center", md: "left" },
                display: { xs: "block", md: "block" }
              }}
            >
              Trang thông tin điện tử
            </Box>
            <Box
              component='p'
              sx={{
                margin: "4px 0",
                fontWeight: "600",
                color: "#1565c0",
                textAlign: { xs: "center", md: "left" },
                display: { xs: "block", md: "block" }
              }}
            >
              CÔNG ĐOÀN <br /> THÀNH PHỐ HỒ CHÍ MINH
            </Box>
            <Box
              component='span'
              sx={{
                color: "#ff0000",
                fontSize: "14px",
                textAlign: { xs: "center", md: "left" },
                display: { xs: "block", md: "block" }
              }}
            >
              HO CHI MINH CITY FEDERATION OF LABOUR
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: { xs: 'none', md: 'flex' },
            justifyContent: "end",
            flex: "1"
          }}
        >
          <Link
            to={'/'}
          >
            <Box
              sx={{
                display: "inline-block",
                height: "100%"
              }}
            >
              <Box
                component='img'
                src={bannerExam}
                sx={{
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </Box>
          </Link>
        </Box>
      </Box>
      <Box
        sx={headerNavigate}
      >
        <Box
          onClick={handleDrawerOpen}
          sx={{
            backgroundColor: "white",
            height: "100%",
            width: "50px",
            display: { xs: 'flex', md: 'none' },
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MenuIcon sx={{ color: "#1769ba" }} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            height: "100%"
          }}>
          <Box
            component='ul'
            sx={{
              listStyleType: "none",
              padding: 0,
              display: "flex",
              m: 0,
              pl: 2
            }}
          >
            {pages.map((page, index) => (
              <Box
                key={index}
                component='li'
              >
                <Link
                  className={
                    `link_navbar-header ${location.pathname === page.to ? 'active' : ''}`
                  }
                  to={page.to}
                >
                  {page.name}
                </Link>

              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ display:'flex',gap:"30px",alignItems:"center" }}>
        <Button 
              variant='outlined'
              startIcon={<HistoryIcon/>}
              sx={{
                width:"100%",
                border:"1px solid #fff",
                borderRadius:"5px",
                color:"white",
                '&:hover':{
                  borderColor:"#fff"
                }
              }}
              onClick={():void=>{
                navigate('/HistoryCompetition')
              }}
            >
                LỊCH SỬ THI
            </Button>
          <Box
            sx={{
              position:"relative",
              '&:hover .box_info-avata':{
                display:"flex",
              }
            }}
          >
            
            <Avatar 
              sx={{
                backgroundColor:"#d139ff",
                color:"white",
                fontWeight:"500",
                cursor:"pointer",
                mr:3,
                

              }}
            >
              {getOneCharacter(profile?.userName)}
            </Avatar>
            <Box
              className='box_info-avata'
              sx={{
                position:"absolute",
                width:"200px",
                backgroundColor:"white",
                right:"30px",
                top:"50px",
                padding:"10px",
                borderRadius:"5px",
                display:"none",
                alignItems:"center",
                flexDirection:"column",
                gap:"10px",
                transition:"0.2s all linear",
                boxShadow: "rgba(0, 0, 0, 0.2) -3px 4px 14px 0px",
                '&::before':{
                  content:"''",
                  left:0,
                  position:"absolute",
                  right:0,
                  height:"30px",
                  top:"-30px"
                }
              }}
            >
              <Avatar 
                sx={{
                  backgroundColor:"#d139ff",
                  color:"white",
                  fontWeight:"500",
                  cursor:"pointer",
                  gap:"10px"
                }}
              >
                {getOneCharacter(profile?.userName)}
              </Avatar>
              <h3 
                className='color-primary'
                style={{
                  margin:"5px 0"
                }}
              >
                {profile?.userName}
              </h3>
              
              {
                profile?.roleId === 1 || profile?.roleId === 2 ? (
                  <Button 
                    variant='outlined'
                    startIcon={<SettingsIcon/>}
                    sx={{
                      width:"100%"
                    }}
                    onClick={():void=>{
                      navigate('/CompetitionManage')
                    }}
                  >
                    QUẢN LÝ
                  </Button>
                ):(<></>)
              }
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {pages.map((page, index) => (
              <ListItem 
                key={index} disablePadding
                sx={{
                  ...(location.pathname === page.to && activeItemMobile)
                }}
              >
                <Link
                  to={page.to}
                  style={{ width: "100%", textDecoration: "none" }}
                >
                  <ListItemButton>
                    <ListItemIcon>{page.iconComponent}</ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "#333",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                          color:"#1769ba"
                        }}
                      >
                        {page.name}
                      </span>
                    </ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  )
}


const headerNavigate: SxProps = {
  position: 'sticky',
  backgroundColor: "#1565c0",
  height: "60px",
  left: 0,
  right: 0,
  top: "-1px",
  zIndex: "50",
  mt: "-1px",
  display: "flex",
  justifyContent: { xs: 'space-between' },
  boxShadow: "rgba(0, 0, 0, 0.2) -3px 4px 14px 0px",
}

const activeItemMobile:SxProps={
  backgroundColor:"#b1d7fd"
}