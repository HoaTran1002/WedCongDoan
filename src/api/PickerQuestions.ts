import server from './axios'

export const getAllPickerQuestion = async (): Promise<any> => {
    try {
        const { data } = await server.get('/PickerQuestions')
        return data
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message
        throw new Error(message)
    }
}

export const InsertPickerQuestion = async ({
    quesId,
    cuid,
    answer
}: {
    quesId: number,
    cuid: number,
    answer: string
}): Promise<void> => {
    try {
        await server.post('/PickerQuestions', {
            quesId,
            cuid,
            answer
        })
    } catch (error: any) {
        const message = error?.response?.data?.message ?? error.message
        throw new Error(message)
    }
}


// export const getAllPickerQuestionById =async ({ id }: {id: number }): Promise<any> => {
//     try {
//         console.log(id)
//         const { data } = await server.get(`/PickerQuestions/GetAllByComUserId?id=2015`)
//         return data
//     } catch (error: any) {
//         const message = error?.response?.data?.message ?? error.message
//         throw new Error(message)
//     }
// }
// export const getAllPickerQuestionById =() => {
//         try {
//             const { data } = await server.get(`/PickerQuestions/GetAllByComUserId?id=${id}`)
//             return data
//         } catch (error: any) {
//             const message = error?.response?.data?.message ?? error.message
//             throw new Error(message)
//         }
//     }