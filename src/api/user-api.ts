import { AxiosResponse } from 'axios'

import { LoginType, UpdateType } from './app-api'
import { instanceLocal } from './instance-api'

export const userAPI = {
  user(userData: LoginType) {
    return instanceLocal.post<UpdateType, AxiosResponse<LoginType>>('/auth/login', userData)
  },
}
