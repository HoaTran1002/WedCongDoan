import server from './axios'

export const getAllDep = {
  enp: '/Departments',
  method: 'Get',
  body: {},
  headers: {}
}

export const Insert = (body: object): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: '/Departments',
    method: 'Post',
    body: body,
    headers: {}
  }
}
export const getById = (id: number): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: `/Departments/GetById?id=${id}`,
    method: 'Get',
    body: {},
    headers: {}
  };
};
export const Delete = (id: number): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: `/Departments?id=${id}`,
    method: 'Delete',
    body: {},
    headers: {}
  };
};
export const Edit = (body: object): { enp: string; method: string; body: object; headers: object } => {
  return {
    enp: '/Departments',
    method: 'Put',
    body: body,
    headers: {}
  }
}
