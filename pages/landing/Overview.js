import React from 'react'

const Overview = ({ data }) => {
  const brand = data.brand
  return (
    // create 1 slide show with 3 images  from primereact or other
    // 3s will change image and content
    <div id='overview-wrapper'>
        <div id='overview-container'>
            <div id='overview-item'>
            <img src={brand[0].image} id='overview-image' />
            <div id='overview-content'>
                <h1>{brand[0].name}</h1>
                <p>{brand[0].content}</p>
                <button>Shop Now</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Overview
