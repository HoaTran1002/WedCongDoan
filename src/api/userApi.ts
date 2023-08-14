import server from './axios'

export const getAllUser = async (): Promise<any> => {
  try {
    const { data } = await server.get('/Users')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const getLogout = async (): Promise<any> => {
  try {
    await server.get('/Users/Logout')
    localStorage.clear()
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const insert = async ({
  userName,
  dateOfBirth,
  email,
  password,
  roleId,
  depId
}: {
  userName: string
  dateOfBirth: string
  email: string
  password: string
  roleId: number
  depId: number
}): Promise<void> => {
  try {
    await server.post('/Users', {
      userName,
      dateOfBirth,
      email,
      password,
      roleId,
      depId
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const deleteUsers = async ({ _id }: { _id: string }): Promise<void> => {
  try {
    await server.delete(`/Users?id=${_id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const UpdateIsDeleted = async ({
  _id,
  value
}: {
  _id: string
  value: number
}): Promise<void> => {
  try {
    await server.put(`/Users/UpdateIsDeleted?id=${_id}&value=${value}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const editUser = async ({
  userId,
  userName,
  dateOfBirth,
  email,
  password,
  userAddress,
  roleId,
  depId,
  isDeleted
}: {
  userId: string | undefined
  userName: string | undefined
  dateOfBirth: string
  email: string | undefined
  password: string | undefined
  roleId: number
  depId: number
  userAddress:string | undefined
  isDeleted: number
}): Promise<void> => {
  try {
    await server.put(`/Users`, {
      userId,
      userName,
      dateOfBirth,
      email,
      password,
      roleId,
      depId,
      userAddress,
      isDeleted
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
