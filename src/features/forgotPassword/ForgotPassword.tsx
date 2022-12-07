import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { forgotPassTC } from '../../reducers/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks/Hooks'
import styles from '../SignUp/SignUp.module.css'

interface IFormInputs {
  email: string
  password: string
  confirmPassword: string
}

const SignupSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    /*password: yup.string().min(6).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),*/
  })
  .required()

export function ForgotPassword() {
  const dispatch = useAppDispatch()
  /* const isRegistered = useAppSelector(state => state.auth.isRegistered)*/
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignupSchema),
  })

  const onSubmit = (data: IFormInputs) => {
    /* alert(JSON.stringify(data))*/
    dispatch(forgotPassTC(data.email)) // могу ли передавать всю data?
    navigate('/checkEmail')
  }

  return (
    <form
      style={{ alignItems: 'start' }}
      className={styles.rectangle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 style={{ marginBottom: '30px', marginTop: '30px', color: 'steelblue' }}>
          Forgot your password?
        </h1>
        <div>
          <label className={styles.email}>Email</label>
        </div>
        <div style={{ marginBottom: '20px', color: 'red' }}>
          <input placeholder={'email'} {...register('email')} />
          {errors.email && 'Email is a required field'}
        </div>
        <input type="submit" />
      </div>
    </form>
  )
}
