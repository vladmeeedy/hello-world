import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './NavContainer.module.scss'
import { NavLink } from 'react-router-dom'
import { fetchCategories } from '../../Redux/reducers/categoriesReducers'
import PropTypes from 'prop-types'

export default function NavContainer(props) {
  const categories = useSelector((state) => state.categories.categories)
  const dispatch = useDispatch()

  function getCategories() {
    dispatch(fetchCategories())
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <nav
      className={`${styles.nav} ${props.isMenuHidden ? styles.navDisplay : ''}`}
    >
      <ul className={styles.navList}>
        <NavLink
          className={`${styles.navLink} ${styles.navItemDisplay}`}
          to="/cart/"
        >
          <li className={styles.navItem}>Cart</li>
        </NavLink>
        <NavLink
          className={`${styles.navLink} ${styles.navItemDisplay}`}
          to="/favorites/"
        >
          <li className={`${styles.navItem} ${styles.navItemDisplay}`}>
            Favorites
          </li>
        </NavLink>
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={`/category/${category.id}/`}
            className={styles.navLink}
          >
            <li className={styles.navItem}>{category.name}</li>
          </NavLink>
        ))}
      </ul>
    </nav>
  )
}

NavContainer.propTypes = {
  isMenuHidden: PropTypes.bool.isRequired,
}
