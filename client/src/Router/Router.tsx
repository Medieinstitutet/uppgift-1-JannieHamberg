import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import HomePage from "../pages/HomePage";
import { WebShopPage } from "../pages/WebShopPage";
import { ErrorPage } from "../pages/ErrorPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { SuccessPage } from "../pages/Success";
import { ContactPage } from "../pages/ContactPage";
import { AdminPage } from "../pages/AdminPage";
import { AboutPage } from "../pages/AboutPage";
import { PolicyPage } from "../pages/PolicyPage";
import { FaqPage } from "../pages/FaqPage";
import { ShippingPage } from "../pages/ShippingPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [ 
            {
                path: "/",
                element: <HomePage />,
                index: true,
            },
            {
                path: "/webshop",
                element: <WebShopPage />
            },
            {
                path: "/shoppingcart",
                element: <ShoppingCartPage />
            },
            {
                path: "/success",
                element: <SuccessPage />
            },
            {
                path: "/contact",
                element: <ContactPage />
            },
            {
                path: "/admin",
                element: <AdminPage />
            }, 
            {
                path: "/about",
                element: <AboutPage />
            }, 
            {
                path: "/policy",
                element: <PolicyPage />
            }, 
            {
                path: "/faq",
                element: <FaqPage />
            }, 
            {
                path: "/shipping",
                element: <ShippingPage />
            }, 


        ]
    }

])