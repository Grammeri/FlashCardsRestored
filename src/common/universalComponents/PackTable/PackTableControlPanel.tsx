import React, { useState } from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Button from '@mui/material/Button'

import {
  createNewPackTC,
  myPacksAC,
  searchPacksAC,
  setPackTC,
  setPageAC,
  sliderAC,
} from '../../../reducers/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/Hooks'
import RangeSlider from '../../Slider'

export const PackTableControlPanel = () => {
  const dispatch = useAppDispatch()
  const { _id } = useAppSelector(state => state.auth.userData)
  const { queryParams, cardPacksTotalCount, cardPacks, orderBy, sortOrder } = useAppSelector(
    state => state.pack
  )

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchPacksAC(event.currentTarget.value))
  }

  const myPackHandler = () => {
    dispatch(myPacksAC(_id))
  }
  const allPacks = () => {
    dispatch(myPacksAC(''))
  }

  const filterOffHandler = () => {
    dispatch(myPacksAC(''))
    dispatch(setPageAC(1))
    dispatch(sliderAC(0, Infinity))
    dispatch(setPackTC())
  }

  const createNewPack = () => {
    const cardsPack = {
      name: 'I am your new pack',
      deckCover: '',
      private: false,
    }

    dispatch(createNewPackTC({ cardsPack }))
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'bottom',
          justifyContent: 'space-between',
        }}
      >
        <input
          /* value={packName}*/
          type={'text'}
          onChange={searchHandler}
          placeholder={"Search, don't be shy!"}
          style={{
            width: '30%',
            borderRadius: '10px',
            backgroundColor: 'lightblue',
            color: 'white',
          }}
        />
        <Button
          size={'small'}
          onClick={myPackHandler}
          variant="outlined"
          style={
            queryParams.user_id === _id
              ? { color: 'steelblue', backgroundColor: 'orange' }
              : { color: 'steelblue', backgroundColor: 'lightblue' }
          }
        >
          My Packs
        </Button>
        <Button
          size={'small'}
          onClick={allPacks}
          variant="contained"
          style={
            queryParams.user_id === _id
              ? {
                  background: 'lightblue',
                  color: 'steelblue',
                  marginRight: '20px',
                }
              : {
                  background: 'orange',
                  color: 'steelblue',
                  marginRight: '20px',
                }
          }
        >
          All Packs
        </Button>
        <RangeSlider />
        <FilterAltOffIcon fontSize={'large'} onClick={filterOffHandler} />
      </div>

      <button
        onClick={createNewPack}
        style={{
          width: '100%',
          height: '30px',
          color: 'steelblue',
          border: '3px solid steelblue',
          borderRadius: '10px',
          backgroundColor: 'lightblue',
        }}
      >
        Click Me to Create a New Pack
      </button>
    </div>
  )
}
