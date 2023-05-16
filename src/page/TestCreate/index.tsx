import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Icon,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useEffect, useRef, useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { blue } from '@mui/material/colors'

interface Question {
  id: number
  name: string
  asw: string
  correctAsw: string
  type: string
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  minWidth: { sm: 250, lg: 700 }
}
const currencies = [
  {
    value: 'Checked',
    label: 'Checked',
    icon: <CheckBoxIcon />
  },
  {
    value: 'Radio',
    label: 'Radio',
    icon: <RadioButtonCheckedIcon />
  }
]
const Index = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [anw, setAnw] = useState('')
  const [anwString, setAnwString] = useState('')
  const [select, setSelect] = useState('')
  const [questions, setQuestion] = useState<Question[]>([])
  const [ques, setQues] = useState('')
  const [texts, setText] = useState<number[]>([1])
  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => setOpen(false)
  useEffect(() => {
    if (anwString == '') {
      setAnwString('<--->')
    }
    setAnwString(anwString + anw + '<--->')
  }, [texts])
  const handelAddAnw = (): void => {
    setText([...texts, 1])
  }
  function handelonchangeTextFiel(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setAnw(event.target.value)
  }
  function handelOnChangeSelect(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setSelect(event.target.value)
  }
  function onChangeQues(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setQues(event.target.value)
  }
  const handelOnclickCreate = (): void => {
    const lisIndex = questions.length
    const idQuestion = lisIndex + 1
    const newQuestion = {
      id: idQuestion,
      correctAsw: '',
      name: ques,
      asw: anwString,
      type: select
    }
    setText([1])
    setQuestion([...questions, newQuestion])
    setAnw('')
    setAnwString('')
    handleClose()
    console.log(questions)
  }

  console.log(anwString)
  return (
    <>
      <LayoutAdmin>
        <>
          <Stack
            sx={{
              position: 'fixed',
              zIndex: 2,
              minWidth: 'auto',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
              p: 1,
              borderRadius: 4
            }}
            direction='row'
            spacing={2}
          >
            <Button onClick={handleOpen} variant='contained'>
              tạo câu hỏi
            </Button>
            <Button onClick={handleOpen} variant='contained'>
              lưu bài thi
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Card sx={{ Width: '100%' }}>
                  <CardContent>
                    <Typography variant='body2'>
                      <FormGroup>
                        <TextField onChange={onChangeQues} id='standard-basic' label='câu hỏi?' variant='standard' />
                      </FormGroup>
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      <>
                        {texts.map((t, key): JSX.Element => {
                          return (
                            <FormGroup key={key}>
                              <TextField
                                id='standard-basic'
                                variant='standard'
                                label='Trả lời'
                                onChange={handelonchangeTextFiel}
                              />
                            </FormGroup>
                          )
                        })}
                      </>
                      <Button
                        onClick={handelAddAnw}
                        sx={{ mt: 1 }}
                        size='small'
                        variant='contained'
                        color='primary'
                        endIcon={<AddIcon />}
                      >
                        Trả lời
                      </Button>
                    </Typography>
                  </CardContent>
                  <Box
                    component='form'
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete='off'
                  >
                    <div>
                      <TextField
                        id='standard-select-currency'
                        select
                        label='Chọn Trả lời'
                        defaultValue='EUR'
                        helperText='Hãy chọn kiểu Trả lời'
                        variant='standard'
                        onChange={handelOnChangeSelect}
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.icon} {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </Box>
                  <CardActions>
                    <Button onClick={handelOnclickCreate} size='small' color='primary'>
                      Thêm câu hỏi
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </Modal>
          </Stack>
          <Card sx={{ Width: '100%' }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='140'
                image='https://hufi.edu.vn/images/slide/banner-web-hufi-01.jpg'
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Lizard
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                  continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          {questions.map(function (q, index) {
            console.log(q.asw)
            const arrStr = q.asw.split('<--->').filter((item) => item !== '')
            console.log(arrStr)
            if (q.type == 'Radio') {
              return (
                <Card sx={{ maxWidth: '100%', mt: 4, mb: 2, p: 3, background: blue[50] }} key={index}>
                  <FormControl>
                    <FormLabel id='demo-radio-buttons-group-label' sx={{ color: 'black', fontWeight: 500 }}>
                      {index + 1}. {q.name} ?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                      id={`${index}`}
                    >
                      <>
                        {arrStr.map((str, index) => {
                          return (
                            <FormControlLabel key={index} value={`answer${index}`} control={<Radio />} label={str} />
                          )
                        })}
                      </>
                    </RadioGroup>
                  </FormControl>
                </Card>
              )
            }
            return (
              <Card sx={{ maxWidth: '100%', mt: 2, mb: 2, p: 3, background: blue[50] }} key={index}>
                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label' sx={{ color: 'black', fontWeight: 500 }}>
                    {index + 1}. {q.name} ?
                  </FormLabel>
                  <FormGroup aria-labelledby='demo-radio-buttons-group-label'>
                    <>
                      {arrStr.map((str, index) => {
                        return (
                          <FormControlLabel key={index} value={`answer1${index}`} control={<Checkbox />} label={str} />
                        )
                      })}
                    </>
                  </FormGroup>
                </FormControl>
                <Button></Button>
              </Card>
            )
          })}
        </>
      </LayoutAdmin>
    </>
  )
}
export default Index
