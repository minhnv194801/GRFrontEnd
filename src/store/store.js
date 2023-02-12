import { configureStore } from '@reduxjs/toolkit'
import topAlertSliceReducer from '../components/topalert/TopAlertSlice'

export default configureStore({
    reducer: {
        topAlert: topAlertSliceReducer,
    }
})