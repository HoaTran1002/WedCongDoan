import server from './axios'

interface QuestionDataAdd {
  quesDetail: string
  ansOfQues: string
  trueAnswer: string
  examId: number
  quesTId: number
}
export const getAllQues = async (): Promise<any> => {
  try {
    const { data } = await server.get('/Questions')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const GetAllByExamID = async (): Promise<any> => {
  try {
    const { data } = await server.get(`/GetAllByExamID?id=2`)
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const insertQues = async ({
  quesDetail,
  ansOfQues,
  trueAnswer,
  examId,
  quesTId
}: QuestionDataAdd): Promise<void> => {
  try {
    await server.post('/Questions', {
      quesDetail,
      ansOfQues,
      trueAnswer,
      examId,
      quesTId
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
