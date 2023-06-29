import * as React from 'react'
import {  useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useLocation } from 'react-router-dom';
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
import GridViewIcon from '@mui/icons-material/GridView'
import { Link } from 'react-router-dom'
import { IndeterminateCheckBoxOutlined } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import WebIcon from '@mui/icons-material/Web'
import AppsIcon from '@mui/icons-material/Apps'
import { blue, yellow } from '@mui/material/colors'
import styled from 'styled-components'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
import logo from '../assets/img/logo_CongDoan.png'
import handelSertImg from '../assets/img/handle_cert.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
export default function Index(): JSX.Element {
    return (
        <Footer>
            <CssBaseline/>
            <Container maxWidth={'xl'}>
                <Grid 
                    container 
                    rowSpacing={1} 
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item  xs={12} md={6}>
                        <Box
                            sx={{
                                display:"flex",
                                alignItems:"center",
                                flexDirection:"column",
                                gap:"10px"
                            }}
                        >
                            <Box
                                component='img'
                                sx={{
                                  height: '60px'
                                }}
                                alt='The house from the offer.'
                                src={logo}
                            />
                            <Box
                                component='span'
                                sx={{
                                    color:"white",
                                    fontSize:"18px",
                                    fontWeight:"500",
                                    display:{xs:"block",md:"inline"},
                                    textAlign:{xs:"center",md:"left"}

                                }}
                            >
                                TRANG THÔNG TIN ĐIỆN TỬ CÔNG ĐOÀN THÀNH PHỐ HỒ CHÍ MINH
                            </Box>
                            <Box>
                                <Box
                                    component='p'
                                    sx={{
                                        color:'white',
                                        display:"flex",
                                        flexDirection:"column",
                                        gap:{xs:'12px',md:'5px'}
                                    }}
                                >
                                    <span style={{fontSize:"13px",display:'block'}}>
                                        <span style={{fontWeight:"500",paddingRight:"4px"}}>
                                            Giấy phép số: 
                                        </span>
                                        05/GP-STTTT do Sở Thông tin và Truyền thông TP Hồ Chí Minh cấp ngày 27/01/2021
                                    </span>
                                    <span style={{fontSize:"13px",display:'block'}}>
                                        <span style={{fontWeight:"500",paddingRight:"4px"}}>
                                           Địa chỉ: 
                                        </span>
                                        14 Cách Mạng Tháng Tám, phường Bến Thành, quận 1, TP. Hồ Chí Minh
                                    </span>
                                    <span style={{fontSize:"13px",display:'block'}}>
                                        <span style={{fontWeight:"500",paddingRight:"4px"}}>
                                            Email: 
                                        </span>
                                        vanphongcongdoantphcm@gmail.com - ldld@tphcm.gov.vn
                                    </span>
                                    <span style={{fontSize:"13px",display:'block'}}>
                                        <span style={{fontWeight:"500",paddingRight:"4px"}}>
                                            Điện thoại: 
                                        </span>
                                        028 3829 7716
                                    </span>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item  xs={12} md={6}>
                        <span 
                            style={{
                                color:'white',
                                display:"flex",
                                alignItems:"center",
                                gap:"10px"
                            }}
                        >
                            <span>Truyền thông :</span>
                            <Box
                                component='a'
                                href='https://www.facebook.com/congdoanthanhphohochiminh'
                                target='_blank'
                                sx={{
                                    color:"white",
                                    display:"flex",
                                    alignItems:"center"
                                }}
                            >
                                <FacebookIcon/>
                            </Box>
                            <Box
                                component='a'
                                href='https://www.youtube.com/c/C%C3%B4ng%C4%91o%C3%A0nTh%C3%A0nhph%E1%BB%91H%E1%BB%93Ch%C3%ADMinh/featured'
                                target='_blank'
                                sx={{
                                    color:"white",
                                    display:"flex",
                                    alignItems:"center"

                                }}
                            >
                                <YouTubeIcon/>
                            </Box>
                        </span>
                        <Box
                            component='img'
                            sx={{
                                height: '60px',
                                mt:"30px"
                            }}
                            alt='The house from the offer.'
                            src={handelSertImg}
                        />
                        <Box
                            component='ul'
                            sx={{
                                display:"flex",
                                flexWrap:"wrap",
                                gap:{xs:'20px',md:'10px'},
                                alignItems:"center",
                                listStyleType:"none",
                                justifyContent:"flex-start",
                                padding:"0"
                            }}
                        >
                            <li>
                                <Link to={'/'} style={linkStyle}>
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} style={linkStyle}>
                                    Văn phòng điện tử
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} style={linkStyle}>
                                    Hệ thống văn bản
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} style={linkStyle}>
                                    Đăng ký lịch tuần
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} style={linkStyle}>
                                    Lịch công tác tuần
                                </Link>
                            </li>
                        </Box>
                        <Box>
                            <span style={{color:"white"}}>&copy;Copyright 2023 - congdoanthanhphoHoChiMinh.com</span>
                        </Box>
                    </Grid>

                </Grid>

            </Container>
        </Footer>
    )
}

const Footer = styled.div`
  width: 100%;
  background-color: #1565c0;
  margin-top: 50px;
  padding: 20px 0;
`

const linkStyle = {
    textDecoration:"none",
    color:"white"
}
