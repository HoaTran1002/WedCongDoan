import server from './axios'

export const getAllCompUser = async (): Promise<any> => {
    try {
        const { data } = await server.get('/CompetitionsUsers')
        return data
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message
        throw new Error(message)
    }
}

export const insertCompUser = async ({
    comId,
    userId
}: {
    userId?: string
    comId: number
}): Promise<void> => {
    try {
        await server.post('/CompetitionsUsers', {
            userId,
            comId
        })
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message
        throw new Error(message)
    }
}
export const deleteCompetitionsUsers = async ({
    _id
}: {
    _id: number
}): Promise<void> => {
    try {
        await server.delete(`/CompetitionsUsers?id=${_id}`)
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message
        throw new Error(message)
    }
}
