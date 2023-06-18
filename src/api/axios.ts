import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:5237/api',
  withCredentials: false
})

export default server
// http://103.98.161.6:5050/api'
