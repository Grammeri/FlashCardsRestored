import React from 'react'

import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

import Envelope from '../../assets/images/email-logo-png-us-4.png'

import styles from './CheckEmail.module.css'

export const CheckEmail = () => {
  return (
    <>
      <div className={styles.box}>
        <h1>Check Email</h1>
        <img style={{ height: '200px' }} alt={'envelope'} src={Envelope} />
        <h3>We&#39;ve sent an Email with instructions to your e-mail</h3>
        <Button variant="outlined">
          <NavLink to="/login" style={{ color: 'steelblue' }}>
            Back to login
          </NavLink>
        </Button>
      </div>
    </>
  )
}
