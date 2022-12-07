import axios, { AxiosResponse, ResponseType } from 'axios'

import { instanceHeroku, instanceLocal } from './instance-api'

export const authAPI = {
  login(payload: LoginParamsType) {
    return instanceLocal.post<LoginType>('/auth/login', payload)
  },
  authMe() {
    return instanceLocal.post<LoginType>('auth/me')
  },
  logout() {
    return instanceLocal.delete<ResponseErrorType>('auth/me')
  },
  register(payload: RegisterType) {
    return instanceLocal.post<ResponseErrorType>('auth/register', payload)
  },
  update(payload: UpdateType) {
    return instanceLocal.put<ResponseErrorType>('auth/me', payload)
  },
  forget(payload: ForgetType) {
    return instanceHeroku.post<ResponseErrorType>('auth/forgot', payload, {
      withCredentials: true,
    })
  },
  newPass(payload: NewPassType) {
    return instanceLocal.post<ResponseErrorType>('auth/set-new-password', payload)
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterType = {
  email: string
  password: string
}

export type UpdateType = {
  name: string
  avatar?: string
}

export type ForgetType = {
  email: string
  message: string
}

export type NewPassType = {
  password: string
  resetPasswordToken: string
}

export type LoginType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  // количество колод

  created: string
  updated: string
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}

export type ResponseErrorType = {
  error?: string
}
