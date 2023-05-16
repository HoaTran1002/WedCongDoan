import React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import {Typography,SpeedDial,Grid,FormControl,InputLabel,Select,MenuItem,TableHead,TableRow,Button,Stack,Box,TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { SelectChangeEvent } from '@mui/material/Select';
const Index = (): JSX.Element => {
    const [age, setAge] = React.useState('');
  
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };
    return (
        <>
            <LayoutAdmin>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid xs={12} >
                        <Stack direction="row" spacing={20} alignItems="center" sx={{marginTop:"20px"}}>
                            <Typography variant='h4' sx={{fontWeight:500,color:"#1976d2"}}>
                            Thêm blog mới
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </LayoutAdmin>
      </>
    )
  }
  
  export default Index
  