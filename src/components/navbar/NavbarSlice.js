import { createSlice } from '@reduxjs/toolkit'

export const NavbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        sessionkey: localStorage.getItem('sessionkey'),
        refreshkey: localStorage.getItem('refreshkey'),
        isLogin: localStorage.getItem('isLogin')===null?false:true,
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar'),
    },
    reducers: {
        setSessionkey: (state, action) => {
            state.sessionkey = action.payload
            localStorage.setItem('sessionkey', action.payload)
        },

        setRefreshkey: (state, action) => {
            state.refreshkey = action.payload
            localStorage.setItem('refreshkey', action.payload)
        },

        setIsLogin: (state, action) => {
            state.isLogin = action.payload
            if (action.payload === true) {
                localStorage.setItem('isLogin', "")
            } else {
                localStorage.removeItem('isLogin')
            }
        },

        setUserId: (state, action) => {
            state.userId = action.payload
            localStorage.setItem('userid', action.payload)
        },

        setUsername: (state, action) => {
            state.username = action.payload
            localStorage.setItem('username', action.payload)
        },

        setAvatar: (state, action) => {
            state.avatar = action.payload
            localStorage.setItem('avatar', action.payload)
        },
    }
})

export const { setSessionkey, setRefreshkey, setIsLogin, setUserId, setUsername, setAvatar } = NavbarSlice.actions

export default NavbarSlice.reducer