import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import ErrorImg from '../../assets/images/Error404.jpg'
import { CreateNewPassword } from '../../features/createNewPassword/CreateNewPassword'
import { CheckEmail } from '../../features/forgotPassword/CheckEmail'
import { ForgotPassword } from '../../features/forgotPassword/ForgotPassword'
import { Login } from '../../features/Login/Login'
import { Profile } from '../../features/profile/Profile'
import { SignUp } from '../../features/SignUp/SignUp'
import { CardsTablePage } from '../../pages/CardsTablePage'
import { PackTablePage } from '../../pages/PackTablePage'
import { CardTable } from '../universalComponents/CardTable/CardTable'

type ContentPropsType = {}

export const Content = (props: ContentPropsType) => {
  return (
    <>
      <div className="content">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="404"
            element={<img style={{ display: 'flex', justifyContent: 'center' }} src={ErrorImg} />}
          />
          <Route path="/" element={<Navigate to={'profile'} />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="createNewPassword/:token" element={<CreateNewPassword />} />
          <Route path="checkEmail" element={<CheckEmail />} />
          <Route path="*" element={<Navigate to={'404'} />} />
          <Route path="packTable" element={<PackTablePage />} />
          <Route path="cardTable" element={<CardsTablePage />}>
            <Route path=":id" element={<CardTable />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
