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
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const insert = async ({
  userId,
  userName,
  dateOfBirth,
  email,
  password,
  roleId,
  depId
}: {
  userId: string
  userName: string
  dateOfBirth: string
  email: string
  password: string
  roleId: number
  depId: number
}): Promise<void> => {
  try {
    await server.post('/Users', {
      userId,
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
  isDeleted: number
}): Promise<void> => {
  try {
    // console.log(userId)
    // console.log(userName)
    // console.log(dateOfBirth)
    // console.log(email)
    // console.log(password)
    // console.log(userAddress)
    // console.log(roleId)
    // console.log(depId)
    // console.log(isDeleted)

    await server.put(`/Users`, {
      userId,
      userName,
      dateOfBirth,
      email,
      password,
      roleId,
      depId,
      isDeleted
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
