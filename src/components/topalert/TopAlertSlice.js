import { createSlice } from '@reduxjs/toolkit'

export const TopAlertSlice = createSlice({
    name: 'topalert',
    initialState: {
        alertVisibility: false,
        alertSeverity: "success",
        alertTitle: "",
        alertContent: "",

    },
    reducers: {
        displaySuccess: (state, action) => {
            state.alertSeverity = "success"
            state.alertTitle = action.payload.title
            state.alertContent = action.payload.content
            state.alertVisibility = true
        },

        displayFailure: (state, action) => {
            state.alertSeverity = "error"
            state.alertTitle = action.payload.title
            state.alertContent = action.payload.content
            state.alertVisibility = true
        },

        closeTopAlert: state => {
            state.alertVisibility = false
        }
    }
})

export const { displaySuccess, displayFailure, closeTopAlert } = TopAlertSlice.actions

export default TopAlertSlice.reducer