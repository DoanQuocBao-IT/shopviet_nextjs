import React, { useContext, useEffect, useRef, useState } from 'react'
import Form, { Field } from '../../components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { Tooltip } from 'primereact/tooltip'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import apiInstance from '../../api/apiInstance'
import { ProgressBar } from 'primereact/progressbar'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { LoadingContext } from '../../components/contexts/LoadingContext'
import { useToast } from '../../components/contexts/ToastContext'

const NewProduct = ({id, setVisibleChange, fetchProducts }) => {
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [productTypes, setProductTypes] = useState([])
  const [values, setValues] = useState({
    image: '',
    name: '',
    price: '',
    quantity: '',
  })
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [category, setCategory] = useState([])

  const onSubmit = (data) => {
    data.discount = parseInt(data.discount)
    data.brand_id = parseInt(id)
    data.category_id = parseInt(selectedCategory.id)
    data.productTypes = productTypes
    console.log(JSON.stringify(data))
    handleAddProduct(data)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

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
            total_product: item.total_product,
          }))
        )
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleAddProduct = async (data) => {
    setLoading(true)
    try {
      const response = await apiInstance.post('/seller/product', data)
      if (response.status == 200) {
        showToast('success', 'Add product success', '')
        setVisibleChange(false)
        fetchProducts()
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const toast = useRef(null)
  const [totalSize, setTotalSize] = useState(0)
  const fileUploadRef = useRef(null)

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize
    let files = e.files

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0
    })

    setTotalSize(_totalSize)
  }

  const onTemplateUpload = (e) => {
    let _totalSize = 0

    e.files.forEach((file) => {
      _totalSize += file.size || 0
    })
  
    setTotalSize(_totalSize)
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    })
  }

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size)
    productTypes.splice(productTypes.indexOf(file), 1)
    callback()
  }

  const onTemplateClear = () => {
    setTotalSize(0)
  }

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options
    const value = totalSize / 10000
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : '0 B'

    return (
      <div
        className={className}
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {chooseButton}
          {uploadButton}
          {cancelButton}
        </div>
        <div className='flex align-items-center gap-3 ml-auto'>
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: '10rem', height: '12px' }}
          ></ProgressBar>
        </div>
      </div>
    )
  }
  const getImageBase64 = (blobURL, callback) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const reader = new FileReader()
      reader.onloadend = function () {
        callback(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', blobURL)
    xhr.responseType = 'blob'
    xhr.send()
  }
  const itemTemplate = (file, props) => {
    getImageBase64(file.objectURL, (base64) => {
      handleChange('image', base64)
    })

    const handleChange = (field, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [field]: value,
      }))
    }

    const handleAddItem = () => {
      const newItem = {
        image: values.image,
        name: values.name,
        price: values.price,
        quantity: values.quantity,
        // Thêm các trường khác nếu cần
      }

      setProductTypes((prevProductTypes) => [...prevProductTypes, newItem])
      console.log(productTypes)
    }
    return (
      <div id='body-upload-type-product'>
        <div id='image-upload-type-product'>
          <img
            alt={file.name}
            role='presentation'
            src={file.objectURL}
            width={100}
          />
        </div>
        <span className='p-float-label'>
          <InputText
            id='name'
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <label htmlFor='name'>Name</label>
        </span>
        <span className='p-float-label'>
          <InputText
            id='price'
            type='number'
            onChange={(e) => handleChange('price', e.target.value)}
          />
          <label htmlFor='price'>Price</label>
        </span>
        <span className='p-float-label'>
          <InputText
            id='quantity'
            type='number'
            onChange={(e) => handleChange('quantity', e.target.value)}
          />
          <label htmlFor='quantity'>Quantity</label>
        </span>
        <Tag
          value={props.formatSize}
          severity='warning'
          className='px-3 py-2'
        />
        <Button
          type='button'
          icon='pi pi-plus'
          className='p-button-outlined p-button-rounded p-button-success ml-auto'
          onClick={() => {
            handleAddItem()
          }}
        />
        <Button
          type='button'
          icon='pi pi-times'
          className='p-button-outlined p-button-rounded p-button-danger ml-auto'
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    )
  }

  const emptyTemplate = () => {
    return (
      <div className='flex align-items-center flex-column'>
        <i
          className='pi pi-image mt-3 p-5'
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span
          style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
          className='my-5'
        >
          Drag and Drop Image Here
        </span>
      </div>
    )
  }

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  }
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className:
      'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  }
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className:
      'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
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
        <div>
          <Toast ref={toast}></Toast>

          <Tooltip
            target='.custom-choose-btn'
            content='Choose'
            position='bottom'
          />
          <Tooltip
            target='.custom-upload-btn'
            content='Upload'
            position='bottom'
          />
          <Tooltip
            target='.custom-cancel-btn'
            content='Clear'
            position='bottom'
          />

          <FileUpload
            ref={fileUploadRef}
            name='demo[]'
            url='/dashboard-seller'
            multiple
            accept='image/*'
            maxFileSize={1000000}
            onUpload={onTemplateUpload}
            onSelect={onTemplateSelect}
            onError={onTemplateClear}
            onClear={onTemplateClear}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            emptyTemplate={emptyTemplate}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
          />
        </div>
        <div id='form-item-container'>
          <Button label='Submit' type='submit' />
        </div>
      </Form>
    </div>
  )
}

export default NewProduct
