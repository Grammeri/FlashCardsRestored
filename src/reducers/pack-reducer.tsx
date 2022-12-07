import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { CreateNewPackType, packsAPI, PackType, ParamsType } from '../api/packs-api'
import { AppThunk, RootState } from '../store/Store'
import { handleServerNetworkError } from '../utils/errorUtils'

import {
  SetAppErrorActionType,
  SetAppIsInitializedType,
  setAppStatusAC,
  SetAppStatusActionType,
} from './app-reducer'
import {
  CreateNewPasswordActionType,
  ProfileNameChangeActionType,
  setAppisRegisteredActionType,
  setIsLoggedInActionType,
  UserDataActionType,
} from './auth-reducer'

export type Order = 'asc' | 'desc'

type InitialStateType = {
  cardPacks: PackType[]
  queryParams: ParamsType
  cardPacksTotalCount: number
  orderBy: string
  sortOrder: Order
  page: number
}

const initialState: InitialStateType = {
  page: 1,
  cardPacksTotalCount: 0,
  cardPacks: [],
  orderBy: 'updated',
  sortOrder: 'asc',
  queryParams: {
    packName: '',
    min: 0,
    max: Infinity,
    sortPacks: '0updated',
    page: 1,
    pageCount: 5,
    user_id: '',
    block: false,
  },
}

type InitialPackStateType = typeof initialState

export const packReducer = (
  state: InitialPackStateType = initialState,
  action: PackActionsType
): InitialPackStateType => {
  switch (action.type) {
    case 'pack/SET-PACK-DATA':
      return { ...state, cardPacks: action.data }
    case 'pack/SET-PAGE-PAGINATOR':
      return { ...state, queryParams: { ...state.queryParams, page: action.page } }
    case 'pack/SET-ROWS-PER-PAGE-PAGINATOR':
      return { ...state, queryParams: { ...state.queryParams, pageCount: action.pageCount } }
    case 'pack/SET-PAGE-TOTAL-COUNT-PAGINATOR':
      return { ...state, cardPacksTotalCount: action.cardPacksTotalCount }
    case 'pack/SET-ASC-DES-PAGINATOR':
      return {
        ...state,
        orderBy: action.orderBy,
        sortOrder: action.sortOrder,
        queryParams: {
          ...state.queryParams,
          sortPacks: `${action.sortOrder === 'asc' ? 1 : 0}${action.orderBy}`,
        },
      }
    case 'pack/SEARCH-PACKS-BY-NAME':
      return { ...state, queryParams: { ...state.queryParams, packName: action.search } }
    case 'pack/MY-PACKS':
      return { ...state, queryParams: { ...state.queryParams, user_id: action.id } }
    case 'pack/SLIDER':
      return { ...state, queryParams: { ...state.queryParams, min: action.min, max: action.max } }

    default:
      return state
  }
}

//action creators
export const setPackDataAC = (data: PackType[]) => ({ type: 'pack/SET-PACK-DATA', data } as const)
export const setPageAC = (page: number) => ({ type: 'pack/SET-PAGE-PAGINATOR', page } as const)
export const setRowsPerPageAC = (pageCount: number) =>
  ({ type: 'pack/SET-ROWS-PER-PAGE-PAGINATOR', pageCount } as const)
export const setTotalCountAC = (cardPacksTotalCount: number) =>
  ({ type: 'pack/SET-PAGE-TOTAL-COUNT-PAGINATOR', cardPacksTotalCount } as const)
export const setAscDesAC = (orderBy: string, sortOrder: Order) => {
  return { type: 'pack/SET-ASC-DES-PAGINATOR', orderBy, sortOrder } as const
}
export const searchPacksAC = (search: string) =>
  ({ type: 'pack/SEARCH-PACKS-BY-NAME', search } as const)
export const myPacksAC = (id: string) => ({ type: 'pack/MY-PACKS', id } as const)
export const sliderAC = (min: number, max: number) => ({ type: 'pack/SLIDER', min, max } as const)

// thunks
export const setPackTC =
  (): AppThunk => (dispatch: Dispatch<PackActionsType>, getState: () => RootState) => {
    dispatch(setAppStatusAC('loading'))
    const params = getState().pack.queryParams

    packsAPI
      .getPacks(params)
      .then(res => {
        dispatch(setPackDataAC(res.data.cardPacks))
        dispatch(setTotalCountAC(res.data.cardPacksTotalCount))
      })
      .catch((err: AxiosError) => {
        /*dispatch(setAppErrorAC(err.message))*/
        handleServerNetworkError(dispatch, err.message)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

export const updatePackTC =
  (id: string, name: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))

    packsAPI
      .updatePack(id, name)
      .then(res => {
        dispatch(setPackTC())
      })
      .catch((err: AxiosError) => {
        /*dispatch(setAppErrorAC(err.message))*/
        handleServerNetworkError(dispatch, err.message)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

export const createNewPackTC =
  (cardsPack: CreateNewPackType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))

    packsAPI
      .createNewPack(cardsPack)
      .then(res => {
        dispatch(setPackTC())
      })
      .catch((err: AxiosError) => {
        /*dispatch(setAppErrorAC(err.message))*/
        handleServerNetworkError(dispatch, err.message)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

export const deletePackTC =
  (id: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))

    packsAPI
      .deletePack(id)
      .then(res => {
        dispatch(setPackTC())
      })
      .catch((err: AxiosError) => {
        /*dispatch(setAppErrorAC(err.message))*/
        handleServerNetworkError(dispatch, err.message)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

// types
export type setPackDataActionType = ReturnType<typeof setPackDataAC>

export type setPageActionType = ReturnType<typeof setPageAC>
export type setRowsPerPageActionType = ReturnType<typeof setRowsPerPageAC>
export type setTotalCountActionType = ReturnType<typeof setTotalCountAC>
export type setAscDesActionType = ReturnType<typeof setAscDesAC>
export type searchPacksActionType = ReturnType<typeof searchPacksAC>
export type myPacksActionType = ReturnType<typeof myPacksAC>
export type sliderActionType = ReturnType<typeof sliderAC>

export type PackActionsType =
  | setPackDataActionType
  | setIsLoggedInActionType
  | SetAppIsInitializedType
  | setAppisRegisteredActionType
  | CreateNewPasswordActionType
  | SetAppStatusActionType
  | SetAppErrorActionType
  | UserDataActionType
  | ProfileNameChangeActionType
  | setPageActionType
  | setRowsPerPageActionType
  | setTotalCountActionType
  | setAscDesActionType
  | searchPacksActionType
  | myPacksActionType
  | sliderActionType
