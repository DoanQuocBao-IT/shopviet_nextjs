import React, { useContext, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Controller, useForm } from 'react-hook-form'
import { Password } from 'primereact/password'
import { classNames } from 'primereact/utils'
import Form, { Field } from '../../components/react-hook-form/Form'
import { Checkbox } from 'primereact/checkbox'
import Link from 'next/link'
import apiInstance from '../../api/apiInstance'
import { useRouter } from 'next/router'
import { SelectButton } from 'primereact/selectbutton'
import { useToast } from '../../components/contexts/ToastContext'
import { LoadingContext } from '../../components/contexts/LoadingContext'

const SignUpPage = () => {
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const router = useRouter()
  const defaultValues = {
    checked: false,
  }
  const onSubmit = (data) => {
    handleRegister(data)
  }
  const handleRegister = async (data) => {
    setLoading(true)
    try {
      let { accept, confirmPassword, ...rest } = data
      const response = await apiInstance.post('/auth/register', rest)
      console.log('response', response.data)
      if (response.status === 200) {
        showToast('success', 'Register successfully', 'Success')
        router.push('/signin')
      } else {
        showToast(
          'warn',
          'Confirm account information email',
          response.data.detail
        )
      }
    } catch (error) {
      showToast('error', 'Register failed', 'Error')
    }
    setLoading(false)
  }
  const [value, setValue] = useState(null)
  const items = [
    { name: 'Buyer', value: 'buyer' },
    { name: 'Seller', value: 'seller' },
    { name: 'Deliverer', value: 'shipper' },
  ]
  return (
    <div id='signup-container'>
      <div id='signup-form'>
        <div id='signup-title'>
          <h1>Welcome back to ShopViet</h1>
        </div>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <div id='form'>
            <div className='grid' id='width-100-center-signup'>
              <div className='col-12' id='width-100-center-signup'>
                <Field name='username' label='Username' required>
                  <InputText type='text' style={{ width: '100%' }} />
                </Field>
              </div>
            </div>
            <div className='grid' id='width-100-center-signup'>
              <div className='col-12' id='width-100-center-signup'>
                <Field name='password' label='Password' required>
                  <Password type='password' style={{ width: '100%' }} />
                </Field>
              </div>
            </div>
            <div className='grid' id='width-100-center-signup'>
              <div className='col-12' id='width-100-center-signup'>
                <Field name='confirmPassword' label='Confirm Password' required>
                  <Password type='password' style={{ width: '100%' }} />
                </Field>
              </div>
            </div>
            <div className='grid' id='width-100-center-signup'>
              <div className='col-12' id='width-100-center-signup'>
                <Field name='fname' label='Full Name' required>
                  <InputText type='text' style={{ width: '100%' }} />
                </Field>
              </div>
            </div>
            <div className='grid' id='width-100-center-signup'>
              <div className='col-12' id='width-100-center-signup'>
                <Field name='phone' label='Phone Number' required>
                  <InputText type='text' style={{ width: '100%' }} />
                </Field>
              </div>
            </div>
            <div className='grid' id='width-100-center-signup'>
              <div className='col-12' id='width-100-center-signup'>
                <Field name='email' label='Email address' required>
                  <InputText type='text' style={{ width: '100%' }} />
                </Field>
              </div>
            </div>
            <div className='grid' id='accept-signup'>
              <div className='col-12' id='checkbox-signup'>
                <Field name='accept'>
                  <Checkbox
                    inputId='accept'
                    checked
                    onChange={(e) => onChange(e.checked)}
                  />
                </Field>
              </div>
              <div id='text-accept-signup'>
                I accept the terms and conditions
              </div>
            </div>
            <div className='grid' id='width-100-center-signup'>
              <div className='col-12' id='width-100-center-signup'>
                <Field name='roleName' required>
                  <SelectButton
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    optionLabel='name'
                    options={items}
                  />
                </Field>
              </div>
            </div>
            <div className='grid'>
              <div className='col-12' id='multi-color-border-login'>
                <Button
                  type='submit'
                  label='Sign up'
                  severity='secondary'
                  raised
                  id='button-dark'
                />
              </div>
            </div>
            <div className='grid' id='top-8-signup'>
              <div className='col-12' id='signin-title'>
                Don't have an account?
                <Link href='/landing'> Sign in now</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div id='signup-slogan'>Slogandwdad</div>
    </div>
  )
}

export default SignUpPage
