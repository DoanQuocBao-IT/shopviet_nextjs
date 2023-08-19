import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Controller, useForm } from 'react-hook-form'
import { Password } from 'primereact/password'
import { classNames } from 'primereact/utils'
import Form, { Field } from '../../components/react-hook-form/Form'
import { Checkbox } from 'primereact/checkbox'
import Link from 'next/link'

const SignUpPage = () => {
  const defaultValues = {
    checked: false,
  }
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <div id='signup-container'>
      <div id='signup-form'>
        <div id='signup-title'>
          <h1>Welcome back to Rareblocks UI Kit</h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
          <div id='form'>
            <div className='grid' id='width-100-center-signup'>
              <div className='col-12' id='width-100-center-signup'>
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
            <div className='grid' id='width-100-center-signup'>
              <div className='col-12' id='width-100-center-signup'>
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
            <div className='grid' id='top-1-signup'>
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
