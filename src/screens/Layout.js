import React from 'react'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from '../components/Error/ErrorBoundary'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'

const Layout = () => {
  return (
    <div className='m-0 p-0 box-border flex flex-col h-screen'>
      <Header />
      <main className='flex-1'>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
