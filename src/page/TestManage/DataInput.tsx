import { Button, TextField, Snackbar } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CreateNewFolderSharpIcon from '@mui/icons-material/CreateNewFolderSharp'

import MuiAlert from '@mui/material/Alert'
import useFetch from '~/hook/useFetch'
import { getAllExam, insertExams } from '~/api/exam'
import { insertCompExam } from '~/api/competitionExam'
import { useParams } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import { Loader } from '~/components/loader'
import CircularProgress from '@mui/material/CircularProgress'
import { SetModal } from './ModalAdd'

interface IExam {
  examId: number
  examName: string
}
const DataInput = ({ setLoad }: { setLoad: () => void }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)

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
  const modalParams = useContext(SetModal)
  const handelSubmitCreateExam = (): void => {
    if (nameExam == '') {
      setNameExamErr('hãy nhập tên đề')
    } else {
      ;(async (): Promise<void> => {
        try {
          await nameExamInsertCall(async () => {
            await insertExams(requesInsertExam)
          })
          setLoading(!loading) //loading modal
        } catch (error) {
          // setShowError(true)
        }
        await insertCompExamCall(async (): Promise<void> => {
          await insertCompExam(requesInsertCompExam)
        })

        // await setShowSuccess(true)
        setLoad()
        modalParams.offModal()
      })()
    }
  }
  return (
    <>
      {examsState.loading || insertComp.loading ? (
        <CircularProgress />
      ) : (
        <>
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
