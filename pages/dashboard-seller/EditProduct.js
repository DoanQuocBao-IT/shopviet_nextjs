import React, { useContext, useEffect, useState } from 'react'
import Form, { Field } from '../../components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import apiInstance from '../../api/apiInstance'
import { Dropdown } from 'primereact/dropdown'
import { LoadingContext } from '../../components/contexts/LoadingContext'
import { useToast } from '../../components/contexts/ToastContext'

const EditProduct = ({ product_id, setVisibleChange, fetchProducts }) => {
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [initialValues, setInitialValues] = useState({
    id: '',
    name: '',
    discount: '',
    description: '',
    province: '',
  })

  const [selectedBrand, setSelectedBrand] = useState(null)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [category, setCategory] = useState([])

  useEffect(() => {
    fetchCategory()
  }, [])

  const onSubmit = (data) => {
    data.discount = parseInt(data.discount)
    data.brand_id = parseInt(selectedBrand.id)
    data.category_id = parseInt(selectedCategory.id)
    console.log(JSON.stringify(data))
    handleEditProduct(data)
  }

  const fetchCategory = async () => {
    setLoading(true)
    try {
      const response = await apiInstance.get(`/shopviet/categories/child`)
      const data = response.data
      if (response.status == 200) {
        setCategory(
          data.data.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
          }))
        )
        fetchProductId()

      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const handleEditProduct = async (data) => {
    setLoading(true)
    try {
      const response = await apiInstance.put(
        `/seller/product/${product_id}`,
        data
      )
      if (response.status == 200) {
        showToast('success', 'Edit product success', '')
        setVisibleChange(false)
        fetchProducts()
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const fetchProductId = async () => {
    try {
      const response = await apiInstance.get(
        `/shopviet/edit_product/${product_id}`
      )
      const data = response.data.data
      if (response.status == 200) {
        setInitialValues({
          id: data.id,
          name: data.name,
          discount: data.discount,
          description: data.description,
          province: data.province,
        })
        setSelectedBrand(data.brand)
        setSelectedCategory(data.category)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <Form onSubmit={onSubmit} initialValue={initialValues}>
        <div id='form-item-container'>
          <Field name='name' label='Name' required>
            <InputText />
          </Field>
        </div>
        <div id='form-item-container'>
          <Field name='description' label='Description' required>
            <InputText />
          </Field>
        </div>
        <div id='form-item-container'>
          <Field name='province' label='Province' required>
            <InputText />
          </Field>
        </div>
        <div id='form-item-container'>
          <Field name='discount' label='Discount' required>
            <InputText type='number' />
          </Field>
        </div>
        <div id='form-item-container'>
          <span className='p-float-label'>
            <Dropdown
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.value)}
              options={category}
              optionLabel='name'
              placeholder='Select a Category'
              className='w-full md:w-14rem'
            />
            <label htmlFor='dd-city'>Select a Category</label>
          </span>
        </div>
        <div id='form-item-container'>
          <Button label='Submit' type='submit' />
        </div>
      </Form>
    </div>
  )
}

export default EditProduct
