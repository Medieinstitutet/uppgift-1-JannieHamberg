import { Footer } from "../Components/Footer"
import { NavBar } from "../Components/NavBar"
import { Outlet } from "react-router-dom"
import CartProvider from "../Context/CartContext"

export const Layout = () => {
    
    return (
        <div className="w-screen">
            <CartProvider>
            <NavBar />
            <Outlet />
            <Footer />
            </CartProvider>
        </div>
    )
}