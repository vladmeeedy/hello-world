import React from 'react'
import PropTypes from 'prop-types'
import styles from './Profile.module.scss'

export default function Input(props) {
  const { field, form, ...rest } = props
  const { name } = field

  return (
    <>
      <input {...field} {...rest} className={styles.profile__input} />
      {form.errors[name] && form.touched[name] && (
        <div className={styles.profile__error}>{form.errors[name]}</div>
      )}
    </>
  )
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
}
