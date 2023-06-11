import { useState } from 'react'

interface State {
  payload: any
  error: string
  loading: boolean
}

const initState: State = {
  payload: null,
  error: '',
  loading: false
}

const useFetch = (): [State, (callback: () => Promise<any>) => Promise<any>] => {
  const [state, setState] = useState<State>(initState)

  const callApi = async (callback: () => Promise<any>): Promise<void> => {
    try {
      setState({ ...initState, loading: true })
      const data = await callback()
      console.log(data)
      setState({ ...initState, payload: data })
      return Promise.resolve(data)
    } catch (error: any) {
      setState({ ...initState, error: error.message })
    }
  }

  return [state, callApi]
}

export default useFetch
