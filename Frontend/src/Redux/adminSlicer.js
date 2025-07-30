import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
    adminRefresh  : false ,
    userPageRefresh : false
}

const adminSlicer = createSlice({
    name : 'admin',
    initialState,
    reducers : 
        {
           
            toggleUserPageRefresh : (state, action) => {
                state.userPageRefresh  = !state.userPageRefresh
            }
        }
    
})

export const {toggleUserPageRefresh} = adminSlicer.actions
export default adminSlicer.reducer