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

export const Insert = async ({
  depName,
}: {
  depName: string
}): Promise<void> => {
  try {
    await server.post('/Departments', {
      depName,
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const getDepId = async ({ id }: {id: number }): Promise<any> => {
  try {
    const { data } = await server.get(`Departments/GetById?id=${id}`)
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
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
export const Edit = async ({
  depId,
  depName,
}: {
  depId: number
  depName: string
}): Promise<void> => {
  try {
    await server.put(`/Departments`, {
      depId,
      depName,
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
