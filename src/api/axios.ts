import axios from 'axios'

const server = axios.create({
  baseURL: 'http://103.98.161.6:5050/api',
  withCredentials: false
  // withCredentials: true
})

export default server
// http://103.98.161.6:5050/api'
// http://localhost:5237/api
