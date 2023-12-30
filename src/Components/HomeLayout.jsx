import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function HomeLayout() {
  return (
    <div>
      <Header/>
      <div className="content">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default HomeLayout
