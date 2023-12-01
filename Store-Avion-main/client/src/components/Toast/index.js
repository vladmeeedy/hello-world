import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CloseBtnIcon from '../Icons/CloseBtnIcon'
import styles from './Toast.module.scss'
import SuccessIcon from '../Icons/SuccessIcon'
import { useSpring, animated } from 'react-spring'
import { IoIosCloseCircle } from 'react-icons/io'

export default function Toast({
  message,
  duration = 2300,
  onClose,
  errorStatus,
}) {
  const [progress, setProgress] = useState(100)
  const [animationStatus, setAnimationStatus] = useState('forward')
  const [animationStarted, setAnimationStarted] = useState(false)

  const props = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: async (next, cancel) => {
      if (animationStatus === 'forward') {
        await next({ transform: 'translateX(0%)' })
        setAnimationStarted(true)
        await new Promise((resolve) => setTimeout(resolve, duration))
        setAnimationStatus('reverse')
      } else {
        await next({ transform: 'translateX(-100%)' })
        await new Promise((resolve) => setTimeout(resolve, 500))
        setAnimationStarted(false)
        setAnimationStatus('forward')
      }
    },
    onRest: () => {
      if (animationStatus === 'reverse') {
        onClose && onClose()
      }
    },
    config: { duration: 500 },
  })

  useEffect(() => {
    let interval

    const startInterval = async () => {
      if (animationStarted) {
        interval = setInterval(() => {
          setProgress((prevProgress) => prevProgress - 100 / (duration / 100))
        }, 100)
      }
    }
    startInterval()

    return () => {
      clearInterval(interval)
    }
  }, [duration, onClose, animationStarted])

  return (
    <div>
      <animated.div style={props} className={styles.toastContainer}>
        <div className={styles.toast}>
          <span
            className={styles.btn__close}
            data-testid="btn-close"
            onClick={onClose}
          >
            <CloseBtnIcon></CloseBtnIcon>
          </span>
          <div className={styles.toast__message}>
            <div className={styles.toast__message__icon}>
              {errorStatus ? (
                <IoIosCloseCircle
                  className={styles.toast__message__iconError}
                  size={30}
                />
              ) : (
                <SuccessIcon className={styles.toast__message__icon} />
              )}
            </div>
            <p className={styles.toast__message__text}>{message}</p>
          </div>
          {errorStatus ? (
            <div
              className={styles.toast__progress__bar__error}
              style={{ width: `${progress}%` }}
            />
          ) : (
            <div
              className={styles.toast__progress__bar}
              style={{ width: `${progress}%` }}
            />
          )}
        </div>
      </animated.div>
    </div>
  )
}

Toast.propTypes = {
  message: PropTypes.string,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  errorStatus: PropTypes.bool,
}
