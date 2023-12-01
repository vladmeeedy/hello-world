import React from 'react'
import { Navigate, useRoutes, BrowserRouter } from 'react-router-dom'

import Layout from '../layouts/Layout'
import HomePage from '../pages/HomePage/HomePage'
import CartPage from '../pages/CartPage/index'
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage'
import CategoryPage from '../pages/CategoryPage/CategoryPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import AllProductsPage from '../pages/AllProductsPage/AllProductsPage.js'
import AuthPage from '../pages/AuthPage/AuthPage'
import OrderPage from '../pages/OrderPage/OrderPage'
import AboutPage from '../pages/AboutPage/AboutPage'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import PrivacyPage from '../pages/PrivacyPage/PrivacyPage'
import ScrollToTop from './ScrollToTop'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import ContactUs from '../pages/ContacUs/index.js'

function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <Navigate to="home/" /> },
        { path: 'home/', element: <HomePage /> },
        { path: 'cart/', element: <CartPage /> },
        { path: 'favorites/', element: <FavoritesPage /> },
        { path: 'login/', element: <AuthPage /> },
        { path: 'All-products/', element: <AllProductsPage /> },
        { path: 'orders/', element: <OrderPage /> },
        { path: 'category/:categoryId', element: <CategoryPage /> },
        { path: 'products/:productId', element: <ProductPage /> },
        { path: 'about-us/', element: <AboutPage /> },
        { path: 'privacy-page/', element: <PrivacyPage /> },
        { path: 'profile/', element: <ProfilePage /> },
        { path: 'contacts', element: <ContactUs /> },
        { path: '*', element: <PageNotFound /> },
      ],
    },
  ])
}

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes />
    </BrowserRouter>
  )
}
