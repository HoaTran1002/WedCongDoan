import { Button, TextField , Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateNewFolderSharpIcon from '@mui/icons-material/CreateNewFolderSharp'

import MuiAlert from '@mui/material/Alert'
import useFetch from '~/hook/useFetch'
import { getAllExam, insertExams } from '~/api/exam'
import { insertCompExam } from '~/api/competitionExam'
import { useParams } from 'react-router-dom'

interface IExam {
  examId: number
  examName: string
}
const DataInput = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [nameExam, setNameExam] = useState<string>('')
  const [nameExamErr, setNameExamErr] = useState<string>('')
  const [nameExamInsertState, nameExamInsertCall] = useFetch()
  const [examsState, getExam] = useFetch()
  const [insertComp, insertCompExamCall] = useFetch()
  const { comId } = useParams()

  useEffect(() => {
    getExam(getAllExam)
  }, [loading])
  const exams = examsState.payload || []
  const exam: IExam = exams[exams.length - 1]

  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
  }
  const onchangeNameExam = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value
    setNameExam(value)
  }
  const requesInsertExam: {
    examName: string
  } = { examName: nameExam }
  const requesInsertCompExam: { examId: number; comId?: number } = {
    examId: 0
  }
  if (exam) {
    requesInsertCompExam.examId = exam.examId + 1
  }

  if (comId) {
    requesInsertCompExam.comId = Number(comId)
  }
  const handelSubmitCreateExam = (): void => {
    if (nameExam == '') {
      setNameExamErr('hãy nhập tên đề')
    } else {
      ;(async (): Promise<void> => {
        try {
          await nameExamInsertCall(async () => {
            await insertExams(requesInsertExam)
          })
          await setLoading(!loading)
          insertCompExamCall(async (): Promise<void> => {
            insertCompExam(requesInsertCompExam)
          })
          setShowSuccess(true)
          console.log('data response:' + nameExamInsertState.payload)
        } catch (error) {
          setShowError(true)
        }
      })()
    }
  }
  return (
    <>
      {examsState.loading ? (
        <h1>Đang tải dữ liệu...</h1>
      ) : (
        <>
          {' '}
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
            error={Boolean(nameExamErr)}
            helperText={nameExamErr}
            onChange={onchangeNameExam}
            sx={{ width: 200 }}
            id='selectDep'
            label='nhập tên đề'
          ></TextField>
          <Button
            sx={{ marginLeft: 2, marginTop: 2 }}
            variant='outlined'
            onClick={handelSubmitCreateExam}
          >
            Thêm Đề Thi{''} <CreateNewFolderSharpIcon />
          </Button>
        </>
      )}
    </>
  )
}
export default DataInput
