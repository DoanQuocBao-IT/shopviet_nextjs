import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel'
import { Tag } from 'primereact/tag'
import Rating from '../../components/Rating'
import SaleOff from '../../components/SaleOff'

const Childshow = ({ data, interval = 3000 }) => {
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

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success'

      case 'LOWSTOCK':
        return 'warning'

      case 'OUTOFSTOCK':
        return 'danger'

      default:
        return null
    }
  }

  const productTemplate = (product) => {
    return (
      <div id='child-container'>
        <div id='image-container'>
          <SaleOff discount={product.discount} />

          <img src={product.image} alt={product.name} />
        </div>
        <div id='info-child'>
          <h4>{product.name}</h4>
          <p>RESERVED PRICE</p>
          <h6>${product.price}</h6>
          <div id='rating-child'>
            <Rating value={product.rating} text={`${product.review} reviews`} />
          </div>
          {/* <Tag
            value={product.inventoryStatus}
            severity={getSeverity(product)}
          ></Tag> */}
          <div id='child-button'>
            <Button label='Add to cart' className='multi-color-border' />
            <Button label='Buy now' className='multi-color-border' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id='card'>
      <Carousel
        value={product}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  )
}
export default Childshow
