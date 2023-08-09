import React from 'react'
import Topbar from './Topbar'
import Footer from './Footer'
import { LayoutContext } from './context/layoutcontext'

const Layout = ({ children }) => {
  const { layoutConfig, layoutState } = React.useContext(LayoutContext)
  
  return (
    <div className='layout'>
      <Topbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
