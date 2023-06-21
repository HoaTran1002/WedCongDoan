import axios from 'axios'
import base_url from '~/config/env'

const server = axios.create({
<<<<<<< HEAD
  baseURL: base_url,
=======
  baseURL: 'http://103.98.161.6:5050/api',
>>>>>>> refs/remotes/origin/main
  withCredentials: false
})

export default server
// http://103.98.161.6:5050/api'
