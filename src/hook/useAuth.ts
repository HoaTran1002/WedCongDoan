import { useContext } from 'react'
import { AuthContextWrap, IUserDetails } from '~/context/AuthContext'

const useAuth = (): { profile?: IUserDetails,setWidthMin:any,widthMin:boolean } => {
  const { profile,setWidthMin,widthMin } = useContext(AuthContextWrap)
  return { profile,setWidthMin,widthMin }
}
export default useAuth
