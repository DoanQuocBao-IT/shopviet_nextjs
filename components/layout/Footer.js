import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    //add social media icons Link to social media

    <div id='footer' className='centered-content'>
      <div>
        <h3>ShopViet</h3>
        <p>
          ShopViet is a marketplace for Vietnamese products. We connect
          Vietnamese sellers with customers all over the world. 
          We are a team of passionate people who want to bring Vietnamese products to the world.

        </p>
        <div id='social-media-icons'>
          <a
            href='https://www.facebook.com/'
            className='pi pi-facebook'
            target='_blank'
            rel='noopener noreferrer'
          ></a>
          <a
            href='https://www.instagram.com/'
            className='pi pi-instagram'
            target='_blank'
            rel='noopener noreferrer'
          ></a>
          <a
            href='https://twitter.com/'
            className='pi pi-twitter'
            target='_blank'
            rel='noopener noreferrer'
          ></a>
          <a
            href='https://www.youtube.com/channel/UC9JUJQx8XQXZG3t5QXq2Y0Q'
            className='pi pi-youtube'
            target='_blank'
            rel='noopener noreferrer'
          ></a>
        </div>
      </div>
      <div>
        <h3>Company</h3>
        <p>About</p>
        <p>Features</p>
        <p>Works</p>
        <p>Career</p>
      </div>
      <div>
        <h3>Help</h3>
        <p>Customer Support</p>
        <p>Delivery Detail</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
      </div>
      <div>
        <h3>Resources</h3>
        <p>Blog</p>
        <p>FAQs</p>
        <p>How It Works</p>
        <p>ShopViet</p>
      </div>
    </div>
  )
}

export default Footer
