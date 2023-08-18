import React from 'react'
import ProductList from './home/ProductList'

const LandingPage = () => {
  const data = {
    overview: {
      brand: [
        {
          image: '../../layout/images/imagetest/avata.png',
          name: 'Collect rare digital artworks',
          content: 'Color is a powerful tool that can be used to inspire emotions'
        },
        {
          image: '../../layout/images/imagetest/postimage.jpg',
          name: 'Collect cool digital artworks',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
        },
        {
          image: '../../layout/images/imagetest/avata.png',
          name: 'Collect hot digital artworks',
          content: 'Size is a powerful tool that can be used to inspire emotions'
        }
      ],
      product: [
        {
          name: 'Product 1',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '1000',
          discount: 10,
          rating: 4.5,
          review: 10
        },
        {
          name: 'Product 2',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '2000',
          discount: 20,
          rating: 3,
          review: 20
        },
        {
          name: 'Product 3',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '3000',
          discount: 30,
          rating: 2.6,
          review: 30
        },
        {
          name: 'Product 4',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '4000',
          discount: 40,
          rating: 1,
          review: 40
        },
        {
          name: 'Product 5',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '5000',
          discount: 50,
          rating: 5,
          review: 50
        }
      ],
      total_brand: 100,
      total_product: 1000,
    },
  }
  return (
    <ProductList data={data.overview.product}/>
  )
}

export default LandingPage
