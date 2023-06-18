import server from './axios'

export const getAllComp = async (): Promise<any> => {
  try {
    const { data } = await server.get('/Competitions')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const insert = async ({
  comName,
  examTimes,
  startDate,
  endDate,
  userQuan,
  depId
}: {
  comName: string
  examTimes: string
  startDate: string
  endDate: string
  userQuan: string
  depId: string
}): Promise<void> => {
  try {
    await server.post('/Competitions', {
      comName,
      examTimes,
      startDate,
      endDate,
      userQuan,
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
export const editUser = async ({
  userId,
  userName,
  dateOfBirth,
  email,
  password,
  userAddress,
  roleId,
  depId
}: {
  userId: string
  userName: string
  dateOfBirth: string
  email: string
  password: string
  userAddress: string
  roleId: number
  depId: number
}): Promise<void> => {
  try {
    await server.put(`/Users?id=${userId}`, {
      userId,
      userName,
      dateOfBirth,
      email,
      password,
      userAddress,
      roleId,
      depId
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
