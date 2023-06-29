import server from './axios'

export const getAllCompetitionBlog = async () : Promise<any> => {
  try {
    const { data } = await server.get('/CompetitionsBlogsUsers')
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const InsertCompetitionBlog = async({
    comId,
    blogId,
    userId,
    postDate
}: {
    comId: number
    blogId: number
    userId: string
    postDate: string
}): Promise<void> => {
  try {
    await server.post('/CompetitionsBlogsUsers', {
        comId,
        blogId,
        userId,
        postDate
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const getBlogCompetitionBlogId = async ({ id }: {id: number }): Promise<any> => {
  try {
    const { data } = await server.get(`CompetitionsBlogsUsers/GetById?id=${id}`)
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const DeleteCompetitionBlog = async ({
  _id
}: {
  _id: number | null
}): Promise<void> => {
  try {
    await server.delete(`/CompetitionsBlogsUsers?id=${_id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const EditCompetitionBlog = async ({
    id,
    comId,
    blogId,
    userId,
    postDate
}: {
    id:number
    comId: number
    blogId: number
    userId: string
    postDate: string
}): Promise<void> => {
  try {
    await server.put(`/CompetitionsBlogsUsers`, {
        id,
        comId,
        blogId,
        userId,
        postDate
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
