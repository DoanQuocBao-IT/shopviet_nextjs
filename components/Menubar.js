import Link from 'next/link'
import { classNames } from 'primereact/utils'
import React, { useState } from 'react'

const Menubar = ({ menu }) => {
  const [focus, setFocus] = useState(0)
  console.log(focus)
  return (
    <div id='menu-icon-container'>
      {menu.map((item) => (
        <Link href={item.to} key={item.id} onFocus={() => setFocus(item.id)}>
          <div id='layout-menu-content'>
            <i
              title={item.label}
              className={`layout-menu-icon ${item.icon}`}
            ></i>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Menubar
