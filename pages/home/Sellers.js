import React from 'react'
import Title from '../../components/Title'
import CustomCarousel from '../../components/CustomCarousel'

const Sellers = ({ seller }) => {
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
      columnNumber: 2,
    },
  ]
  const sellerTemplate = (sellers) => {
    return (
      <div id='grid-container'>
        {sellers.map((s, index) => (
          <div key={index} id='seller-item'>
            <div id='avatar'>
              <img src={s.image} alt={s.name} />
              {s.mall && <div id='tick-icon'></div>}{' '}
              {/* Hiển thị dấu tick nếu mall là true */}
            </div>
            <div id='info-seller'>
              <h3>{s.name}</h3>
              <p>{s.address}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div id='card-home-container'>
      <Title
        title='Popular Sellers'
        subTitle='In a creative workplace, employee responsibly try different solutions.'
      />
      <div id='carousel-seller'>
        <CustomCarousel
          value={seller}
          rows={3}
          columns={4}
          scrollColumns={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={sellerTemplate}
          nextPrevButton={false}
        />
      </div>
    </div>
  )
}

export default Sellers
