import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import LocaleHelper from '../../components/locale/LocaleHelper'
import apiInstance from '../../api/apiInstance'
import { TabMenu } from 'primereact/tabmenu'
import { Button } from 'primereact/button'
import { LoadingContext } from '../../components/contexts/LoadingContext'
import { useToast } from '../../components/contexts/ToastContext'
import Product from './Product'
import Manage from './Manage'
import Order from './Order'

const ManagementSeller = () => {
  const [column, setColumn] = useState(5)
  const [activeIndex, setActiveIndex] = useState(0)
  const [seller, setSeller] = useState({})
  const setLoading = useContext(LoadingContext)
  // const items = [
  //   { label: 'Popular', sort: 'default' },
  //   { label: 'Best Seller', sort: 'soldDesc' },
  //   { label: 'New Product', sort: 'newest' },
  //   { label: 'Price Low to High', sort: 'priceAsc' },
  //   { label: 'Price High to Low', sort: 'priceDesc' },
  // ]

  const items = [
    { label: 'Details', icon: 'pi pi-fw pi-calendar' },
    { label: 'Products', icon: 'pi pi-fw pi-home' },
    { label: 'Orders', icon: 'pi pi-fw pi-pencil' },
    { label: 'Manage', icon: 'pi pi-fw pi-building ' },
  ]

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
    fetchSeller()
  }, [])

  const fetchSeller = async () => {
    setLoading(true)
    try {
      const response = await apiInstance.get(`/seller/profile`)
      const data = response.data.data
      console.log(data)
      if (response.status == 200) {
        setSeller(data)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
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

  return (
    <div className='layout-content'>
      <div id='profile-seller-container'>
        <div id='name-image-seller-container'>
          <div id='image-name-container'>
            <div id='image-seller-container'>
              <img src={seller.image} alt={seller.name} />
            </div>
            <div id='name-seller-container'>
              <h2>{seller.name_store}</h2>
            </div>
          </div>
          <div id='follow-chat-container'>
            <div>
              <Button
                icon='pi pi-user-plus'
                label='Follow'
                id='button-seller'
              />
            </div>
            <div>
              <Button icon='pi pi-comment' label='Chat' id='button-seller' />
            </div>
          </div>
        </div>
        <div id='info-seller-profile-container'>
          <div id='info-profile-seller'>
            <i className='pi pi-book'> Products: {seller.totalProduct}</i>
          </div>
          <div id='info-profile-seller'>
            <i className='pi pi-user'> Followers: {seller.totalFollower}</i>
          </div>
          <div id='info-profile-seller'>
            <i className='pi pi-star'>
              {' '}
              Rating: {seller.rate} ({seller.totalRate} reviews)
            </i>
          </div>
        </div>
        <div id='info-seller-profile-container'>
          <div id='info-profile-seller'>
            <i className='pi pi-user-plus'> Follow: {seller.totalFollow}</i>
          </div>
          <div id='info-profile-seller'>
            <i className='pi pi-phone'> Phone: {seller.phone}</i>
          </div>
          <div id='info-profile-seller'>
            <i className='pi pi-calendar'>
              {' '}
              Join Date: {LocaleHelper.formatDate(seller.createdAt)}
            </i>
          </div>
        </div>
      </div>
      <div id='tabmenu-container'>
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => {
            setActiveIndex(e.index)
          }}
        />
      </div>
      {activeIndex == 0 ? (
        <div
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: seller.description }}
        />
      ) : activeIndex == 1 ? (
        <Product />
      ) : activeIndex == 2 ? (
        <Order />
      ) : activeIndex == 3 ? (
        <Manage />
      ) : null}
    </div>
  )
}

export default ManagementSeller
