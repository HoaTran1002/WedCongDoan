import * as React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetAllByExamID, insertQues, updateQues } from '~/api/question'
import { getAllQuesTpye } from '~/api/questionTypes'
import useFetch from '~/hook/useFetch'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import MessageAlert from '~/components/MessageAlert'
import { red } from '@mui/material/colors'

interface QuestType {
  quesTId: number
  quesTName: string
}
interface IQuestion {
  quesId: number
  examId: number
  quesDetail: string
  ansOfQues: string
  trueAnswer: string
  quesTId: number
}
interface IDataQuestion {
  quesId: number
  index?: number
  quesDetail: string
  arrStr: string[]
  trueAnswer: string[]
  typeAnswer: string
  quesTId: number
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
  overflow: 'scroll'
}
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))
const ModalEdit = ({
  quesId,
  index,
  quesDetail,
  arrStr,
  trueAnswer,
  typeAnswer,
  quesTId
}: IDataQuestion): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [open, setOpen] = useState(false)
  const [updateQuesState, updateQuesCall] = useFetch()
  const [getQuesState, getQuesStateCall] = useFetch()
  const [getQuesTypeState, getQuesTypeStateCall] = useFetch()
  const { examId, comId } = useParams()
  const [questionType, setQuestionType] = useState<number>(1)
  const [question, setQuestion] = useState<string>('')
  const [answerList, setAnswerList] = useState<string[]>([])
  const [correctAnswerList, setCorrectAnswerList] = useState<string[]>([])
  const [errQuestion, setErrQuestion] = useState<string>('')
  const [mesagge, setMesagge] = useState<string>('')
  const [severity, setSeverity] = useState<string>('')

  const [errCorret, setErrCorret] = useState<string>('')
  const [errNumberCorret, setErrNumberCorret] = useState<string>('')
  const [errNullCorret, setErrNullCorret] = useState<string>('')

  const questions = getQuesState.payload || []
  const questionTypes = getQuesTypeState.payload || []

  React.useEffect((): void => {
    try {
      getQuesTypeStateCall(getAllQuesTpye).then((res: QuestType[]) => {
        if (res.length) setQuestionType(res[0].quesTId)
      })
    } catch (error: any) {
      console.log(error)
    }
  }, [getQuesTypeStateCall])
  const arrrCorretAnswer = (
    arrStr: string[],
    trueAnswer: string[]
  ): string[] => {
    const result: string[] = []

    for (let i = 0; i < arrStr.length; i++) {
      if (trueAnswer.indexOf(arrStr[i]) === -1) {
        result.push('')
      } else {
        result.push(arrStr[i])
      }
    }

    return result
  }

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await setAnswerList(arrStr)
      await setQuestion(quesDetail)

      const trueAns = await arrrCorretAnswer(arrStr, trueAnswer)

      await setCorrectAnswerList(trueAns)
    }

    fetchData()
  }, [])

  const filteredAnswerList = answerList.filter((item) => item !== '')
  const fillterCorretAnswerList = correctAnswerList.filter(
    (item) => item !== ''
  )

  const bodyQuestion: IQuestion = {
    quesId: quesId,
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
    console.log('data trả lời:' + bodyQuestion.ansOfQues)
    console.log('data trả lời đúng:' + bodyQuestion.trueAnswer)
    console.log('data câu hỏi:' + bodyQuestion.quesDetail)
    console.log('data loại đap án:' + bodyQuestion.quesTId)
    console.log('data Id :' + bodyQuestion.examId)
    console.log('data quesId :' + bodyQuestion.examId)

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
      updateQuesCall(async (): Promise<void> => {
        try {
          await updateQues(bodyQuestion)
          await setMesagge('cập nhật thành công')
          await setSeverity('success')
          window.location.reload()
        } catch (error) {
          setMesagge('cập nhật thất bại')
          setSeverity('error')
        }
      })
    }
  }

  const handleClose = (): void => setOpen(false)
  const handleOpen = (): void => setOpen(true)

  function handleClick(): void {
    setLoading(true)
  }
  function cancelModal(): void {
    setOpen(false)
  }
  return (
    <>
      {mesagge && <MessageAlert mesagge={mesagge} severity={severity} />}
      <LightTooltip placement='left' title='chỉnh sửa câu hỏi'>
        <Button
          sx={{
            background: 'white',
            border: 1,
            borderRadius: 1,
            margin: 0.2
          }}
          onClick={handleOpen}
        >
          <EditCalendarIcon />
        </Button>
      </LightTooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Card sx={{ Width: '100%', overflowY: 'scroll', boxShadow: 'none' }}>
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
                    value={question}
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
                    value={quesTId.toString()}
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
                {updateQuesState.loading ? (
                  <LoadingButton
                    size='small'
                    onClick={handleClick}
                    loading={loading}
                    variant='outlined'
                    sx={{ marginLeft: 2, marginRight: 2 }}
                    disabled
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
                    Lưu thay đổi
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
    </>
  )
}
export default ModalEdit
