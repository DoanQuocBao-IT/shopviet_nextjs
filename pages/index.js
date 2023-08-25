import React from 'react'
import ProductList from './home/ProductList'
import Category from './home/Categories'
import Title from '../components/Title'
import Sellers from './home/Sellers'
import Brands from './home/Brands'

const LandingPage = () => {
  const data = {
    overview: {
      category: [
        {
          image: 'https://picsum.photos/200/300',
          name: 'Collect rare digital artworks',
          content:
            'Color is a powerful tool that can be used to inspire emotions',
        },
        {
          image: 'https://picsum.photos/200/300',
          name: 'Collect rare music',
          content:
            'Color is a powerful tool that can be used to inspire emotions',
        },
        {
          image: 'https://picsum.photos/200/300',
          name: 'Collect rare fashion',
          content:
            'Color is a powerful tool that can be used to inspire emotions',
        },
        {
          image: 'https://picsum.photos/200/300',
          name: 'Collect rare games',
          content:
            'Color is a powerful tool that can be used to inspire emotions',
        },
        {
          image: 'https://picsum.photos/200/300',
          name: 'Collect rare sports',
          content:
            'Color is a powerful tool that can be used to inspire emotions',
        },
        {
          image: 'https://picsum.photos/200/300',
          name: 'Collect rare photography',
          content:
            'Color is a powerful tool that can be used to inspire emotions',
        },
        {
          image: 'https://picsum.photos/200/300',
          name: 'Collect rare trading cards',
          content:
            'Color is a powerful tool that can be used to inspire emotions',
        }
      ],
      product: [
        {
          name: 'Product 1',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '1000',
          discount: 10,
          rating: 4.5,
          review: 10,
        },
        {
          name: 'Product 2',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '2000',
          discount: 20,
          rating: 3,
          review: 20,
        },
        {
          name: 'Product 3',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '3000',
          discount: 30,
          rating: 2.6,
          review: 30,
        },
        {
          name: 'Product 4',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '4000',
          discount: 40,
          rating: 1,
          review: 40,
        },
        {
          name: 'Product 5',
          image: '../../layout/images/imagetest/postimage.jpg',
          price: '5000',
          discount: 50,
          rating: 5,
          review: 50,
        }
      ],
      seller: [
        // 12 seller
        {
          name: 'Seller 1',
          image: 'https://picsum.photos/200/300',
          address: 'Ha noi',
          mall: true,
        },
        {
          name: 'Seller 2',
          image: 'https://picsum.photos/200/300',
          address: 'Ha noi',
          mall: false,
        },
        {
          name: 'Seller 3',
          image: 'https://picsum.photos/200/300',
          address: 'Ha noi',
          mall: true,
        },
        {
          name: 'Seller 4',
          image: 'https://picsum.photos/200/300',
          address: 'Ho Chi Minh',
          mall: true,
        },
        {
          name: 'Seller 5',
          image: 'https://picsum.photos/200/300',
          address: 'Ho Chi Minh',
          mall: false,
        },
        {
          name: 'Seller 6',
          image: 'https://picsum.photos/200/300',
          address: 'Hai Phong',
          mall: true,
        },
        {
          name: 'Seller 7',
          image: 'https://picsum.photos/200/300',
          address: 'Hai Phong',
          mall: false,
        },
        {
          name: 'Seller 8',
          image: 'https://picsum.photos/200/300',
          address: 'Vung Tau',
          mall: true,
        },
        {
          name: 'Seller 9',
          image: 'https://picsum.photos/200/300',
          address: 'Vung Tau',
          mall: true,
        },
        {
          name: 'Seller 10',
          image: 'https://picsum.photos/200/300',
          address: 'Da Nang',
          mall: false,
        },
        {
          name: 'Seller 11',
          image: 'https://picsum.photos/200/300',
          address: 'Da Nang',
          mall: true,
        },
        {
          name: 'Seller 12',
          image: 'https://picsum.photos/200/300',
          address: 'Da Nang',
          mall: true,
        }
      ],
      brand: [
        {
          name: 'Brand 1 Adidass Le Coq Sportif',
          image: 'https://picsum.photos/200/300',
          category: 'Category 1 Adidass Le',
        },
        {
          name: 'Brand 2',
          image: 'https://picsum.photos/200/300',
          category: 'Category 2',
        },
        {
          name: 'Brand 3',
          image: 'https://picsum.photos/200/300',
          category: 'Category 3',
        },
        {
          name: 'Brand 4',
          image: 'https://picsum.photos/200/300',
          category: 'Category 4',
        },
        {
          name: 'Brand 5',
          image: 'https://picsum.photos/200/300',
          category: 'Category 5',
        },
        {
          name: 'Brand 6',
          image: 'https://picsum.photos/200/300',
          category: 'Category 6',
        },

        {
          name: 'Brand 7',
          image: 'https://picsum.photos/200/300',
          category: 'Category 7',
        },
        {
          name: 'Brand 8',
          image: 'https://picsum.photos/200/300',
          category: 'Category 8',
        },
        {
          name: 'Brand 9',
          image: 'https://picsum.photos/200/300',
          category: 'Category 9',
        },
        {
          name: 'Brand 10',
          image: 'https://picsum.photos/200/300',
          category: 'Category 10',
        },
        {
          name: 'Brand 11',
          image: 'https://picsum.photos/200/300',
          category: 'Category 11',
        },
        {
          name: 'Brand 12',
          image: 'https://picsum.photos/200/300',
          category: 'Category 12',
        }
      ],
      total_brand: 100,
      total_product: 1000,
    },
  }
  return (
    <div>
      <Category data={data.overview.category} />
      <Brands data={data.overview.brand} />
      <Sellers seller={data.overview.seller} />
      <ProductList data={data.overview.product} />

      {/* <ProductList data={data.overview.product} /> */}
    </div>
  )
}

export default LandingPage
