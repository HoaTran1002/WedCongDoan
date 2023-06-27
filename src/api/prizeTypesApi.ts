import server from './axios'

export const getAllPrizeTypes = async (): Promise<any> => {
  try {
    const { data } = await server.get('/PrizeTypes')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const InsertPrizeTypes = async ({ priTname }: { priTname: string }): Promise<void> => {
  try {
    await server.post('/PrizeTypes', {
      priTname
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const EditPrizeTypes = async ({
  priTid,
  priTname,
}: {
  priTid:number
  priTname:string
}): Promise<void> => {
  try {
    await server.put(`/PrizeTypes`, {
      priTid,
      priTname,
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const DeletePrizeTypes = async ({
  _id
}: {
  _id: number
}): Promise<void> => {
  try {
    await server.delete(`/PrizeTypes?id=${_id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}