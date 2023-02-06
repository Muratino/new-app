import React from 'react'
import '../assets/loader.css'

export default function Loader() {
  return (
    <div className='absolute top-1/2 left-1/2'>
      <div className='spinner-container'>
        <div className='loading-spinner'></div>
      </div>
    </div>
  )
}
