import server from './axios'

export const getAllCompPrizes = async (): Promise<any> => {
  try {
    const { data } = await server.get('/CompetitionsPrizes')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const getAllByComID = async ({ id }: { id: string }): Promise<any> => {
  try {
    const { data } = await server.get(`/CompetitionsPrizes/GetAllByComID?id=${id}`)
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const insert = async ({
  priId,
  comId,
  priTid,
  quantity,
  prizeDetail
}: {
  priId: number
  comId: number
  priTid: number
  quantity: number
  prizeDetail: string
}): Promise<void> => {
  try {
    await server.post('/CompetitionsPrizes', {
      priId,
      comId,
      priTid,
      quantity,
      prizeDetail
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const editcompPrize = async ({
  cpid,
  priId,
  comId,
  priTid,
  quantity,
  prizeDetail
}: {
  cpid: number
  priId: number
  comId: number
  priTid: number
  quantity: number
  prizeDetail: string
}): Promise<void> => {
  try {
    await server.put('/CompetitionsPrizes', {
      cpid,
      priId,
      comId,
      priTid,
      quantity,
      prizeDetail
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
export const deleteCompPrizes = async ({ _id }: { _id: string }): Promise<void> => {
  try {
    await server.delete(`/CompetitionsPrizes?id=${_id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
