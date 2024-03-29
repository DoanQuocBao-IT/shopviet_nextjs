import React, { useContext, useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import Link from 'next/link'
import LocaleHelper from '../../components/locale/LocaleHelper'
import Rating from '../../components/Rating'
import apiInstance from '../../api/apiInstance'
import { TabMenu } from 'primereact/tabmenu'
import { Carousel } from 'primereact/carousel'
import Title from '../../components/Title'
import { LoadingContext } from '../../components/contexts/LoadingContext'
import { useToast } from '../../components/contexts/ToastContext'

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
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  useEffect(() => {
    fetchProducts()
  }, [sort, per_page, current_page])
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await apiInstance.get(
        `/shopviet/products?sort=${sort}&per_page=${per_page}&current_page=${current_page}&category_id=0`
      )
      const data = response.data.data
      console.log('fadtda', data)
      if (response.status == 200) {
        setProducts(data.data)
        console.log('data', data.data)
        setPerPage(data.per_page)
        setCurrentPage(data.current_page)
        setTotalPages(data.total_page)
        setTotalProducts(data.total_product)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
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
                <Link href={`/products/product-detail/${product.id}`}>
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
      {/* <div id='category-brand-container'>
        <Title title={nameCategory} subTitle='' />
        <Carousel
          value={brandProducts}
          numScroll={2}
          numVisible={2}
          itemTemplate={itemTemplate}
          circular={true}
        />
      </div> */}
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
      <div className='product-content-container'>
      {products.map((item, index) => (
          <div id='list-product-container'>
            <div id='image-product-container'>
              <Link
                className='link-decorations'
                href={`/products/product-detail/${item.id}`}
              >
                <img src={item.image} alt={item.name} />
              </Link>
              <div id='saleoff-product-container'>
                <span>-{item.discount}%</span>
              </div>
            </div>
            <Link
              className='link-decorations'
              href={`/products/product-detail/${item.id}`}
            >
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
                    <Rating value={item.rate} />
                  </div>
                  <div>
                    <span>Đã bán {item.sold}</span>
                  </div>
                </div>
                <div id='address-product'>
                  <span>{item.province}</span>
                </div>
              </div>
            </Link>
          </div>
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
