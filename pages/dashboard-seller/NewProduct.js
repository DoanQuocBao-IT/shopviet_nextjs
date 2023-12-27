import React, { useState } from 'react'
import Form, { Field } from '../../components/react-hook-form/Form'
import { Button } from 'primereact/button'
import AvatarEditor from 'react-avatar-editor'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import apiInstance from '../../api/apiInstance'

const NewProduct = ({ setVisibleChange, fetchProducts }) => {
  const onSubmit = (data) => {
    data.image = productImage
    data.price = parseInt(data.price)
    data.discount = parseInt(data.discount)
    data.quantity = parseInt(data.quantity)
    data.brand_id = parseInt(data.brand_id)
    console.log(data)
    handleAddProduct(data)
  }
  const handleAddProduct = async (data) => {
    try {
      const response = await apiInstance.post('/seller/product', data)
      if (response.status == 200) {
        setVisibleChange(false)
        fetchProducts()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const [productImage, setProductImage] = useState('')
  const customBase64Uploader = async (product) => {
    const file = product.files[0]
    const reader = new FileReader()

    let blob = await fetch(file.objectURL).then((r) => r.blob())

    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      const base64data = reader.result
      setProductImage(base64data)
    }
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <div>
          <AvatarEditor
            image={productImage}
            style={{ width: '100%', height: '100%', borderRadius: '15px' }}
            width={1200}
            height={630}
            scale={1}
          />
        </div>
        <div>
          <FileUpload
            mode='basic'
            name='demo[]'
            url='/dashboard-seller'
            accept='image/*'
            maxFileSize={1000000}
            onUpload={customBase64Uploader}
            auto
            chooseLabel='Choose'
          />
        </div>
        <div>
          <Field name='name' label='Name' required>
            <InputText />
          </Field>
        </div>
        <div>
          <Field name='price' label='Price' required>
            <InputText type='number' />
          </Field>
        </div>
        <div>
          <Field name='discount' label='Discount' required>
            <InputText type='number' />
          </Field>
        </div>
        <div>
          <Field name='quantity' label='Quantity' required>
            <InputText type='number' />
          </Field>
        </div>
        <div>
          <Field name='description' label='Description' required>
            <InputText />
          </Field>
        </div>
        <div>
          <Field name='brand_id' label='Brand' required>
            <InputText type='number' />
          </Field>
        </div>
        <div>
          <Button label='Submit' type='submit' />
        </div>
      </Form>
    </div>
  )
}

export default NewProduct
