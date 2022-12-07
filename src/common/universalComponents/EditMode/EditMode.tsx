import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react'

import Button from '@material-ui/core/Button'
import EditIcon from '@mui/icons-material/Edit'

import classes from '../../../features/profile/Profile.module.css'
import { profileNameChangeTC } from '../../../reducers/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/Hooks'

type EditModePropsType = {
  title: string
}

export const EditMode = (props: EditModePropsType) => {
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(props.title)

  const dispatch = useAppDispatch()
  const userData = useAppSelector(state => state.auth.userData)

  const onPencilClickHandler = () => {
    setEdit(!edit)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const saveBtnHandler = () => {
    onPencilClickHandler()
    dispatch(profileNameChangeTC(title))
  }

  /*  const onKeyPressHandler = (event: KeyboardEventHandler<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveBtnHandler()
    }
  }*/

  return edit ? (
    <div>
      <div style={{ color: 'steelblue' }}>You can change nickname</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        <input value={title} onChange={onChangeHandler} autoFocus />
        <Button
          style={{ backgroundColor: 'steelblue' }}
          onClick={saveBtnHandler}
          variant="contained"
          size="medium"
        >
          Save
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <span>
        <div style={{ display: 'flex' }}>
          <div
            style={{ color: 'steelblue', marginBottom: '20px', marginRight: '10px' }}
            className={classes.nickName}
          >
            {userData.name}
          </div>
          <EditIcon style={{ backgroundColor: 'steelblue' }} onClick={onPencilClickHandler} />
        </div>
      </span>
    </div>
  )
}
