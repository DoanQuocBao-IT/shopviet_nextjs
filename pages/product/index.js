import React, { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import Link from 'next/link'
import LocaleHelper from '../../components/locale/LocaleHelper'
import Rating from '../../components/Rating'
import apiInstance from '../../api/apiInstance'
import { TabMenu } from 'primereact/tabmenu'
import { Carousel } from 'primereact/carousel'
import Title from '../../components/Title'

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [per_page, setPerPage] = useState(20)
  const [current_page, setCurrentPage] = useState(1)
  const [total_pages, setTotalPages] = useState(1)
  const [total_products, setTotalProducts] = useState(1)
  const [first, setFirst] = useState(0)

  const [column, setColumn] = useState(5)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sort, setSort] = useState('default')
  const [nameCategory, setNameCategory] = useState('Quang Nam')
  const [brandProducts, setBrandProducts] = useState([])
  const responsiveOptions = [
    {
      breakpoint: 1880,
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
  ]
  const brand = [
    {
      brand_id: 1,
      name: 'Adidas',
      image: 'https://picsum.photos/200/300',
      seller: 'Adidas',
      products: [
        {
          product_id: 1,
          sale: 5,
          image: 'https://picsum.photos/200/300',
        },
        {
          product_id: 2,
          sale: 5,
          image: 'https://picsum.photos/200/300',
        },
        {
          product_id: 3,
          sale: 3,
          image: 'https://picsum.photos/200/300',
        },
      ],
    },
    {
      brand_id: 2,
      name: 'Nike',
      image: 'https://picsum.photos/200/300',
      seller: 'Nike',
      products: [
        {
          product_id: 1,
          sale: 5,
          image: 'https://picsum.photos/200/300',
        },
        {
          product_id: 2,
          sale: 5,
          image: 'https://picsum.photos/200/300',
        },
        {
          product_id: 3,
          sale: 3,
          image: 'https://picsum.photos/200/300',
        },
      ],
    },
    {
      brand_id: 3,
      name: 'Puma',
      image: 'https://picsum.photos/200/300',
      seller: 'Puma',
      products: [
        {
          product_id: 1,
          sale: 5,
          image: 'https://picsum.photos/200/300',
        },
        {
          product_id: 2,
          sale: 5,
          image: 'https://picsum.photos/200/300',
        },
        {
          product_id: 3,
          sale: 3,
          image: 'https://picsum.photos/200/300',
        },
      ],
    },
    {
      brand_id: 4,
      name: 'Converse',
      image: 'https://picsum.photos/200/300',
      seller: 'Converse',
      products: [
        {
          product_id: 1,
          sale: 5,
          image: 'https://picsum.photos/200/300',
        },
        {
          product_id: 2,
          sale: 5,
          image: 'https://picsum.photos/200/300',
        },
        {
          product_id: 3,
          sale: 3,
          image: 'https://picsum.photos/200/300',
        },
      ],
    },
  ]
  useEffect(() => {
    fetchBrandProducts()
  }, [])

  const fetchBrandProducts = async () => {
    try {
      const response = await apiInstance.get(
        `/shopviet/all/brand-product/category/${nameCategory}`
      )
      const data = response.data
      console.log(response.data)
      if (response.status == 200) {
        setBrandProducts(data.brand)
        setNameCategory(data.name)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // const data = {
    //   per_page: 20,
    //   current_page: 1,
    //   total_products: 100,
    //   total_pages: 5,
    //   products: [
    //     {
    //       product_id: 1,
    //       name: 'Kiddo Winter Boys Jacket',
    //       price: 145000,
    //       sale: 0,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 4,
    //       sold: 100,
    //       address: 'Hà Nội',
    //     },
    //     {
    //       product_id: 2,
    //       name: 'Apple iPhone 11 Pro 256GB Memory',
    //       price: 200000,
    //       sale: 10,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 4.4,
    //       sold: 100,
    //       address: 'Hà Nội',
    //     },
    //     {
    //       product_id: 1,
    //       name: 'product 1',
    //       price: 100000,
    //       sale: 0,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 3.5,
    //       sold: 100,
    //       address: 'Ho Chi Minh',
    //     },
    //     {
    //       product_id: 2,
    //       name: 'product 2',
    //       price: 200000,
    //       sale: 10,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 4.6,
    //       sold: 100,
    //       address: 'Ho Chi Minh',
    //     },
    //     {
    //       product_id: 1,
    //       name: 'TCL 40S325 40 Inch 1080p Smart LED Roku TV (2019) samsung',
    //       price: 100000,
    //       sale: 0,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 5,
    //       sold: 100,
    //       address: 'Quảng Ninh',
    //     },
    //     {
    //       product_id: 2,
    //       name: 'product 2',
    //       price: 200000,
    //       sale: 10,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 4.9,
    //       sold: 100,
    //       address: 'Quảng Ninh',
    //     },
    //     {
    //       product_id: 1,
    //       name: 'product 1',
    //       price: 100000,
    //       sale: 0,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 4.9,
    //       sold: 100,
    //       address: 'Hà Nội',
    //     },
    //     {
    //       product_id: 2,
    //       name: 'product 2',
    //       price: 200000,
    //       sale: 10,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 4.1,
    //       sold: 100,
    //       address: 'Nước ngoài',
    //     },
    //     {
    //       product_id: 1,
    //       name: 'product 1',
    //       price: 100000,
    //       sale: 0,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 4.4,
    //       sold: 100,
    //       address: 'Hà Nội',
    //     },
    //     {
    //       product_id: 2,
    //       name: 'product 2',
    //       price: 20000,
    //       sale: 10,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 3.9,
    //       sold: 100,
    //       address: 'Nước ngoài',
    //     },
    //     {
    //       product_id: 1,
    //       name: 'product 1',
    //       price: 100000,
    //       sale: 0,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 3,
    //       sold: 100,
    //       address: 'Hà Nội',
    //     },
    //     {
    //       product_id: 2,
    //       name: 'product 2',
    //       price: 20000,
    //       sale: 10,
    //       image: 'https://picsum.photos/200/300',
    //       rating: 3.5,
    //       sold: 100,
    //       address: 'Nước ngoài',
    //     },
    //   ],
    // }
    fetchProducts()
  }, [sort, per_page, current_page])
  const fetchProducts = async () => {
    try {
      const response = await apiInstance.get(
        `/shopviet/allProd?sort=${sort}&per_page=${per_page}&current_page=${current_page}`
      )
      const data = response.data
      console.log(response.data)
      if (response.status == 200) {
        setProducts(data.products)
        setPerPage(data.per_page)
        setCurrentPage(data.current_page)
        setTotalPages(data.total_pages)
        setTotalProducts(data.total_products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= responsiveOptions[2].breakpoint) {
        setColumn(responsiveOptions[2].columnNumber)
      } else if (
        width <= responsiveOptions[1].breakpoint &&
        width > responsiveOptions[2].breakpoint
      )
        setColumn(responsiveOptions[1].columnNumber)
      else if (
        width <= responsiveOptions[0].breakpoint &&
        width > responsiveOptions[1].breakpoint
      )
        setColumn(responsiveOptions[0].columnNumber)
      else {
        setColumn(5)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    const carouselElement = document.getElementsByClassName(
      'custom-product-content'
    )[0]
    if (carouselElement) {
      carouselElement.style.setProperty('--num-columns', column)
    }
  }, [column])
  const items = [
    { label: 'Popular', sort: 'default' },
    { label: 'Best Seller', sort: 'soldDesc' },
    { label: 'New Product', sort: 'newest' },
    { label: 'Price Low to High', sort: 'priceAsc' },
    { label: 'Price High to Low', sort: 'priceDesc' },
  ]
  const itemTemplate = (brand) => {
    return (
      <div id='brand-list-container'>
        <div id='brand-image-container'>
          <img src={brand.image} alt={brand.name} />
        </div>
        <div id='brand-content-container'>
          <div>
            <h4>{brand.name}</h4>
          </div>
          <div>
            <span>{brand.seller}</span>
          </div>
          <div id='brand-product-container'>
            {brand.products.map((product) => (
              <div id='image-product-brand'>
                <Link href={`/products/product/${product.product_id}`}>
                  <img src={product.image} alt={product.name} />
                  <div id='discount-product-brand'>
                    <span>-{product.sale}%</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='layout-content'>
      <div id='category-brand-container'>
        <Title title={nameCategory} subTitle='' />
        <Carousel
          value={brandProducts}
          numScroll={2}
          numVisible={2}
          itemTemplate={itemTemplate}
          circular={true}
        />
      </div>
      <div id='tabmenu-container'>
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => {
            setActiveIndex(e.index)
            console.log('sort', items[e.index].sort)
            setSort(items[e.index].sort)
          }}
        />
      </div>
      <div className='custom-product-content'>
        {products.map((item, index) => (
          <Link
            className='link-decorations'
            href={`/products/product/${item.product_id}`}
          >
            <div id='list-product-container'>
              <div id='image-product-container'>
                <img src={item.image} alt={item.name} />
                <div id='saleoff-product-container'>
                  <span>-{item.discount}%</span>
                </div>
              </div>
              <div id='info-product-container'>
                <div id='name-product'>
                  <h4>{item.name}</h4>
                </div>
                <div id='price-sale-product-container'>
                  <div>
                    <span id='original-price'>
                      {item.price}
                      <sub>đ</sub>
                    </span>
                  </div>
                  <div>
                    <span id='discounted-price'>
                      {LocaleHelper.formatNumber(
                        item.price - (item.discount / 100) * item.price
                      )}
                      <sub>đ</sub>
                    </span>
                  </div>
                </div>
                <div id='rating-sold-product'>
                  <div>
                    <Rating value={item.rating} />
                  </div>
                  <div>
                    <span>Đã bán {item.sold}</span>
                  </div>
                </div>
                <div id='address-product'>
                  <span>{item.address}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Paginator
        first={first}
        rows={per_page}
        totalRecords={total_products}
        rowsPerPageOptions={[20, 30, 40]}
        onPageChange={onPageChange}
        page={current_page}
      />
    </div>
  )
}

export default ProductPage
