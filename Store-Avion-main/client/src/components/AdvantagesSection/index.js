import React from 'react'
import styles from './Advantages.module.scss'

export default function Advantages() {
  return (
    <div className={styles['advantages-container']}>
      <h3 className={styles['advantages-container-header']}>
        What makes our brand different
      </h3>
      <div className={styles['advantages-block']}>
        <div className={styles['advantages-block__item']}>
          <img src="../img/advantages/Delivery.png" alt="advantage" />
          <h4 className={styles['advantages-block__item__title']}>
            Next day as standard
          </h4>
          <p className={styles['advantages-block__item__text']}>
            Order before 3pm and get your order the next day as standard
          </p>
        </div>
        <div className={styles['advantages-block__item']}>
          <img src="../img/advantages/Checkmark--outline.png" alt="advantage" />
          <h4 className={styles['advantages-block__item__title']}>
            Made by true artisans
          </h4>
          <p className={styles['advantages-block__item__text']}>
            Handmade crafted goods made with real passion and craftmanship
          </p>
        </div>
        <div className={styles['advantages-block__item']}>
          <img src="../img/advantages/Purchase.png" alt="advantage" />
          <h4 className={styles['advantages-block__item__title']}>
            Unbeatable prices
          </h4>
          <p className={styles['advantages-block__item__text']}>
            For our materials and quality you won’t find better prices anywhere
          </p>
        </div>
        <div className={styles['advantages-block__item']}>
          <img src="../img/advantages/Sprout.png" alt="advantage" />
          <h4 className={styles['advantages-block__item__title']}>
            Recycled packaging
          </h4>
          <p className={styles['advantages-block__item__text']}>
            We use 100% recycled to ensure our footprint is more manageable
          </p>
        </div>
      </div>
    </div>
  )
}
