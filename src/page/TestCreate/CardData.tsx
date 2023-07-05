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
import { blue, red } from '@mui/material/colors'
import React, { MouseEventHandler, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import useFetch from '~/hook/useFetch'
import { deleteQues } from '~/api/question'
import MessageAlert from '~/components/MessageAlert'

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
const Index = ({
  callBack,
  quesId,
  index,
  quesDetail,
  arrStr,
  typeAnswer
}: {
  callBack: () => void
  quesId: number
  index: number
  quesDetail: string
  arrStr: string[]
  typeAnswer: string
}): JSX.Element => {
  const [deleteQuestionState, deleteQuestionCall] = useFetch()
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<string>('')

  const TypeSelect = typeAnswer === 'Radio' ? Radio : Checkbox
  const LayoutSelect = typeAnswer === 'Radio' ? RadioGroup : FormGroup
  const deleteQuestion = (
    quesId: number
  ): MouseEventHandler<HTMLButtonElement> => {
    return (event) => {
      const id = quesId
      try {
        deleteQuestionCall(async () => {
          return deleteQues({ id })
        })
        setMessage('đã xoá thành công')
        setSeverity('info')
        callBack
      } catch (error) {
        setMessage('xoá thất bại')
        setSeverity('error')
      }
    }
  }

  return (
    <>
      {message && <MessageAlert mesagge={message} severity={severity} />}
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
        <FormControl>
          <FormLabel
            id='demo-radio-buttons-group-label'
            sx={{ color: 'black', fontWeight: 500 }}
          >
            {index + 1}. {quesDetail} ?
          </FormLabel>
          <FormGroup aria-labelledby='demo-radio-buttons-group-label'>
            <LayoutSelect
              defaultValue='female'
              aria-labelledby='demo-customized-radios'
              name='customized-radios'
            >
              <>
                {arrStr.map((str, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={`answer1${index}`}
                      control={<TypeSelect />}
                      label={str}
                    />
                  )
                })}
              </>
            </LayoutSelect>
          </FormGroup>
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <LightTooltip placement='left' title='xoá câu hỏi'>
            <Button
              sx={{
                background: 'white',
                border: 1,
                borderRadius: 1,
                margin: 0.2
              }}
              onClick={deleteQuestion(quesId)}
            >
              <HighlightOffIcon sx={{ color: red[400] }} />
            </Button>
          </LightTooltip>
          <LightTooltip placement='left' title='chỉnh sửa câu hỏi'>
            <Button
              sx={{
                background: 'white',
                border: 1,
                borderRadius: 1,
                margin: 0.2
              }}
            >
              <EditCalendarIcon />
            </Button>
          </LightTooltip>
        </Box>
      </Card>
    </>
  )
}
export default Index
