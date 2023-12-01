import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { HOST } from '../Token'
import styles from './RegisterForm.module.scss'
import Input from '../Input'
import axios from 'axios'
import PropTypes from 'prop-types'

export default function RegisterForm(props) {
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })

  const handleSubmit = (customerInfo, { resetForm }) => {
    if (customerInfo.password === customerInfo.repeatPassword) {
      const customerData = {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        login: customerInfo.login,
        email: customerInfo.email,
        password: customerInfo.password,
        telephone: customerInfo.telephone,
      }
      axios
        .post(HOST + '/customers', customerData)
        .then((savedCustomer) => {
          props.changeFormStatus('success', 'You are successfully registered')
          props.changeVisibilityToast()
          props.setActiveBtnSignIn()
          resetForm()
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            const massageData = err.response.data
            const objectKey = Object.keys(massageData)[0]
            const errorMessage = massageData[objectKey]
            setFormStatus({
              type: 'error',
              message: `Registration failed! ${errorMessage}`,
            })
          } else {
            setFormStatus({
              type: 'error',
              message: 'Registration failed due to an unknown error.',
            })
          }
        })
    } else {
      setFormStatus({
        type: 'error',
        message:
          'The passwords do not match. Please check the entered data in the appropriate fields.',
      })
    }
  }

  return (
    <>
      {formStatus.type !== null && (
        <p
          className={`${styles['form-massage']} ${
            formStatus.type === 'error' && styles['form-massage__error']
          }`}
        >
          {formStatus.message}
        </p>
      )}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          login: '',
          email: '',
          password: '',
          repeatPassword: '',
          telephone: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .min(2, 'Must be more than 1 characters')
            .required('First name is required')
            .matches(/^[^\p{P}\p{S}\d]+$/u, 'Invalid firstname format'),
          lastName: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .min(2, 'Must be more than 1 character')
            .required('Last name is required')
            .matches(/^[^\p{P}\p{S}\d]+$/u, 'Invalid lastname format'),
          login: Yup.string()
            .max(10, 'Login must be between 3 and 10 characters')
            .min(3, 'Login must be between 3 and 10 characters')
            .matches(/^[a-zA-Z0-9]+$/, 'Invalid login format')
            .required('Login is required'),
          email: Yup.string()
            .matches(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Invalid email format',
            )
            .required('Email is required'),
          password: Yup.string()
            .matches(
              /^[a-zA-Z0-9]+$/,
              'Allowed characters for password is a-z, A-Z, 0-9.',
            )
            .required('Password is required')
            .max(30, 'Password must be between 7 and 30 characters')
            .min(7, 'Password must be between 7 and 30 characters'),
          repeatPassword: Yup.string()
            .matches(
              /^[a-zA-Z0-9]+$/,
              'Allowed characters for password is a-z, A-Z, 0-9.',
            )
            .required('Password is required')
            .max(30, 'Password must be between 7 and 30 characters')
            .min(7, 'Password must be between 7 and 30 characters'),
          telephone: Yup.string()
            .matches(
              /^\+380\d{3}\d{2}\d{2}\d{2}$/,
              'That is not a valid phone number. Example valid form number: +380501234567',
            )
            .required('Mobile is required'),
        })}
      >
        <Form className="form__user-register" noValidate>
          <Field
            type="text"
            placeholder="First name"
            name="firstName"
            component={Input}
          />
          <Field
            type="text"
            placeholder="Last name"
            name="lastName"
            component={Input}
          />
          <Field
            type="text"
            placeholder="Login"
            name="login"
            component={Input}
          />
          <Field
            type="email"
            placeholder="Email"
            name="email"
            component={Input}
          />
          <Field
            type="password"
            placeholder="Password"
            name="password"
            component={Input}
          />
          <Field
            type="password"
            placeholder="Repeat Password"
            name="repeatPassword"
            component={Input}
          />
          <Field
            type="tel"
            placeholder="Telephone"
            name="telephone"
            component={Input}
          />
          <div>
            <button className={styles['btn-send--register']} type="submit">
              Send
            </button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

RegisterForm.propTypes = {
  setActiveBtnSignIn: PropTypes.func,
  changeFormStatus: PropTypes.func,
  changeVisibilityToast: PropTypes.func,
}
