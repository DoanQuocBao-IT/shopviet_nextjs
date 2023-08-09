import Link from 'next/link'
import React, { useState } from 'react'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { Ripple } from 'primereact/ripple'

import { classNames } from 'primereact/utils'
import { CSSTransition } from 'react-transition-group'

const Topbar = () => {
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
      id: 4,
      label: 'Product',
      icon: 'pi pi-fw pi-users',
      to: '/product',
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
        <CSSTransition
          classNames='layout-submenu-wrapper'
          timeout={{ enter: 1000, exit: 450 }}
          in={true}
        >
          <Link
            href={item.to || '/'}
            role='menuitem'
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
        </CSSTransition>
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
      <div className=''>
        <Link href='/'>
          <img
            src={`/layout/images/logo.png`}
            width='47.22px'
            height='35px'
            widt={'true'}
            alt='logo'
          />
        </Link>
      </div>
    )
  }
  const handleLogin = () => {}
  const handleRegister = () => {}
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
  return (
    <div>
      <Menubar
        model={processModels(items)}
        start={startMenu}
        end={endMenuGuest}
      />
    </div>
  )
}

export default Topbar
