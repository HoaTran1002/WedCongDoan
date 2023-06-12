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

export const getById = (id: number): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: `/Blogs/GetById?id=${id}`,
    method: 'Get',
    body: {},
    headers: {}
  };
};
export const Delete = (id: number): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: `/Blogs?id=${id}`,
    method: 'Delete',
    body: {},
    headers: {}
  };
};
export const Edit = (body: object): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: '/Blogs',
    method: 'Put',
    body: body,
    headers: {}
  }
}