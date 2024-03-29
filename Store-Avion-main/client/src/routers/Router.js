import React from 'react'
import { Navigate, useRoutes, BrowserRouter } from 'react-router-dom'

import HomePage from '../pages/HomePage/HomePage'
import Layout from '../layouts/Layout'

const HomePage = React.lazy(
  () => import(/* webpackChunkName: "HomePage" */ '../pages/HomePage/HomePage'),
)
const Layout = React.lazy(
  () => import(/* webpackChunkName: "Layout" */ 'Layout'),
)

const CartPage = React.lazy(
  () => import(/* webpackChunkName: "CartPage" */ '../pages/CartPage/index'),
)
const FavoritesPage = React.lazy(
  () => import(/* webpackChunkName: "FavoritesPage" */ '../pages/FavoritesPage/FavoritesPage'),
)
const CategoryPage = React.lazy(
  () => import(/* webpackChunkName: "CategoryPage" */ '../pages/CategoryPage/CategoryPage'),
)
const ProductPage = React.lazy(
  () => import(/* webpackChunkName: "ProductPage" */ '../pages/ProductPage/ProductPage'),
)

const AllProductsPage = React.lazy(
  () => import(/* webpackChunkName: "AllProductsPage" */ '../pages/AllProductsPage/AllProductsPage.js'),
)

const AuthPage = React.lazy(
  () => import(/* webpackChunkName: "AuthPage" */ '../pages/AuthPage/AuthPage'),
)

const OrderPage = React.lazy(
  () => import(/* webpackChunkName: "OrderPage" */ '../pages/OrderPage/OrderPage'),
)
const AboutPage = React.lazy(
  () => import(/* webpackChunkName: "AboutPage" */ '../pages/AboutPage/AboutPage'),
)
const PageNotFound = React.lazy(
  () => import(/* webpackChunkName: "PageNotFound" */ '../pages/PageNotFound/PageNotFound'),
)
const PrivacyPage = React.lazy(
  () => import(/* webpackChunkName: "PrivacyPage" */ '../pages/PrivacyPage/PrivacyPage'),
)
const ScrollToTop = React.lazy(
  () => import(/* webpackChunkName: "ScrollToTop" */ './ScrollToTop'),
)
const ProfilePage = React.lazy(
  () => import(/* webpackChunkName: "ProfilePage" */ '../pages/ProfilePage/ProfilePage'),
)
const ContactUs = React.lazy(
  () => import(/* webpackChunkName: "ContactUs" */ '../pages/ContacUs/index.js'),
)


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
      <React.Suspense fallback={<div>Loading...</div>}>
        <ScrollToTop />
        <Routes />
      </React.Suspense >      
    </BrowserRouter>
  )
}
