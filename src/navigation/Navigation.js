import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import Layout from '../screens/Layout'
import RegFirm from '../screens/RegFirm'
import Register from '../screens/Register'
import LoginScreen from '../screens/LoginScreen'
import DashboardScreen from '../screens/DashboardScreen'
import FirmInfo from '../components/Dashboard/FirmInfo/FirmInfo'
import Info from '../components/Dashboard/FirmInfo/Info'
import UsersInfo from '../components/Dashboard/FirmInfo/UsersInfo'
import Announces from '../components/Dashboard/FirmInfo/Announces'
import Devices from '../components/Dashboard/FirmInfo/Devices'
import SalesDevices from '../components/Dashboard/FirmInfo/SalesDevices'
import MainContent from '../components/Dashboard/MainContent'
import Riders from '../components/Dashboard/FirmInfo/Riders'
import Locations from '../components/Dashboard/FirmInfo/Locations'
import Messages from '../components/Dashboard/FirmInfo/Messages'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import { fetchUserInfoByKey } from '../redux/Slice/user'
import { useSelector } from 'react-redux'

export const nav = {
  generalNav: [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/register',
      name: 'Register',
    },
    {
      path: '/reg-firm',
      name: 'Register firm',
    },
    {
      path: '/login',
      name: 'Login',
    },
  ],
  headerNav: [
    {
      path: '/',
      name: 'NEW EVENT MANAGEMENT',
    },
    {
      path: '/',
      name: 'DlA ZLECENIODAWCÓW',
    },
    {
      path: '/',
      name: 'BEZPIECZEŃSTWO',
    },
  ],
}

const Navigation = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userKey = localStorage.getItem('auth')
    userKey && dispatch(fetchUserInfoByKey(userKey))
  }, [dispatch])

  const { user } = useSelector((state) => state.user)
  return (
    <Routes>
      <Route path='' element={<Layout />}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reg-firm' element={<RegFirm />} />
        {user ? (
          <Route path='/dashboard' element={<DashboardScreen />}>
            <Route path='' element={<MainContent />} />
            <Route path='firm-info' element={<FirmInfo />} />
            <Route path='info' element={<Info />} />
            <Route path='users-info' element={<UsersInfo />} />
            <Route path='announces' element={<Announces />} />
            <Route path='devices' element={<Devices />} />
            <Route path='sales-devices' element={<SalesDevices />} />
            <Route path='riders' element={<Riders />} />
            <Route path='locations' element={<Locations />} />
            <Route path='messages' element={<Messages />} />
          </Route>
        ) : (
          <Route path='*' element={<ErrorPage />} />
        )}
      </Route>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default Navigation
