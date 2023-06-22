import server from './axios'

export const getAllQuesTpye = async (): Promise<any> => {
  try {
    const { data } = await server.get('/QuestionTypes')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
