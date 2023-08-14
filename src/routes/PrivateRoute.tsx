import React from 'react'
import useAuth from '~/hook/useAuth'
import { Outlet, Navigate } from 'react-router-dom'
type Props = {
  roles?: number[]
}

const PrivateRoute = (props: Props): JSX.Element => {
  const { profile } = useAuth()
  const checkCookie=(key:string):boolean=> {
    const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === 'idx_web_cookie') {
      return true;
    }
  }
  return false;
  }
  const LoginSuccess = localStorage.getItem('Login')
  if(LoginSuccess === "success"){
    if (!profile) {
      return <Navigate to='/login' />;
    }
    if (props.roles?.length) {
      const isConfirmed = props.roles.some((x) => x === profile.roleId);
      if (!isConfirmed) {
        return <Navigate to='/403' />;
      }
    }
  }
  return <Outlet />;
}

export default PrivateRoute
