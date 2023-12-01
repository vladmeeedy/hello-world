import React from 'react'
import styles from './Profile.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from './InputProfile'
import { ChangeCustomer } from '../../Redux/reducers/userReducers'
import PropTypes from 'prop-types'

function UpdateProfile({ setFormStatus, handleButtonClick }) {
  const dispatch = useDispatch()

  const handleSubmit = (updatedCustomer) => {
    dispatch(ChangeCustomer(updatedCustomer))
      .then((savedCustomer) => {
        setFormStatus({
          type: 'success',
          message: 'You are successfully updated',
        })
        handleButtonClick()
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const massageData = err.response.data
          const objectKey = Object.keys(massageData)[0]
          const errorMessage = massageData[objectKey]
          setFormStatus({
            type: 'error',
            message: `Update failed! ${errorMessage}`,
          })
          handleButtonClick(true)
        } else {
          setFormStatus({
            type: 'error',
            message: 'Update failed due to an unknown error.',
          })
          handleButtonClick(true)
        }
      })
  }

  const customer = useSelector((state) => state.store.user).data

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setFieldValue('avatarUrl', reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: customer.firstName || '',
          lastName: customer.lastName || '',
          login: customer.login || '',
          email: customer.email || '',
          telephone: customer.telephone || '',
          avatarUrl: customer.avatarUrl || '',
          avatarFile: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .min(2, 'Must be more than 1 characters')
            .required('Firstname is required')
            .matches(/^[^\p{P}\p{S}\d]+$/u, 'Invalid firstname format'),
          lastName: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .min(2, 'Must be more than 1 character')
            .required('Lastname is required')
            .matches(/^[^\p{P}\p{S}\d]+$/u, 'Invalid lastname format'),
          login: Yup.string()
            .max(10, 'Login must be between 3 and 10 characters')
            .min(3, 'Login must be between 3 and 10 characters')
            .matches(/^[a-zA-Z0-9]+$/, 'Invalid login format')
            .required('Email is required'),
          email: Yup.string()
            .matches(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Invalid email format',
            )
            .required('Email is required'),
        })}
      >
        {(formikProps) => (
          <Form className={styles.profile} noValidate>
            <div className={styles.profile__container}>
              <div className={styles.profile__content}>
                <h2 className={styles.profile__title}>Profile photo</h2>
                <div className={styles.profile__user}>
                  <img
                    className={styles.profile__img}
                    src={formikProps.values.avatarUrl}
                    alt="Profile"
                  />
                  <label
                    htmlFor="avatarFile"
                    className={styles.profile__fileLabel}
                  >
                    Choose file
                  </label>
                  <input
                    id="avatarFile"
                    className={styles.profile__input1}
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleFileChange(event, formikProps.setFieldValue)
                    }
                  />
                </div>
                <p className={styles.profile__info}>Maximum photo size 5MB</p>
                <h3 className={styles.profile__title__name}>
                  Personal information
                </h3>
                <p className={styles.profile__title}>First name</p>
                <Field
                  className={styles.profile__input}
                  type="text"
                  data-testid="first-name-input"
                  name="firstName"
                  component={Input}
                />
                <p className={styles.profile__title}>Last name</p>
                <Field
                  className={styles.profile__input}
                  type="text"
                  data-testid="last-name-input"
                  name="lastName"
                  component={Input}
                />
                <p className={styles.profile__title}>Login</p>
                <Field
                  className={styles.profile__input}
                  type="text"
                  data-testid="login-input"
                  name="login"
                  component={Input}
                />
                <p className={styles.profile__title}>Email</p>
                <Field
                  className={styles.profile__input}
                  type="email"
                  data-testid="email-input"
                  name="email"
                  component={Input}
                />
                <div>
                  <button className={styles.profile__btn2} type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

UpdateProfile.propTypes = {
  formStatus: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  setFormStatus: PropTypes.func,
  handleButtonClick: PropTypes.func,
}

export default UpdateProfile
