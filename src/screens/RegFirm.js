import React from 'react'
import { ErrorBoundary } from '../components/Error/ErrorBoundary'
import InfoBlock from '../components/InfoBlock'
import RegisterFirmForm from '../components/RegForm/RegisterFirmForm'

const HomeScreen = () => {
  return (
    <ErrorBoundary>
      <div className='mt-16'>
        <InfoBlock title={'Register firm'} />
        <RegisterFirmForm />
      </div>
    </ErrorBoundary>
  )
}

export default HomeScreen
