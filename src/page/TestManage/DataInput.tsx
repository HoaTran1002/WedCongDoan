import { Button, TextField, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateNewFolderSharpIcon from '@mui/icons-material/CreateNewFolderSharp'

import MuiAlert from '@mui/material/Alert'
import useFetch from '~/hook/useFetch'
import { getAllExam, insertExams } from '~/api/exam'
import { insertCompExam } from '~/api/competitionExam'
import { useParams } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'

interface IExam {
  examId: number
  examName: string
}
const DataInput = ({ setLoad }: { setLoad: () => void }): JSX.Element => {
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
          setLoading(!loading)
          await insertCompExamCall(async (): Promise<void> => {
            await insertCompExam(requesInsertCompExam)
          })

          await setShowSuccess(true)
          setLoad()
          console.log('data response:' + nameExamInsertState.payload)
        } catch (error) {
          setShowError(true)
        }
      })()
    }
  }
  return (
    <>
      {examsState.loading || insertComp.loading ? (
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
              Thêm thành công!
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
              Thêm thất bại!
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
          {examsState.loading || insertComp.loading ? (
            <LoadingButton loading variant='outlined'>
              Submit
            </LoadingButton>
          ) : (
            <Button
              sx={{ marginLeft: 2, marginTop: 2 }}
              variant='outlined'
              onClick={handelSubmitCreateExam}
            >
              Thêm Đề Thi{''} <CreateNewFolderSharpIcon />
            </Button>
          )}
        </>
      )}
    </>
  )
}
export default DataInput
