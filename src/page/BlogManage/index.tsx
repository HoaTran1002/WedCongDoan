import React, { useState,useEffect } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { Typography, Grid, Button, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import useFetch from '~/hook/useFetch'
import { getAllBlog } from '~/api/blogApi'
import { Link,useLocation  } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface Blog {
  blogId: number,
  blogName: string,
  imgSrc: string,
  imgName: string,
}

const Index = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [getBlog, callBlog] = useFetch()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const openFromUrl = queryParams.get('opensucess') === 'true';
  const deleteFromUrl = queryParams.get('deletesucess') === 'true';
  const updateFromUrl = queryParams.get('updatesucess') === 'true';
  const [open, setOpen] = React.useState(openFromUrl);
  const [openDelete, setOpenDelete] = React.useState(deleteFromUrl);
  const [openUpdate, setOpenUpdate] = React.useState(updateFromUrl);

   
  
 

  const handleClose = ():void => {
    setOpen(false);
    setOpenDelete(false);
    setOpenUpdate(false);
  };

  
  useEffect(() => {
    const fetchData = async () :Promise<any> => {
      try {
        const data = await getAllBlog();
        callBlog(() => Promise.resolve(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () :Promise<any> => {
      try {
        const data = await getAllBlog();
        callBlog(() => Promise.resolve(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [open,openDelete,openUpdate]);

  const blogs: Blog[] = getBlog.payload || [];
  const rows = blogs?.map((blog: Blog) => ({
    id: blog.blogId,
    blogName: blog.blogName,
    imgSrc: blog.imgSrc,
    imgName: blog.imgName
  }))
  console.log(rows.length)
  const productsPerPage = 6; 
  const totalPages = Math.ceil(rows.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = rows.slice(startIndex, endIndex);
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number):void => {
    setCurrentPage(page);
  };
  return (
    <LayoutAdmin>
      <>
        <h1 className='color-primary text-center'>Quản lý trang blog</h1>
        <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
          {getBlog.loading? (
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  display: 'flex',
                  height:"500px",
                  width:"100%",
                  alignItems:"center",
                  justifyContent:"center"
                }}
              >
                <CircularProgress />
              </Box>
            </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <Link to={'/BlogCreate'} style={{ textDecoration: 'none' }}>
                    <Button href='/BlogCreate' variant='contained' startIcon={<AddIcon />}>
                      Thêm một blog mới
                    </Button>
                  </Link>
                </Grid>
                <Grid 
                  item
                  container 
                  xs={12} 
                  columnSpacing={4}
                  sx={{
                    backgroundColor:"white",
                    pb:"20px",
                    mt:"10px",
                    pl:"0px !important",
                    pt:"0px !important"
                  }}
                >
                  {currentProducts.map((row: any) => (
                    <Grid item xs={6} key={row.id}
                      sx={{
                        marginTop: '10px',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          position:"relative",
                          width: '100%',
                          borderRadius:"5px",
                          overflow:"hidden"
                        }}
                      >
                        <div
                          style={{
                            height: '180px',
                            width: '220px',
                            flex:"none",
                          }}
                        >
                          <img 
                            src={`data:image/jpeg;base64,${row.imgSrc}`} 
                            alt={row.imgName}
                            style={{ 
                              height: '100%', 
                              width: '100%',
                              objectFit:"cover" 
                            }} 
                          />
                        </div>
                        <div
                          style={{
                            backgroundColor:"#ecf5ff",
                            padding: '10px',
                            width: '100%',
                            position:"relative"
                          }}
                        >
                          <span 
                            className='color-primary text-title-blog' 
                            style={{
                              fontSize:"18px",
                              fontWeight:"bold"
                            }}
                          >
                            Tiêu đề
                          </span>
                          <Typography
                            style={{
                              color: '#6e6e6e',
                              fontWeight: 'bold',
                              fontSize: '22px'
                            }}
                          >
                            {row.blogName}
                          </Typography>
                          <Typography
                            style={{
                              color: '#444'
                            }}
                          >
                            {row.title}
                          </Typography>
                          <span 
                            style={{
                              position:"absolute",
                              bottom:"7px",
                              right:"7px",

                            }}
                          >
                            <Link to={`/BlogDetail?id=${row.id}`}>
                              <Tooltip title="Chỉnh sửa blog">
                                <IconButton sx={{color:"#1976d2"}}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          </span>
                        </div>
                      </Box>
                    </Grid>
                  ))}
                  <Box 
                    sx={{
                      padding:"15px 0",
                      width:'100%',
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center"
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      color="primary"
                      page={currentPage}
                      onChange={handlePageChange}
                    />
                  </Box>
                </Grid>
              </>
            )
          }
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Thêm thành công
            </Alert>
          </Snackbar>
          <Snackbar open={openUpdate} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Sửa thành công
            </Alert>
          </Snackbar>
          <Snackbar open={openDelete} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Xóa thành công
            </Alert>
          </Snackbar>
        </Grid>
      </>
    </LayoutAdmin>
  )
}

export default Index
