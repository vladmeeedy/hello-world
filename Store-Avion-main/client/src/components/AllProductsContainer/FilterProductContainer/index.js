import React, { useState, useEffect } from 'react'
import styles from './FilterProductContainer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFilter,
  toggleBrand,
  toggleCategory,
  togglePrice,
} from '../../../Redux/reducers/FilterReducers'
import { useSearchParams } from 'react-router-dom'

export default function FilterProductContainer() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)
  const { categories, brands, prices } = filters
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 375)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 375)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [, setSearchParams] = useSearchParams()

  const [checkCategory, setCheckCategory] = useState([])
  const [checkBrand, setCheckBrand] = useState([])
  const [checkPrice, setCheckPrice] = useState([])

  useEffect(() => {
    const params = {}
    if (checkCategory.length > 0) {
      params.categories = checkCategory.join(',')
    }
    if (checkBrand.length > 0) {
      params.brands = checkBrand.join(',')
    }
    if (checkPrice.length > 0) {
      params.prices = checkPrice.join(',')
    }

    const search = new URLSearchParams(params).toString()
    setSearchParams(search)
  }, [checkCategory, checkBrand, checkPrice, setSearchParams])

  const handleCategoryChange = (category) => {
    if (!checkCategory.includes(category)) {
      setCheckCategory([...checkCategory, category])
    } else {
      const index = checkCategory.indexOf(category)
      checkCategory.splice(index, 1)
      setCheckCategory([...checkCategory])
    }

    dispatch(toggleCategory(category))
    const params = { ...filters }
    params.categories = { ...filters.categories }
    params.categories[category] = !params.categories[category]
    dispatch(fetchFilter(params))
  }

  const handleBrandChange = (brand) => {
    if (!checkBrand.includes(brand)) {
      setCheckBrand([...checkBrand, brand])
    } else {
      const index = checkBrand.indexOf(brand)
      checkBrand.splice(index, 1)
      setCheckBrand([...checkBrand])
    }

    dispatch(toggleBrand(brand))
    const params = { ...filters }
    params.brands = { ...filters.brands }
    params.brands[brand] = !params.brands[brand]
    dispatch(fetchFilter(params))
  }

  const handlePriceChange = (price) => {
    dispatch(togglePrice(price))
    const params = { ...filters }
    params.prices = { ...filters.prices }
    params.prices[price] = !params.prices[price]
    dispatch(fetchFilter(params))

    if (!checkPrice.includes(price)) {
      setCheckPrice([...checkPrice, price])
    } else {
      const index = checkPrice.indexOf(price)
      checkPrice.splice(index, 1)
      setCheckPrice([...checkPrice])
    }
  }

  return (
    <>
      <div className={styles['products-container-container']}>
        <div className={styles['products-container']}>
          <h1 className={styles['products-header']}>Categories</h1>
          {isMobileView ? (
            <div className={styles['products-container-mobile']}>
              {Object.keys(categories).map((category) => (
                <span key={category}>
                  <input
                    type="checkbox"
                    checked={categories[category]}
                    onChange={() => handleCategoryChange(category)}
                    className={styles['products-checkbox']}
                  />
                  {category}
                </span>
              ))}
            </div>
          ) : (
            <div className={styles['products-container']}>
              {Object.keys(categories).map((category) => (
                <span key={category}>
                  <input
                    type="checkbox"
                    checked={categories[category]}
                    onChange={() => handleCategoryChange(category)}
                    className={styles['products-checkbox']}
                  />
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles['products-container']}>
          <h1 className={styles['products-header']}>Brand</h1>
          {isMobileView ? (
            <div className={styles['products-container-mobile']}>
              {Object.keys(brands).map((brand) => (
                <span key={brand}>
                  <input
                    type="checkbox"
                    checked={brands[brand]}
                    onChange={() => handleBrandChange(brand)}
                    className={styles['products-checkbox']}
                  />
                  {brand}
                </span>
              ))}
            </div>
          ) : (
            <div className={styles['products-container']}>
              {Object.keys(brands).map((brand) => (
                <span key={brand}>
                  <input
                    type="checkbox"
                    checked={brands[brand]}
                    onChange={() => handleBrandChange(brand)}
                    className={styles['products-checkbox']}
                  />
                  {brand}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles['products-container']}>
          {' '}
          <h1 className={styles['products-header']}>Price</h1>
          {isMobileView ? (
            <div className={styles['products-container-mobile']}>
              {Object.keys(prices).map((price) => (
                <span key={price}>
                  <input
                    type="checkbox"
                    checked={prices[price]}
                    onChange={() => handlePriceChange(price)}
                    className={styles['products-checkbox']}
                  />
                  {price}
                </span>
              ))}
            </div>
          ) : (
            <div className={styles['products-container']}>
              {Object.keys(prices).map((price) => (
                <span key={price}>
                  <input
                    type="checkbox"
                    checked={prices[price]}
                    onChange={() => handlePriceChange(price)}
                    className={styles['products-checkbox']}
                  />
                  {price}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
