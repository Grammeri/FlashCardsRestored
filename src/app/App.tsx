import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@material-ui/core'

import { Content } from '../common/layoutcomponents/Content'
import { Header } from '../common/layoutcomponents/Header'
import { Navigation } from '../common/layoutcomponents/Navigation'
import ErrorProcessing from '../common/universalComponents/ErrorProcessing/ErrorProcessing'
import { initializeAppTC } from '../reducers/app-reducer'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'

const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={'App'}>
      <div className={'header'}>
        <Header />
      </div>
      <div className={'content'}>
        <Content />
      </div>
      <div className={'nav'}>
        <Navigation />
      </div>
      <ErrorProcessing />
    </div>
  )
}

export default App
