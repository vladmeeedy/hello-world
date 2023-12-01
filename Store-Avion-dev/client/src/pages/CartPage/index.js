import styles from './CartPage.module.scss'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import CartProductList from '../../components/CartProductList/index.js'
import { HOST } from '../../components/Token'
import OrderForm from '../../components/OrderForm'
// eslint-disable-next-line
import { addArrayToCart } from '../../Redux/reducers/cartReducer.js'
import Toast from '../../components/Toast'

export default function Cart() {
  const [visibilityOrderForm, setVisibilityOrderForm] = useState(false)
  const cartReducer = useSelector((state) => state.store.cart.cart)
  const allProducts = useSelector((state) => state.store.products.data)
  const userStatus = useSelector((state) => state.store.user.status)
  const [showToast, setShowToast] = useState(false)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  // eslint-disable-next-line
  const dispatch = useDispatch()

  useEffect(() => {
    if (userStatus) {
      getChekCart()
    }
  }, [userStatus])

  useEffect(() => {
    const fetchData = async () => {
      if (userStatus) {
        try {
          const dataExist = await getCart()

          if (dataExist.data !== null) {
            await updateServerCart()
          } else {
            await createServerCart()
          }
        } catch (error) {
          console.error('Error fetching cart data:', error)
        }
      } else {
        console.log('User is not logged in')
      }
    }
    fetchData()
  }, [cartReducer, userStatus])

  async function getCart() {
    const response = await axios.get(HOST + '/cart')

    return response
  }

  async function getChekCart() {
    try {
      const response = await axios.get(HOST + '/cart')
      if (response && response.data && response.data.products) {
        dispatch(addArrayToCart(response.data.products))
      } else {
        console.error(' getChekCart: объект или свойство products отсутствуют')
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function updateServerCart() {
    const arrayToSend = { products: cartReducer }

    axios
      .put(HOST + '/cart', arrayToSend)
      .then((response) => {})
      .catch((err) => {
        console.log('Put request', err)
      })
  }

  async function createServerCart() {
    const arrayToSend = { products: cartReducer }
    axios
      .post(HOST + '/cart', arrayToSend)
      .then(() => {})
      .catch((err) => {
        console.log('Create request', err)
      })
  }

  function mergeObjectsWithSameId(array1, array2) {
    const mergedObjects = []

    if (Array.isArray(array1) && array1.length > 0) {
      for (const obj1 of array1) {
        const matchingObject = array2.find((obj2) => obj2._id === obj1.product)
        if (matchingObject) {
          mergedObjects.push({ ...obj1, ...matchingObject })
        }
      }
    }

    return mergedObjects
  }

  const cartProducts = mergeObjectsWithSameId(cartReducer, allProducts)

  const totalCurrentPrice = cartProducts.reduce((total, product) => {
    const productValue = product.currentPrice * product.cartQuantity
    return total + productValue
  }, 0)

  function showOrderForm() {
    setVisibilityOrderForm(true)
  }

  const changeFormStatus = (type, massage) => {
    setFormStatus({
      type: type,
      message: massage,
    })
  }

  const changeVisibilityToast = () => {
    setShowToast(true)
  }

  const handleToastClose = () => {
    setShowToast(false)
  }

  if (cartProducts.length === 0) {
    return (
      <>
        <div className={styles['cart-no-item-wrapper']}>
          <p className={styles['cart-tittle-welcome']}>Your cart is empty </p>
        </div>
        {showToast && (
          <Toast message={formStatus.message} onClose={handleToastClose} />
        )}
      </>
    )
  }

  return (
    <>
      <div className={styles['cart-container']}>
        <h3 className={styles['cart-tittle-welcome']}>Your shopping cart</h3>
        <div className={styles['cart-section-names']}>
          <p>Product</p>
          <p>Quantity</p>
          <p>Price</p>
        </div>
        <div className={styles['cart-list-container']}>
          {cartProducts.map((product) => (
            <CartProductList
              key={product._id}
              img={product.imageUrls}
              name={product.name}
              quantity={product.cartQuantity}
              price={product.currentPrice}
              discribe={product.description}
              id={product._id}
            />
          ))}
        </div>
        <div className={styles['cart-total-and-order-btn-container']}>
          <p className={styles['cart-total-price']}>
            Subtotal
            <span
              style={{
                color: '#2A254B',
                fontSize: '24px',
                padding: '0px 0px 0px 15px',
              }}
            >
              {totalCurrentPrice && Math.round(totalCurrentPrice * 100) / 100}$
            </span>
          </p>
          <p>Taxes and shipping are calculated at checkout</p>
          {!visibilityOrderForm && (
            <button
              onClick={() => {
                showOrderForm()
              }}
              className={styles['cart-order-btn']}
            >
              Go to checkout
            </button>
          )}
        </div>
        {visibilityOrderForm && (
          <OrderForm
            changeFormStatus={changeFormStatus}
            changeVisibilityToast={changeVisibilityToast}
            formStatusType={formStatus.type}
            formStatusMassage={formStatus.massage}
          ></OrderForm>
        )}
      </div>
    </>
  )
}
