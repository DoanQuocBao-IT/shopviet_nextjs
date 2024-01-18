import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import apiInstance from '../../api/apiInstance'
import { Button } from 'primereact/button'
import { LoadingContext } from '../../components/contexts/LoadingContext'
import { useToast } from '../../components/contexts/ToastContext'
import { Dialog } from 'primereact/dialog'
import NewBrand from './NewBrand'
import EditBrand from './EditBrand'
import NewProduct from './NewProduct'
import EditProduct from './EditProduct'

const Manage = () => {
  const [brand, setBrand] = useState([])
  const [expandedRows, setExpandedRows] = useState(null)
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [visibleNewBrand, setVisibleNewBrand] = useState(false)
  const [visibleEditBrand, setVisibleEditBrand] = useState(false)

  const [visibleNewProduct, setVisibleNewProduct] = useState(false)
  const [visibleEditProduct, setVisibleEditProduct] = useState(false)

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [parent, setParent] = useState(0)


  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await apiInstance.get(`/shopviet/product/seller/${1}`)
      const data = response.data.data
      if (response.status === 200) {
        setBrand(data)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleDeleteBrand = async (id) => {
    setLoading(true)
    try {
      const response = await apiInstance.delete(`/seller/brand/${id}`)
      if (response.status === 200) {
        showToast('success', 'Delete brand success', '')
        fetchProduct()
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleDeleteProduct = async (id) => {
    setLoading(true)
    try {
      const response = await apiInstance.delete(`/seller/product/${id}`)
      if (response.status === 200) {
        showToast('success', 'Delete product success', '')
        fetchProduct()
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const expandAll = () => {
    let _expandedRows = {}

    brand.forEach((p) => (_expandedRows[`${p.id}`] = true))

    setExpandedRows(_expandedRows)
  }

  const collapseAll = () => {
    setExpandedRows(null)
  }

  const onRowExpand = (event) => {}

  const onRowCollapse = (event) => {}

  const allowExpansion = (rowData) => {
    return rowData.products.length > 0
  }
  const header = (
    <div id='header-table-container'>
      <div>
        <Button
          icon='pi pi-plus'
          className='p-button-rounded p-button-info'
          onClick={() => {
            setVisibleNewBrand(true)
          }}
        />
      </div>
      <div>
        <Button icon='pi pi-plus' label='Expand All' onClick={expandAll} text />
        <Button
          icon='pi pi-minus'
          label='Collapse All'
          onClick={collapseAll}
          text
        />
      </div>
    </div>
  )

  const formatSold = (brand) => {
    return (
      <span className='p-tag p-tag-info' style={{ padding: '.2rem' }}>
        {brand.sold}
      </span>
    )
  }

  const formatPrice = (date) => {
    return (
      <span className='p-tag p-tag-info' style={{ padding: '.2rem' }}>
        {date.price}
      </span>
    )
  }

  const formatProvince = (date) => {
    return (
      <span className='p-tag p-tag-info' style={{ padding: '.2rem' }}>
        {date.province}
      </span>
    )
  }

  const formatImage = (brand) => {
    return (
      <img
        src={brand.image}
        alt={brand.name}
        style={{ width: '3rem', height: '2rem', objectFit: 'cover' }}
      />
    )
  }

  const formatAction = (data) => {
    return (
      <div id='action-container'>
        <Button
          icon='pi pi-plus'
          className='p-button-rounded p-button-info'
          onClick={() => {
            setVisibleNewProduct(true)
            setParent(data.id)
          }}
        />
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success'
          onClick={() => {
            setVisibleEditBrand(true)
            setName(data.name)
            setImage(data.image)
            setParent(data.id)
          }}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          onClick={() => {
            handleDeleteBrand(data.id)
          }}
        />
      </div>
    )
  }

  const formatActionChild = (data) => {
    return (
      <div id='action-container'>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success'
          onClick={() => {
            setVisibleEditProduct(true)
            setParent(data.id)
          }}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          onClick={() => {
            handleDeleteProduct(data.id)
          }}
        />
      </div>
    )
  }

  const formatTotalProduct = (brand) => {
    return (
      <span className='p-tag p-tag-info' style={{ padding: '.2rem' }}>
        {brand.total_product}
      </span>
    )
  }

  const formatRating = (brand) => {
    return (
      <span className='p-tag p-tag-info' style={{ padding: '.2rem' }}>
        {brand.rate}
      </span>
    )
  }

  const rowExpansionTemplate = (data) => {
    return (
      <div id='table-child-container'>
        <div id='header-table-child-container'>
          <h5>Products of {data.name}</h5>
        </div>
        <div>
          <DataTable value={data.products}>
            <Column field='id' header='ID' sortable style={{ width: '0%' }} />
            <Column
              field='image'
              header='Image'
              body={formatImage}
              style={{ width: '5%' }}
            />
            <Column
              field='name'
              header='Name'
              sortable
              style={{ width: '55%' }}
            />
            <Column
              field='discount'
              header='Discount'
              style={{ width: '0%' }}
            />

            <Column
              field='sold'
              header='Sold'
              sortable
              body={formatSold}
              style={{ width: '0%' }}
            />
            <Column
              field='rate'
              header='Rating'
              sortable
              body={formatRating}
              style={{ width: '0%' }}
            />
            <Column
              field='price'
              header='Price'
              sortTable
              body={formatPrice}
              style={{ width: '5%' }}
            />
            <Column
              field='province'
              header='Province'
              sortTable
              body={formatProvince}
              style={{ width: '15%' }}
            />
            <Column
              body={formatActionChild}
              style={{ width: '10%', textAlign: 'center' }}
            />
          </DataTable>
        </div>
      </div>
    )
  }

  return (
    <div className='layout-content'>
      <h1>Management Admin</h1>
      <DataTable
        value={brand}
        // paginator
        // paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
        // rowsPerPageOptions={[10, 25, 50]}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        onRowExpand={onRowExpand}
        onRowCollapse={onRowCollapse}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey='id'
        header={header}
        tableStyle={{ minWidth: '60rem' }}
      >
        <Column expander={allowExpansion} style={{ width: '5%' }} />
        <Column field='id' header='ID' sortable style={{ width: '5%' }} />
        <Column
          field='image'
          header='Image'
          body={formatImage}
          style={{ width: '5%' }}
        />
        <Column field='name' header='Name' sortable style={{ width: '35%' }} />
        <Column
          field='total_product'
          header='Total Product'
          sortable
          body={formatTotalProduct}
          style={{ width: '25%' }}
        />
        <Column
          body={formatAction}
          style={{ width: '10%', textAlign: 'center' }}
        />
      </DataTable>
      <Dialog
        header='New Brand'
        visible={visibleNewBrand}
        position='center'
        style={{
          width: 'auto',
          height: 'auto',
          borderRadius: '1rem',
          textAlign: 'center',
        }}
        onHide={() => setVisibleNewBrand(false)}
      >
        <NewBrand
          setVisibleChange={setVisibleNewBrand}
          fetchProducts={fetchProduct}
        />
      </Dialog>
      <Dialog
        header='Update Brand'
        visible={visibleEditBrand}
        position='center'
        style={{
          width: 'auto',
          height: 'auto',
          borderRadius: '1rem',
          textAlign: 'center',
        }}
        onHide={() => setVisibleEditBrand(false)}
      >
        <EditBrand
          id={parent}
          image={image}
          name={name}
          setVisibleChange={setVisibleEditBrand}
          fetchProducts={fetchProduct}
        />
      </Dialog>
      <Dialog
        header='New Product'
        visible={visibleNewProduct}
        position='center'
        style={{
          width: '60%',
          height: 'auto',
          borderRadius: '1rem',
          textAlign: 'center',
        }}
        onHide={() => setVisibleNewProduct(false)}
      >
        <NewProduct
          id={parent}
          setVisibleChange={setVisibleNewProduct}
          fetchProducts={fetchProduct}
        />
      </Dialog>
      <Dialog
        header='Edit Product'
        visible={visibleEditProduct}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '1rem',
          textAlign: 'center',
        }}
        onHide={() => setVisibleEditProduct(false)}
      >
        <EditProduct
          product_id={parent}
          setVisibleChange={setVisibleEditProduct}
          fetchProducts={fetchProduct}
        />
      </Dialog>
    </div>
  )
}

export default Manage
