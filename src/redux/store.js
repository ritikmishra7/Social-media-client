import { configureStore } from '@reduxjs/toolkit'
import appConfigReducer from './slices/appConfigSlice'
import userProfileReducer from './slices/userProfileSlice'
import feedReducer from './slices/feedSlice'


export default configureStore({
    reducer: {
        appConfigReducer,
        userProfileReducer,
        feedReducer
    }
})