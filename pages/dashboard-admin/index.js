import React, { useContext, useEffect, useRef, useState } from 'react'
import Menu from '../../components/layout/Menu'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import apiInstance from '../../api/apiInstance'
import { Button } from 'primereact/button'
import LocaleHelper from '../../components/locale/LocaleHelper'
import { LoadingContext } from '../../components/contexts/LoadingContext'
import { useToast } from '../../components/contexts/ToastContext'
import { Dialog } from 'primereact/dialog'
import Form, { Field } from '../../components/react-hook-form/Form'
import { InputText } from 'primereact/inputtext'
import Image from 'next/image'

const ManagementAdmin = () => {
  const [category, setCategory] = useState([])
  const [expandedRows, setExpandedRows] = useState(null)
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [visible, setVisible] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [parent, setParent] = useState(0)
  const [image, setImage] = useState(
    'https://res.cloudinary.com/dpuuzww3f/image/upload/v1703942305/cld-sample-5.jpg'
  )
  const inputRef = useRef(null)

  const [initialValues, setInitialValues] = useState({})

  const onTabChange = (e) => {
    console.log(e)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    setLoading(true)
    try {
      const response = await apiInstance.get(`/shopviet/categories/parent`)
      const data = response.data.data
      if (response.status === 200) {
        setCategory(data)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleUpdateCategory = async (data) => {
    setLoading(true)
    data.image = image
    data.parent_id = parent
    console.log(JSON.stringify(data))
    try {
      const response = await apiInstance.put(`/admin/category/${parent}`, data)
      if (response.status == 200) {
        showToast('success', response.data.message)
        setVisibleUpdate(false)
        setImage(null)
        fetchCategory()
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleDeleteCategory = async (id) => {
    setLoading(true)
    try {
      const response = await apiInstance.delete(`/admin/category/${id}`)
      if (response.status == 200) {
        showToast('success', response.data.message)
        fetchCategory()
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleCreateCategory = async (data) => {
    setLoading(true)
    data.image = image
    data.parent_id = parent
    console.log(JSON.stringify(data))
    try {
      const response = await apiInstance.post(`/admin/category`, data)
      if (response.status === 200) {
        showToast('success', response.data.message)
        setVisible(false)
        setImage(null)
        fetchCategory()
      }
    } catch (error) {
      showToast('error', 'Lỗi trong quá trình tạo category', error)
    }
    setLoading(false)
  }

  const items = [
    {
      name: 'Manage Category',
      image: 'pi pi-fw pi-home',
      child_items: [
        {
          name: 'Main Category',
          image: 'pi pi-fw pi-home',
        },
        {
          name: 'Sub Category',
          image: 'pi pi-fw pi-bolt',
        },
      ],
    },
    {
      name: 'Product',
      image: 'pi pi-fw pi-calendar',
      child_items: [
        {
          name: 'Product',
          image: 'pi pi-fw pi-calendar',
        },
        {
          name: 'Flash Sale',
          image: 'pi pi-fw pi-calendar-plus',
        },
      ],
    },
    {
      name: 'Brand',
      image: 'pi pi-fw pi-question',
    },
    {
      name: 'User',
      image: 'pi pi-fw pi-cog',
    },
  ]

  const expandAll = () => {
    let _expandedRows = {}

    category.forEach((p) => (_expandedRows[`${p.id}`] = true))

    setExpandedRows(_expandedRows)
  }

  const collapseAll = () => {
    setExpandedRows(null)
  }

  const onRowExpand = (event) => {}

  const onRowCollapse = (event) => {}

  const allowExpansion = (rowData) => {
    return rowData.child.length > 0
  }

  const header = (
    <div id='header-table-container'>
      <div>
        <Button
          icon='pi pi-plus'
          className='p-button-rounded p-button-info'
          onClick={() => {
            setVisible(true)
            setParent(0)
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

  const formatStatus = (category) => {
    if (category.status === 1) {
      return (
        <span className='p-tag p-tag-success' style={{ padding: '.2rem' }}>
          Active
        </span>
      )
    } else {
      return (
        <span className='p-tag p-tag-danger' style={{ padding: '.2rem' }}>
          Inactive
        </span>
      )
    }
  }

  const formatDateCreated = (date) => {
    return LocaleHelper.formatDateTime(new Date(date.created_at))
  }

  const formatDateUpdated = (date) => {
    return LocaleHelper.formatDateTime(new Date(date.updated_at))
  }

  const formatImage = (category) => {
    return (
      <img
        src={category.image}
        alt={category.image}
        style={{ width: '3rem', height: '2rem', objectFit: 'cover' }}
      />
    )
  }

  const formatAction = (data) => {
    return (
      <div id='action-container'>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success'
          onClick={() => {
            setVisibleUpdate(true)
            setInitialValues({
              name: data.name,
              description: data.description,
            })
            setImage(data.image)
            setParent(data.id)
          }}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          onClick={() => {
            handleDeleteCategory(data.id)
          }}
        />
      </div>
    )
  }

  const formatPriority = (category) => {
    if (category.priority === 0) {
      return (
        <span className='p-tag p-tag-danger' style={{ padding: '.2rem' }}>
          Low
        </span>
      )
    }
    if (category.priority === 1) {
      return (
        <span className='p-tag p-tag-success' style={{ padding: '.2rem' }}>
          High
        </span>
      )
    }
    if (category.priority === 2) {
      return (
        <span className='p-tag p-tag-warning' style={{ padding: '.2rem' }}>
          Medium
        </span>
      )
    }
  }

  const customBase64Uploader = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 2000000) {
        showToast('error', 'File size must be less than 2MB')
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64Data = e.target.result
        setImage(base64Data)
      }
      reader.readAsDataURL(file)
    }
  }

  const rowExpansionTemplate = (data) => {
    return (
      <div id='table-child-container'>
        <div id='header-table-child-container'>
          <h5>Child category of {data.name}</h5>
          <Button
            icon='pi pi-plus'
            className='p-button-rounded p-button-info'
            onClick={() => {
              setVisible(true)
              setParent(data.id)
            }}
          />
        </div>
        <div>
          <DataTable value={data.child}>
            <Column field='id' header='ID' sortable style={{ width: '5%' }} />
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
              style={{ width: '15%' }}
            />
            <Column
              field='description'
              header='Description'
              style={{ width: '25%' }}
            />

            <Column
              field='status'
              header='Status'
              sortable
              body={formatStatus}
              style={{ width: '5%' }}
            />
            <Column
              field='priority'
              header='Priority'
              sortable
              body={formatPriority}
              style={{ width: '5%' }}
            />
            <Column
              field='created_at'
              header='Created At'
              sortTable
              body={formatDateCreated}
              style={{ width: '15%' }}
            />
            <Column
              field='updated_at'
              header='Updated At'
              sortTable
              body={formatDateUpdated}
              style={{ width: '15%' }}
            />
            <Column
              body={formatAction}
              style={{ width: '10%', textAlign: 'center' }}
            />
          </DataTable>
        </div>
      </div>
    )
  }

  return (
    <div className='layout-content'>
      <div className='layout-content-flex'>
        <div className='layout-content-menu'>
          <Menu onTabChange={onTabChange} items={items} />
        </div>
        <div className='layout-content'>
          <h1>Management Admin</h1>
          <DataTable
            value={category}
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
            <Column expander={allowExpansion} style={{ width: '0%' }} />
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
              style={{ width: '15%' }}
            />
            <Column
              field='description'
              header='Description'
              style={{ width: '25%' }}
            />

            <Column
              field='status'
              header='Status'
              sortable
              body={formatStatus}
              style={{ width: '5%' }}
            />
            <Column
              field='priority'
              header='Priority'
              sortable
              body={formatPriority}
              style={{ width: '5%' }}
            />
            <Column
              field='created_at'
              header='Created At'
              sortTable
              body={formatDateCreated}
              style={{ width: '10%' }}
            />
            <Column
              field='updated_at'
              header='Updated At'
              sortTable
              body={formatDateUpdated}
              style={{ width: '10%' }}
            />
            <Column
              body={formatAction}
              style={{ width: '10%', textAlign: 'center' }}
            />
          </DataTable>
          <Dialog
            header='Header'
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <Form onSubmit={handleCreateCategory}>
              <div id='form'>
                <div className='grid' id='width-100-center'>
                  <div id='image-category-container'>
                    <Image
                      src={
                        image != null
                          ? image
                          : 'https://res.cloudinary.com/dpuuzww3f/image/upload/v1703942265/samples/cloudinary-icon.png'
                      }
                      alt={
                        image != null
                          ? image
                          : 'https://res.cloudinary.com/dpuuzww3f/image/upload/v1703942265/samples/cloudinary-icon.png'
                      }
                      width={50}
                      height={50}
                      onClick={() => {
                        inputRef.current.click()
                      }}
                    />
                  </div>

                  <div className='col-12' id='width-100-center'>
                    <input
                      type='file'
                      accept='image/*'
                      ref={inputRef}
                      onChange={customBase64Uploader}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
                <div className='grid' id='width-100-center'>
                  <div className='col-12' id='width-100-center'>
                    <Field name='name' label='Name' required>
                      <InputText type='text' style={{ width: '100%' }} />
                    </Field>
                  </div>
                </div>
                <div className='grid' id='width-100-center'>
                  <div className='col-12' id='width-100-center'>
                    <Field name='description' label='Description' required>
                      <InputText type='text' style={{ width: '100%' }} />
                    </Field>
                  </div>
                </div>

                <div className='grid'>
                  <div className='col-12' id='multi-color-border-login'>
                    <Button
                      type='submit'
                      label='Create'
                      severity='secondary'
                      raised
                      id='button-dark'
                    />
                  </div>
                </div>
              </div>
            </Form>
          </Dialog>
          <Dialog
            header='Header'
            visible={visibleUpdate}
            onHide={() => setVisibleUpdate(false)}
          >
            <Form onSubmit={handleUpdateCategory} initialValue={initialValues}>
              <div id='form'>
                <div className='grid' id='width-100-center'>
                  <div id='image-category-container'>
                    <Image
                      src={
                        image != null
                          ? image
                          : 'https://res.cloudinary.com/dpuuzww3f/image/upload/v1703942265/samples/cloudinary-icon.png'
                      }
                      alt={
                        image != null
                          ? image
                          : 'https://res.cloudinary.com/dpuuzww3f/image/upload/v1703942265/samples/cloudinary-icon.png'
                      }
                      width={50}
                      height={50}
                      onClick={() => {
                        inputRef.current.click()
                      }}
                    />
                  </div>

                  <div className='col-12' id='width-100-center'>
                    <input
                      type='file'
                      accept='image/*'
                      ref={inputRef}
                      onChange={customBase64Uploader}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
                <div className='grid' id='width-100-center'>
                  <div className='col-12' id='width-100-center'>
                    <Field name='name' label='Name' required>
                      <InputText type='text' style={{ width: '100%' }} />
                    </Field>
                  </div>
                </div>
                <div className='grid' id='width-100-center'>
                  <div className='col-12' id='width-100-center'>
                    <Field name='description' label='Description' required>
                      <InputText type='text' style={{ width: '100%' }} />
                    </Field>
                  </div>
                </div>

                <div className='grid'>
                  <div className='col-12' id='multi-color-border-login'>
                    <Button
                      type='submit'
                      label='Update'
                      severity='secondary'
                      raised
                      id='button-dark'
                    />
                  </div>
                </div>
              </div>
            </Form>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default ManagementAdmin
