import { createContext } from 'react'
import { IUser } from '../models/UsersModels'

export interface IContextAuth {
  login: (data: IUser) => void,
  logout: () => void,
  isAuth: boolean,
  isLoadingAuth: boolean
}

export const AuthContext = createContext<IContextAuth>({
  login: (data: IUser) => null,
  logout: () => null,
  isAuth: false,
  isLoadingAuth: false
})
