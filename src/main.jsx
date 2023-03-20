import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout'
import Index, { loader as clientesLoader } from './components/pages/Index'
import ErrorPage from "./components/ErrorPage"
import NuevoCliente, { action as nuevoClienteAction } from './components/pages/NuevoCliente'
import EditarCliente, { loader as editarClienteLoader, action as editarClienteAction } from './components/pages/EditarCliente'
import { action as eliminarClienteAction } from './components/Cliente'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader, // Loader para obtener datos de una API u objeto (similar state) - GET
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction, // Action para procesar entrada de datos de un formulario - POST
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/eliminar',
        element: <Index />,
        action: eliminarClienteAction,
        errorElement: <ErrorPage />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)