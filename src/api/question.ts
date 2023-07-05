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
export const GetAllByExamID = async ({ id }: { id: number }): Promise<any> => {
  try {
    const { data } = await server.get(`/Questions/GetAllByExamID?id=${id}`)
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
export const deleteQues = async ({ id }: { id: number }): Promise<void> => {
  try {
    await server.delete(`/Questions?id=${id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
