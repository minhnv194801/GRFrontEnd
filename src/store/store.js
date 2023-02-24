import { configureStore } from '@reduxjs/toolkit'
import LoginModalSliceReducer from '../components/loginmodal/LoginModalSlice'
import NavbarSliceReducer from '../components/navbar/NavbarSlice'
import topAlertSliceReducer from '../components/topalert/TopAlertSlice'
import userSliceReducer from '../pages/user/UserSlice'

export default configureStore({
    reducer: {
        navbar: NavbarSliceReducer,
        topAlert: topAlertSliceReducer,
        user: userSliceReducer,
        loginModal: LoginModalSliceReducer,
    }
})