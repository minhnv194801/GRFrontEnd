import { configureStore } from '@reduxjs/toolkit'
import topAlertSliceReducer from '../components/topalert/TopAlertSlice'
import userSliceReducer from '../pages/user/UserSlice'

export default configureStore({
    reducer: {
        topAlert: topAlertSliceReducer,
        user: userSliceReducer,
    }
})