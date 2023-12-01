import React from 'react'
import axios from 'axios'
import { HOST } from '../Token'
import styles from './Profile.module.scss'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from './InputProfile'
import PropTypes from 'prop-types'

function UpdatePassword({ formStatus, setFormStatus, handleButtonClick }) {
  const handleSuccess = (message) => {
    setFormStatus({ type: 'success', message })
  }

  const handleError = (error) => {
    let errorMessage = 'Update failed due to an unknown error.'
    if (error.response && error.response.data) {
      const messageData = error.response.data
      const objectKey = Object.keys(messageData)[0]
      errorMessage = `Update failed! ${messageData[objectKey]}`
      handleButtonClick(true)
    }
    setFormStatus({ type: 'error', message: errorMessage })
    handleButtonClick(true)
  }

  const handleSubmit = (passwords, { resetForm }) => {
    axios
      .put(HOST + '/customers/password', passwords)
      .then((response) => {
        const result = response.data
        if (result.password) {
          handleSuccess(result.password)
          handleButtonClick(true)
        } else {
          handleSuccess(result.message)
          handleButtonClick()
        }
      })
      .catch((error) => {
        handleError(error)
        handleButtonClick(true)
      })

    resetForm()
  }

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          updatePassword: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          password: Yup.string()
            .matches(
              /^[a-zA-Z0-9]+$/,
              'Allowed characters for password are a-z, A-Z, 0-9.',
            )
            .required('Password is required')
            .max(30, 'Password must be between 7 and 30 characters')
            .min(7, 'Password must be between 7 and 30 characters'),
          newPassword: Yup.string()
            .matches(
              /^[a-zA-Z0-9]+$/,
              'Allowed characters for password are a-z, A-Z, 0-9.',
            )
            .required('Password is required')
            .max(30, 'Password must be between 7 and 30 characters')
            .min(7, 'Password must be between 7 and 30 characters'),
          updatePassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Password is required'),
        })}
      >
        <Form className={styles.profile} noValidate>
          <div className={styles.profile__container}>
            <div className={styles.profile__content}>
              <h3 className={styles.profile__title__name}>Change password</h3>
              <p className={styles.profile__title}>Current password</p>
              <Field
                className={styles.profile__input3}
                type="password"
                placeholder="Enter current password"
                name="password"
                component={Input}
              />
              <p className={styles.profile__title}>New password</p>
              <Field
                className={styles.profile__input3}
                type="password"
                placeholder="Enter new password"
                name="newPassword"
                component={Input}
              />
              <p className={styles.profile__title}>Confirm the password</p>
              <Field
                className={styles.profile__input3}
                type="password"
                placeholder="Confirm new password"
                name="updatePassword"
                component={Input}
              />
              <button className={styles.profile__btn2} type="submit">
                Save
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
UpdatePassword.propTypes = {
  formStatus: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  setFormStatus: PropTypes.func,
  handleButtonClick: PropTypes.func,
}

export default UpdatePassword
