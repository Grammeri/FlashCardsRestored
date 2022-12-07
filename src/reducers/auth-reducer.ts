import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI, LoginParamsType, LoginType, RegisterType } from '../api/app-api'
import { AppThunk } from '../store/Store'
import { handleServerNetworkError } from '../utils/errorUtils'

import {
  setAppErrorAC,
  SetAppErrorActionType,
  SetAppIsInitializedType,
  setAppStatusAC,
  SetAppStatusActionType,
} from './app-reducer'
import { setTotalCountActionType } from './pack-reducer'

type AuthStateType = {
  isLoggedIn: boolean
  isRegistered: boolean
  password: string
  info: null | string
  userData: LoginType
}

const initialState: AuthStateType = {
  isLoggedIn: false,
  isRegistered: false,
  password: '',
  info: '',
  userData: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    // количество колод

    created: '',
    updated: '',
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
  },
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'APP/SET-IS-REGISTERED':
      return { ...state, isRegistered: action.value }
    case 'APP/CREATE-NEW-PASSWORD':
      return { ...state, info: action.info }
    case 'USER-DATA':
      return { ...state, userData: action.data }
    case 'PROFILE-NAME-CHANGE':
      return { ...state, userData: { ...state.userData, name: action.name } }
    default:
      return state
  }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const)
export const setAppisRegisteredAC = (value: boolean) =>
  ({ type: 'APP/SET-IS-REGISTERED', value } as const)
export const CreateNewPasswordAC = (info: string) =>
  ({ type: 'APP/CREATE-NEW-PASSWORD', info } as const)
export const UserDataAC = (data: LoginType) => ({ type: 'USER-DATA', data } as const)
export const profileNameChangeAC = (name: string) =>
  ({ type: 'PROFILE-NAME-CHANGE', name } as const)

// thunks
export const loginTC =
  (data: LoginParamsType): AppThunk =>
  (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
      .login(data)
      .then(res => {
        dispatch(setIsLoggedInAC(true))
        dispatch(UserDataAC(res.data))
      })
      .catch((err: AxiosError) => {
        /*dispatch(setAppErrorAC(err.message))*/
        handleServerNetworkError(dispatch, err.message)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

export const logoutTC = (): AppThunk => (dispatch: Dispatch<AuthActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .logout()
    .then(res => {
      /*dispatch(setAppisInitialezedAC(false))*/
      dispatch(setIsLoggedInAC(false))
    })
    .catch((err: AxiosError) => {
      /*dispatch(setAppErrorAC(err.message))*/
      handleServerNetworkError(dispatch, err.message)
    })
    .finally(() => {
      dispatch(setAppStatusAC('idle'))
    })
}
export const registerTC =
  (payload: RegisterType): AppThunk =>
  (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
      .register(payload)
      .then(res => {
        /*  dispatch(setAppStatusAC('succeeded'))*/
        dispatch(setAppisRegisteredAC(true))
      })
      .catch((err: AxiosError) => {
        /* dispatch(setAppErrorAC(err.message))*/
        handleServerNetworkError(dispatch, err.message)
      })
      .finally(() => {
        dispatch(setAppisRegisteredAC(true))
        dispatch(setAppStatusAC('idle'))
      })
  }

export const forgotPassTC =
  (email: string): AppThunk =>
  (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    // dispatch(setAppisInitialezedAC(true))
    dispatch(setIsLoggedInAC(true))
    authAPI
      .forget({
        email,
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/createNewPassword/$token$'>
link</a>
</div>`,
      })

      .then(res => {
        /*  dispatch(setAppStatusAC('succeeded'))*/
        /* dispatch(setIsLoggedInAC(true))*/
        console.log(res.config.data.info) //откуда config? зачем это писать
      })
      .catch((err: AxiosError) => {
        /*dispatch(setAppErrorAC(err.message))*/
        handleServerNetworkError(dispatch, err.message)
      })
      .finally(() => {
        dispatch(setAppisRegisteredAC(true))
        dispatch(setAppStatusAC('idle'))
      })
  }

export const createNewPasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    /*dispatch(setAppisInitialezedAC(true))*/
    authAPI
      .newPass({ password, resetPasswordToken })
      .then(res => {
        /*  dispatconsole.log('thunk')ch(setAppStatusAC('succeeded'))*/
        dispatch(CreateNewPasswordAC('Your pass was successully changed'))
        /*dispatch(setIsLoggedInAC(true))*/
      })
      .catch((err: AxiosError) => {
        /*dispatch(setAppErrorAC(err.message))*/
        handleServerNetworkError(dispatch, err.message)
      })
      .finally(() => {
        dispatch(setAppisRegisteredAC(true))
        dispatch(setAppStatusAC('idle'))
      })
  }

export const profileNameChangeTC = // используем thunk, and AC

    (name: string): AppThunk =>
    (dispatch: Dispatch<AuthActionsType>) => {
      authAPI
        .update({ name })
        .then(res => {
          dispatch(setAppStatusAC('loading'))
          dispatch(profileNameChangeAC(name))
        })
        .catch((err: AxiosError) => {
          dispatch(setAppErrorAC(err.message))
          handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
          dispatch(setAppStatusAC('idle'))
        })
    }

// types
export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
export type setAppisRegisteredActionType = ReturnType<typeof setAppisRegisteredAC>
export type CreateNewPasswordActionType = ReturnType<typeof CreateNewPasswordAC>
export type UserDataActionType = ReturnType<typeof UserDataAC>
export type ProfileNameChangeActionType = ReturnType<typeof profileNameChangeAC>

export type AuthActionsType =
  | setIsLoggedInActionType
  | SetAppIsInitializedType
  | setAppisRegisteredActionType
  | CreateNewPasswordActionType
  | SetAppStatusActionType
  | SetAppErrorActionType
  | UserDataActionType
  | ProfileNameChangeActionType
  | setTotalCountActionType
