import server from "./axios"

export const getAllRole = async (): Promise<any> => {
  try {
    const { data } = await server.get('/Roles')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
