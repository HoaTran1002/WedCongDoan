import { Button, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateNewFolderSharpIcon from '@mui/icons-material/CreateNewFolderSharp'
import useFetch from '~/hook/useFetch'
import { getAllExam, insertExams } from '~/api/exam'
import { insertCompExam } from '~/api/competitionExam'
import { useParams } from 'react-router-dom'
interface Exam {
  examId: string
  examName: string
}
const DataInput = (): JSX.Element => {
  const [nameExam, setNameExam] = useState<string>('')
  const [examData, ExamCall] = useFetch()
  const [addExamComp, addExamCompCall] = useFetch()
  const { comId } = useParams()
  const onChangeNameExam = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNameExam(event.target.value)
  }
  useEffect(() => {
    ExamCall(getAllExam)
  }, [])
  const reqExamComp: { examId: string; comId: any } = { examId: nameExam, comId: comId }
  const ExamData = examData.payload || []
  const handelAddExam = async (): Promise<void> => {
    addExamCompCall(async () => {
      insertCompExam(reqExamComp)
    })
  }

  return (
    <>
      <TextField sx={{ width: 200 }} value={1} onChange={onChangeNameExam} id='selectDep' label='Chọn tên đề' select>
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
      <Button onClick={handelAddExam} sx={{ marginLeft: 2, marginTop: 2 }} variant='outlined'>
        Thêm Bài Thi{''} <CreateNewFolderSharpIcon />
      </Button>
    </>
  )
}
export default DataInput
