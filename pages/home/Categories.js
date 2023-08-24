import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel'
import { Tag } from 'primereact/tag'
import Rating from '../../components/Rating'
import SaleOff from '../../components/SaleOff'
import Title from '../../components/Title'

const Category = ({ data, interval = 3000 }) => {
  const product = data
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 5,
      numScroll: 2,
    },
    {
      breakpoint: '991px',
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 6,
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
      <div id='category-container'>
        <div id='content-container'>
          <div id='image-container-category'>
            <img src={product.image} alt={product.name} />
          </div>
          <div id='info-category'>
            <h4>{product.name}</h4>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id='card-home-container'>
      <Title title='Popular Categories' subTitle='Choose from wide variety of items' />
      <Carousel
        value={product}
        numScroll={1}
        numVisible={6}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  )
}
export default Category
