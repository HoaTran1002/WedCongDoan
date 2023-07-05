import { useMemo, useState } from 'react'

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

const useFetch = (): [
  State,
  (callback: () => Promise<any>) => Promise<any>
] => {
  const [state, setState] = useState<State>(initState)

  const callApi = useMemo(
    () =>
      async (callback: () => Promise<any>): Promise<void> => {
        try {
          setState({ ...initState, loading: true })
          const data = await callback()

          setState({ ...initState, payload: data })
          return Promise.resolve(data)
        } catch (error: any) {
          setState({ ...initState, error: error.message })
        }
      },
    []
  )

  return [state, callApi]
}

export default useFetch
