import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        username: "User",
        avatar: "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },

        setUserAvatar: (state, action) => {
            state.avatar = action.payload
        },
    }
})

export const { setUsername, setUserAvatar } = UserSlice.actions

export default UserSlice.reducer