import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from "./components/Layout.jsx";
import NuevoCliente,{action as nuevoClienteAction} from "./pages/NuevoCliente.jsx";
import Index,{loader as clientesLoader} from "./pages/Index.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from "./pages/EditarCliente.jsx";
import {action as eliminarClienteAction} from "./components/Cliente.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {index:true,element:<Index/>,loader:clientesLoader,errorElement:<ErrorPage/>},
            {path: '/clientes/nuevo', element: <NuevoCliente/>,action:nuevoClienteAction},
            {path:'/clientes/:clienteId/editar',element:<EditarCliente/>,loader:editarClienteLoader,
            action:editarClienteAction,errorElement:<ErrorPage/>},
            {path: '/clientes/:clienteId/eliminar',action:eliminarClienteAction}
        ]
    },

])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
