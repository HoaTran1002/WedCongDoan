export const getAll = {
  enp: '/Users',
  method: 'Get',
  body: {},
  headers: {}
}
export const Insert = (body: object): { enp: string; method: string; body: object; headers: object } => {
  console.log(body)
  return {
    enp: '/Users',
    method: 'Post',
    body: body,
    headers: {}
  }
}
export const getAllByRoleID = {
  enp: '/Users',
  method: 'Get',
  body: {},
  headers: {}
}
export const getByID = {
  enp: '/Users',
  method: 'Get',
  body: {},
  headers: {}
}
export const getAllByDepID = {
  enp: '/Users',
  method: 'Post',
  body: {},
  headers: {}
}
export const Delete = {
  enp: '/Users',
  method: 'Get',
  body: {},
  headers: {}
}
export const Edit = {
  enp: '/Users',
  method: 'Get',
  body: {},
  headers: {}
}
