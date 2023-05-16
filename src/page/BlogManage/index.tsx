import LayoutAdmin from '~/components/layout/LayoutAdmin'
import {Typography,Paper,Grid,TableContainer,TableBody,TableCell,Table,TableHead,TableRow,Button,Stack} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const Index = (): JSX.Element => {
    return (
      <>
        <LayoutAdmin>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid xs={12} >
                    <Stack direction="row" spacing={20} alignItems="center" sx={{marginTop:"20px"}}>
                        <Typography variant='h4' sx={{fontWeight:500,color:"#1976d2"}}>
                        Quản lý trang blog
                        </Typography>
                        <Button href="/CompetitionCreate" variant="contained" startIcon={<AddIcon />}>
                        Thêm một blog mới
                        </Button>
                    </Stack>
                </Grid>
                <Grid xs={12}>
                    <Stack>
                        <img src="../assets/img/compertion-1.jpg" alt="" />
                    </Stack>
                </Grid>
            </Grid>
        </LayoutAdmin>
      </>
    )
  }
  
  export default Index