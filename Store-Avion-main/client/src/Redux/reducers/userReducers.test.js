import reducer, {
  changeData,
  changeStatusTrue,
  resetData,
  resetStatus,
  resetToken,
  setToken,
} from './userReducers'

const initialState = {
  data: {},
  status: false,
  token: false,
  statusCustomer: 'idle',
  expirationTime: '',
  error: '',
}

describe('userReducers reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle the `changeStatusTrue` action', () => {
    const action = changeStatusTrue()
    const expectedState = {
      data: {},
      status: true,
      token: false,
      statusCustomer: 'idle',
      expirationTime: '',
      error: '',
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle the `changeData` action', () => {
    const action = changeData({
      name: 'John Doe',
      email: 'john.doe@example.com',
    })
    const expectedState = {
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      status: false,
      token: false,
      statusCustomer: 'idle',
      expirationTime: '',
      error: '',
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle the `setToken` action', () => {
    const token = '1234567890'
    const action = setToken(token)

    const expectedState = {
      data: {},
      status: false,
      token,
      expirationTime: '',
      statusCustomer: 'idle',
      error: '',
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle the `resetData` action', () => {
    const state = {
      ...initialState,
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    }
    const action = resetData()

    expect(reducer(state, action)).toEqual(initialState)
  })

  it('should handle the `resetStatus` action', () => {
    const state = {
      ...initialState,
      status: true,
    }
    const action = resetStatus()

    expect(reducer(state, action)).toEqual(initialState)
  })

  it('should handle the `resetToken` action', () => {
    const state = {
      ...initialState,
      token: '12345',
    }
    const action = resetToken()

    expect(reducer(state, action)).toEqual(initialState)
  })
})
