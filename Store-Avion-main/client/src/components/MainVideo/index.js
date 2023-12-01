import React from 'react'
import styles from './MainImage.module.scss'
import { NavLink } from 'react-router-dom'
import mainVideo1 from './video/MainVideo1.mp4'

function MainVideo() {
  return (
    <div className={styles.container}>
      <video
        autoPlay
        loop
        muted
        playsInline
        title="Main video"
        className={styles.videoBackground}
      >
        <source src={mainVideo1} type="video/mp4" />
        Ваш браузер не підтримує елемент <code>video</code>.
      </video>

      <div className={styles.text}>
        <h2>
          Luxury homeware for people
          <br />
          who love timeless design quality
        </h2>
        <h1>
          With our new collection, view over 400 bespoke pieces from homeware
          through to furniture today
        </h1>
        <p>Shop the new Autumn 2023 collection today</p>
        <NavLink to="/All-products/" className={styles.link}>
          <button className={styles.button}>View collection</button>
        </NavLink>
        <video autoPlay loop muted playsInline>
          <source src={mainVideo1} type="video/mp4" />
          Ваш браузер не підтримує елемент <code>video</code>.
        </video>
      </div>
    </div>
  )
}

export default MainVideo
