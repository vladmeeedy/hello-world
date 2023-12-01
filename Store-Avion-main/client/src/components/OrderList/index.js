import React, { useEffect, useState } from 'react'
import styles from './OrderList.module.scss'
import { HOST } from '../Token'
import axios from 'axios'
import OrderItem from '../OrderItem'

export default function OrderList() {
  const [orders, setOrders] = useState([])

  function changeOrders(idToRemove) {
    const newOrders = [...orders]

    const index = newOrders.findIndex((item) => item._id === idToRemove)

    if (index !== -1) {
      newOrders.splice(index, 1)
    }

    setOrders(newOrders)
  }

  useEffect(() => {
    axios
      .get(HOST + '/orders')
      .then((receivedOrders) => {
        setOrders(receivedOrders.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {}, [orders])

  return (
    <div className={styles['wrapper-orders']}>
      <div className={styles['container-orders']}>
        <h2 className={styles['orders-title']}>Your orders</h2>
        {orders.length === 0 && (
          <p className={styles['order-text__empty']}>
            Wow, it&apos;s empty here
          </p>
        )}
        {orders.length >= 0 &&
          orders.map((order) => (
            <div key={order._id} className={styles['order-container--item']}>
              <OrderItem order={order} changeOrders={changeOrders}></OrderItem>
            </div>
          ))}
      </div>
    </div>
  )
}
