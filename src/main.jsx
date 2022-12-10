import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NewCustomer, {action as newCustomerAction} from './pages/NewCustomer'
import Index, {loader as customersLoader} from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditCustomer, {loader as editCustomerLoader, action as editCustomerAction} from './pages/EditCustomer'
import { action as deleteCustomerAction } from './components/Customer'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Layout /> ,
    children: [
      {
        index: true,
        element: <Index />,
        loader: customersLoader,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo', 
        element: <NewCustomer />,
        action: newCustomerAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:id/editar',
        element: <EditCustomer/>,
        loader: editCustomerLoader,
        action: editCustomerAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:id/delete',
        // element: <EditCustomer/>,
        // loader: editCustomerLoader,
        action: deleteCustomerAction,
        // errorElement: <ErrorPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
)
