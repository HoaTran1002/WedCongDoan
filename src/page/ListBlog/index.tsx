
import Layout from '~/components/layout/Layout'
import { Typography, Paper, Grid, TableContainer, Box, TableCell, Table, TableHead, TableRow, Button, Stack } from '@mui/material'
import image from '~/assets/img/competion-1.jpg';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function BlogInfo(
    id: number,
    heading: string,
    title: string,
):any {
    return { id, heading, title };
}

const Blog = [
  BlogInfo(1, 'Tựa đề bài viết', 'Thanh tiêu đề bài viết'),
  BlogInfo(2, 'Tựa đề bài viết', 'Thanh tiêu đề bài viết'),
  BlogInfo(3, 'Tựa đề bài viết', 'Thanh tiêu đề bài viết'),
  BlogInfo(4, 'Tựa đề bài viết', 'Thanh tiêu đề bài viết')
]
const Index = (): JSX.Element => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Layout>
      {/* <>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack
              direction='row'
              spacing={20}
              alignItems='center'
              sx={{ marginTop: '20px' }}
            >
              <Typography
                variant='h4'
                sx={{ fontWeight: 500, color: '#1976d2' }}
              >
                Các trang Blog cuộc thi
              </Typography>
            </Stack>
          </Grid>
          {Blog.map((row) => (
            <Grid xs={3} item key={row.id}>
              <Stack
                sx={{
                  borderRadius: '5px',
                  overflow: 'hidden',
                  border: '1px solid #1976d2',
                  marginTop: '20px'
                }}
                direction={'column'}
                justifyContent={'center'}
              >
                <Box
                  sx={{
                    width: '100%',
                    paddingTop: '220px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${image})`,
                    backgroundColor: 'transparent'
                  }}
                ></Box>
                <Box
                  sx={{
                    padding: '10px',
                    backgroundColor: '#e8f1fa'
                  }}
                >
                  <Typography
                    variant='h5'
                    sx={{
                      fontWeight: '500',
                      color: '#1976d2'
                    }}
                  >
                    {row.heading}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#999',
                      marginTop: '8px'
                    }}
                  >
                    {row.title}
                  </Typography>
                  <Stack justifyContent={'end'} marginTop='15px'>
                    <Button
                      variant='outlined'
                      sx={{
                        borderRadius: '50px',
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          opacity: [0.9, 0.8, 0.7],
                          color: 'white'
                        }
                      }}
                      href='#'
                      endIcon={<ArrowForwardIcon />}
                    >
                      Xem thêm
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          ))}
          <Grid xs={8} item>
            <Typography
              sx={{
                fontSize: '23px',
                color: '#1976d2',
                marginTop: '12px'
              }}
            >
              Cập nhập hằng ngày
            </Typography>
            {Blog.map((row) => (
              <Grid xs={12} item key={row.id}>
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
                    <img
                      src={image}
                      alt=''
                      style={{ height: '100%', width: '100%' }}
                    />
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
                      {row.heading}
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
                    <Button
                      href='/BlogDetail'
                      variant='outlined'
                      style={{
                        width: '140px'
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Xem thêm
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Grid xs={4} item>
            <Typography
              sx={{
                fontSize: '23px',
                color: '#1976d2',
                marginTop: '12px'
              }}
            >
              Các cuộc thi phổ biến nhất
            </Typography>
            {Blog.map((row, id) => (
              <Grid xs={12} item>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  sx={{
                    marginBottom: '20px',
                    borderBottom: '1px solid #1976d2',
                    paddingBottom: '5px'
                  }}
                  gap={2}
                >
                  <span
                    style={{
                      fontSize: '30px',
                      fontWeight: 'bold',
                      color: '#1976d2'
                    }}
                  >
                    {id + 1}
                  </span>
                  <img
                    src={image}
                    alt=''
                    style={{
                      height: '70px',
                      aspectRatio: '1/1',
                      borderRadius: '5px'
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: '500',
                      color: '#1976d2'
                    }}
                  >
                    {row.heading}
                  </Typography>
                  <Button
                    href='/BlogDetail'
                    variant='outlined'
                    style={{
                      width: '100px',
                      fontSize: '12px'
                    }}
                  >
                    Xem thêm
                  </Button>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </> */}
    </Layout>
  )
}

export default Index
