import { createSlice } from '@reduxjs/toolkit'

export const LoginModalSlice = createSlice({
    name: 'loginmodal',
    initialState: {
        modalVisibility: false,
        isLogin: true,
    },
    reducers: {
        openLoginModal: (state) => {
            state.modalVisibility = true
            state.isLogin = true
        },

        closeLoginModal: (state) => {
            state.modalVisibility = false
            state.isLogin = true
        },

        openSignupModal: (state) => {
            state.modalVisibility = true
            state.isLogin = false
        },

        closeSignupModal: (state) => {
            state.modalVisibility = false
            state.isLogin = false
        },
    }
})

export const { openLoginModal, closeLoginModal, openSignupModal, closeSignupModal } = LoginModalSlice.actions

export default LoginModalSlice.reducer