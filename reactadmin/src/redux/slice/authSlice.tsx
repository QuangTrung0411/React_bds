import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/User'



export interface AuthState {
    isAuthenticated: boolean, //trạng thái đăng nhập
    user: User | null
}

const initialState: AuthState = {
    'isAuthenticated': false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthLogin:(state, action: PayloadAction<User | null>) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        setAuthLogout:(state) => {
            state.isAuthenticated = false
            state.user = null
        }
    }
})

// Action creators are generated for each case reducer function
export const { setAuthLogin, setAuthLogout } = authSlice.actions

export default authSlice.reducer