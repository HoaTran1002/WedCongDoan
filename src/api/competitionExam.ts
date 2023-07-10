import server from './axios'

export const getAllCompExam = async (): Promise<any> => {
  try {
    const { data } = await server.get('/CompetitionsExams')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const insertCompExam = async ({
  examId,
  comId
}: {
  comId?: number
  examId: number
}): Promise<void> => {
  try {
    console.log(examId + 'va' + comId)
    await server.post('/CompetitionsExams', {
      examId,
      comId
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const deleteCompetitionsExams = async ({
  _id
}: {
  _id: number
}): Promise<void> => {
  try {
    await server.delete(`/CompetitionsExams?id=${_id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
