import React, { useState } from 'react'
import AddSubTodoButton from './AddSubTodoButton'
import SubTodos from './SubTodos'

function SubTodoLayout() {

  const [todoAdded , setTodoAdded] = useState(false)

  return (
   <>
   <div className='flex-col overflow-y-auto w-full px-2 md:px-8 mb-10 '>
   <AddSubTodoButton setTodoAdded = {setTodoAdded} />
   <SubTodos todoAdded = {todoAdded} />
   </div>
   </>
  )
}

export default SubTodoLayout