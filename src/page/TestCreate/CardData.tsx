import { CheckBox } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps
} from '@mui/material'
import { blue, green, red } from '@mui/material/colors'
import React, { useState } from 'react'

import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import useFetch from '~/hook/useFetch'
import { deleteQues } from '~/api/question'
import MessageAlert from '~/components/MessageAlert'
import ModalDelete from '~/components/ModalDelete'
import ModalEdit from './ModalEdit'

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
interface IQuestion {
  callBack: () => void
  quesId: number
  index: number
  quesDetail: string
  arrStr: string[]
  trueAnswer: string[]
  typeAnswer: string
  quesTId: number
}
const Index = ({
  callBack,
  quesId,
  trueAnswer,
  index,
  quesDetail,
  arrStr,
  typeAnswer,
  quesTId
}: IQuestion): JSX.Element => {
  const [deleteQuestionState, deleteQuestionCall] = useFetch()
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<string>('')

  const TypeSelect = typeAnswer === 'Radio' ? Radio : Checkbox
  const LayoutSelect = typeAnswer === 'Radio' ? RadioGroup : FormGroup

  const deleteQuestion = async (): Promise<void> => {
    const id = quesId

    try {
      await deleteQuestionCall(async (): Promise<void> => {
        return await deleteQues({ id })
      })
      // setMessage('xoá thành công!')
      // setSeverity('info')
      callBack()
    } catch (error) {
      setMessage('xoá thất bại!')
      setSeverity('error')
    }
  }
  if (message != null) {
    setTimeout(async (): Promise<void> => {
      await setMessage('')
    }, 3000)
  }
  return (
    <>
      {message && <MessageAlert message={message} severity={severity} />}
      <Card
        sx={{
          maxWidth: '100%',
          mt: 2,
          mb: 2,
          p: 3,
          background: blue[50],
          display: 'flex',
          justifyContent: 'space-between'
        }}
        key={index}
      >
        <FormControl sx={{ width: '100%' }}>
          <FormLabel
            id='demo-radio-buttons-group-label'
            sx={{ color: 'black', fontWeight: 500 }}
          >
            {index + 1}. {quesDetail} ?
          </FormLabel>
          <FormGroup
            aria-labelledby='demo-radio-buttons-group-label'
            sx={{ width: '100%' }}
          >
            <LayoutSelect
              defaultValue='female'
              aria-labelledby='demo-customized-radios'
              name='customized-radios'
              sx={{ width: '100%' }}
            >
              <>
                {arrStr.map((str, index) => {
                  return (
                    <>
                      {trueAnswer.includes(str) ? (
                        <FormControlLabel
                          key={index}
                          value={`answer1${index}`}
                          control={<TypeSelect />}
                          label={str}
                          sx={{
                            background: blue[300],
                            color: 'white',
                            width: '100%',
                            height: 30,
                            marginTop: 1
                          }}
                          checked
                        />
                      ) : (
                        <FormControlLabel
                          key={index}
                          value={`answer1${index}`}
                          control={<TypeSelect />}
                          label={str}
                        />
                      )}
                    </>
                  )
                })}
              </>
            </LayoutSelect>
          </FormGroup>
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <LightTooltip placement='left' title='xoá câu hỏi'>
            <ModalDelete
              callBack={deleteQuestion}
              // setIsDeleteValue={setIsDeleteValue}
            />
          </LightTooltip>
          <LightTooltip placement='left' title='chỉnh sửa câu hỏi'>
            <ModalEdit
              trueAnswer={trueAnswer}
              quesId={quesId}
              quesDetail={quesDetail}
              arrStr={arrStr}
              typeAnswer={typeAnswer}
              quesTId={quesTId}
            />
          </LightTooltip>
        </Box>
      </Card>
    </>
  )
}
export default Index
