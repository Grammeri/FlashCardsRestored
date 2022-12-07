import React from 'react'

import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

import styles from './Navigation.module.css'

export const Navigation = () => {
  return (
    <div className={styles.nav}>
      <Button size="small" variant="contained" style={{ backgroundColor: 'white', margin: '1px' }}>
        <NavLink
          to="/login"
          style={params => {
            return { color: params.isActive ? 'red' : 'steelblue' }
          }}
        >
          Login
        </NavLink>
      </Button>

      <Button size="small" variant="contained" style={{ backgroundColor: 'white', margin: '1px' }}>
        <NavLink
          to="/signUp"
          style={params => {
            return { color: params.isActive ? 'red' : 'steelblue' }
          }}
        >
          SignUp
        </NavLink>
      </Button>

      <Button size="small" variant="contained" style={{ backgroundColor: 'white', margin: '1px' }}>
        <NavLink
          to="/profile"
          style={params => {
            return { color: params.isActive ? 'red' : 'steelblue' }
          }}
        >
          Profile
        </NavLink>
      </Button>

      <Button size="small" variant="contained" style={{ backgroundColor: 'white', margin: '1px' }}>
        <NavLink
          to="/404"
          style={params => {
            return { color: params.isActive ? 'red' : 'steelblue' }
          }}
        >
          Error404
        </NavLink>
      </Button>

      <Button size="small" variant="contained" style={{ backgroundColor: 'white', margin: '1px' }}>
        <NavLink
          to="/forgotPassword"
          style={params => {
            return { color: params.isActive ? 'red' : 'steelblue' }
          }}
        >
          Forgot Password
        </NavLink>
      </Button>

      <Button size="small" variant="contained" style={{ backgroundColor: 'white', margin: '1px' }}>
        <NavLink
          to="/createNewPassword/1"
          style={params => {
            return { color: params.isActive ? 'red' : 'steelblue' }
          }}
        >
          Create New Password
        </NavLink>
      </Button>
    </div>
  )
}
