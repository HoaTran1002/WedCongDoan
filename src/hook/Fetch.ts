import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'

interface UseAxiosProps {
  enp: string
  method: string
  body: object
  headers: object
}
axios.defaults.baseURL = 'http://localhost:5237/api'

const Fetch = ({ enp, method, body, headers }: UseAxiosProps): [AxiosResponse<any> | null, string, boolean] => {
  const [response, setResponse] = useState<AxiosResponse<any> | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  console.log(2)
  const fetchData = (): void => {
    const options = {
      method: method,
      url: enp,
      body: body,
      headers: headers
    }
    axios(options)
      .then((res) => {
        setLoading(false)
        setResponse(res)
      })
      .catch((err) => {
        setError(err)
      })
  }
  useEffect((): void => {
    fetchData()
  }, [])
  return [response, error, loading]
}

export default Fetch