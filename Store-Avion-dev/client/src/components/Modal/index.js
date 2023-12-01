import React from 'react'
import styles from './Modal.module.scss'
import CloseBtnIcon from '../Icons/CloseBtnIcon'
import PropTypes from 'prop-types'

export default function Modal({ closeModal, removeOrder }) {
  return (
    <div className={styles.container} onClick={closeModal}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <span
          className={styles.btn__close}
          data-testid="btn-close"
          onClick={closeModal}
        >
          <CloseBtnIcon></CloseBtnIcon>
        </span>
        <h3 className={styles.modal__title}>Sure you want to delete?</h3>
        <div className={styles.modal__text}>
          Are you sure you want to delete this?
        </div>
        <div className={styles.modal__btn}>
          <button className={styles.modal__btn__confirm} onClick={removeOrder}>
            Yes, confirm
          </button>
          <button className={styles.modal__btn__cancel} onClick={closeModal}>
            No, cancel
          </button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  removeOrder: PropTypes.func,
}
