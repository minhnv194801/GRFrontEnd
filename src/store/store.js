import { configureStore } from '@reduxjs/toolkit'
import AppSliceReducer from '../AppSlice'
import topAlertSliceReducer from '../components/topalert/TopAlertSlice'
import userSliceReducer from '../pages/user/UserSlice'

export default configureStore({
    reducer: {
        app: AppSliceReducer,
        topAlert: topAlertSliceReducer,
        user: userSliceReducer,
    }
})