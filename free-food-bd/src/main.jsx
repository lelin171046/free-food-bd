import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import AuthProvider from './Provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {  RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'




const queryClient = new QueryClient()





createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <Toaster></Toaster>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster /> {/* Add Toaster here to provide toast notifications */}
    </AuthProvider>
  </StrictMode>,
)
