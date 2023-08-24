import React from 'react'
import Title from '../../components/Title'

const Sellers = ({ seller }) => {
  return (
    <div id='card-home-container'>
      <Title
        title='Popular Sellers'
        subTitle='In a creative workplace, employee responsibly try different solutions.'
      />
      <div id='grid-container'>
        {seller.map((s, index) => (
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
    </div>
  )
}

export default Sellers
