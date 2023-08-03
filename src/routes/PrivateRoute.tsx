import React from 'react'
import useAuth from '~/hook/useAuth'
import { Outlet, Navigate } from 'react-router-dom'
type Props = {
  roles?: number[]
}

const PrivateRoute = (props: Props): JSX.Element => {
  const { profile } = useAuth()
  
  if (!profile) {
    return <Navigate to='/login' />;
  }
  if (props.roles?.length) {
    const isConfirmed = props.roles.some((x) => x === profile.roleId);
    if (!isConfirmed) {
      return <Navigate to='/403' />;
    }
  }

  return <Outlet />;
}

export default PrivateRoute
