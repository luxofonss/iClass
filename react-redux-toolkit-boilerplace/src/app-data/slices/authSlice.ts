import { RootState } from '@app-data'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean
  user: {
    id: string
    email: string
    username: string
    first_name: string
    last_name: string
    phone_number: string
    gender: string
    role: string
    avatar: string
    dob: string
    verified: boolean
    address?: string
  }
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    id: '',
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    gender: '',
    role: '',
    avatar: '',
    dob: '',
    verified: false
  }
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload
    },
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = initialState.user
    }
  }
})

export const { login, setUser, logout } = authSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value
export const userRole = (state: RootState) => state.user.role

export default authSlice.reducer
