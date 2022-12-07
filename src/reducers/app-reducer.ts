/*import {setIsLoggedInAC} from "../features/Login/auth-reducer.ts";
import {authAPI} from "../api/todolists-api";*/
import axios, { AxiosError } from 'axios'

import { authAPI } from '../api/app-api'
import { AppThunk } from '../store/Store'

import {
  CreateNewPasswordActionType,
  setAppisRegisteredActionType,
  setIsLoggedInAC,
  setIsLoggedInActionType,
  UserDataAC,
  UserDataActionType,
} from './auth-reducer'
import { setPageActionType, setTotalCountActionType } from './pack-reducer'

export type NullableType<T> = null | T

const initialState: InitialStateType = {
  status: 'idle' as RequestStatusType,
  error: null as NullableType<string>, //"Error occured!!! as NullableType<string>
  isInitialized: false,
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null
  isInitialized: boolean
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    default:
      return { ...state }
  }
}

export const setAppErrorAC = (error: NullableType<string>) =>
  ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)
export const setAppisInitialezedAC = (isInitialized: boolean) =>
  ({ type: 'APP/SET-IS-INITIALIZED', isInitialized } as const)

/*export const initializeAppTC = (): AppThunk => (dispatch: Dispatch<ActionsType>) => {
  authAPI
    .authMe()
    .then(res => {
      dispatch(setAppStatusAC('loading'))
      dispatch(setIsLoggedInAC(true))
    })
    .catch((err: AxiosError) => {
      dispatch(setAppErrorAC(err.message))
      handleServerNetworkError(dispatch, err.message)
    })
    .finally(() => {
      dispatch(setAppisInitialezedAC(true))
      dispatch(setAppStatusAC('idle'))
    })
}*/
//not functional
export const initializeAppTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    let res = await authAPI.authMe()

    dispatch(setIsLoggedInAC(true))
    dispatch(setAppisInitialezedAC(true))
    dispatch(UserDataAC(res.data))
  } catch (e) {
    dispatch(setAppStatusAC('idle'))
    const err = e as Error | AxiosError

    if (axios.isAxiosError(err)) {
      const error = err.response?.data
        ? (err.response.data as { error: string }).error
        : err.message

      dispatch(setAppErrorAC(error))
    } else {
      dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
  } finally {
    dispatch(setAppisInitialezedAC(true))
    dispatch(setAppStatusAC('idle'))
  }
}

//types
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializedType = ReturnType<typeof setAppisInitialezedAC>

export type AppActionsType =
  | setIsLoggedInActionType
  | SetAppIsInitializedType
  | setAppisRegisteredActionType
  | CreateNewPasswordActionType
  | SetAppStatusActionType
  | SetAppErrorActionType
  | UserDataActionType
  | setPageActionType
  | setTotalCountActionType
