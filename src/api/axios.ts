import axios from 'axios'
import base_url from '~/config/env'

const server = axios.create({
  baseURL: base_url,
  withCredentials: true
})

export default server
