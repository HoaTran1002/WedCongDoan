import React, { useState,useEffect } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { Typography, Grid, Button, Stack } from '@mui/material'
import image from '~/assets/img/competion-1.jpg'
import AddIcon from '@mui/icons-material/Add'
import useFetch from '~/hook/useFetch'
import { getAllBlog } from '~/api/blogApi'
import { Link,useLocation  } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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

  const [getBlog, callBlog] = useFetch()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const openFromUrl = queryParams.get('opensucess') === 'true';
  const deleteFromUrl = queryParams.get('deletesucess') === 'true';
  const updateFromUrl = queryParams.get('updatesucess') === 'true';
  const [open, setOpen] = React.useState(openFromUrl);
  const [openDelete, setOpenDelete] = React.useState(deleteFromUrl);
  const [openUpdate, setOpenUpdate] = React.useState(updateFromUrl);
  const [data, setData] = React.useState();



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

  const blogs: Blog[] = getBlog.payload || [];
  const rows = blogs?.map((blog: Blog) => ({
    id: blog.blogId,
    blogName: blog.blogName,
    imgSrc: blog.imgSrc,
    imgName: blog.imgName
  }))
  return (
    <LayoutAdmin>
      {getBlog.loading == true ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Stack direction='row' spacing={20} alignItems='center' sx={{ marginTop: '20px' }}>
                <Typography variant='h4' sx={{ fontWeight: 500, color: '#1976d2' }}>
                  Quản lý trang blog
                </Typography>
                <Link to={'/BlogCreate'} style={{ textDecoration: 'none' }}>
                  <Button href='/BlogCreate' variant='contained' startIcon={<AddIcon />}>
                    Thêm một blog mới
                  </Button>
                </Link>
              </Stack>
            </Grid>
            {rows.map((row: any) => (
              <Grid item xs={6} columnSpacing={{ xs: 6, paddingRight: '20px' }} key={row.id}>
                <Stack
                  direction={'row'}
                  style={{
                    border: '1px solid #e7eeff',
                    display: 'inline-flex',
                    marginTop: '10px',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    width: '100%'
                  }}
                >
                  <div
                    className=''
                    style={{
                      maxHeight: '150px',
                      width: '140px'
                    }}
                  >
                    <img src={`src/assets/img/${row.imgSrc}`} alt='' style={{ height: '100%', width: '100%' }} />
                  </div>
                  <div
                    className=''
                    style={{
                      backgroundColor: 'rgba(25, 118, 210,0.1)',
                      padding: '10px',
                      width: '100%'
                    }}
                  >
                    <Typography
                      style={{
                        color: '#1976d2',
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
                  </div>
                  <Stack
                    direction={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={1}
                    style={{
                      padding: '8px'
                    }}
                  >
                    <Link to={`/BlogDetail?id=${row.id}`}>
                      <Button
                        variant='outlined'
                        style={{
                          width: '120px'
                        }}
                      >
                        Chỉnh Sủa
                      </Button>
                    </Link>
                  </Stack>
                </Stack>
              </Grid>
            ))}
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
      )}
    </LayoutAdmin>
  )
}

export default Index
