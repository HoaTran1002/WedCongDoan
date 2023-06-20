import { Button, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateNewFolderSharpIcon from '@mui/icons-material/CreateNewFolderSharp'
import useFetch from '~/hook/useFetch'
import { getAllExam, insertExams } from '~/api/exam'
import { insertCompExam } from '~/api/competitionExam'
import { useParams } from 'react-router-dom'

import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { Try } from '@mui/icons-material'
interface Exam {
  examId: string
  examName: string
}
const DataInput = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [nameExam, setNameExam] = useState<string>('')
  const [examData, ExamCall] = useFetch()
  const [addExamComp, addExamCompCall] = useFetch()
  const { comId } = useParams()
  const onChangeNameExam = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNameExam(event.target.value)
  }
  useEffect(() => {
    ExamCall(getAllExam)
  }, [])
  const reqExamComp: { examId: number; comId: any } = {
    examId: Number(nameExam),
    comId: Number(comId)
  }
  const ExamData = examData.payload || []
  const handelAddExam = async (): Promise<void> => {
    try {
      await addExamCompCall(async () => {
        insertCompExam(reqExamComp)
      })
      setShowSuccess(true)
    } catch (error) {
      setShowError(true)
    }
  }
  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
  }
  return (
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
      <TextField
        sx={{ width: 200 }}
        value={1}
        onChange={onChangeNameExam}
        id='selectDep'
        label='Chọn tên đề'
        select
      >
        {ExamData == null ? (
          <MenuItem value='1'>Ten</MenuItem>
        ) : (
          ExamData.map((item: Exam, index: number): JSX.Element => {
            return (
              <MenuItem sx={{ color: 'black' }} key={index} value={item.examId}>
                {item.examName}
              </MenuItem>
            )
          })
        )}
      </TextField>
      <Button
        onClick={handelAddExam}
        sx={{ marginLeft: 2, marginTop: 2 }}
        variant='outlined'
      >
        Thêm Đề Thi{''} <CreateNewFolderSharpIcon />
      </Button>
    </>
  )
}
export default DataInput
