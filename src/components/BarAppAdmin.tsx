import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Box, Container, Grid } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import CloseIcon from '@mui/icons-material/Close';
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
import PortraitIcon from '@mui/icons-material/Portrait';
import GridViewIcon from '@mui/icons-material/GridView'
import { IndeterminateCheckBoxOutlined, Opacity } from '@mui/icons-material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person'
import WebIcon from '@mui/icons-material/Web'
import AppsIcon from '@mui/icons-material/Apps'
import { blue, yellow } from '@mui/material/colors'
import { SxProps } from '@mui/material'
import { getOneCharacter } from '~/utils/stringUtils'
import useAuth from '~/hook/useAuth'
import useFetch from '~/hook/useFetch'
import { getLogout } from '~/api/userApi'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImgBannerLeft from '~/assets/img/congDoanLogin.jpg'
import HomeIcon from '@mui/icons-material/Home';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
const drawerWidth = 250
const pagesOfAdmin = [
  { name: 'CUỘC THI', to: '/CompetitionManage', icon: <GridViewIcon />, roles: [1, 2] },
  { name: 'USER', to: '/User', icon: <PersonIcon />, roles: [1] },
  { name: 'BLOG', to: '/BlogManage', icon: <WebIcon />, roles: [1] },
  { name: 'KẾT QUẢ', to: '/ResultManage', icon: <MilitaryTechIcon />, roles: [1] },
  {
    name: 'THÔNG TIN', to: '/SettingManage', icon: <AppsIcon />, childrenSubIcon: <ArrowDropDownIcon />, roles: [1], children: [
      { name: "GIẢI THƯỞNG", to: '/PrizeManage', icon: <SubdirectoryArrowRightIcon /> },
      { name: "LOẠI GIẢI THƯỞNG", to: '/PrizeTypeManage', icon: <SubdirectoryArrowRightIcon /> },
      { name: "KHOA", to: '/DepartmentManage', icon: <SubdirectoryArrowRightIcon /> },
    ]
  },
  { name: 'TRANG CHỦ', to: '/', roles: [1, 2], icon: <HomeIcon /> }
]

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export default function Index(): JSX.Element {
  const { profile, widthMin, setWidthMin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const [logOutState, setLogout] = useFetch()
  const [openNavbarMobile,setOpenNavbarMobile] = React.useState<boolean>(true)
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

  const logoutAccount = (): void => {
    getLogout().then((): void => {
      navigate('/Login')
      window.location.reload()
    })
  }
  const buttonStyles: SxProps = {
    m: "0 10px" ,
    padding: "10px",
    background: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    transition: "all linear 0.2s",
    gap: "20px",
    alignItems: 'center',
    justifyContent: !widthMin ? 'flex-start' : 'center',
    flexDirection: 'row',
    '&:hover': {
      backgroundColor: '#ffffff37',
    },
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'white',
    fontSize: "22px",
    zIndex: "40",
    position: "relative"
  }
  
  return (
    <Box sx={{ display: 'flex', width: '100vw', transition: "all linear 0.2s" }}>
      <Box
        sx={{
          zIndex: "10",
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          pb:"30px",
          width: widthMin ? 'var(--width-left-navbar-min)' : 'var(--width-left-navbar-max)',
          transition: "all linear 0.2s",
          transform:{xs:openNavbarMobile?"translateX(-100%)":"translateX(0)",md:"translateX(0)"},
          backgroundColor: "#0070df",
          overflowY:'scroll',
          '&::-webkit-scrollbar':{
            display:"none"
          },
          '&:hover': {
            width: 'var(--width-left-navbar-max)',
            zIndex: "50"
          },
          '&:hover .item_navbar-left': {
            justifyContent: "flex-start"
          },
          '&:hover .item_navbar-left-name': {
            opacity: '1  !important',
            transform: "translateX(0) !important",
          },
          '&:hover .user-Name':{
            display:"block !important"
          },
          '&:hover .icon-user-name':{
            display:"block"
          }
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            bottom: 0,
            opacity: "0.7",
            backgroundColor: "#005ebc",
          }}
        >

        </Box>
        <Box
          sx={{
            position:"absolute",
            top:"15px",
            right:"15px",
            zIndex:"999",
            display:{md:"none",xs:"block"}

          }}
          onClick={(): void => setOpenNavbarMobile((r: any) => !r)}
        >
          <CloseIcon sx={{color:"white",fontSize:"28px"}}/>
        </Box>
        <Box
          component='img'
          sx={{
            position: "absolute",
            width: "100%",
            height: "50%",
            objectFit: "cover",
            bottom: 0,
            opacity: "0.1",
            zIndex: "-1"
          }}
          src={ImgBannerLeft}
        />
        <Box
          sx={{
            display:'inlineFlex' ,
            width: '100%',
            height: "66px",
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
            position: "relative"
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
          <span
            style={{
              height: "0.5px",
              position: "absolute",
              backgroundColor: "white",
              display: "inline-block",
              bottom: "0",
              left: "10px",
              right: "10px"
            }}
          ></span>
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection:"column"
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width:"100%"
            }}
          >
            <Tooltip title={profile?.userName}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  m: "10px 0 10px 20px"
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: '#d139ff',
                    color: 'white',
                    fontWeight: '500',
                    cursor: 'pointer',
                    gap: '10px'
                  }}
                  onClick={handleOpenUserMenu}
                >
                  {getOneCharacter(profile?.userName)}
                </Avatar>
                <span
                className='user-Name'
                  style={{
                    color: "white",
                    fontWeight: "500",
                    zIndex: "30",
                    fontSize: "19px",
                    cursor: "pointer",
                    bottom: "0",
                    display:widthMin?'none':'block'
                  }}
                >
                  {profile?.userName}
                </span>
              </Box>
            </Tooltip>
          </Box>
          <Box>
          <Link
                    style={{ color: 'white', textDecoration: 'none' }}
                    to={'/ProfileAdmin'}
                  >
                    <Box
                      className='item_navbar-left'
                      onClick={handleCloseNavMenu}
                      sx={{
                        ...buttonStyles,
                        ...(location.pathname === '/ProfileAdmin' && activeButtonStyles),
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PortraitIcon />
                      </span>
                      <span
                        className='item_navbar-left-name'
                        style={{
                          fontSize: "17px",
                          fontWeight: "300",
                          // flex:widthMin ?'1':'0',
                          opacity: widthMin ? '0' : '1',
                          transform: widthMin ? "translateX(-50%)" : "translateX(0)",
                          display: 'block',
                          transition: "all linear 0.2s",
                          position: 'absolute',
                          left: "50px"
                        }}
                      >
                        THÔNG TIN
                      </span>
                      

                    </Box>
          </Link>
          </Box>
            <span
              style={{
                height: "0.5px",
                position: "absolute",
                backgroundColor: "white",
                display: "inline-block",
                bottom: "-10px",
                width: "100%"
              }}
            ></span>
        </Box>
        <Box
          sx={{
            mt: "40px",
            // display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            position: "relative",
            zIndex: "30",
            gap: "10px"
          }}
        >
          {
            pagesOfAdmin.map((page, index: number) => (
              page.roles.find((r) => r === profile?.roleId) ? (
                page.children ? (
                  <Box
                    key={index}
                    className='ItemNavbar'
                    sx={{
                      transition:"all linear 0.2s",
                      height:"44px",
                      overflow:"hidden",
                      '&:hover':{
                        height:`calc((${page.children.length} + 1) * 44px)`,
                      },
                      '&:hover .subItemNavbar':{
                        opacity:"1",
                        display:"block",
                        transform:"translateY(0)",
                      },
                      '&:hover .icon-subItem-item':{
                        opacity:'1 !important'
                      }
                    }}
                  >
                    <Link
                      style={{ color: 'white', textDecoration: 'none' }}
                      to={page.to}
                      
                    >
                      <Box
                        className='item_navbar-left'
                        onClick={handleCloseNavMenu}
                        sx={{
                          ...buttonStyles,
                          ...(location.pathname === page.to && activeButtonStyles)
                        }}
                      >
                        <span
                          style={{
                            // fontSize:"20px",
                            // flex:widthMin ?'1':'0'
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {
                            page.icon
                          }
                        </span>
                        <span
                          className='item_navbar-left-name'
                          style={{
                            fontSize: "17px",
                            fontWeight: "300",
                            // flex:widthMin ?'1':'0',
                            opacity: widthMin ? '0' : '1',
                            transform: widthMin ? "translateX(-50%)" : "translateX(0)",
                            display: 'block',
                            transition: "all linear 0.2s",
                            position: 'absolute',
                            left: "50px"
                          }}
                        >
                          {
                            page.name
                          }
                        </span>
                        {
                          page.childrenSubIcon && (
                            <span
                              className='icon-subItem-item'
                              style={{
                                position: "absolute",
                                right: "0px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                alignItems: "center",
                                opacity:!widthMin ? '1':'0'
                              }}
                            >
                              {page.childrenSubIcon}
                            </span>
                          )
                        }

                      </Box>
                    </Link>
                    <Box
                      className='subItemNavbar'
                      sx={{
                        opacity:"0",
                        
                        transition:"all linear 0.2s",
                        transform:"translateY(-100%)",
                      }}
                    >
                      {
                        page.children?.map((r,i:number)=>{
                          return (
                            <Link
                            key={i}
                            style={{ color: 'white', textDecoration: 'none' }}
                            to={r.to}
                          >
                            <Box
                              className='item_navbar-left'
                              onClick={handleCloseNavMenu}
                              sx={{
                                ...buttonStyles,
                                ...(location.pathname === r.to && activeButtonStyles)
                              }}
                            >
                              <Box
                                component='span'
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  ml:"10px"
                                }}
                              >
                                {
                                  r.icon
                                }
                              </Box>
                              <span
                                className='item_navbar-left-name'
                                style={{
                                  fontSize: "17px",
                                  fontWeight: "300",
                                  opacity: widthMin ? '0' : '1',
                                  transform: widthMin ? "translateX(-50%)" : "translateX(0)",
                                  display: 'block',
                                  transition: "all linear 0.2s",
                                  position: 'absolute',
                                  left: "50px"
                                }}
                              >
                                {
                                  r.name
                                }
                              </span>

                            </Box>
                          </Link>
                          )
                        })
                      }

                    </Box>
                  </Box>
                ):(
                  <Link
                    key={index}
                    style={{ color: 'white', textDecoration: 'none' }}
                    to={page.to}
                  >
                    <Box
                      className='item_navbar-left'
                      onClick={handleCloseNavMenu}
                      sx={{
                        ...buttonStyles,
                        ...(location.pathname === page.to && activeButtonStyles),
                      }}
                    >
                      <span
                        style={{
                          // fontSize:"20px",
                          // flex:widthMin ?'1':'0'
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {
                          page.icon
                        }
                      </span>
                      <span
                        className='item_navbar-left-name'
                        style={{
                          fontSize: "17px",
                          fontWeight: "300",
                          // flex:widthMin ?'1':'0',
                          opacity: widthMin ? '0' : '1',
                          transform: widthMin ? "translateX(-50%)" : "translateX(0)",
                          display: 'block',
                          transition: "all linear 0.2s",
                          position: 'absolute',
                          left: "50px"
                        }}
                      >
                        {
                          page.name
                        }
                      </span>
                      

                    </Box>
                  </Link>
                )
              ) : (
                <Box
                   key={index}
                      className='item_navbar-left'
                      onClick={handleCloseNavMenu}
                      sx={{
                        ...buttonStyles,
                        color:"#ffffff",
                        opacity:"0.4",
                        cursor:"default",
                        '&:hover':{
                          backgroundColor:"transparent"
                        }
                      }}
                    >
                      <span
                        style={{
                          // fontSize:"20px",
                          // flex:widthMin ?'1':'0'
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {
                          page.icon
                        }
                      </span>
                      <span
                        className='item_navbar-left-name'
                        style={{
                          fontSize: "17px",
                          fontWeight: "300",
                          // flex:widthMin ?'1':'0',
                          opacity: widthMin ? '0' : '1',
                          transform: widthMin ? "translateX(-50%)" : "translateX(0)",
                          display: 'block',
                          transition: "all linear 0.2s",
                          position: 'absolute',
                          left: "50px"
                        }}
                      >
                        {
                          page.name
                        }
                      </span>
                      

                </Box>
              )
            ))
          }
        </Box>
      </Box>
      <Box
        sx={{
          width: {md:widthMin ? 'var(--width-main-content-max)' : 'var(--width-main-content-min)',xs:"100vw"} ,
          ml:{md:widthMin ? 'var(--width-left-navbar-min)' : 'var(--width-left-navbar-max)',xs:"0"} ,
          zIndex: '10',
          position: 'fixed',
          transition: "all linear 0.2s",
          top: 0,
          right: 0,
          left: 0,
          height: '66px',
          backgroundColor: '#ffffff',
          boxShadow: 'rgba(0, 0, 0, 0.1) -3px 0px 10px 0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: {xs:"none",md:"flex"},
            color: "white",
            backgroundColor: "#1b86ff",
            borderRadius: "50%",
            padding: "7px",
            ml: "20px",
            cursor: "pointer",
            transition: "all linear 0.2s",
            '&:hover': {
              backgroundColor: "#1d79e1"
            }
          }}
          onClick={(): void => setWidthMin((r: any) => !r)}
        >
          {widthMin ? (
            <MenuIcon />
          ) : (
            <MoreVertIcon />
          )}
        </Box>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: {xs:"flex",md:"none"},
            color: "white",
            backgroundColor: "#1b86ff",
            borderRadius: "50%",
            padding: "7px",
            ml: "20px",
            cursor: "pointer",
            transition: "all linear 0.2s",
            '&:hover': {
              backgroundColor: "#1d79e1"
            }
          }}
          onClick={(): void => setOpenNavbarMobile((r: any) => !r)}
        >
            <MenuIcon />
        </Box>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, ml: 2 }}
        >
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            color: "white",
            backgroundColor: "#1b86ff",
            borderRadius: "50%",
            padding: "7px",
            mr: "20px",
            cursor: "pointer",
            transition: "all linear 0.2s",
            '&:hover': {
              backgroundColor: "#1d79e1"
            },
            '&:hover .box_info-avata':{
              display:"block"
            }
          }}
        >
          <SettingsIcon/>
          <Box
            className='box_info-avata'
            sx={{
              position: 'absolute',
              width: '200px',
              backgroundColor: 'white',
              right: '30px',
              top: '65px',
              padding: '10px',
              borderRadius: '5px',
              display: 'none',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '10px',
              transition: '0.2s all linear',
              boxShadow: 'rgba(0, 0, 0, 0.2) -3px 4px 14px 0px',
              '&::before': {
                content: "''",
                left: 0,
                position: 'absolute',
                right: 0,
                height: '30px',
                top: '-30px'
              }
            }}
          >
            <Button
              startIcon={<PowerSettingsNewIcon/>}
              sx={{
                width: '100%'
              }}
              color='error'
              onClick={logoutAccount}
            >
              Đăng xuất
            </Button>
          </Box>
        </Box>
      </Box>
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
          {
            pagesOfAdmin.map((page, index) => (
              <Link key={index} style={{ textDecoration: 'none' }} to={page.to}>
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText>
                      <span
                        className='color-primary'
                        style={{ fontWeight: '600' }}
                      >
                        {page.name}
                      </span>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}



const activeButtonStyles: SxProps = {
  backgroundColor: '#ffffff37',
  borderRadius: '5px !important',
  boxShadow: 'none',
}