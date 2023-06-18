import server from './axios'

export const getAll = async (): Promise<any> => {
  try {
    const { data } = await server.get('/CompetitionsExams')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const insertCompExam = async ({ examId, compId }: { compId: number; examId: number }): Promise<void> => {
  try {
    console.log(examId + compId)
    await server.post('/CompetitionsExams', {
      examId,
      compId
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
