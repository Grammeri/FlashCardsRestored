import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../store/hooks/Hooks'

type ReactComponent = () => JSX.Element

export const withLogin = (Component: ReactComponent): ReactComponent => {
  return () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    return isLoggedIn ? <Component /> : <Navigate to={'/login'} />
  }
}
