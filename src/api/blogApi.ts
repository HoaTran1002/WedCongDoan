import server from './axios'


export const getAll = {
  enp: '/Blogs',
  method: 'Get',
  body: {},
  headers: {}
}
export const Insert = (body: object): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: '/Blogs',
    method: 'Post',
    body: body,
    headers: {}
  }
}

export const getBlogId = async ({ _id }: { _id: number }): Promise<any> => {
  try {``
    const { data } = await server.get(`/Blogs/GetById?id=${_id}`)
    return data
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}

export const deleteBlog = async ({ _id }: { _id: number | null }): Promise<void> => {
  try {
    await server.delete(`/Blogs?id=${_id}`)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}


export const editBlog = async ({
  blogId,
  blogName,
  blogDetai,
  imgName,
  imgSrc
}: {
  blogId: number
  blogName: string
  blogDetai: string
  imgName: string
  imgSrc: string
}): Promise<void> => {
  try {
    await server.put(`/Blogs`, {
      blogId,
      blogName,
      blogDetai,
      imgName,
      imgSrc
    })
  } catch (error: any) {
    const message = error?.response?.data?.message ?? error.message
    throw new Error(message)
  }
}
