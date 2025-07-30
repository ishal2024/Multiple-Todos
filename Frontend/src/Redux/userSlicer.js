import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userStatus : false,
    userInfo : {}
}


const userSlicer = createSlice({
    name : 'user',
    initialState,
    reducers : {
        userLogin : (state , action) => {
            state.userInfo = action.payload
            state.userStatus = true
        },
        userLogout : (state , action) => {
            state.userInfo = {}
            state.userStatus = false
        }
    }
})

export const {userLogin , userLogout} = userSlicer.actions

export default userSlicer.reducer