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

export const EditExam = async ({
  examId,
  examName,
}: {
  examId:number
  examName:string
}): Promise<void> => {
  try {
    await server.put(`/Exams`, {
      examId,
      examName,
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const DeleteExam = async ({
  _id
}: {
  _id: number
}): Promise<void> => {
  try {
    await server.delete(`/Exams?id=${_id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
