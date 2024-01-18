import React, { useContext, useRef, useState } from 'react'
import apiInstance from '../../api/apiInstance'
import Form, { Field } from '../../components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { LoadingContext } from '../../components/contexts/LoadingContext'
import { useToast } from '../../components/contexts/ToastContext'

const NewBrand = ({ setVisibleChange, fetchProducts }) => {
  const inputRef = useRef()
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const onSubmit = (data) => {
    data.image = productImage
    console.log(JSON.stringify(data))
    handleAddBrand(data)
  }

  const handleAddBrand = async (data) => {
    setLoading(true)
    try {
      const response = await apiInstance.post('/seller/brand', data)
      if (response.status == 200) {
        showToast('success', 'Add brand success', '')
        setVisibleChange(false)
        fetchProducts()
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const [productImage, setProductImage] = useState('')
  const customBase64Uploader = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 3048576) {
        showToast('error', t('upload_image_fail'), t('max_size_image'))
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64Data = e.target.result
        setProductImage(base64Data)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div
          id='background-club-container'
          onClick={() => {
            inputRef.current.click()
          }}
        >
          <img
            src={
              productImage !== ''
                ? productImage
                : 'https://res.cloudinary.com/dpuuzww3f/image/upload/v1703942265/samples/cloudinary-icon.png'
            }
            alt='background-club'
          />
          <div id='file-upload'>
            <i className='pi pi-camera'></i>
          </div>
        </div>
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={customBase64Uploader}
          style={{ display: 'none' }}
        />
        <div id='form-item-container'>
          <Field name='name' label='Name' required>
            <InputText />
          </Field>
        </div>
        <div id='form-item-container'>
          <Button label='Submit' type='submit' />
        </div>
      </Form>
    </div>
  )
}

export default NewBrand
