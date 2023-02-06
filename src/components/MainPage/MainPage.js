import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './MainPage.css'
import MainNavigation from './MainNavigation'
import MainChat from './MainChat'
import MainTable from './MainTable'
import { setChat } from '../../redux/Slice/tablo'
import { ErrorBoundary } from '../Error/ErrorBoundary'

const MainPage = () => {
  const dispatch = useDispatch()
  const { isChatOpen } = useSelector((state) => state.tablo)

  const closeChat = () => {
    dispatch(setChat(!isChatOpen))
  }

  return (
    <ErrorBoundary>
      <MainNavigation />
      <div className='row' style={{ margin: '20px 10px', padding: 0 }}>
        <div className={isChatOpen ? 'col-8' : 'col-12'}>
          <MainTable />
        </div>
        <div className={!isChatOpen ? 'd-none' : 'col-4'}>
          <div className='row title-blue' style={{ fontSize: 18 }}>
            <div className='arrow-right' onClick={closeChat}></div>
            Aktualności / konwersacje / pytania - Cross Rental
          </div>
          <MainChat />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default MainPage
