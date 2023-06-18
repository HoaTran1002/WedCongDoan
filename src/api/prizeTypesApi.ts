import server from './axios'

export const getAll = async (): Promise<any> => {
  try {
    const { data } = await server.get('/PrizeTypes')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
