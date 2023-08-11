import React from 'react'
import Targets from './Targets'
import Overview from './Overview'



const LandingPage = () => {
  const data = {
    overview: {
      brand: [
        {
          image: '../../layout/images/imagetest/avata.png',
          name: 'Brand 1',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
        },
        {
          image: '../../layout/images/imagetest/avata.png',
          name: 'Brand 2',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
        },
        {
          image: '../../layout/images/imagetest/avata.png',
          name: 'Brand 3',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
        }
      ],
      product: [
        {
          name: 'Product 1',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '1000',
          discount: '10%',
          rating: 4,
          review: 10
        },
        {
          name: 'Product 2',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '2000',
          discount: '20%',
          rating: 3,
          review: 20
        },
        {
          name: 'Product 3',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '3000',
          discount: '30%',
          rating: 2,
          review: 30
        },
        {
          name: 'Product 4',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '4000',
          discount: '40%',
          rating: 1,
          review: 40
        },
        {
          name: 'Product 5',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '5000',
          discount: '50%',
          rating: 5,
          review: 50
        }
      ],
      total_brand: 100,
      total_product: 1000,
    },
  }
  return (
    <div>
      <Overview data={data.overview} />
      <Targets/>
    </div>

  )
}

export default LandingPage