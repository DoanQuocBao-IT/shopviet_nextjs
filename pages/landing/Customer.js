import { Button } from 'primereact/button'
import React from 'react'

const Customer = () => {
  return (
    <div id='customer-container'>
      <div id='title_item'>
        <p>2,157 people have said how good Rareblocks</p>
        <h1>Our happy client say about us</h1>
      </div>

      <div id='customer-item'>
        <div id='customer'></div>
        <div id='image'>
          <div>
            <img id='feedback-image' src='https://picsum.photos/200/300' alt='customer' />
          </div>
          <div>
            <img id='feedback-image'  src='https://picsum.photos/200/300' alt='customer' />
          </div>
          <div>
            <img id='feedback-image'  src='https://picsum.photos/200/300' alt='customer' />
          </div>
        </div>
      </div>
      <div id='feedback-all'>
        <p>Check all 2,157 reviews</p>
      </div>
    </div>
  )
}

export default Customer
