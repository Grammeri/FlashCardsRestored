import * as React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { RequestStatusType } from '../../reducers/app-reducer'
import { logoutTC } from '../../reducers/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks/Hooks'
import { UserPhoto } from '../universalComponents/UserPhoto/UserPhoto'
import '../../app/App.css'

export const Header = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

  const logoutHandler = () => {
    console.log('logouthandler')
    dispatch(logoutTC())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IT INCUBATOR
          </Typography>
          <UserPhoto variant="small" />
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress />}
    </Box>
  )
}
