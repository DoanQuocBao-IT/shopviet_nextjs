import Link from 'next/link'
import React, { useState } from 'react'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { Ripple } from 'primereact/ripple'
import { InputText } from 'primereact/inputtext'
import { useRouter } from 'next/router'

import { classNames } from 'primereact/utils'
import Header from './Header'

const Topbar = () => {
  const [isActive, setIsActive] = useState('/')
  const [menuActive, setMenuActive] = useState(false)
  const [menuActiveMobile, setMenuActiveMobile] = useState(false)
  const router = useRouter()
  const isSignInPage = router.pathname === '/signin'
  const isSignUpPage = router.pathname === '/signup'

  const items = [
    {
      id: 1,
      label: ' Home',
      icon: 'pi pi-fw pi-home',
      to: '/',
    },

    {
      id: 2,
      label: 'Category',
      icon: 'pi pi-fw pi-star',
      to: '/category',
    },
    {
      id: 3,
      label: 'Brand',
      icon: 'pi pi-bookmark',
      to: '/brand',
    },
    {
      id: 5,
      icon: 'pi pi-fw pi-shopping-bag',
      to: '/cart',
    },
  ]
  const processModels = (model) => {
    const menuItemTemplate = (item) => (
      <React.Fragment>
        <div
          classNames='layout-submenu-wrapper'
          timeout={{ enter: 1000, exit: 450 }}
          in={true}
        >
          <Link
            href={item.to || '/'}
            className='p-menuitem-link'
            // style={
            //   item.to === isActive
            //     ? { color: 'blue', fontWeight: 'bold' }
            //     : null
            // }
            // onClick={() => setIsActive(item.to)}
          >
            <i className={classNames('layout-menuitem-icon', item.icon)}></i>
            <span className='layout-menuitem-text'>{item.label}</span>
          </Link>
        </div>
        <Ripple />
      </React.Fragment>
    )
    model.forEach((item, i) => {
      if (item.items) {
        processModels(item.items)
      } else {
        let menuitem = {
          id: item.id,
          label: item.label,
          icon: item.icon,
          command: item.command,
          style: item.style,
          to: item.to,
          template: menuItemTemplate,
        }
        model[i] = menuitem
      }
    })
    return model
  }
  const startMenu = () => {
    return (
      <div className='menu-search-wrapper'>
        <Link href='/'>
          <img
            src={`/layout/images/logo.png`}
            width='auto'
            height='50px'
            widt={'true'}
            alt='logo'
          />
        </Link>
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText placeholder='Search' id='custom-search' />
        </span>
      </div>
    )
  }
  const handleLogin = () => {
    router.push('/signin')
  }
  const handleRegister = () => {
    router.push('/signup')
  }
  const endMenuGuest = () => (
    <React.Fragment>
      <Button
        label='Đăng nhập'
        onClick={handleLogin}
        severity='info'
        className='p-button-rounded'
      />
      <Button
        label='Đăng ký'
        severity='info'
        style={{ margin: '0 20px' }}
        icon='pi pi-user-plus'
        className='p-button-rounded'
        onClick={handleRegister}
      />
    </React.Fragment>
  )
  if (isSignInPage) {
    return <Header value='Đăng nhập' />
  }
  if (isSignUpPage) {
    return <Header value='Đăng ký' />
  }
  return (
    <div className='centered-content'>
      <Menubar
        model={processModels(items)}
        start={startMenu}
        end={endMenuGuest}
      />
    </div>
  )
}

export default Topbar
