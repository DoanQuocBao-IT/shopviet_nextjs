import React, { useContext, useEffect, useState } from 'react'
import apiInstance from '../../api/apiInstance'
import { LoadingContext } from '../../components/contexts/LoadingContext'
import { useToast } from '../../components/contexts/ToastContext'
import { TabMenu } from 'primereact/tabmenu'
import { Paginator } from 'primereact/paginator'
import Link from 'next/link'
import LocaleHelper from '../../components/locale/LocaleHelper'
import Rating from '../../components/Rating'

const Product = () => {
  const [products, setProducts] = useState([])
  const [per_page, setPerPage] = useState(20)
  const [current_page, setCurrentPage] = useState(1)
  const [total_pages, setTotalPages] = useState(1)
  const [total_products, setTotalProducts] = useState(1)
  const [first, setFirst] = useState(0)

  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)

  const [column, setColumn] = useState(5)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sort, setSort] = useState('default')
  const [nameCategory, setNameCategory] = useState('Quang Nam')
  const [brandProducts, setBrandProducts] = useState([])
  const [product_id, setProductId] = useState(0)
  const [seller, setSeller] = useState({})
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [brand, setBrand] = useState([])
  useEffect(() => {
    fetchBrands()
  }, [])
  const fetchBrands = async () => {
    setLoading(true)
    try {
      const response = await apiInstance.get(`/seller/brand`)
      const data = response.data
      if (response.status == 200) {
        setBrand(
          data.data.map((item) => ({
            id: item.id,
            label: item.name,
            image: item.image,
            total_product: item.total_product,
          }))
        )
        fetchProducts(brand[0].id)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchProducts()
  }, [sort, per_page, current_page])

  const fetchProducts = async (brand_id) => {
    setLoading(true)
    try {
      const response = await apiInstance.get(
        `/shopviet/products/seller/0/brand/${brand_id}?sort=${sort}&per_page=${per_page}&current_page=${current_page}`
      )
      const data = response.data.data
      if (response.status == 200) {
        setProducts(data.data)
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
  return (
    <div className='layout-content'>
      <div id='new-product-container'>
        <h1 id='title-page'>Sản phẩm dang bán</h1>
      </div>
      <div id='tabmenu-container'>
        <TabMenu
          model={brand}
          activeIndex={activeIndex}
          onTabChange={(e) => {
            setActiveIndex(e.index)
            fetchProducts(brand[e.index].id)
          }}
        />
      </div>
      <div className='custom-product-content'>
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

export default Product
