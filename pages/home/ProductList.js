import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel'
import { Tag } from 'primereact/tag'
import SaleOff from '../../components/SaleOff'
import Rating from '../../components/Rating'
const ProductList = ({ data, interval = 3000 }) => {
  const productinfo = data
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

  const getSeverity = (productinfo) => {
    switch (productinfo.inventoryStatus) {
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
  const productinfoTemplate = (productinfo) => {
    return (
      <div id='productinfo-container'>
        <div id='imageproduct-container'>
          {/* <SaleOff discount={productinfo.discount} /> */}

          <img src={productinfo.image} alt={productinfo.name} />
        </div>
        <div id='info-productinfo'>
          <h4>{productinfo.name}</h4>
          <p>RESERVED PRICE</p>
          <h6>${productinfo.price}</h6>
          <div id='rating-productinfo'>
            {/* <Rating value={productinfo.rating} text={`${productinfo.review} reviews`} /> */}
          </div>

          <div id='productinfo-button'>
            <div id='multi-color-border-productinfoshow'>
              <Button
                label='Add to cart'
                severity='secondary'
                raised
                id='button-dark'
              />
            </div>
            <div id='multi-color-border-productinfoshow'>
              <Button
                label='Buy now'
                severity='secondary'
                raised
                id='button-white'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id='card-productinfo'>

      <Carousel id='custom-carousel'
        value={productinfo} 
        numScroll={1} 
        numVisible={3} 
        responsiveOptions={responsiveOptions} 
        itemTemplate={productinfoTemplate}
        circular={true} 
      />
    </div>
  )
}
export default ProductList
