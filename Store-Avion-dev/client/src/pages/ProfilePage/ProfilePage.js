import React, { useState } from 'react'
import UpdateProfile from '../../components/Profile/UpdateProfile'
import UpdatePassword from '../../components/Profile/UpdatePassword'
import { NavLink } from 'react-router-dom'
import { PiNavigationArrowDuotone } from 'react-icons/pi'
import Toast from '../../components/Toast'
import styles from './ProfilePage.module.scss'

function ProfilePage() {
  const [formStatus, setFormStatus] = useState({ type: null, message: '' })
  const [showToast, setShowToast] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)

  const handleButtonClick = (status) => {
    setShowToast(true)
    setErrorStatus(status)
  }

  const handleToastClose = () => {
    setShowToast(false)
  }

  return (
    <>
      <div className={styles.profile__container}>
        <div className={styles.profile__update}>
          <NavLink to="/orders/">
            <p className={styles.profile__link}>
              Your orders
              <PiNavigationArrowDuotone />
            </p>
          </NavLink>
          <UpdateProfile
            formStatus={formStatus}
            setFormStatus={setFormStatus}
            handleButtonClick={handleButtonClick}
          />
          <UpdatePassword
            formStatus={formStatus}
            setFormStatus={setFormStatus}
            handleButtonClick={handleButtonClick}
          />
        </div>
      </div>
      {showToast && (
        <Toast
          message={formStatus.message}
          onClose={handleToastClose}
          errorStatus={errorStatus}
        />
      )}
    </>
  )
}

export default ProfilePage
