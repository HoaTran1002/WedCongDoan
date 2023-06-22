import {
  Box,
  Button,
  ButtonGroup,
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
import React, { ErrorInfo, useEffect, useMemo, useRef, useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { blue } from '@mui/material/colors'
import { useParams } from 'react-router-dom'
import useFetch from '~/hook/useFetch'
import { getAllQues, insertQues } from '~/api/question'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import console from 'console'
import { getAllQuesTpye } from '~/api/questionTypes'

interface Question {
  id: number
  name: string
  asw: string
  correctAsw: string
  type: string
}
interface QuestionData {
  quesId: number
  quesDetail: string
  ansOfQues: string
  trueAnswer: string
  examId: number
  quesTId: number
}
interface QuestType {
  quesTId: number
  quesTName: string
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
const TestCreate = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [open, setOpen] = useState(false)
  const [anw, setAnw] = useState<string>('')
  const [anwString, setAnwString] = useState<string>('')
  const [trueAnwString, setTrueAnwString] = useState('')
  const [select, setSelect] = useState('')
  // const [questions, setQuestion] = useState<Question[]>([])
  const [ques, setQues] = useState('')
  const [texts, setText] = useState<number[]>([1])
  const [createQuesState, quesCreateCall] = useFetch()
  const [getQuesState, getQuesStateCall] = useFetch()
  const [getQuesTypeState, getQuesTypeStateCall] = useFetch()
  const { examId, comId } = useParams()

  useEffect(() => {
    if (anwString == '') {
      setAnwString('<--->')
    }
    setAnwString(anwString + anw + '<--->')
  }, [texts])
  const reqQuesBody: {
    quesDetail: string
    ansOfQues: string
    trueAnswer: string
    examId: number
    quesTId: number
  } = {
    quesDetail: ques,
    ansOfQues: anwString,
    trueAnswer: '',
    examId: Number(examId),
    quesTId: Number(comId)
  }
  useEffect((): void => {
    try {
      getQuesTypeStateCall(getAllQuesTpye)
    } catch (error: any) {
      console.log(error)
    }
  }, [])
  useEffect((): void => {
    try {
      getQuesStateCall(getAllQues)
    } catch (error: any) {
      console.log(error)
    }
  }, [])
  const questions = getQuesState.payload || []
  const questionTypes = getQuesTypeState.payload || []
  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
  }
  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => setOpen(false)

  const handelAddAnw = (): void => {
    setText([...texts, 1])
  }

  const getNameTypeQues = (idTQuestion: number): string => {
    const quesType = questionTypes?.find(
      (item: QuestType) => item.quesTId === idTQuestion
    )
    return quesType?.quesTName || 'chưa có loại câu hỏi'
  }
  function handelonchangeTextFiel(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setAnw(event.target.value)
  }
  function handelOnChangeSelect(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setSelect(event.target.value)
    console.log(event.target.value)
  }
  function onChangeQues(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setQues(event.target.value)
  }
  const [loading, setLoading] = React.useState(true)
  function handleClick(): void {
    setLoading(true)
  }
  const handelSubmitCreate = (): void => {
    quesCreateCall(async () => {
      try {
        await insertQues(reqQuesBody)
        setShowSuccess(true)
      } catch (error) {
        setShowError(true)
      }
    })
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
    // setQuestion([...questions, newQuestion])
    setAnw('')
    setAnwString('')
    handleClose()
    console.log('câu hỏi:' + ques)
    console.log('câu trả lời:' + anwString)
  }

  return (
    <>
      <LayoutAdmin>
        <>
          <>
            <Snackbar
              open={showSuccess}
              autoHideDuration={3000}
              onClose={handleCloseSuccess}
            >
              <MuiAlert
                onClose={handleCloseSuccess}
                severity='success'
                elevation={6}
                variant='filled'
              >
                Acction successful!
              </MuiAlert>
            </Snackbar>
            <Snackbar
              open={showError}
              autoHideDuration={3000}
              onClose={handleCloseSuccess}
            >
              <MuiAlert
                onClose={handleCloseError}
                severity='error'
                elevation={6}
                variant='filled'
              >
                Acction Failed!
              </MuiAlert>
            </Snackbar>
          </>
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
              tạo trắc nghiệm
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
                        <TextField
                          onChange={onChangeQues}
                          id='standard-basic'
                          label='nhập câu hỏi'
                          variant='standard'
                        />
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
                                label='nhập đáp án'
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
                        Xác Nhận
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
                        value={select}
                        helperText='Hãy chọn kiểu Trả lời'
                        variant='standard'
                        onChange={handelOnChangeSelect}
                      >
                        {questionTypes.map((option: QuestType) => (
                          <MenuItem key={option.quesTId} value={option.quesTId}>
                            {option.quesTName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </Box>

                  {createQuesState.loading ? (
                    <LoadingButton
                      size='small'
                      onClick={handleClick}
                      loading={loading}
                      variant='outlined'
                      disabled
                    >
                      <span>disabled</span>
                    </LoadingButton>
                  ) : (
                    <Button
                      onClick={handelSubmitCreate}
                      size='small'
                      color='primary'
                    >
                      Thêm câu hỏi
                    </Button>
                  )}
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
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          {questions.map((q: QuestionData, index: number) => {
            const arrStr = q.ansOfQues
              .split('<--->')
              .filter((item) => item !== '')
            const type = getNameTypeQues(q.quesTId)
            if (type == 'Radio') {
              return (
                <Card
                  sx={{
                    maxWidth: '100%',
                    mt: 4,
                    mb: 2,
                    p: 3,
                    background: blue[50]
                  }}
                  key={index}
                >
                  <FormControl>
                    <FormLabel
                      id='demo-radio-buttons-group-label'
                      sx={{ color: 'black', fontWeight: 500 }}
                    >
                      {index + 1}. {q.quesDetail} ?
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
                            <FormControlLabel
                              key={index}
                              value={`answer${index}`}
                              control={<Radio />}
                              label={str}
                            />
                          )
                        })}
                      </>
                    </RadioGroup>
                  </FormControl>
                </Card>
              )
            }
            return (
              <Card
                sx={{
                  maxWidth: '100%',
                  mt: 2,
                  mb: 2,
                  p: 3,
                  background: blue[50]
                }}
                key={index}
              >
                <FormControl>
                  <FormLabel
                    id='demo-radio-buttons-group-label'
                    sx={{ color: 'black', fontWeight: 500 }}
                  >
                    {index + 1}. {q.quesDetail} ?
                  </FormLabel>
                  <FormGroup aria-labelledby='demo-radio-buttons-group-label'>
                    <>
                      {arrStr.map((str, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            value={`answer1${index}`}
                            control={<Checkbox />}
                            label={str}
                          />
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
export default TestCreate
