import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import LogoutIcon from '@mui/icons-material/Logout'
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded'
import { NavLink } from 'react-router-dom'

import { EditMode } from '../../common/universalComponents/EditMode/EditMode'
import { UserPhoto } from '../../common/universalComponents/UserPhoto/UserPhoto'
import { logoutTC } from '../../reducers/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks/Hooks'
import { withLogin } from '../../utils/withLogin'

import classes from './Profile.module.css'

export const Profile = withLogin(() => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(state => state.auth.userData)

  const logoutHandler = () => {
    console.log('logouthandler')
    dispatch(logoutTC())
  }

  return (
    <div>
      <div className={classes.BackToPack}>
        <div style={{ display: 'flex', justifyContent: 'center' }} onClick={() => {}}>
          <ArrowBackIcon />
          <NavLink style={{ color: 'white' }} to={'/packTable'}>
            Back to packs List
          </NavLink>
        </div>
      </div>
      <div className={classes.rectangle}>
        <h1>Personal Information</h1>
        <div className={classes.avatarBox}>
          <UserPhoto variant="standard" />
          <PhotoCameraRoundedIcon
            style={{ color: 'steelblue' }}
            onClick={() => {}}
            className={classes.avatarCamera}
          />
        </div>
        <EditMode title={userData.name} />

        <div style={{ color: 'steelblue', marginBottom: '20px' }} className={classes.eMail}>
          {userData.email}
        </div>
        <div className={classes.logOutBtn} onClick={logoutHandler}>
          <LogoutIcon style={{ color: 'white', marginRight: '10px' }} />
          <span>LOG OUT</span>
        </div>
      </div>
    </div>
  )
})
