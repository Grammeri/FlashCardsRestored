import React from 'react'

import classes from './UserPhoto.module.css'

type VariantType = 'standard' | 'small'

export type UserPhotoPropsType = {
  variant: VariantType
}

export const UserPhoto = (props: UserPhotoPropsType) => {
  return <div className={`${classes.container} ${classes[props.variant]} ${classes.photoBox}`} />
}

/*export const UserPhoto = (props: UserPhotoPropsType) => {
  const userPhotoClassName = `${classes.photoBox} ${
    props.variant === classes.standard ? classes.standard : classes.small
  }`

  return <div className={userPhotoClassName}></div>
}*/
