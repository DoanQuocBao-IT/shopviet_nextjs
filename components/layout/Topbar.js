import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import { Ripple } from 'primereact/ripple'
import { InputText } from 'primereact/inputtext'
import { useRouter } from 'next/router'
import { SlideMenu } from 'primereact/slidemenu'
import { Badge } from 'primereact/badge'
import { Avatar } from 'primereact/avatar'
import { TabMenu } from 'primereact/tabmenu'

import Search from '../Search'
import Menubar from '../Menubar'
import store from '../../store/store'
import { logout } from '../../store/slices/authSlice'

const Topbar = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated
  const avatarImage = store.getState().auth.image
  const avatarLabel = store.getState().auth.firstname
    ? store.getState().auth.firstname[0].toUpperCase()
    : 'B'

  const router = useRouter()
  const [windowWidth, setWindowWidth] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    if (router.pathname === '/') {
      setActiveIndex(0)
    } else if (router.pathname.startsWith('/homepage')) {
      setActiveIndex(1)
    } else if (router.pathname.startsWith('/flashsale')) {
      setActiveIndex(2)
    } else if (router.pathname.startsWith('/product')) {
      setActiveIndex(3)
    } else if (router.pathname.startsWith('/category')) {
      setActiveIndex(4)
    } else if (router.pathname.startsWith('/dashboard')) {
      setActiveIndex(5)
    } else if (router.pathname === '/login') {
      setActiveIndex(6)
    } else if (router.pathname === '/register') {
      setActiveIndex(7)
    } else {
      setActiveIndex(8)
    }
  }, [router.pathname])
  const item = (model) => {
    model.map((item, i) => {
      let menuitem = {
        id: item.id,
        label: windowWidth < 1366 ? null : item.label,
        icon: item.icon,
        command: item.command,
        to: item.to,
      }
      model[i] = menuitem
    })
    return model
  }
  const menuHeader = useRef(null)
  const end_items = [
    {
      label: 'Trang cá nhân',
      icon: 'pi pi-fw pi-user',
      command: () => handleClick('/user/profile'),
    },
    {
      label: 'Thay đổi mật khẩu',
      icon: 'pi pi-fw pi-key',
      command: () => handleClick('/user/profile/setting?connect=1'),
    },
    {
      label: 'Kết nối ứng dụng',
      icon: 'pi pi-fw pi-link',
      command: () => handleClick('/user/profile/setting?connect=2'),
    },
    {
      label: 'Quản lí câu lạc bộ',
      icon: 'pi pi-fw pi-users',
      items: [
        {
          label: 'Tạo mới câu lạc bộ',
          icon: 'pi pi-fw pi-plus',
          command: () => handleClick('/clubs/club-management'),
        },
        {
          label: 'Câu lạc bộ của tôi',
          icon: 'pi pi-fw pi-users',
          command: () => handleClick('/clubs/club-management'),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Đăng xuất',
      icon: 'pi pi-fw pi-power-off',
      command: () => handleClickLogout(),
    },
  ]
  const handleClickLogout = () => {
    store.dispatch(logout())
    router.push('/signin')
  }
  const handleClick = (url) => {
    router.push(url)
  }

  const menu = [
    {
      id: 1,
      label: ' Homepage',
      icon: 'fas fa-home',
      to: '/',
      command: () => handleClick('/'),
    },
    {
      id: 2,
      label: 'Flash Sale',
      icon: 'fas fa-bolt',
      to: '/flashsale',
      command: () => handleClick('/flashsale'),
    },
    {
      id: 3,
      label: 'Product',
      icon: 'fas fa-home',
      to: '/product',
      command: () => handleClick('/product'),
    },
    {
      id: 4,
      label: 'Category',
      icon: 'fas fa-home',
      to: '/landing',
      command: () => handleClick('/category'),
    },
  ]

  return (
    <div id='centered-content'>
      <div id='start-menu-container'>
        <div id='logo-container'>
          <Link href='/'>
            <img src={`/layout/images/logo.png`} alt='' />
          </Link>
        </div>
        <Search />
      </div>
      {windowWidth > 500 ? (
        <div id='menu-container'>
          <TabMenu
            id='menubar-topbar'
            model={item(menu)}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          />
        </div>
      ) : (
        <div id='menu-container'>
          <SlideMenu
            ref={menuHeader}
            model={menu}
            popup
            viewportHeight={370}
            menuWidth={250}
          ></SlideMenu>

          <Button
            type='button'
            icon='pi pi-bars icon-large'
            severity='secondary'
            raised
            label='Menu'
            onClick={(event) => menuHeader.current.toggle(event)}
          ></Button>
        </div>
      )}
      {/* <div id='menu-container'>
        <Menubar menu={menu} />
      </div> */}
      {!isAuthenticated ? (
        <div id='end-menu-container'>
          <Link href='/signin'>
            <Button
              id={
                activeIndex == 6
                  ? 'topbar-button-login-active'
                  : 'topbar-button-login'
              }
              type='button'
              label='Sign in'
              severity='warning'
              raised
              onClick={() => {
                setActiveIndex(6)
              }}
            />
          </Link>
          <Link href='/signup'>
            <Button
              id={
                activeIndex == 7
                  ? 'topbar-button-login-active'
                  : 'topbar-button-login'
              }
              type='button'
              label='Sign up'
              severity='warning'
              outlined
              onClick={() => {
                setActiveIndex(7)
              }}
            />
          </Link>
        </div>
      ) : (
        <div id='end-menu-container'>
          <i
            className='fas fa-cart-plus'
            style={{
              fontSize: '2rem',
              paddingTop: '0.5rem',
              width: '3rem',
              height: '3rem',
              textAlign: 'center',
              backgroundColor: '#FFE49E',
              borderRadius: '50%',
              color: '#000000',
            }}
          >
            <Badge value='1'></Badge>
          </i>
          <Link href='/user/profile'>
            <Avatar
              style={{ border: '1px solid #ffffff' }}
              size='large'
              shape='circle'
              label={!avatarImage ? avatarLabel : null}
              image={avatarImage}
            />
          </Link>
          <div>
            <SlideMenu
              ref={menu}
              model={end_items}
              popup
              viewportHeight={284}
              menuWidth={250}
            ></SlideMenu>

            <i
              // down icon
              className='fas fa-chevron-down'
              title='Settings menu'
              style={{
                fontSize: '1rem',
                textAlign: 'center',
                backgroundColor: '#FFE49E',
                borderRadius: '50%',
              }}
              onClick={(event) => menu.current.toggle(event)}
            ></i>
          </div>
        </div>
      )}
      {/*    
      <div id='end-menu-container'></div>
      <Menubar
        model={processModels(items)}
        start={startMenu}
        end={endMenuGuest}
      /> */}
    </div>
  )
}

export default Topbar
