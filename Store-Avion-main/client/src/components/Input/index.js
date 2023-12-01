import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'
import ShowPasswordIcon from '../Icons/ShowPasswordIcon'
import HiddenPasswordIcon from '../Icons/HiddenPasswordIcon'
import InputMask from 'react-input-mask'

export default function Input(props) {
  const [visibilityPassword, setVisibilityPassword] = useState(false)
  const { field, form, ...rest } = props
  const { name } = field

  const toggleVisibilityPassword = () => {
    setVisibilityPassword((prevState) => !prevState)
  }

  return (
    <div className={styles['input-container']}>
      <label>
        {name === 'telephone' && (
          <InputMask
            mask="+380999999999"
            maskChar="_"
            {...field}
            {...rest}
            type="tel"
            className={styles['form-input']}
          />
        )}
        {name === 'postal' && (
          <InputMask
            mask="99999"
            maskChar={null}
            {...field}
            {...rest}
            type="text"
            className={styles['form-input']}
          />
        )}
        {name !== 'telephone' && name !== 'postal' && (
          <input
            {...field}
            {...rest}
            type={
              (name === 'password' || name === 'repeatPassword') &&
              !visibilityPassword
                ? 'password'
                : 'text'
            }
            autoComplete="current-password"
            className={styles['form-input']}
          />
        )}
        {(name === 'password' || name === 'repeatPassword') &&
          !visibilityPassword && (
            <span
              className={styles['icon-password']}
              onClick={toggleVisibilityPassword}
            >
              <ShowPasswordIcon />
            </span>
          )}
        {(name === 'password' || name === 'repeatPassword') &&
          visibilityPassword && (
            <span
              className={styles['icon-password']}
              onClick={toggleVisibilityPassword}
            >
              <HiddenPasswordIcon />
            </span>
          )}
        {form.errors[name] && form.touched[name] && (
          <div className={styles['text-error']}>{form.errors[name]}</div>
        )}
      </label>
    </div>
  )
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
}
