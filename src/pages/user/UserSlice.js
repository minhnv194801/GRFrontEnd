import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        username: "",
        avatar: "",
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