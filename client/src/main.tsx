import React from 'react'
import ReactDOM from 'react-dom/client'
import './Styles/tailwind.css';
import './Styles/style.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Router.tsx'
import CartProvider from './Context/CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
   <RouterProvider router={router} />
   </CartProvider>
  </React.StrictMode>
)