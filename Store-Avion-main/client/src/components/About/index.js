import React, { useEffect } from 'react'
import styles from './About.module.scss'

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.container__header}>
        A brand built on the love of craftmanship, quality and outstanding
        customer service
      </h2>
      <div className={styles.container__sections}>
        <div className={styles.section}>
          <div className={styles.section__block}>
            <div className={styles.section__block__info}>
              <h4 className={styles.section__block__info__title}>
                From a studio in London to a global brand with <br /> over 400
                outlets
              </h4>
              <p className={styles.section__block__info__text}>
                When we started Avion, the idea was simple. Make high quality
                furniture affordable and available for the mass market.{' '}
              </p>
              <p className={styles.section__block__info__text}>
                Handmade, and lovingly crafted furniture and homeware is what we
                live, breathe and design so our Chelsea boutique become the
                hotbed for the London interior design community.
              </p>
            </div>
          </div>
          <img
            src="../img/about/About1.png"
            className={styles.section__block__img}
            alt="about"
          />
        </div>
        <div className={styles.section}>
          <img
            src="../img/about/About2.png"
            className={styles.section__block__img}
            alt="about"
          />
          <div className={styles.section__block}>
            <div className={styles.section__block__info}>
              <h4 className={styles.section__block__info__title}>
                Our service isn’t just personal, it’s actually <br /> hyper
                personally exquisite
              </h4>
              <p className={styles.section__block__info__text}>
                When we started Avion, the idea was simple. Make high quality
                furniture affordable and available for the mass market.{' '}
              </p>
              <p className={styles.section__block__info__text}>
                Handmade, and lovingly crafted furniture and homeware is what we
                live, breathe and design so our Chelsea boutique become the
                hotbed for the London interior design community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
