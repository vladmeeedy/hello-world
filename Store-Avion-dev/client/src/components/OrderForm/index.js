import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { HOST } from '../Token'
import Input from '../Input'
import styles from './OrderForm.module.scss'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../Redux/reducers/cartReducer'
import { changeData } from '../../Redux/reducers/userReducers'

export default function OrderForm(props) {
  const userStatus = useSelector((state) => state.store.user.status)
  const userData = useSelector((state) => state.store.user.data)
  const cartReducer = useSelector((state) => state.store.cart.cart)
  const products = useSelector((state) => state.store.products.data)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const dispatch = useDispatch()

  const sendOrder = async (newOrder) => {
    try {
      await axios.post(HOST + '/orders', newOrder)
      props.changeFormStatus('success', 'Thank you for your order!')
      dispatch(clearCart())

      if (userStatus) {
        await deleteCart()

        if (
          !Object.prototype.hasOwnProperty.call(userData, 'deliveryAddress')
        ) {
          await axios
            .put(HOST + '/customers', {
              deliveryAddress: newOrder.deliveryAddress,
            })
            .then((UpdatedCustomer) => {
              dispatch(changeData(UpdatedCustomer.data))
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
      props.changeVisibilityToast()
    } catch (err) {
      setFormStatus({
        type: 'error',
        massage:
          'The order has not been processed. Check that the entered data is correct',
      })
      console.log(err)
    }
  }
  const deleteCart = async () => {
    try {
      await axios.delete(HOST + '/cart')
    } catch (err) {
      console.log(err)
    }
  }

  const findProductsInCart = () => {
    const mergedObjects = []
    for (const productInCart of cartReducer) {
      const matchingProduct = products.find(
        (product) => product._id === productInCart.product,
      )
      if (matchingProduct) {
        mergedObjects.push({
          product: matchingProduct,
          cartQuantity: productInCart.cartQuantity,
        })
      }
    }
    return mergedObjects
  }

  const handleSubmit = async (orderInfo) => {
    if (userStatus) {
      const { email, telephone, country, city, address, postal } = orderInfo
      const newOrder = {
        customerId: userData._id,
        deliveryAddress: {
          country: country,
          city: city,
          address: address,
          postal: postal,
        },
        email: email,
        canceled: false,
        mobile: telephone,
        letterSubject: 'Thank you for order! You are welcome!',
        letterHtml: '<h1>Your order is placed.</h1>',
      }
      await sendOrder(newOrder)
    } else {
      const {
        firstName,
        lastName,
        email,
        telephone,
        country,
        city,
        address,
        postal,
      } = orderInfo
      const products = findProductsInCart()
      const newOrder = {
        products: products,
        deliveryAddress: {
          country: country,
          city: city,
          address: address,
          postal: postal,
        },
        firstName: firstName,
        lastName: lastName,
        email: email,
        canceled: false,
        mobile: telephone,
        letterSubject: 'Thank you for order! You are welcome!',
        letterHtml: '<h1>Your order is placed.</h1>',
      }
      await sendOrder(newOrder)
    }
  }

  return (
    <>
      {formStatus.type === 'error' && (
        <div className={styles['order__text-container']}>
          <h1
            className={`${styles['order-text']} ${styles['order-text--error']}`}
          >
            {formStatus.massage}
          </h1>
        </div>
      )}
      <div className={styles['order__text-container']}>
        <h1 className={styles['order-text']}>
          Fill the required fields to order
        </h1>
      </div>
      <Formik
        initialValues={{
          ...(userStatus
            ? {
                email: userData.email,
                telephone: userData.telephone,
                country: Object.prototype.hasOwnProperty.call(
                  userData,
                  'deliveryAddress',
                )
                  ? userData.deliveryAddress.country
                  : '',
                city: Object.prototype.hasOwnProperty.call(
                  userData,
                  'deliveryAddress',
                )
                  ? userData.deliveryAddress.city
                  : '',
                address: Object.prototype.hasOwnProperty.call(
                  userData,
                  'deliveryAddress',
                )
                  ? userData.deliveryAddress.address
                  : '',
                postal: Object.prototype.hasOwnProperty.call(
                  userData,
                  'deliveryAddress',
                )
                  ? userData.deliveryAddress.postal
                  : '',
              }
            : {
                firstName: '',
                lastName: '',
                email: '',
                telephone: '',
                country: '',
                city: '',
                address: '',
                postal: '',
              }),
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          ...(userStatus
            ? {}
            : {
                firstName: Yup.string()
                  .max(25, 'Must be 25 characters or less')
                  .min(2, 'Must be more than 1 character')
                  .required('Firstname is required')
                  .matches(/^[^\p{P}\p{S}\d]+$/u, 'Invalid firstname format'),
                lastName: Yup.string()
                  .max(25, 'Must be 25 characters or less')
                  .min(2, 'Must be more than 1 character')
                  .required('Lastname is required')
                  .matches(/^[^\p{P}\p{S}\d]+$/u, 'Invalid lastname format'),
              }),
          email: Yup.string()
            .matches(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Invalid email format',
            )
            .required('Email is required'),
          telephone: Yup.string()
            .matches(
              /^\+380\d{3}\d{2}\d{2}\d{2}$/,
              'Invalid mobile format. Example: +380501231212',
            )
            .required('Mobile is required'),
          country: Yup.string()
            .required('Country is required')
            .max(30, 'Must be 30 characters or less')
            .matches(
              /^[a-zA-Zа-яА-ЯїЇіІєЄёЁ\s'.,-]+$/u,
              'Invalid country format',
            ),
          city: Yup.string()
            .required('City address is required')
            .max(30, 'Must be 30 characters or less')
            .matches(/^[a-zA-Zа-яА-ЯїЇіІєЄёЁ\s'.,-]+$/u, 'Invalid city format'),
          address: Yup.string()
            .required('Address is required')
            .max(30, 'Must be 30 characters or less')
            .matches(
              /^[a-zA-Zа-яА-ЯїЇіІєЄёЁ0-9\s'.,-]+$/u,
              'Invalid address format',
            ),
          postal: Yup.string()
            .required('Delivery postal is required')
            .matches(/^[0-9]*$/, 'postal must contain only numbers')
            .max(5, 'The maximum length of the postal is 5 characters'),
        })}
      >
        <Form className={styles['form__user-address']} noValidate>
          {!userStatus && (
            <>
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
            </>
          )}
          <Field
            type="email"
            placeholder="Email"
            name="email"
            component={Input}
          />
          <Field
            type="tel"
            placeholder="Mobile"
            name="telephone"
            component={Input}
          />
          <Field
            type="text"
            placeholder="Country"
            name="country"
            component={Input}
          />
          <Field type="text" placeholder="City" name="city" component={Input} />
          <Field
            type="text"
            placeholder="Address"
            name="address"
            component={Input}
          />
          <Field
            type="text"
            placeholder="Postal"
            name="postal"
            component={Input}
          />
          <div className={styles['btn-container']}>
            <button className={styles['btn-send--order']} type="submit">
              Send
            </button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

OrderForm.propTypes = {
  changeFormStatus: PropTypes.func,
  changeVisibilityToast: PropTypes.func,
  formStatus: PropTypes.object,
}
