import React from 'react'
import Topbar from './Topbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Topbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
