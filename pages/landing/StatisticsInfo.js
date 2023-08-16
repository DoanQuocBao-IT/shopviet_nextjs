import { Button } from 'primereact/button'
import React from 'react'

const StatisticsInfo = () => {
  return (
    <div id='product-container'>
      <div id='card-product'>
        <img src='https://picsum.photos/200/300' alt='product' />
      </div>
      <div id='title-container'>
        <div id='product-caption'>
          <div id='product-name'>
            Managing & selling digital products has never been easier
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur asdipiscing elit. In nunc
            nisl eu consectetur .Mi massage alementum odio eu viverrra amet
          </div>

          <div id='overview-product'>
            <Button label='Make your first sale ' icon="pi pi-arrow-right" iconPos="right" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsInfo
