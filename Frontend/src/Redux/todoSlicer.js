import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    todoInfo : {}
}

const todoSlicer = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        insertTodoInfo : (state , action)  => {
              state.todoInfo = action.payload
        },
        removeTodoInfo : (state )  => {
              state.todoInfo = {}
        },
    }
})

export const {insertTodoInfo , removeTodoInfo} = todoSlicer.actions

export default todoSlicer.reducer