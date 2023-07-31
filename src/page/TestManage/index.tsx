import React, { useEffect, useState } from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import { Box, Button, Grid } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link, useParams } from 'react-router-dom'
import ModalAdd from './ModalAdd'
import DataInput from './DataInput'
import useFetch from '~/hook/useFetch'
import { deleteCompetitionsExams, getAllCompExam } from '~/api/competitionExam'
import { DeleteExam, EditExam, getAllExam } from '~/api/exam'
import ModalEdit from '~/page/TestManage/ModalEdit'
import ModalDelete from '~/components/ModalDelete'
import MessageAlert from '~/components/MessageAlert'

interface CompExam {
  ceid: string
  examId: string
  comId: string
}
interface IRequesExam {
  examId: number
  examName: string
}
interface Exam {
  examId: number
  examName: string
}
const Index = (): JSX.Element => {
  const { comId } = useParams()
  const [dataCompExams, compExamsCall] = useFetch()
  const [exams, setExams] = useState<{ [key: number]: string }>({})
  const [deleteCompExam, callDeleteCompExam] = useFetch()
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [nameExam, setNameExam] = useState<string>('')
  const [editExamState, setEditExamState] = useFetch()

  useEffect(() => {
    compExamsCall(getAllCompExam)
  }, [loading])

  useEffect(() => {
    getAllExam().then((data: { examId: number; examName: string }[]) => {
      const result = data.reduce(
        (a, v) => ({ ...a, [v.examId]: v.examName }),
        {}
      )
      setExams(result)
    })
  }, [loading])
  const submitDeleteCompExam = async ({
    ceid
  }: {
    ceid: number
  }): Promise<void> => {
    const request: { _id: number } = {
      _id: ceid
    }
    try {
      await callDeleteCompExam(async (): Promise<void> => {
        await deleteCompetitionsExams(request)
      })
      setSeverity('info')
      setMessage('Xoá thành công!')
      setLoading(!loading)
    } catch (error) {
      setSeverity('error')
      setMessage('Xoá Thất bại!')
    }
  }
  const submitEditExamName = async ({
    examId
  }: {
    examId: number
  }): Promise<void> => {
    const reques: IRequesExam = {
      examId: examId,
      examName: nameExam
    }

    await setEditExamState(async (): Promise<void> => {
      await EditExam(reques)
    })
    setMessage('sửa thành công!')
    setSeverity('info')
    setLoading(!loading)
  }
  if (editExamState.error) {
    setMessage('sửa thất bại!')
    setSeverity('error')
  }
  const unMountMessage = (): void => {
    if (message != null) {
      setTimeout(async (): Promise<void> => {
        setMessage('')
      }, 3000)
    }
  }
  unMountMessage()
  return (
    <>
      <LayoutAdmin>
        <>
          {message && <MessageAlert message={message} severity={severity} />}
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <ModalAdd Title='THÊM MỚI ĐỀ THI'>
              <DataInput
                setLoad={(): void => {
                  setLoading(!loading)
                  setSeverity('success')
                  setMessage('đã thêm đề thi!')
                }}
              />
            </ModalAdd>

            <Grid
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{
                border: 1,
                borderColor: blue[300],
                borderRadius: 2,
                width: '88%',
                height: 500,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingY: 1,
                gap: 10,
                overflowY: 'scroll',
                background: '#fff'
              }}
            >
              {dataCompExams?.payload?.map((item: CompExam, index: number) => {
                if (item.comId == comId) {
                  return (
                    <>
                      <Box
                        sx={{
                          position: 'relative',
                          '&:hover .hover-content': {
                            display: 'block'
                          }
                        }}
                      >
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
                              <span>{exams[Number(item.examId)]}</span>
                            </Box>
                          </div>
                        </Grid>
                        <Box
                          className='hover-content'
                          sx={{
                            position: 'absolute',
                            display: 'none',
                            // transition: 'width 4s ease-out',
                            width: '80%',
                            // background: red[500],
                            paddingTop: 1,
                            top: 5,
                            left: '86%',
                            zIndex: 100,
                            right: 10,
                            height: '100%'
                          }}
                        >
                          <>
                            <ModalDelete
                              question={'Bạn muốn xoá đề thi?'}
                              content={
                                'sẽ xoá đề thi và tất cả câu hỏi trong đề thi!'
                              }
                              callBack={(): void => {
                                const ceid = Number(item.ceid)
                                submitDeleteCompExam({ ceid })
                              }}
                            />
                            <ModalEdit
                              nameExam={exams[Number(item.examId)]}
                              callBack={(): void => {
                                const examId = Number(item.examId)
                                submitEditExamName({ examId })
                              }}
                              setNameExam={({
                                value
                              }: {
                                value: string
                              }): void => {
                                setNameExam(value)
                              }}
                            />
                          </>
                        </Box>
                      </Box>
                    </>
                  )
                }
              })}
            </Grid>
          </Box>
        </>
      </LayoutAdmin>
    </>
  )
}

export default Index
