import React, { useEffect, useState } from 'react'
import styles from './AllProductsContainer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleItems,
  toggleAddItems,
  fetchFilter,
} from '../../Redux/reducers/FilterReducers.js'
import { NavLink } from 'react-router-dom'

export default function AllProductsContainer() {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.filters.data)
  const [items, setItems] = useState(9)
  const [addItems, setAdditems] = useState(0)
  const [, setShowLoadMore] = useState(true)
  const [previousLength, setPreviousLength] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const categories = useSelector((state) => state.filters.categories)
  const prices = useSelector((state) => state.filters.prices)
  const brands = useSelector((state) => state.filters.brands)
  const selectedCategories = []
  const selectedPrices = []
  const selectedBrands = []

  for (const category in categories) {
    if (categories[category] === true) {
      selectedCategories.push(category)
    }
  }

  for (const price in prices) {
    if (prices[price] === true) {
      selectedPrices.push(price)
    }
  }

  for (const brand in brands) {
    if (brands[brand] === true) {
      selectedBrands.push(brand)
    }
  }

  const [showScrollButton, setShowScrollButton] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShowScrollButton(true)
    } else {
      setShowScrollButton(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function buttonClick() {
    setItems(items)
    setAdditems(addItems + 6)
    if (!showScrollButton) {
      setShowScrollButton(true)
    }
  }

  async function getProducts() {
    try {
      await dispatch(fetchFilter({ items, addItems })) // Wait for the asynchronous action to complete
      dispatch(toggleItems(items))
      dispatch(toggleAddItems(addItems))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [items, addItems])

  useEffect(() => {
    if (list?.length === previousLength) {
      setShowLoadMore(false)
    } else {
      setPreviousLength(list?.length)
    }
  }, [list])

  useEffect(() => {
    if (list !== undefined) {
      setIsLoading(false)
    }
  }, [list])

  return (
    <div
      data-testid="data-products-container"
      className={styles['products-container-container']}
    >
      {isLoading ? (
        <div className={styles.loading}>Загрузка данных...</div>
      ) : (
        <div className={styles['products-container']}>
          {list !== undefined && list?.length > 0 ? (
            list?.map((product, index) => (
              <NavLink
                to={`/products/${product.id}`}
                key={product.id}
                className={styles['products-container-item']}
              >
                <img
                  src={
                    product.imageUrls
                      ? product.imageUrls[0]
                      : `${product.imageUrls}`
                  }
                  className={styles['products-container-item-img']}
                />
                <p className={styles['products-container-item-name']}>
                  {product.name}
                </p>
                <p className={styles['products-container-item-price']}>
                  $ {product.currentPrice}
                </p>
              </NavLink>
            ))
          ) : (
            <div className={styles['products-container-item']}>
              <p className={styles['products-container-item-name']}>
                No products found
              </p>
            </div>
          )}
        </div>
      )}
      {selectedCategories.length === 0 &&
        selectedPrices.length === 0 &&
        selectedBrands.length === 0 &&
        list.length !== 71 && (
          <button
            className={styles['products-container-btn']}
            onClick={buttonClick}
          >
            Load more
          </button>
        )}
      {showScrollButton && (
        <button
          className={styles['scroll-to-top-button']}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Scroll to Top
        </button>
      )}
    </div>
  )
}
