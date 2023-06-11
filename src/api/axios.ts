import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:5237/api',
  withCredentials: false
})
export default server
