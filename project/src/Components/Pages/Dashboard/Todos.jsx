import React, { useEffect, useState } from 'react'
import TodoCard from './TodoCard'
import { getAllTodos } from '../../../api/todos/getTodos'
import NoItem from '../../Layout/NoItem'

function Todos({todos}) {

   


  return (
    <div className="grid grid-cols-1 w-full mb-20 lg:grid-cols-3 gap-6 ">
    {todos.length !== 0 ? todos.map((val) => {
        return <TodoCard todo = {val} />
    }) : <>
    
    <div className=' w-[80vw] '>
      <NoItem message={"Groups"}/>
      </div>
      
      </> }
    </div>
  )
}

export default Todos