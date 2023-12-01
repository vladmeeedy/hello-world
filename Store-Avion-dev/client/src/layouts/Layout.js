import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Footer } from '../components/Footer/Footer'
import { fetchProducts } from '../Redux/reducers/productsReducers'
import { useDispatch } from 'react-redux'
import styles from './Layout.module.scss'

export default function Layout() {
  const dispatch = useDispatch()

  function getProducts() {
    dispatch(fetchProducts())
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer></Footer>
      </div>
    </>
  )
}
