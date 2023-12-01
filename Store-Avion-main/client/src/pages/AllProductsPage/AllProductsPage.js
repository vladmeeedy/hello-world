import React from 'react'
import styles from '../AllProductsPage/AllProductsPage.module.scss'
import logoHeader from '../../components/AllProductsContainer/img/AllProducts.png'
import AllProductsContainer from '../../components/AllProductsContainer'
import FilterProductContainer from '../../components/AllProductsContainer/FilterProductContainer'

export default function AllProductsPage() {
  return (
    <>
      <div className={styles['centered-container']}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            style={{ width: '100%', height: '209px', maxWidth: '1440px' }}
            className="header__logo"
            src={logoHeader}
            alt="AllProducts"
          />
          <div className={styles['header__logo-text']}>All products</div>
        </div>
        <div className={styles['products-container']}>
          <FilterProductContainer style={{ width: '100%' }} />
          <AllProductsContainer style={{ width: '100%' }} />
        </div>
      </div>
    </>
  )
}
