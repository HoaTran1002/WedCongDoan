import server from './axios'

export const getAllResult = async (): Promise<any> => {
    try {
        const { data } = await server.get('/Results')
        return data
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message
        throw new Error(message)
    }
}

export const InsertResult = async ({
    cuid,
    trueAns,
    falseAns,
    startTimes,
    endTimes,
}: {
    cuid: number,
    trueAns: number,
    falseAns: number,
    startTimes: string,
    endTimes: string
}): Promise<void> => {
    try {
        await server.post('/Results', {
            cuid,
            trueAns,
            falseAns,
            startTimes,
            endTimes,
        })
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message
        throw new Error(message)
    }
}

export const EditResult = async ({
    resId,
    cuid,
    trueAns,
    falseAns,
    startTimes,
    endTimes,
}: {
    resId:number,
    cuid: number,
    trueAns: number,
    falseAns: number,
    startTimes: string,
    endTimes: string
}): Promise<void> => {
    try {
        await server.post('/Results', {
            resId,
            cuid,
            trueAns,
            falseAns,
            startTimes,
            endTimes,
        })
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message
        throw new Error(message)
    }
}
