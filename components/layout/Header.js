import React from 'react'
import Link from 'next/link'

const Header = ({value}) => {
  return (
    <div id='header-wrapper'>
        <Link href='/'>
          <img
            src={`/layout/images/logo.png`}
            width='auto'
            height='50px'
            widt={'true'}
            alt='logo'
          />
        </Link>
        <span id='text-header'>
          {value}
        </span>
      </div>
  )
}

export default Header