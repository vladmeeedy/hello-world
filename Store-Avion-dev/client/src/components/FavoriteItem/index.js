import React from 'react'
import PropTypes from 'prop-types'
import styles from './FavoriteItem.module.scss'
import { NavLink } from 'react-router-dom'
import { removeFromWishlist } from '../../Redux/reducers/wishlistReducers'
import { useDispatch, useSelector } from 'react-redux'

export default function FavoriteItem(props) {
  const dispatch = useDispatch()
  const userStatus = useSelector((state) => state.store.user.status)

  function deleteFavItem() {
    if (userStatus) {
      dispatch(removeFromWishlist(props.product._id))
    }
  }
  return (
    <>
      {' '}
      <div className={styles['favourite-item-wrapper']}>
        <NavLink
          className={styles['favourite-item']}
          to={`/products/${props.product.id}`}
        >
          <img
            className={styles['favourite-img']}
            src={props.product.imageUrls[0]}
          />
          <div className={styles['favourite-item-description']}>
            <h3 className={styles['favourite-item-heading']}>
              {props.product.name}
            </h3>
            <p className={styles['favourite-item-text']}>
              {props.product.description}
            </p>
            <p className={styles['favourite-item-price']}>
              {props.product.currentPrice}$
            </p>
          </div>
        </NavLink>
        <svg
          data-testid="close-icon"
          className={styles['favourite-close-icon']}
          onClick={() => {
            deleteFavItem()
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          x="0"
          y="0"
          viewBox="0 0 50 50"
        >
          <path d="M7.719 6.281L6.28 7.72 23.563 25 6.28 42.281 7.72 43.72 25 26.437 42.281 43.72l1.438-1.438L26.437 25 43.72 7.719 42.28 6.28 25 23.563z"></path>
        </svg>
      </div>
    </>
  )
}

FavoriteItem.propTypes = {
  product: PropTypes.object,
}
