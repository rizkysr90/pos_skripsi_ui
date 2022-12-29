import React from 'react'
import { BottomNav } from '../components/BottomNav'
import { Navbar } from '../components/Navbar'
export const Home = () => {
  return (
    <div className='bg-primary-content min-h-screen'>
        <Navbar/>
        <BottomNav/>
    </div>
  )
}
