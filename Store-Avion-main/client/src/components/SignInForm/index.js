import React, {useState} from 'react'
import {Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import styles from './SignInForm.module.scss'
import {HOST, setAuthToken} from '../Token'
import Input from '../Input'
import {useDispatch} from 'react-redux'
import {
    changeData,
    changeStatusTrue,
    setToken,
    setExpirationTime,
} from '../../Redux/reducers/userReducers'
import axios from 'axios'
import {fetchWishlist} from '../../Redux/reducers/wishlistReducers'
import {useNavigate} from 'react-router-dom'
import {addArrayToCart} from '../../Redux/reducers/cartReducer'
import { jwtDecode } from "jwt-decode";

export default function SignInForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formStatus, setFormStatus] = useState({type: '', message: ''})

    const handleSubmit = async (userData, {resetForm}) => {
        await axios
            .post(HOST + '/customers/login', userData)
            .then(async (loginResult) => {
                dispatch(changeStatusTrue())
                dispatch(setToken(loginResult.data.token))
                const decodedToken = jwtDecode(loginResult.data.token);
                const expirationDate = new Date(decodedToken.exp * 1000);
                dispatch(setExpirationTime(expirationDate))
                setAuthToken(loginResult.data.token)
                const customer = await getCustomer()
                dispatch(changeData(customer))
                await сheсkCart()
                dispatch(fetchWishlist())
                navigate(-1)
                resetForm()
            })
            .catch((err) => {
                const massageData = err.response.data
                const objectKey = Object.keys(massageData)[0]
                const errorMessage = massageData[objectKey]
                setFormStatus({
                    type: 'error',
                    message: `Login failed! ${errorMessage}`,
                })
            })
    }

    const getCustomer = async () => {
        const response = await axios.get(HOST + '/customers/customer')
        const customerData = response.data
        return customerData
    }

    async function сheсkCart() {
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

    return (
        <>
            {formStatus.type !== '' && (
                <p
                    className={`${styles['text-massage']} ${
                        formStatus.type === 'error' && styles['text-massage__error']
                    }`}
                >
                    {formStatus.message}
                </p>
            )}
            <Formik
                initialValues={{
                    loginOrEmail: '',
                    password: '',
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object({
                    loginOrEmail: Yup.string().required('Login or Email is required'),
                    password: Yup.string()
                        .matches(
                            /^[a-zA-Z0-9]+$/,
                            'Allowed characters for password is a-z, A-Z, 0-9.',
                        )
                        .required('Password is required')
                        .max(30, 'Password must be between 7 and 30 characters')
                        .min(7, 'Password must be between 7 and 30 characters'),
                })}
            >
                <Form className="form__user-auth" noValidate>
                    <Field
                        type="text"
                        placeholder="Login or Email"
                        name="loginOrEmail"
                        component={Input}
                    />
                    <Field
                        type="password"
                        placeholder="Password"
                        name="password"
                        component={Input}
                    />
                    <div>
                        <button className={styles['btn-send']} type="submit">
                            Send
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
