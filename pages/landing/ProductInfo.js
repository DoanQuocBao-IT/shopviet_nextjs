import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel'

const ProductInfo = ({ data }) => {
  const product = data.product
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

  const productTemplate = (product) => {
    return (
      <div id='image-container'>
        <img src={product.image} alt={product.name} />
      </div>
    )
  }
  return (
    <div id='product-container'>
      <div id='title-container'>
        <div id='product-caption'>
          <div id='product-name'>
            Build Saas Landing Page without a Single Code
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur asdipiscing elit. In nunc
            nisl eu consectetur .Mi massage alementum odio eu viverrra amet
          </div>

          <div id='overview-product'>
            <div id='border-div'>
              <span>90+ Coded UI Kit</span>
              <h>Lorem ipsum dolor sit amet, censec tetur adipiscing elit</h>
            </div>
            <div id='border-div'>
              <span>Made with Tailwind CSS</span>
              <h>Lorem ipsum dolor sit amet, censec tetur adipiscing elit</h>
            </div>
          </div>
        </div>
      </div>
      <div id='card-product'>
        <Carousel
          value={product}
          numVisible={1}
          numScroll={1}
          orientation='horizontal'
          verticalViewPortHeight='60rem'
          itemTemplate={productTemplate}
          responsiveOptions={responsiveOptions}
        />
      </div>
    </div>
  )
}

export default ProductInfo
