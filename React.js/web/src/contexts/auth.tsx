import React, {createContext, useState, useEffect, useContext} from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthSignIn, AuthSignUp, User} from '../services/auth';
import api from '../services/api';

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
}

interface AuthContextData {
  signed: boolean,
  user: User | null,
  loading: boolean,
  signIn: (data: SignInData) => Promise<void>,
  signUp: (data: SignUpData) => Promise<void>,
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState<User | null>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storageUser = await localStorage.getItem('@RNAuth:user');
      const storageToken = await localStorage.getItem('@RNAuth:token');

      //await new Promise(resolve => setTimeout(resolve, 2000));

      if (storageUser && storageToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;

        setUser(JSON.parse(storageUser));
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  async function signIn({email, password}: SignInData) {
    const response = await AuthSignIn();

    setUser(response.user);

    api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

    await localStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await localStorage.setItem('@RNAuth:token', response.token);
  }

  async function signUp({email, password}: SignUpData) {
    const response = await AuthSignUp()

    api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

    await localStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await localStorage.setItem('@RNAuth:token', response.token);
  }

  function signOut() {
    localStorage.clear();

    setUser(null);
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
