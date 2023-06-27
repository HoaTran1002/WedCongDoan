import server from './axios'

export const getAllPrize = async (): Promise<any> => {
  try {
    const { data } = await server.get('/Prizes')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const InsertPrize = async ({ priName }: { priName: string }): Promise<void> => {
  try {
    await server.post('/Prizes', {
      priName
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const EditPrize = async ({
  priId,
  priName,
}: {
  priId:number
  priName:string
}): Promise<void> => {
  try {
    await server.put(`/Prizes`, {
      priId,
      priName,
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const DeletePrize = async ({
  _id
}: {
  _id: number
}): Promise<void> => {
  try {
    await server.delete(`/Prizes?id=${_id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}