import Link from 'next/link'
import { Button } from 'primereact/button'
import React from 'react'

const StatisticsInfo = () => {
  return (
    <div id='statistic-container'>
      <div id='card-statistic'>
        <div id='multi-color-border-statistic'>
          <img src='https://picsum.photos/200/300' alt='statistic' />
        </div>
      </div>
      <div id='title-container'>
        <div id='statistic-caption'>
          <div id='statistic-name'>
            Managing & selling digital statistics has never been easier
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur asdipiscing elit. In nunc
            nisl eu consectetur .Mi massage alementum odio eu viverrra amet
          </div>
          <div id='overview-statistic'>
            <Link href='/landing'>
              Make your first sale <i className='pi pi-arrow-right'></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsInfo
