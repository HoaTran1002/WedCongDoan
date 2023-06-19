import React, { useEffect } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import { Box, Button, Grid } from '@mui/material'
import { blue, yellow } from '@mui/material/colors'
import { Link, useParams } from 'react-router-dom'
import ModalAdd from './ModalAdd'
import DataInput from './DataInput'
import useFetch from '~/hook/useFetch'
import { getAllCompExam } from '~/api/competitionExam'
import { getAllExam } from '~/api/exam'

interface CompExam {
  ceid: string
  examId: string
  comId: string
}
interface Exam {
  examId: string
  examName: string
}
const Index = (): JSX.Element => {
  const { comId } = useParams()
  const [dataCompExams, compExamsCall] = useFetch()
  const [dataExams, examsCall] = useFetch()
  useEffect(() => {
    compExamsCall(getAllCompExam)
  }, [])
  useEffect(() => {
    examsCall(getAllExam)
  }, [])
  const compExams = dataCompExams.payload || []
  const exams = dataExams.payload || []
  const getExamName = (idComExam: string): string => {
    const exam = exams.find((exam: Exam) => exam.examId === idComExam)
    return exam ? exam.examName : undefined
  }
  return (
    <>
      <LayoutAdmin>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <ModalAdd Title='THÊM MỚI BÀI THI'>
            <DataInput />
          </ModalAdd>

          <Grid
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{
              border: 2,
              borderColor: blue[300],
              borderRadius: 2,
              width: '85%',
              height: 550,
              display: 'flex',
              padding: 1,
              overflowY: 'scroll'
            }}
          >
            {compExams.map((item: CompExam, index: number) => {
              if (item.comId == comId) {
                return (
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    md={4}
                    key={index}
                    sx={{
                      background: blue[100],
                      width: 100,
                      height: 120,
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                      marginRight: 2
                    }}
                  >
                    <div>
                      {' '}
                      <Link
                        to={`/TestCreate/Test/${item.examId}/Competition/${comId}`}
                      >
                        <Button>
                          <DescriptionOutlinedIcon
                            sx={{ width: '100%', height: '100%' }}
                          />
                        </Button>
                      </Link>
                      {/* <Button>
                  <PostAddSharpIcon sx={{ width: '100%', height: '100%' }} />
                </Button> */}
                      <Box
                        sx={{
                          background: blue[700],
                          color: '#fff',
                          display: 'flex',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          border: 'none'
                        }}
                      >
                        <span>{getExamName(item.ceid)}</span>
                      </Box>
                    </div>
                  </Grid>
                )
              }
            })}
          </Grid>
        </Box>
      </LayoutAdmin>
    </>
  )
}

export default Index
