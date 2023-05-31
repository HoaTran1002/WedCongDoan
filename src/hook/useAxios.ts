import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'

interface UseAxiosProps {
  url: string
  method: string
  body: object
  headers: object
}
axios.defaults.baseURL = 'http://localhost:5237/api'

const useAxios = ({ url, method, body, headers }: UseAxiosProps): [AxiosResponse<any> | null, string, boolean] => {
  const [response, setResponse] = useState<AxiosResponse<any> | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = (): void => {
    const options = {
      method: method,
      headers: headers,
      data: body,
      url: url
    }
    axios(options)
      .then((res) => {
        setResponse(res)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect((): void => {
    fetchData()
  }, [url, method])
  return [response, error, loading]
}

export default useAxios
