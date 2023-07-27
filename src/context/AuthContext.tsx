import React, { createContext, useCallback, useEffect, useState } from 'react'
import server from '~/api/axios'
export interface IUserDetails {
  userId: string
  userName: string
  dateOfBirth: string
  email: string
  userAddress: string
  roleId: number
  depId: number
}

const initUserDetails: IUserDetails = {
  userId: '',
  userName: '',
  dateOfBirth: '',
  email: '',
  userAddress: '',
  roleId: 1,
  depId: -1
}
export interface IAuthContext {
  profile?: IUserDetails
}

export const AuthContextWrap = createContext<IAuthContext>({
  profile: undefined
})

export default function AuthProvider({ children, ...props }: any): JSX.Element {
  const [profile, setProfile] = useState<IUserDetails | undefined>(
    initUserDetails
  )

  const getProfile = useCallback(async (): Promise<void> => {
    try {
      const { data } = await server.get<IUserDetails>('/Users/profile')
      setProfile(data)
    } catch (error) {
      setProfile(undefined)
    }
  }, [])

  useEffect(() => {
    getProfile()
  }, [])
  return (
    <AuthContextWrap.Provider
      value={{
        profile
      }}
    >
      {children}
    </AuthContextWrap.Provider>
  )
}
