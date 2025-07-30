import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
    subTodoForm  : false ,
    subTodoInfo : {}
}

const isVisibleSlicer = createSlice({
    name : 'isVisible',
    initialState,
    reducers : 
        {
            subtodoFormVisible : (state, action) => {
                state.subTodoForm  = action?.payload
            },
            addSubtodoInfo : (state, action) => {
                state.subTodoInfo  = action?.payload
            }
        }
    
})

export const {subtodoFormVisible , addSubtodoInfo} = isVisibleSlicer.actions
export default isVisibleSlicer.reducer