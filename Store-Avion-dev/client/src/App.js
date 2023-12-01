import React, {useEffect} from 'react'
import Router from './routers/Router'
import './scss/reset.scss'
import {useDispatch} from 'react-redux'
import {
    CheckAuth,
    resetStatus,
    resetData,
    resetToken,
    resetExpirationTime
} from './Redux/reducers/userReducers'
import {setAuthToken} from './components/Token'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const persistRoot = JSON.parse(localStorage.getItem('persist:root'))
        const user = JSON.parse(persistRoot.user)

        if (user.status === true) {
            const expirationTime = Date.parse(user.expirationTime)
            if (Date.now() < expirationTime) {
                setAuthToken(user.token);
                dispatch(CheckAuth());
            } else {
                dispatch(resetStatus())
                dispatch(resetData())
                dispatch(resetToken())
                dispatch(resetExpirationTime())
                setAuthToken(false);
            }
        } else {
            setAuthToken(false)
        }
        window.scrollTo({top: 0, left: 0})
    })

    return <Router></Router>
}

export default App
