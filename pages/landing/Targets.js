import React from 'react'

const Targets = () => {
  return (
    // create Secured Payments, Shop for Anyone,Free Delivery,Quality Products
    <div id='target-wrapper'>
      <div id='target-container'>
        <div id='target-item'>
          <i className='pi pi-lock' id='icon-large' />
          <div>
            <span>Secured Payments</span>
            <p>Make payment with ease</p>
          </div>
        </div>
        <div id='target-item'>
          <i className='pi pi-shopping-cart' id='icon-large' />
          <div>
            <span>Shop for Anyone</span>
            <p>Shop can shop for any category</p>
          </div>
        </div>
        <div id='target-item'>
          <i className='pi pi-inbox' id='icon-large' />
          <div>
            <span>Free Delivery</span>
            <p>Get 100% free delivery</p>
          </div>
        </div>
        <div id='target-item'>
          <i className='pi pi-tags' id='icon-large' />
          <div>
            <span>Quality Products</span>
            <p>Made with highest care</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Targets
