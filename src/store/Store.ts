import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppActionsType, appReducer } from '../reducers/app-reducer'
import { AuthActionsType, authReducer } from '../reducers/auth-reducer'
import { PackActionsType, packReducer } from '../reducers/pack-reducer'

let RootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  pack: packReducer,
})

//export type RootStateType = ReturnType<typeof RootReducer>

export let store = createStore(RootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>

export type ActionsType = AuthActionsType | AppActionsType | PackActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

//@ts-ignore
window.store = store
