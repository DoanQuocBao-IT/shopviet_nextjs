import React, { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import Link from 'next/link'
import LocaleHelper from '../../components/locale/LocaleHelper'
import Rating from '../../components/Rating'
import apiInstance from '../../api/apiInstance'
import { TabMenu } from 'primereact/tabmenu'
import { Carousel } from 'primereact/carousel'
import Title from '../../components/Title'

const FlashSalePage = () => {
  const [products, setProducts] = useState([])
  const [per_page, setPerPage] = useState(20)
  const [current_page, setCurrentPage] = useState(1)
  const [total_pages, setTotalPages] = useState(1)
  const [total_products, setTotalProducts] = useState(1)
  const [first, setFirst] = useState(0)

  const [column, setColumn] = useState(5)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sort, setSort] = useState('default')
  const [category, setCategory] = useState([])

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
  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    try {
      const response = await apiInstance.get(`/shopviet/all/category`)
      const data = response.data
      console.log(response.data)
      if (response.status == 200) {
        setCategory(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
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
  const items = [
    { label: 'Popular', sort: 'default' },
    { label: 'Best Seller', sort: 'soldDesc' },
    { label: 'New Product', sort: 'newest' },
    { label: 'Price Low to High', sort: 'priceAsc' },
    { label: 'Price High to Low', sort: 'priceDesc' },
  ]
  const itemTemplate = (item) => {
    return (
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
    )
  }
  return (
    <div className='layout-content'>
      <div className='layout-content-flex'>
        <div className='layout-content-menu'>
          {category.map((item) => (
            <Link
              className='link-decorations'
              id='category-image-name-container'
              href={`/products/category/${item.id}`}
            >
              <img src={item.image} alt={item.name} />
              {item.name}
            </Link>
          ))}
        </div>
        <div className='layout-content'>
          <div id='tabmenu-container'>Sản phẩm bán chạy</div>
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
            <Carousel
              value={products}
              numScroll={4}
              numVisible={4}
              itemTemplate={itemTemplate}
              circular={true}
            />
          </div>

          <div id='tabmenu-container'>Thuong hieu bán chạy</div>
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
            <Carousel
              value={products}
              numScroll={4}
              numVisible={4}
              itemTemplate={itemTemplate}
              circular={true}
            />
          </div>
        </div>
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

export default FlashSalePage
