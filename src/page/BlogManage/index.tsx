import LayoutAdmin from '~/components/layout/LayoutAdmin'
import {Typography,Paper,Grid,TableContainer,Box,TableCell,Table,TableHead,TableRow,Button,Stack} from '@mui/material'
import image from '~/assets/img/competion-1.jpg';
import AddIcon from '@mui/icons-material/Add';
function BlogInfo(
    id:number,
    heading:string,
    title:string,
 ) {
    return { id, heading,title};
  }

const Blog =[
    BlogInfo(1,'Tựa đề bài viết','Thanh tiêu đề bài viết'),
    BlogInfo(2,'Tựa đề bài viết','Thanh tiêu đề bài viết'),
    BlogInfo(3,'Tựa đề bài viết','Thanh tiêu đề bài viết'),
]
const Index = (): JSX.Element => {
    return (
        <>
            <LayoutAdmin>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }} >
                    <Grid xs={12}>
                        <Stack direction="row" spacing={20} alignItems="center" sx={{marginTop:"20px"}}>
                            <Typography variant='h4' sx={{fontWeight:500,color:"#1976d2"}}>
                            Quản lý trang blog
                            </Typography>
                            <Button href="/BlogCreate" variant="contained" startIcon={<AddIcon />}>
                            Thêm một blog mới
                            </Button>
                        </Stack>
                    </Grid>
                    {
                        Blog.map((row)=>(
                            <Grid xs={6} style={{paddingRight:"20px"}} key={row.id}>
                                <Stack 
                                    direction={'row'} 
                                    style={{
                                        border:"1px solid #e7eeff",
                                        display:"inline-flex",
                                        marginTop:"10px",
                                        borderRadius:"5px",
                                        overflow:"hidden",
                                        width:"100%"
                                    }}
                                >
                                    <div 
                                        className="" 
                                        style={{
                                            maxHeight:"150px",
                                            width:"140px"
                                        }}
                                    >
                                        <img src={image} alt="" style={{height:"100%",width:"100%"}} />
                                    </div>
                                    <div 
                                        className=''
                                        style={{
                                            backgroundColor:"rgba(25, 118, 210,0.1)",
                                            padding:"10px",
                                            width:"100%"
                                        }}
                                    >
                                        <Typography 
                                            style={{
                                                color:"#1976d2",  
                                                fontWeight:"bold",
                                                fontSize:"22px"
                                            }}
                                        >
                                            {row.heading}
                                        </Typography>
                                        <Typography
                                            style={{
                                                color:"#444",
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
                                            padding:"8px",
                                        }}
                                    >
                                        <Button
                                            href='/BlogDetail'
                                            variant='outlined'
                                            style={{
                                                width:"120px"

                                            }}
                                        >
                                            Chỉnh Sủa
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        ))
                    }
                </Grid>
            </LayoutAdmin>
        </>
    )
  }
  
  export default Index