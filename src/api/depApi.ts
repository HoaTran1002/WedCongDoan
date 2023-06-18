import server from './axios'

export const getAll = {
  enp: '/Departments',
  method: 'Get',
  body: {},
  headers: {}
}
export const getAllDep = async (): Promise<any> => {
  try {
    const { data } = await server.get('/Departments')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
