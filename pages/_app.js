import React, { useState } from 'react'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'font-awesome/css/font-awesome.min.css'
import '../styles/globals.scss'
import Layout from '../components/layout/Layout'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../store/store'
import { LoadingProvider } from '../components/contexts/LoadingContext'
import ToastProvider from '../components/contexts/ToastContext'

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <ToastProvider>
            <LoadingProvider>
              {loading && (
                <div className='loading-overlay'>
                  <ProgressSpinner />
                </div>
              )}
              <Component {...pageProps} />
            </LoadingProvider>
          </ToastProvider>
        </Layout>
      </PersistGate>
    </Provider>
  )
}
