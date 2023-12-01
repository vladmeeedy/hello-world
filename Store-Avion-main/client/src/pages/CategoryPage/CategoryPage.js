import React, { useEffect, useState } from 'react'
import styles from '../../components/AllProductsContainer/AllProductsContainer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFilter,
  // toggleCategory,
} from '../../Redux/reducers/FilterReducers.js'
import { NavLink, useParams } from 'react-router-dom'

export default function CategoryPage() {
  let { categoryId } = useParams()
  const dispatch = useDispatch()
  const list = useSelector((state) => state.filters.data)
  const [, setShowLoadMore] = useState(true)
  const [previousLength, setPreviousLength] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const filters = useSelector((state) => state.filters)

  if (categoryId === 'plant-pots') {
    categoryId = 'plant pots'
  }

  if (categoryId === 'nightstands') {
    categoryId = 'nightstand'
  }
  const upperCaseCategoryId =
    categoryId.charAt(0).toUpperCase() + categoryId.slice(1)

  useEffect(() => {
    // dispatch(toggleCategory(upperCaseCategoryId))
    const params = { ...filters }
    const newCategories = {}
    newCategories[upperCaseCategoryId] = true
    params.categories = newCategories
    dispatch(fetchFilter(params))
  }, [upperCaseCategoryId])

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
    <div className={styles['products-container-container']}>
      {isLoading ? (
        <div className={styles.loading}>Загрузка данных...</div>
      ) : (
        <div className={styles['products-container']}>
          {list !== undefined &&
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
            ))}
        </div>
      )}
    </div>
  )
}
