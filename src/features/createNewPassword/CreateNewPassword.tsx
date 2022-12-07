import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { createNewPasswordTC } from '../../reducers/auth-reducer'
import { useAppDispatch } from '../../store/hooks/Hooks'
import styles from '../SignUp/SignUp.module.css'

interface IFormInputs {
  password: string
  resetPasswordToken: string | undefined /*| undefined*/
}

const SignupSchema = yup
  .object()
  .shape({
    password: yup.string().min(6).max(15).required(),
  })
  .required()

export function CreateNewPassword() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { token } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(SignupSchema),
  })

  const onSubmit = ({ password }: { password: string }) => {
    if (token) {
      dispatch(createNewPasswordTC(password, token))
    }
  }

  navigate('/login')

  return (
    <form
      style={{ flexDirection: 'column', padding: '15px', justifyContent: 'start' }}
      className={styles.rectangle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 style={{ marginBottom: '30px', marginTop: '30px', color: 'steelblue' }}>
        Create new password
      </h1>
      <label style={{ marginBottom: '10px' }}>Password</label>
      <input type={'password'} placeholder={'password'} {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}
      <div style={{ width: '100%', marginTop: '15px' }}>
        <input type="submit" />
      </div>
    </form>
  )
}
