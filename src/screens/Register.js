import React from 'react'
import { ErrorBoundary } from '../components/Error/ErrorBoundary'
import InfoBlock from '../components/InfoBlock'
import RegisterForm from '../components/RegForm/RegisterForm'

const Register = () => {
  return (
    <ErrorBoundary>
      <div className='mt-16'>
        <InfoBlock title={'Register User'} />
        <RegisterForm />
      </div>
    </ErrorBoundary>
  )
}

export default Register
