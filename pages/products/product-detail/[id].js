import React, { useState } from 'react'
import apiInstance from '../../../api/apiInstance'
import LocaleHelper from '../../../components/locale/LocaleHelper'
import Rating from '../../../components/Rating'
import { Button } from 'primereact/button'

export const getServerSideProps = async ({ params }) => {
  const product = await getProduct(params.id)
  return {
    props: {
      product,
    },
  }
}
async function getProduct(id) {
  try {
    const response = await apiInstance.get(`/shopviet/product/${id}`)
    const data = await response.data.data
    return data
  } catch (error) {
    console.error('Error fetching event details:', error)
    return null
  }
}

const ProductDetail = ({ product }) => {
  const [count, setCount] = useState(1)
  const [totalPrice, setPrice] = useState(product.price)

  const increment = () => {
    if (count < product.inventory) setCount((prevCount) => prevCount + 1)
  }

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 1))
    }
  }
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setCount(value)
    }
  }
  const handleAddToCart = async () => {
    try {
      const response = await apiInstance.post('/buyer/cart', {
        product_id: product.id,
        quantity: count,
      })
      const data = response.data
      if (response.status == 200) {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div id='info-product-container'>
        <div id='info-seller'>
          <div id='info-seller-image'>
            <img src={product.seller.image} alt='seller image' />
          </div>
          <div id='info-seller-detail'>
            <h1>{product.seller.fname}</h1>
          </div>
        </div>
        <div id='info-product'>
          <div id='info-product-image'>
            <img src={product.image} alt='product image' />
          </div>
          <div id='info-product-detail'>
            <h1>{product.name}</h1>
            <div id='price-sale-product-container'>
              <div>
                <span id='original-price'>
                  {product.price}
                  <sub>đ</sub>
                </span>
              </div>
              <div>
                <span id='discounted-price'>
                  {LocaleHelper.formatNumber(
                    (product.price - (product.discount / 100) * product.price) *
                      count
                  )}
                  <sub>đ</sub>
                </span>
              </div>
            </div>
            <div id='rating-sold-product'>
              <div>
                <Rating value={product.rating} />
              </div>
              <div>
                <span>Đã bán {product.sold}</span>
              </div>
            </div>
            <h3>{product.description}</h3>
            <h4>{product.severity}</h4>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={decrement}>-</button>
              <input
                type='number'
                style={{ width: '50px', textAlign: 'center', margin: '0 10px' }}
                value={count}
                onChange={handleInputChange}
              />
              <button onClick={increment}>+</button>
            </div>
            <div id='add-to-cart-container'>
              <Button
                label='Thêm vào giỏ hàng'
                onClick={() => handleAddToCart()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
