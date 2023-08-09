import React, { useState } from 'react'

export const LayoutContext = React.createContext()
export const LayoutProvider = ({ children }) => {
  const [layoutConfig, setLayoutConfig] = useState({
    ripple: false,
    inputStyle: 'outlined',
    // menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  })
  const [layoutState, setLayoutState] = useState({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: true,
    menuHoverActive: false,
  })
  return (
    <LayoutContext.Provider value={{ layoutConfig, layoutState }}>
      {children}
    </LayoutContext.Provider>
  )
}
