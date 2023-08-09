import React from 'react'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { LayoutProvider } from '../layout/context/layoutcontext'
export default function MyApp({ Component, pageProps }) {
  return (
    <LayoutProvider>
      <Component {...pageProps} />
    </LayoutProvider>
  )
}
