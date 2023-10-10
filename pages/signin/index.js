import React, { useContext, useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Controller, useForm } from 'react-hook-form'
import { Password } from 'primereact/password'
import Form, { Field } from '../../components/react-hook-form/Form'
import { Checkbox } from 'primereact/checkbox'
import Link from 'next/link'
import store from '../../store/store'
import { LoadingContext } from '../../components/contexts/LoadingContext'
import { useToast } from '../../components/contexts/ToastContext'
import apiInstance from '../../api/apiInstance'
import { login } from '../../store/slices/authSlice'
import { useRouter } from 'next/router'

const SignInPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [initialValues, setInitialValues] = useState({})
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const router=useRouter()
  
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()
  useEffect(() => {
    setLoading(true)
    setIsAuthenticated(store.getState().auth.isAuthenticated)
    setInitialValues({
      username: localStorage.getItem('username') || '',
      password: localStorage.getItem('password') || '',
      remember: true,
    })
    if (isAuthenticated) {
      router.push('/landing')
      setLoading(false)
    }
    setLoading(false)
  }, [isAuthenticated])
  const onSubmit = (data) => {
    handleLogin(data)
  }
  const handleLogin = async (data) => {
    setLoading(true)
    try {
      if (data.remember) {
        localStorage.setItem('username', data.username)
        localStorage.setItem('password', data.password)
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
      }
      console.log(data)
      let { remember, ...rest } = data
      console.log('rest', rest)
      const response = await apiInstance.post('/auth/login', rest, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('response', response)
      if (response.status === 200) {
        const { accessToken, refreshToken, fullName, image, roles } =
          response.data
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        store.dispatch(
          login({ accessToken, refreshToken, image, fullName, roles })
        )
        setIsAuthenticated(store.getState().auth.isAuthenticated)
        showToast('success', 'Đăng nhập thành công ', response.data.detail)
        setLoading(false)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showToast('error', 'Đăng nhập thất bại', error.response.data.detail)
        setLoading(false)
      } else {
        showToast(
          'error',
          'Lỗi trong quá trình đăng nhập',
          `Vui lòng đăng nhập lại ${error}`
        )
        setLoading(false)
      }
    }
  }
  return (
    <div id='signin-container'>
      <div id='signin-form'>
        <div id='signin-title'>
          <h1>Welcome back to Rareblocks UI Kit</h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} defaultValues={initialValues}>
          <div id='form'>
            <div className='grid' id='width-100-center'>
              <div className='col-12' id='width-100-center'>
                <Field
                  name='username'
                  label='Email address'
                  control={control}
                  required
                  errors={errors}
                >
                  <InputText type='text' style={{ width: '100%' }} />
                </Field>
              </div>
            </div>
            <div className='grid' id='width-100-center'>
              <div className='col-12' id='width-100-center'>
                <Field
                  name='password'
                  label='Password(8 characters minimum)'
                  control={control}
                  required
                  errors={errors}
                >
                  <Password type='password' style={{ width: '100%' }} />
                </Field>
              </div>
            </div>
            <div className='grid' id='top-1'>
              <div className='col-6' id='checkbox'>
                <Field
                  name='remember'
                  label='Remember me'
                  control={control}
                  errors={errors}
                >
                  <Checkbox
                    inputId='remember'
                    checked
                    onChange={(e) => onChange(e.checked)}
                  />
                </Field>
              </div>
              <div className='col-6' id='forgot-title'>
                <Link href='/landing'>Forgot password?</Link>
              </div>
            </div>
            <div className='grid'>
              <div className='col-12' id='multi-color-border-login'>
                <Button
                  type='submit'
                  label='Sign in'
                  severity='secondary'
                  raised
                  id='button-dark'
                />
              </div>
            </div>
            <div className='grid' id='top-8'>
              <div className='col-12' id='signup-title'>
                Don't have an account?
                <Link href='/landing'> Sign up now</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div id='signin-slogan'>Slogandwdad</div>
    </div>
  )
}

export default SignInPage
