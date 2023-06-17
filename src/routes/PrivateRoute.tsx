import useAuth from '~/hook/useAuth'
import { Outlet, Navigate } from 'react-router-dom'
type Props = {
  roles?: number[]
}

const PrivateRoute = (props: Props): JSX.Element => {
  const { profile } = useAuth()

  if (props.roles?.length && profile?.roleId) {
    const isConfirm = props.roles.some((x) => x === profile.roleId)

    if (!isConfirm) return <Navigate to='/403' />
  }
  return profile ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
