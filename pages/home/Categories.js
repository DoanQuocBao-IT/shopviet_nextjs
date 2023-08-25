import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel'
import { Tag } from 'primereact/tag'
import Rating from '../../components/Rating'
import SaleOff from '../../components/SaleOff'
import Title from '../../components/Title'
import CustomCarousel from '../../components/CustomCarousel'

const Category = ({ data, interval = 3000 }) => {
  const product = data
  const responsiveOptions = [
    {
      breakpoint: 1366,
      columnNumber: 5,
    },
    {
      breakpoint: 1024,
      columnNumber: 4,
    },
    {
      breakpoint: 768,
      columnNumber: 3,
    },
    {
      breakpoint: 560,
      columnNumber: 2,
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

  const productTemplate = (products) => {
    return (
      <div id='category-container'>
        {products.map((product) => (
          <div id='content-container'>
            <div id='image-container-category'>
              <img src={product.image} alt={product.name} />
            </div>
            <div id='info-category'>
              <h4>{product.name}</h4>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div id='card-home-container'>
      <Title
        title='Popular Categories'
        subTitle='Choose from wide variety of items'
      />
      <CustomCarousel
        interval={6000}
        value={product}
        rows={1}
        columns={7}
        scrollColumns={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  )
}
export default Category
