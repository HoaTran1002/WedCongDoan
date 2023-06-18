import server from './axios'

export const getAllExam = async (): Promise<any> => {
  try {
    const { data } = await server.get('/Exams')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const insertExams = async ({ examName }: { examName: string }): Promise<void> => {
  try {
    await server.post('/Exams', {
      examName
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
