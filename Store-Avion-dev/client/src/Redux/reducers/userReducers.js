import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HOST } from '../../components/Token'
import axios from 'axios'

export const CheckAuth = createAsyncThunk('checkAuth/isAuth', async () => {
  const response = await axios.get(HOST + '/customers/customer')
  return response.data
})

export const ChangeCustomer = createAsyncThunk(
  'ChangeCustomer/NewCustomer',
  async (updatedCustomer) => {
    const response = await axios.put(HOST + '/customers', updatedCustomer)
    return response.data
  },
)

const initialState = {
  data: {},
  status: false,
  token: false,
  statusCustomer: 'idle',
  expirationTime: '',
  error: '',
}

const userReducers = createSlice({
  name: 'userReducers',
  initialState,
  reducers: {
    changeStatusTrue(state, action) {
      state.status = true
    },
    changeData(state, action) {
      const updatedData = { ...action.payload }
      state.data = { ...updatedData }
    },
    setToken(state, action) {
      const token = action.payload
      state.token = token
    },
    setExpirationTime(state, action) {
      const expirationTime = action.payload
      state.expirationTime = expirationTime
    },
    resetData(state) {
      const data = {}
      state.data = { ...data }
    },
    resetStatus(state) {
      state.status = false
    },
    resetToken(state) {
      state.token = false
    },
    resetExpirationTime(state) {
      state.expirationTime = ""
    },
  },
  extraReducers(builder) {
    builder
      .addCase(CheckAuth.pending, (state) => {
        state.statusCustomer = 'loading'
      })
      .addCase(CheckAuth.fulfilled, (state, action) => {
        state.statusCustomer = 'succeeded'
        state.data = action.payload
      })
      .addCase(CheckAuth.rejected, (state, action) => {
        state.statusCustomer = 'failed'
      })
      .addCase(ChangeCustomer.pending, (state) => {
        state.statusCustomer = 'loading'
      })
      .addCase(ChangeCustomer.fulfilled, (state, action) => {
        state.statusCustomer = 'succeeded'
        state.data = action.payload
      })
      .addCase(ChangeCustomer.rejected, (state, action) => {
        state.statusCustomer = 'failed'
      })
  },
})

export const {
  changeData,
  changeStatusTrue,
  resetStatus,
  resetData,
  setToken,
  resetToken,
  setExpirationTime,
  resetExpirationTime
} = userReducers.actions

export default userReducers.reducer
