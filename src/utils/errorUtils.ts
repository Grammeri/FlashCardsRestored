import { Dispatch } from 'redux'

import { setAppErrorAC, SetAppErrorActionType } from '../reducers/app-reducer'

export const handleServerNetworkError = (
  dispatch: Dispatch<SetAppErrorActionType>,
  message: string
) => {
  dispatch(setAppErrorAC(message))
}
