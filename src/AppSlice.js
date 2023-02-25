import { createSlice } from '@reduxjs/toolkit'

export const AppSlice = createSlice({
    name: 'app',
    initialState: {
        sessionkey: localStorage.getItem('sessionkey'),
        refreshkey: localStorage.getItem('refreshkey'),
        isLogin: localStorage.getItem('isLogin')===null?false:true,
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar'),
    },
    reducers: {
        login: (state, action) => {
            state.sessionkey = action.payload.sessionkey
            localStorage.setItem('sessionkey', action.payload.sessionkey)

            state.refreshkey = action.payload.refreshkey
            localStorage.setItem('refreshkey', action.payload.refreshkey)

            state.isLogin = action.payload.isLogin
            localStorage.setItem('isLogin', action.payload.isLogin)

            state.userId = action.payload.id
            localStorage.setItem('userId', action.payload.id)

            state.username = action.payload.username
            localStorage.setItem('username', action.payload.username)

            state.avatar = action.payload.avatar
            localStorage.setItem('avatar', action.payload.avatar)
        },

        logout: state => {
            state.sessionkey = ""
            state.refreshkey = ""
            state.isLogin = false
            state.userId = ""
            state.username = ""
            state.avatar = ""
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

export const { login, logout, setUsername, setAvatar } = AppSlice.actions

export default AppSlice.reducer