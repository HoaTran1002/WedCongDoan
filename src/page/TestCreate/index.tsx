import AddIcon from '@mui/icons-material/Add'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { blue, red } from '@mui/material/colors'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetAllByExamID, insertQues } from '~/api/question'
import { getAllQuesTpye } from '~/api/questionTypes'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import useFetch from '~/hook/useFetch'
import CardData from './CardData'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { padding } from '@mui/system'
import SaveIcon from '@mui/icons-material/Save'
import MessageAlert from '~/components/MessageAlert'

interface IQuestion {
  examId: number
  quesDetail: string
  ansOfQues: string
  trueAnswer: string
  quesTId: number
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
  borderRadius: 1,
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: { xs: 450, sm: 550, lg: 700 },
  height: 450,
  overflow: 'scroll',
  padding: 2
}

interface ILoading {
  loadingStatus: boolean
  setLoadingContext: () => void
  setMessageEdit: () => void
}
export const LoadingContext = React.createContext<ILoading>({
  loadingStatus: false,
  setLoadingContext: (): void => {
    return
  },
  setMessageEdit: (): void => {
    return
  }
})

const TestCreate = (): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [showError, setShowError] = React.useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [createQuesState, quesCreateCall] = useFetch()
  const [getQuesState, getQuesStateCall] = useFetch()
  const [getQuesTypeState, getQuesTypeStateCall] = useFetch()
  const { examId, comId } = useParams()
  const [questionType, setQuestionType] = useState<number>(1)
  const [question, setQuestion] = useState<string>('')
  const [answerList, setAnswerList] = useState<string[]>([])
  const [correctAnswerList, setCorrectAnswerList] = useState<string[]>([])
  const [errErrMinTrueAnswer, setErrMinTrueAnswer] = useState<string>('')
  const [errQuestion, setErrQuestion] = useState<string>('')
  const [errCorret, setErrCorret] = useState<string>('')
  const [errNullCorret, setErrNullCorret] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<string>('')
  const [isAlert, setIsAlert] = useState<boolean>(false)

  if (message !== '') {
    setTimeout((): void => {
      setIsAlert(false)
    }, 2500)
  }
  const questions = getQuesState.payload || []
  const questionTypes = getQuesTypeState.payload || []

  useEffect((): void => {
    try {
      getQuesTypeStateCall(getAllQuesTpye).then((res: QuestType[]) => {
        if (res.length) setQuestionType(res[0].quesTId)
      })
    } catch (error: any) {
      console.log(error)
    }
  }, [getQuesTypeStateCall, loading])
  useEffect(() => {
    getQuesStateCall(async () => {
      return GetAllByExamID({ id: Number(examId) })
    })
  }, [examId, getQuesStateCall, loading])
  // Sử dụng useEffect để gọi lại API khi chiều dài của "questions" thay đổi
  // useEffect(() => {
  //   getQuesStateCall(async () => {
  //     return GetAllByExamID({ id: Number(examId) })
  //   })
  // }, [questions.length])

  const filteredAnswerList = answerList.filter((item) => item !== '')
  const fillterCorretAnswerList = correctAnswerList.filter(
    (item) => item !== ''
  )

  const bodyQuestion: IQuestion = {
    quesDetail: question,
    ansOfQues: filteredAnswerList.join('<====>'),
    trueAnswer: fillterCorretAnswerList.join('<====>'),
    quesTId: questionType,
    examId: Number(examId)
  }

  const selectQuestionType = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value
    setQuestionType(Number(value))
  }

  const selectAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const isChecked = event.target.checked

    if (isChecked && answerList[index] !== '') {
      const newValueIndex = answerList[index]
      setCorrectAnswerList((prevCorrectAnswerList) => {
        const updatedList = [...prevCorrectAnswerList]
        updatedList[index] = newValueIndex
        return updatedList
      })
    } else {
      setCorrectAnswerList((prevCorrectAnswerList) => {
        const updatedList = [...prevCorrectAnswerList]
        updatedList[index] = ''
        return updatedList
      })
    }
  }

  const onChangeQuestion = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setQuestion(event.target.value)
  }
  const onchangeAnswer = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): Promise<void> => {
    setAnswerList((prevAnswerList) =>
      prevAnswerList.map((value, ind) =>
        ind === index ? event.target.value : value
      )
    )
    if (correctAnswerList[index] !== '') {
      setCorrectAnswerList((prevCorrectAnswerList) => {
        const newValueIndex = event.target.value
        const updatedList = [...prevCorrectAnswerList]
        updatedList[index] = newValueIndex
        return updatedList
      })
    }
  }

  const addRow = (): void => {
    setAnswerList((prevAnswerList) => [...prevAnswerList, ''])
    setCorrectAnswerList((pre) => [...pre, ''])
  }
  const deleteRow = ({ index }: { index: number }): void => {
    const updatedAnswerList = [...answerList]
    updatedAnswerList.splice(index, 1)
    setAnswerList(updatedAnswerList)
    const updatedCorrectAnswerList = [...correctAnswerList]
    updatedCorrectAnswerList.splice(index, 1)
    setCorrectAnswerList(updatedCorrectAnswerList)
  }

  const submitQuestion = (): void => {
    // console.log('data trả lời:' + bodyQuestion.ansOfQues)
    // console.log('data trả lời đúng:' + bodyQuestion.trueAnswer)
    // console.log('data câu hỏi:' + bodyQuestion.quesDetail)
    // console.log('data loại đap án:' + bodyQuestion.quesTId)
    // console.log('data Id :' + bodyQuestion.examId)
    const errorConditions = [
      {
        condition: bodyQuestion.ansOfQues === '',
        setError: setErrCorret,
        errorMessage: 'Hãy nhập đáp án'
      },
      {
        condition: bodyQuestion.trueAnswer === '',
        setError: setErrNullCorret,
        errorMessage: 'Chưa có đáp án đúng'
      },
      {
        condition: bodyQuestion.quesDetail === '',
        setError: setErrQuestion,
        errorMessage: 'hãy nhập câu hỏi'
      },
      {
        condition:
          bodyQuestion.trueAnswer.split('<====>').length > 1 &&
          bodyQuestion.quesTId === 1,
        setError: setErrMinTrueAnswer,
        errorMessage: 'Radio chỉ gồm một đáp án đúng'
      }
    ]
    for (const condition of errorConditions) {
      if (condition.condition) {
        condition.setError(condition.errorMessage)
      }
    }
    const hasError = errorConditions.some((condition) => condition.condition)
    console.log(hasError)
    if (hasError) {
      return
    } else {
      quesCreateCall(async (): Promise<void> => {
        try {
          await insertQues(bodyQuestion)
          handleClose()
          setLoading(!loading)

          // setShowSuccess(true)
          setSeverity('success')
          setMessage('thêm thành công')
        } catch (error) {
          setShowError(true)
        }
      })
      setIsAlert(true)
    }
  }

  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => setOpen(false)

  const getNameTypeQues = (idTQuestion: number): string => {
    const quesType = questionTypes?.find(
      (item: QuestType) => item.quesTId === idTQuestion
    )
    return quesType?.quesTName || 'chưa có loại câu hỏi'
  }

  function handleClick(): void {
    setLoading(true)
  }
  function cancelModal(): void {
    setOpen(false)
    window.location.reload()
  }

  const loadingPrams: ILoading = {
    loadingStatus: loading,
    setLoadingContext: (): void => {
      setLoading(!loading)
    },
    setMessageEdit: (): void => {
      setSeverity('info')
      setMessage('cập nhật thành công')
    }
  }
  if (message != null) {
    setTimeout(async (): Promise<void> => {
      setMessage('')
    }, 3000)
  }
  return (
    <>
      <LayoutAdmin>
        <LoadingContext.Provider value={loadingPrams}>
          <>
            {isAlert && <MessageAlert message={message} severity={severity} />}
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
                <Card
                  sx={{
                    Width: '100%',
                    overflowY: 'scroll',
                    boxShadow: 'none'
                  }}
                >
                  <CardContent>
                    <Typography variant='subtitle1'>
                      <FormGroup>
                        <TextField
                          error={Boolean(errQuestion)}
                          helperText={errQuestion}
                          onChange={onChangeQuestion}
                          id='standard-basic'
                          label='nhập câu hỏi'
                          variant='standard'
                        />
                      </FormGroup>
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                      <>
                        {answerList.map((t, index): JSX.Element => {
                          return (
                            <FormGroup key={index}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Box
                                  sx={{
                                    flex: 1,
                                    width: '100%'
                                  }}
                                >
                                  <TextField
                                    value={t}
                                    id='standard-basic'
                                    variant='standard'
                                    label='Nhập đáp án'
                                    onChange={(
                                      event: React.ChangeEvent<HTMLInputElement>
                                    ): void => {
                                      onchangeAnswer(event, index)
                                    }}
                                    sx={{ width: '100%' }}
                                  />
                                </Box>
                                <Box>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          answerList[index] !== '' &&
                                          correctAnswerList.includes(
                                            answerList[index]
                                          )
                                        }
                                        onChange={(
                                          event: React.ChangeEvent<HTMLInputElement>
                                        ): void => {
                                          selectAnswer(event, index)
                                        }}
                                      />
                                    }
                                    label='Đáp án đúng'
                                  />
                                </Box>
                                <Button
                                  onClick={(): void => {
                                    deleteRow({ index })
                                  }}
                                  startIcon={
                                    <RemoveCircleOutlineIcon color='error' />
                                  }
                                  variant='outlined'
                                >
                                  {' '}
                                  xoá hàng
                                </Button>
                              </Box>
                            </FormGroup>
                          )
                        })}
                      </>

                      <Button
                        onClick={addRow}
                        sx={{ mt: 1 }}
                        size='small'
                        variant='outlined'
                        color='primary'
                        endIcon={<AddIcon />}
                      >
                        Tạo hàng
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
                    <Box sx={{ margin: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Chọn loại đáp án
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Chọn loại đáp án'
                          value={questionType.toString()}
                          onChange={selectQuestionType}
                        >
                          {questionTypes.map((option: QuestType) => (
                            <MenuItem
                              key={option.quesTId}
                              value={option.quesTId}
                            >
                              {option.quesTName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      color: red[300],
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      flexDirection: 'column'
                    }}
                  >
                    {errCorret && (
                      <Box
                        sx={{
                          color: 'white',
                          backgroundColor: red[300],
                          fontSize: 13,
                          borderRadius: 2,
                          padding: 0.3,
                          margin: 0.2
                        }}
                      >
                        <span>hãy nhập đáp án</span>
                      </Box>
                    )}
                    {errErrMinTrueAnswer && (
                      <Box
                        sx={{
                          color: 'white',
                          backgroundColor: red[300],
                          fontSize: 13,
                          borderRadius: 2,
                          padding: 0.3,
                          margin: 0.2
                        }}
                      >
                        <span>{errErrMinTrueAnswer}</span>
                      </Box>
                    )}
                    {errNullCorret && (
                      <Box
                        sx={{
                          color: 'white',
                          backgroundColor: red[300],
                          fontSize: 13,
                          borderRadius: 2,
                          padding: 0.3,
                          margin: 0.2
                        }}
                      >
                        <span>chưa có đáp án đúng</span>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box>
                      {createQuesState.loading ? (
                        <LoadingButton
                          size='small'
                          onClick={handleClick}
                          loading
                          loadingPosition='start'
                          startIcon={<SaveIcon />}
                          variant='outlined'
                          sx={{ marginLeft: 2, marginRight: 2 }}
                        >
                          <span>disabled</span>
                        </LoadingButton>
                      ) : (
                        <Button
                          onClick={submitQuestion}
                          size='small'
                          color='primary'
                          variant='outlined'
                          sx={{ marginLeft: 2, marginRight: 2 }}
                        >
                          Thêm câu hỏi
                        </Button>
                      )}
                    </Box>
                    <Button
                      onClick={cancelModal}
                      size='small'
                      color='primary'
                      variant='outlined'
                      sx={{ marginLeft: 2, marginRight: 2 }}
                    >
                      thoát
                    </Button>
                  </Box>
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
            const correctAnswers = q.trueAnswer.split('<====>')
            const arrStr = q.ansOfQues
              .split('<====>')
              .filter((item) => item !== '')
            const type = getNameTypeQues(q.quesTId)
            return (
              <CardData
                callBack={async (): Promise<void> => {
                  setSeverity('info')
                  setMessage('đã xoá thành công')
                  setLoading(!loading)
                }}
                trueAnswer={correctAnswers}
                quesId={q.quesId}
                index={index}
                quesDetail={q.quesDetail}
                arrStr={arrStr}
                typeAnswer={type}
                quesTId={q.quesTId}
                key={index}
              />
            )
          })}
        </LoadingContext.Provider>
      </LayoutAdmin>
    </>
  )
}
export default TestCreate
