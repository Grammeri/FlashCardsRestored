import * as React from 'react'
import { SyntheticEvent } from 'react'

import Typography from '@material-ui/core/Typography'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { setPackTC, sliderAC } from '../reducers/pack-reducer'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'

/*function valuetext(value: number) {
  return `${value}°C`
}*/

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([0, Infinity])

  const dispatch = useAppDispatch()
  const { queryParams } = useAppSelector(state => state.pack)
  const { min, max } = queryParams

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  const onChangeCommittedHandler = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      dispatch(sliderAC(newValue[0], newValue[1]))
      dispatch(setPackTC())
    }
  }

  return (
    <Box sx={{ width: 200 }}>
      <Typography style={{ marginLeft: '37px' }}>Number of Cards</Typography>
      <div style={{ display: 'flex' }}>
        <button style={{ height: '30px', width: '30px', color: 'steelblue' }}>{min}</button>
        <Slider
          style={{ marginLeft: '15px', marginRight: '15px' }}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          /* getAriaValueText={valuetext}*/
          color={'secondary'}
          onChangeCommitted={(e, value) => {
            onChangeCommittedHandler(e, value)
          }}
        />
        <button style={{ height: '30px', color: 'steelblue' }}>{max}</button>
      </div>
    </Box>
  )
}
