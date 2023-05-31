import React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import { Typography, Switch, Grid, FormControl, InputLabel, Select, MenuItem, TableHead, Checkbox, Button, Stack, Box, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { SelectChangeEvent } from '@mui/material/Select';
import WestIcon from '@mui/icons-material/West';
import bronze from "~/assets/img/bronze-removebg-preview.png";
import siver from "~/assets/img/siver-removebg-preview.png";
import gold from "~/assets/img/gold-removebg-preview.png";
import khuyenkhich from "~/assets/img/kk-removebg-preview.png";
const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
            <Stack direction="row" spacing={20} alignItems="center" sx={{ marginTop: "20px" }}>
              <Typography variant='h4' sx={{ fontWeight: 500, color: "#1976d2" }}>
                Chi tiết cuộc thi
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={12} style={{ marginTop: "10px" }}>
            <Stack direction={'row'} alignItems="center" gap={5}>
              <TextField
                id="filled-search"
                label="Tên cuộc thi "
                type="search"
                value={"Khảo sát tiếng anh văn 3"}
                variant="outlined"
                style={{ width: "100%" }}
              />
              <FormControl sx={{ m: 1, minWidth: 80 }} style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">Quy mô</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  onChange={handleChange}
                  label="Age"
                  defaultValue={'10'}
                >
                  <MenuItem value={10}>Khoa</MenuItem>
                  <MenuItem value={21}>Trường</MenuItem>
                  <MenuItem value={22}>Lớp</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid xs={12} style={{ marginTop: "10px" }}>
            <Stack direction={'row'} gap={5} style={{ width: "100%" }}>
              <Stack direction={'row'} justifyContent="space-around" style={{ width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                      label="Ngày bắt đầu" 
                      defaultValue={dayjs('2022-04-17')}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                      label="Ngày kết thúc"
                      defaultValue={dayjs('2022-04-17')}
                   />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
              <Stack direction={'row'} style={{ width: "100%" }} justifyContent="space-around">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker 
                      label="Thời gian bắt đầu"
                      defaultValue={dayjs('2022-04-17T15:30')}
                   />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker 
                      label="Thời gian kết thúc"
                      defaultValue={dayjs('2022-04-17T20:30')}
                   />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} style={{ marginTop: "100px" }}>
            <Stack direction={'row'} gap={'20px'}>
              <Typography variant='h4' sx={{ fontWeight: 500, color: "#1976d2" }}>
                Giải cá nhân
              </Typography>
              <Switch {...label} defaultChecked />
            </Stack>
            <div style={{ marginTop: "20px" }}>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={gold} alt="" style={{width:30}}  />
                <span style={{display:'inline-block', width:'180px', fontWeight: 500, color: "#1976d2"}}>
                  Hạng nhất
                </span>
                <TextField
                  id="filled-search"
                  label="Tên giải thưởng"
                  type="search"
                  variant="outlined"
                  value="100.000 Việt Nam đồng"
                  style={{ width: "100%" }}
                />
                <TextField
                  id="filled-search"
                  label="Số lượng"
                  type="number"
                  value="10"
                  variant="outlined"
                  style={{ width: "300px" }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={siver} alt="" style={{width:30}}  />
                <span style={{display:'inline-block', width:'180px', fontWeight: 500, color: "#1976d2"}}>
                  Hạng nhì
                </span>
                <TextField
                  id="filled-search"
                  label="Tên giải thưởng"
                  type="search"
                  value="200.000 Việt Nam đồng"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
                <TextField
                  id="filled-search"
                  label="Số lượng"
                  type="number"
                  value="5"
                  variant="outlined"
                  style={{ width: "300px" }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={bronze} alt="" style={{width:30}}  />
                <span style={{display:'inline-block', width:'180px', fontWeight: 500, color: "#1976d2"}}>
                  Hạng ba 
                </span>
                <TextField
                  id="filled-search"
                  label="Tên giải thưởng"
                  value="300.000 Việt Nam đồng"
                  type="search"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
                <TextField
                  id="filled-search"
                  label="Số lượng"
                  type="number"
                  value="10"
                  variant="outlined"
                  style={{ width: "300px" }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={khuyenkhich} alt="" style={{width:30}}  />
                <span style={{display:'inline-block', width:'180px', fontWeight: 500, color: "#1976d2"}}>
                  Khuyến khích
                </span>
                <TextField
                  id="filled-search"
                  label="Tên giải thưởng"
                  type="search"
                  value="100.000.000 Việt Nam đồng"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
                <TextField
                  id="filled-search"
                  label="Số lượng"
                  type="number"
                  value="1"
                  variant="outlined"
                  style={{ width: "300px" }}
                />
              </Stack>
            </div>
          </Grid>
          <Grid xs={12} style={{ marginTop: "100px" }}>
            <Stack direction={'row'} gap={'20px'}>
              <Typography variant='h4' sx={{ fontWeight: 500, color: "#1976d2" }}>
                Giải tập thể
              </Typography>
              <Switch {...label} defaultChecked />
            </Stack>
            <div style={{ marginTop: "20px" }}>
            <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={gold} alt="" style={{width:30}}  />
                <span style={{display:'inline-block', width:'180px', fontWeight: 500, color: "#1976d2"}}>
                  Hạng nhất
                </span>
                <TextField
                  id="filled-search"
                  label="Tên giải thưởng"
                  type="search"
                  variant="outlined"
                  value="100.000 Việt Nam đồng"
                  style={{ width: "100%" }}
                />
                <TextField
                  id="filled-search"
                  label="Số lượng"
                  type="number"
                  value="10"
                  variant="outlined"
                  style={{ width: "300px" }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={siver} alt="" style={{width:30}}  />
                <span style={{display:'inline-block', width:'180px', fontWeight: 500, color: "#1976d2"}}>
                  Hạng nhì
                </span>
                <TextField
                  id="filled-search"
                  label="Tên giải thưởng"
                  type="search"
                  value="200.000 Việt Nam đồng"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
                <TextField
                  id="filled-search"
                  label="Số lượng"
                  type="number"
                  value="5"
                  variant="outlined"
                  style={{ width: "300px" }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={bronze} alt="" style={{width:30}}  />
                <span style={{display:'inline-block', width:'180px', fontWeight: 500, color: "#1976d2"}}>
                  Hạng ba 
                </span>
                <TextField
                  id="filled-search"
                  label="Tên giải thưởng"
                  value="300.000 Việt Nam đồng"
                  type="search"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
                <TextField
                  id="filled-search"
                  label="Số lượng"
                  type="number"
                  value="10"
                  variant="outlined"
                  style={{ width: "300px" }}
                />
              </Stack>
              <Stack direction={'row'} gap={'20px'} alignItems={'center'}>
                <Checkbox {...label} defaultChecked />
                <img src={khuyenkhich} alt="" style={{width:30}}  />
                <span style={{display:'inline-block', width:'180px', fontWeight: 500, color: "#1976d2"}}>
                  Khuyến khích
                </span>
                <TextField
                  id="filled-search"
                  label="Tên giải thưởng"
                  type="search"
                  value="100.000.000 Việt Nam đồng"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
                <TextField
                  id="filled-search"
                  label="Số lượng"
                  type="number"
                  value="1"
                  variant="outlined"
                  style={{ width: "300px" }}
                />
              </Stack>
            </div>
          </Grid>
          <Grid style={{marginBottom:"100px"}}>
            <Button href='/CompetitionManage'  variant="contained" startIcon={<WestIcon />} style={{ marginTop: "20px" }}>
              Trở về
            </Button>
          </Grid>
        </Grid>
      </LayoutAdmin>
    </>
  )
}

export default Index
