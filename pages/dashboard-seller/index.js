import React, { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import Link from 'next/link'
import LocaleHelper from '../../components/locale/LocaleHelper'
import Rating from '../../components/Rating'
import apiInstance from '../../api/apiInstance'
import { TabMenu } from 'primereact/tabmenu'
import { Carousel } from 'primereact/carousel'
import Title from '../../components/Title'
import store from '../../store/store'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import NewProduct from './NewProduct'
import { SpeedDial } from 'primereact/speeddial'
import EditProduct from './EditProduct'

const ManagementSeller = () => {
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
  const seller_id = store.getState().auth.id
  const [initialValues, setInitialValues] = useState({})

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
    fetchProducts()
  }, [sort, per_page, current_page])
  const fetchProducts = async () => {
    try {
      const response = await apiInstance.get(
        `/shopviet/products/seller/${seller_id}?per_page=${per_page}&current_page=${current_page}`
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
  const fetchProductId = async (product_id) => {
    try {
      const response = await apiInstance.get(`/shopviet/product/${product_id}`)
      if (response.status == 200) {
        setInitialValues({
          id: response.data.id,
          name: response.data.name,
          image: response.data.image,
          price: response.data.price,
          discount: response.data.discount,
          quantity: response.data.inventory,
          description: response.data.description,
          brand_id: response.data.brand.id,
        })
        setVisibleEdit(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const itemsProduct = (product_id) => [
    {
      label: 'Add',
      icon: 'pi pi-plus',
      command: () => {},
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        fetchProductId(product_id)
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {},
    },
    {
      label: 'React Website',
      icon: 'pi pi-external-link',
      command: () => {},
    },
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
      <div id='new-product-container'>
        <Button label='New Product' onClick={() => setVisibleChange(true)} />
        <Dialog
          header='New Product'
          visible={visibleChange}
          position='top'
          style={{
            width: '60%',
            height: '100%',
            borderRadius: '1rem',
            textAlign: 'center',
          }}
          onHide={() => setVisibleChange(false)}
        >
          <NewProduct
            setVisibleChange={setVisibleChange}
            fetchProducts={fetchProducts}
          />
        </Dialog>
        <Dialog
          header='Edit Product'
          visible={visibleEdit}
          position='top'
          style={{
            width: '60%',
            height: '100%',
            borderRadius: '1rem',
            textAlign: 'center',
          }}
          onHide={() => setVisibleEdit(false)}
        >
          <EditProduct
            initialValues={initialValues}
            setVisibleChange={setVisibleEdit}
            fetchProducts={fetchProducts}
          />
        </Dialog>
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
          <div id='list-product-container'>
            <div id='image-product-container'>
              <Link
                className='link-decorations'
                href={`/products/product-detail/${item.id}`}
              >
                <img src={item.image} alt={item.name} />
              </Link>

              <div>
                <SpeedDial
                  model={itemsProduct(item.id)}
                  direction='down'
                  style={{
                    left: '5%',
                    top: '6%',
                    position: 'absolute',
                    zIndex: 1,
                  }}
                />
              </div>
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

export default ManagementSeller
