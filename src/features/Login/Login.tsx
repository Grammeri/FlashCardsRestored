import React from 'react'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { loginTC } from '../../reducers/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks/Hooks'

import styles from './Login.module.css'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const validationSchema = yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().min(6).max(15).required(),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
    })
    .required()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    /*    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 4) {
        errors.password = 'Must be more than 3 charachters'
      }

      return errors
    },*/

    onSubmit: values => {
      dispatch(loginTC(values))
      /* alert(JSON.stringify(values));*/
    },
  })

  if (isLoggedIn) {
    return <Navigate to="/Profile" />
  }

  return (
    <div>
      <Grid container justifyContent={'center'}>
        <Grid item alignItems={'stretch'} className={styles.rectangle}>
          <FormControl>
            <form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: 'red' }}>{formik.errors.email}</div>
                )}

                <TextField
                  type="password"
                  label="Password"
                  margin="normal"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                  <div style={{ color: 'red' }}>{formik.errors.password}</div>
                )}

                <FormControlLabel
                  style={{ color: 'steelblue', margin: '10px' }}
                  label={'Remember me'}
                  control={
                    <Checkbox
                      checked={formik.values.rememberMe}
                      {...formik.getFieldProps('rememberMe')}
                    />
                  }
                />

                <Button variant={'contained'} color={'primary'} style={{ margin: '5px' }}>
                  <NavLink to="/forgotPassword" style={{ color: 'white' }}>
                    FORGOT PASSWORD
                  </NavLink>
                </Button>

                <Button
                  style={{ margin: '5px' }}
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
                >
                  Login
                </Button>
                <div className={styles.haveAcc}>Don&apos;t have an account?</div>
                <div className={styles.sign}>
                  <NavLink to="/signUp" style={{ color: 'steelblue' }}>
                    Sign Up
                  </NavLink>
                </div>
                <h5 className={styles.advertisment}>I am created by Formik</h5>
              </FormGroup>
            </form>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}
