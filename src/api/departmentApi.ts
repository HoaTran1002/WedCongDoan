import server from './axios'

export const getAllDep = async (): Promise<any> => {
  try {
    const { data } = await server.get('/Departments')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const Insert = (
  body: object
): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: '/Departments',
    method: 'Post',
    body: body,
    headers: {}
  }
}
export const getById = (
  id: number
): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: `/Departments/GetById?id=${id}`,
    method: 'Get',
    body: {},
    headers: {}
  }
}
export const deleteDepartmentsById = async ({
  _id
}: {
  _id: number
}): Promise<void> => {
  try {
    await server.delete(`/Departments?id=${_id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const Delete = (
  id: number
): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: `/Departments?id=${id}`,
    method: 'Delete',
    body: {},
    headers: {}
  }
}
export const Edit = (
  body: object
): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: '/Departments',
    method: 'Put',
    body: body,
    headers: {}
  }
}
