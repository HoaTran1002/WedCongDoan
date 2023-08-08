import React, { createContext, useCallback, useEffect, useState } from 'react';
import server from '~/api/axios';

export interface IUserDetails {
  userId: string;
  userName: string;
  dateOfBirth: string;
  email: string;
  roleId: number;
  depId: number;
}

const initUserDetails: IUserDetails = {
  userId: '',
  userName: '',
  dateOfBirth: '',
  email: '',
  roleId: 1,
  depId: -1,
};

export interface IAuthContext {
  profile?: IUserDetails;
  widthMin: boolean;
  setWidthMin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContextWrap = createContext<IAuthContext>({
  profile: undefined,
  widthMin: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWidthMin: () => {},
});

export default function AuthProvider({ children, ...props }: any): JSX.Element {
  const [profile, setProfile] = useState<IUserDetails | undefined>(undefined);
  const [widthMin, setWidthMin] = useState(false);
  const getProfile = useCallback(async (): Promise<void> => {
    try {
      const { data } = await server.get<IUserDetails>('/Users/profile');
      setProfile(data);
    } catch (error) {
      setProfile(undefined);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  const contextValue: IAuthContext = {
    profile,
    widthMin,
    setWidthMin,
  };
  return (
    <AuthContextWrap.Provider value={contextValue}>
      {children}
    </AuthContextWrap.Provider>
  );
}
