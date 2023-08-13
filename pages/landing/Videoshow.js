import { Button } from 'primereact/button'
import React from 'react'

const Videoshow = () => {
  return (
    <div id='video-container'>
      <div id='title_item'>
        <p>Smart email campaign builder, made for Developers</p>
        <h1>Turn your visitor into profitable business</h1>
        <div id='video-button'>
          <div id='multi-color-border'>
            <Button label='Get more customers' severity='secondary' />
          </div>
          <div id='multi-color-border'>
            <Button label='Watch free demo' className='multi-color-border' />
          </div>
        </div>
        <div id='video-content'>
          <p>Get more customers</p>
          <p>Watch free demo</p>
        </div>
      </div>
      <div id='video-item'></div>
    </div>
  )
}

export default Videoshow
