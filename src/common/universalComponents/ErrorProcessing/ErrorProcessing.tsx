import * as React from 'react'

import MuiAlert, { AlertProps } from '@material-ui/core/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import { NullableType, setAppErrorAC } from '../../../reducers/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/Hooks'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function ErrorProcessing() {
  const error = useAppSelector<NullableType<string>>(state => state.app.error)
  const dispatch = useAppDispatch()

  /*  const [open, setOpen] = useState(true)*/

  /*  const handleClick = () => {
    setOpen(true)
  }*/

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    /*   setOpen(false)*/
    dispatch(setAppErrorAC(null))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
