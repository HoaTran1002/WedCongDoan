import server from './axios'

export const getAllPrizes = async (): Promise<any> => {
  try {
    const { data } = await server.get('/Prizes')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
