import React from 'react'
import { useSelector } from 'react-redux'
import InfoBlock from '../components/InfoBlock'
import Loader from '../components/Loader'
import { userProcess } from '../redux/Slice/user'
import MainPage from '../components/MainPage/MainPage'
import { ErrorBoundary } from '../components/Error/ErrorBoundary'

const HomeScreen = () => {
  const { process } = useSelector((state) => state.user)

  const loading = process === userProcess.LOADING ? <Loader /> : null
  return (
    <ErrorBoundary>
      <div className='mt-16'>
        {loading}
        <InfoBlock
          title={'UZUPEŁNIJ DANE,ŻEBYŚMY MOGLI DOPASOWAĆ DLA CIEBIE OGŁOSZENIA'}
        />
        <MainPage />
      </div>
    </ErrorBoundary>
  )
}

export default HomeScreen
