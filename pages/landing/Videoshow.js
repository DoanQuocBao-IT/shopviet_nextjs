import { Button } from 'primereact/button'
import React from 'react'

const Videoshow = () => {
  return (
    <div id='video-container'>
      <div id='title_item'>
        <p>Smart email campaign builder, made for Developers</p>
        <h1>Turn your visitor into profitable business</h1>
      </div>

      <div id='video-button'>
        <div id='multi-color-border'>
          <Button
            id='button-dark'
            label='Get more customers'
            severity='secondary'
            raised
          />
        </div>
        <div id='multi-color-border'>
          <Button
            id='button-white'
            icon='pi pi-video icon-large'
            label='Watch free demo'
            severity='secondary'
            text
            raised
          />
        </div>
      </div>
      <div id='video-content'>
        <p>60 Days free trial</p>
        <p>No credit card required</p>
      </div>
      <div id='video-item'>
        <div id='video'>
          <iframe
            width='560'
            height='315'
            src='https://www.youtube.com/embed/9HexU68Vd7c'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Videoshow
