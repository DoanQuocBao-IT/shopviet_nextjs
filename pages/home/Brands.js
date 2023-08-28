import React from 'react'
import Title from '../../components/Title'
import { Carousel } from 'primereact/carousel'
import CustomCarousel from '../../components/CustomCarousel'

const Brands = ({ data }) => {
  const responsiveOptions = [
    {
      breakpoint: 1366,
      columnNumber: 4,
    },
    {
      breakpoint: 1024,
      columnNumber: 3,
    },
    {
      breakpoint: 768,
      columnNumber: 2,
    },
    {
      breakpoint: 560,
      columnNumber: 1,
    },
  ]
 
  const brandTemplate = (brands) => {
    return (
      <div id='brand-container'>
        {brands.map((brand) => (
          <div id='content-brand-container' key={brand.name}>
            <div id='image-container-brand'>
              <img src={brand.image} alt={brand.name} />
            </div>
            <div id='info-brand'>
              <h4>{brand.name}</h4>
              <p>{brand.category}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div id='card-home-container'>
      <Title
        title='Popular Brands'
        subTitle='Choose from wide variety of items'
      />
      <div id='carousel-brand'>
        <CustomCarousel
          interval = {4000}
          value={data}
          rows={2}
          columns={5}
          scrollColumns={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={brandTemplate}
          nextPrevButton={true}
        />
      </div>
    </div>
  )
}

export default Brands
