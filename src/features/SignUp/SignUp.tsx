import React, { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { registerTC } from '../../reducers/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks/Hooks'

import styles from './SignUp.module.css'

interface IFormInputs {
  email: string
  password: string
  confirmPassword: string
}

const SignupSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
  })
  .required()

export function SignUp() {
  const dispatch = useAppDispatch()
  const isRegistered = useAppSelector(state => state.auth.isRegistered)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignupSchema),
  })

  const onSubmit = (data: IFormInputs) => {
    /*alert(JSON.stringify(data))*/
    dispatch(registerTC(data))
  }

  useEffect(() => {
    if (isRegistered) {
      navigate('/login')
    }
  }, [isRegistered])

  return (
    <form className={styles.rectangle} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <h1 style={{ marginBottom: '30px', color: 'steelblue' }}>Sign Up</h1>
          <label className={styles.email}>Email</label>
        </div>
        <div style={{ marginBottom: '20px', color: 'red' }}>
          <input placeholder={'email'} {...register('email')} />
          {errors.email && 'Email is a required field'}
        </div>
        <div style={{ marginBottom: 10 }}>
          <div>
            <label>Password</label>
          </div>
          <div style={{ marginBottom: '20px', color: 'red' }}>
            <input type={'password'} placeholder={'password'} {...register('password')} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
        <div>
          <label>Confirm password</label>
        </div>
        <div style={{ marginBottom: '20px', color: 'red' }}>
          <input
            type={'password'}
            placeholder={'Confirm password'}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && 'Passwords should match'}
        </div>
        <input type="submit" />
        <h5 className={styles.advertisment}>I am created by react-hook-form and yup</h5>
      </div>
    </form>
  )
}
