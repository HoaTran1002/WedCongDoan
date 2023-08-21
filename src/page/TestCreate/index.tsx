
import { LoadingButton } from '@mui/lab'
import {
  Box,
  CardActionArea,
  Button,
  Card,
  IconButton,
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
import { useNavigate, useParams } from 'react-router-dom'
import { GetAllByExamID, insertQues } from '~/api/question'
import { getAllQuesTpye } from '~/api/questionTypes'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import useFetch from '~/hook/useFetch'
import CardData from './CardData'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import MessageAlert from '~/components/MessageAlert'
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import readXlsxFile from 'read-excel-file';
import ModalMessage from '~/components/ModalMessage'
import ModalWraper from '~/components/ModalWraper'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
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
  const navigate = useNavigate()
  const inputRef = React.useRef<HTMLInputElement | null>(null);
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
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [listQuesJson, setListQuesJson] = useState<any[]>([])
  if (message !== '') {
    setTimeout((): void => {
      setIsAlert(false)
    }, 2500)
  }
  const questions = getQuesState.payload || []
  const questionTypes = getQuesTypeState.payload || []

  const closeModal = (): void => {
    setOpenModal(false);
  }
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

  const handleImportXlsx = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files && event.target.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      try {
        const data = (await readXlsxFile(file)).filter((value, index) => index !== 0).
        slice().sort(():number => Math.random() - 0.5)

        setListQuesJson(data);
      } catch (error) {
        console.log('Error reading Excel file:', error);
      } finally {
        event.target.value = '';
      }

    } else {
      console.log('Please select a valid xlsx or xls file.');
    }

    setOpenModal(true)
  };

  const handleSubmitImportAns = async (): Promise<void> =>{
    try{
      await quesCreateCall(async () => {
          for (const item of listQuesJson) {
            await insertQues({
              ansOfQues:item[1],
              examId:Number(examId),
              quesDetail:item[0],
              trueAnswer:item[2],
              quesTId:1
            })
          }
          setSeverity('info')
          setMessage('Thêm tất cả câu hỏi thành công')
          setLoading(!loading)
          closeModal();
        })
      }catch{
        setMessage('Thêm thất bại')
        setSeverity('error')
        return
        
    }
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
  if (message !== '') {
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }
  return (
    <>
      <LayoutAdmin>
        <LoadingContext.Provider value={loadingPrams}>
          <>
            {message && <MessageAlert message={message} severity={severity} />}
          </>
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
                          <MenuItem key={option.quesTId} value={option.quesTId}>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: '0 10px'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px'
              }}
              component='img'
              src='https://hufi.edu.vn/images/slide/banner-web-hufi-01.jpg'
            />
          </Box>
          <Box
            sx={{
              backgroundColor: '#42a5f5',
              padding: '10px',
              display: 'flex',
              gap: '40px',
              position: 'sticky',
              top: '78px',
              m: '0 10px',
              zIndex: '30'
            }}
          >
            <IconButton
              onClick={(): void => {
                navigate(`/Tests/Competition/${comId}`)
              }}
            >
              <ArrowBackIcon sx={{ color: 'white' }} />
            </IconButton>
            <Button onClick={handleOpen} variant='contained' startIcon={<AddIcon />}>
              tạo câu hỏi
            </Button>
            <input
              type="file"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
              onInput={handleImportXlsx}
              id='xlsxInput'
            />
            <Button
              onClick={(): void => document.getElementById('xlsxInput')?.click()}
              variant="contained"
              startIcon={<UploadIcon />}
            >
              Thêm câu hỏi có sẵn
            </Button>

          </Box>
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
          <ModalWraper open={openModal} close={closeModal} title={'Danh sách câu hỏi'} >
            <div>
              {
                listQuesJson.map((r: any, index: number) => (
                  <div key={index}>
                    {
                      index === 0 ? (null) : (
                        <Box
                          key={index}
                          sx={{
                            width: "100%",
                            mb: 2,
                            backgroundColor: "#1565c0   ",
                            padding: "3px",
                            borderRadius: "3px",
                            position: "relative"
                          }}
                        >
                          <Box
                            component='span'
                            sx={{
                              color: "white",
                              display: "inline-block",
                              fontSize: "17px",
                              padding: "5px",
                              fontWeight: "500",
                              maxWidth: { xs: '90%', md: "96%" }
                            }}
                          >
                            Câu {index} :&nbsp;{r[0]} ?
                          </Box>
                          <Box
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "3px",
                              padding: "10px 4px"
                            }}
                          >
                            <>
                              <Box
                                sx={{
                                  mb: 2,
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px"
                                }}
                              >
                                {
                                  r[1]?.split('<====>').map((item: string, index: number) => (
                                    r[2]?.trim() === item?.trim() ? (
                                      <Box
                                        key={index}
                                        sx={{
                                          display: "flex",
                                          gap: "10px",
                                          padding: "5px 3px",
                                          alignItems: "center",
                                          backgroundColor: "#daf1ff",
                                          borderRadius: "2px",
                                          color: "#0075b9",
                                          fontWeight: "500"
                                        }}
                                      >
                                        <RadioButtonCheckedIcon /> <span>{item.trim()}</span>
                                      </Box>
                                    ) : (
                                      <Box
                                        key={index}
                                        sx={{
                                          display: "flex",
                                          gap: "10px",
                                          padding: "5px 3px",
                                          alignItems: "center"
                                        }}
                                      >
                                        <RadioButtonUncheckedIcon /> <span>{item.trim()}</span>
                                      </Box>
                                    )
                                  ))
                                }
                              </Box>
                            </>
                          </Box>
                        </Box>
                      )
                    }
                  </div>
                ))
              }
              <div style={{
                display:"flex",
                justifyContent:"space-between"
              }}>
                <Button onClick={handleSubmitImportAns} startIcon={<AddIcon/>} variant='contained'>Thêm các câu hỏi vào đề thi</Button>
                <Button onClick={closeModal}>Trở về</Button>
              </div>
            </div>
          </ModalWraper>
        </LoadingContext.Provider>
      </LayoutAdmin>
    </>
  )
}
export default TestCreate
