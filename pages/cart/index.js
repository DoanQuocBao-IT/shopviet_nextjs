import React, { useEffect, useState } from 'react'
import apiInstance from '../../api/apiInstance'
import { Button } from 'primereact/button'

const Cart = () => {
  const [sellerProducts, setSellerProducts] = useState([])
  useEffect(() => {
    fetchCart()
  }, [])
  const fetchCart = async () => {
    try {
      const response = await apiInstance.get('/buyer/cart')
      const data = response.data
      if (response.status == 200) {
        setSellerProducts(data.sellerProduct)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      return null
    }
  }
  const [count, setCount] = useState(1)
  const increment = (inventory) => {
    if (count < inventory) setCount((prevCount) => prevCount + 1)
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
  return (
    <div id='cart-container'>
      {sellerProducts.map((sellerProduct) => (
        <div id='info-cart-container'>
          <div id='info-seller-container'>
            <div id='info-seller-image'>
              <img src={sellerProduct.seller.image} alt='seller image' />
            </div>
            <div id='info-seller-detail'>
              <div>
                <h1>{sellerProduct.seller.fname}</h1>
              </div>
            </div>
          </div>
          <div id='info-product-cart-container'>
            {sellerProduct.products.map((product) => (
              <div id='info-product-cart'>
                <div id='info-product-cart-image'>
                  <img src={product.image} alt='product image' />
                </div>
                <div id='info-product-cart-detail'>
                  <div>
                    <h1>{product.name}</h1>
                  </div>
                  <div>
                    <h3>{product.price}</h3>
                  </div>
                  <div>
                    <h3>{product.quantity}</h3>
                  </div>
                  <div>
                    <h3>{product.discount}</h3>
                  </div>
                  <div>
                    <h3>{product.totalPrice}</h3>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => decrement()}>-</button>
                  <input
                    type='number'
                    style={{
                      width: '50px',
                      textAlign: 'center',
                      margin: '0 10px',
                    }}
                    value={count}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => increment(product.inventory)}>
                    +
                  </button>
                </div>
                <div>
                  <button>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div id='total-price-container'>
        <div>
          <h1>Total Price</h1>
        </div>
        <div>
          <Button label='Checkout' type='submit'/>
        </div>
      </div>
    </div>
  )
}

export default Cart
