import { useContext } from 'react'
import { AuthContextWrap, IUserDetails } from '~/context/AuthContext'

const useAuth = (): { profile?: IUserDetails } => {
  const { profile } = useContext(AuthContextWrap)
  return { profile }
}
export default useAuth
