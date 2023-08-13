import React from 'react'

const SaleOff = ({ discount }) => {
  if (discount <= 0) return null // Don't show anything if there's no discount

  return <div id='sale-off-badge'>-{discount}%</div>
}

export default SaleOff
