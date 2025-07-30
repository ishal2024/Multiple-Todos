import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlicer'
import todoReducer from './todoSlicer'
import isVisibleReducer from './isVisibleSlicer'
import adminReducer from './adminSlicer'
import themeReducer from './themeSlicer'


const store = configureStore({
    reducer : {
        user : userReducer,
        todo : todoReducer,
        isVisible : isVisibleReducer,
        admin : adminReducer,
        theme : themeReducer
    }
})

export default store