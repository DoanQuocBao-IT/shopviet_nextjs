import React from 'react'
import { Galleria } from 'primereact/galleria'
import Slideshow from './Slideshow'

const Overview = ({ data }) => {
  const brand = data.brand
  const product = data.product

  return (
    <div>
      <Slideshow data={brand} />
    </div>
  )
}

export default Overview
