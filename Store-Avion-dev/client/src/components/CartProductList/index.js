import styles from './CartProductList.module.scss'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import deleteIcon from './icons8-delete.svg'
import {
  removeFromCart,
  incrementQuantity,
  dicrementQuantity,
} from '../../Redux/reducers/cartReducer'
import { useDispatch } from 'react-redux'
export default function CartProductList({
  img,
  name,
  quantity,
  price,
  discribe,
  id,
}) {
  const [shortenedDescription, setShortenedDescription] = useState(discribe)
  const dispatch = useDispatch()

  const handleDescription = () => {
    if (discribe.length > 20) {
      setShortenedDescription(discribe.slice(0, 50) + '...')
    }
  }

  const totalPriceOneProduct = quantity * price

  useEffect(() => {
    handleDescription()
  }, [])
  return (
    <div className={styles['cart-product-container']}>
      <img
        className={styles['delete-icon']}
        src={deleteIcon}
        onClick={() => dispatch(removeFromCart(id))}
      />
      <div className={styles['photo-and-text-section']}>
        <img className={styles['product-photo']} src={img[0]} />
        <div className={styles['cart-product-info-box']}>
          <p className={styles['cart-product-name']}>{name}</p>
          <p className={styles['cart-product-discribe']}>
            {shortenedDescription}
          </p>
          <p className={styles['cart-product-price']}>{price}$</p>
        </div>
      </div>
      <div className={styles['cart-product-quantity']}>
        <button
          onClick={() => {
            dispatch(dicrementQuantity(id))
          }}
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          onClick={() => {
            dispatch(incrementQuantity(id))
          }}
        >
          +
        </button>
      </div>
      <p className={styles['total-price-one-product']}>
        {totalPriceOneProduct && Math.round(totalPriceOneProduct * 100) / 100}$
      </p>
    </div>
  )
}
CartProductList.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  discribe: PropTypes.string.isRequired,
  increase: PropTypes.func,
  id: PropTypes.string.isRequired,
}
