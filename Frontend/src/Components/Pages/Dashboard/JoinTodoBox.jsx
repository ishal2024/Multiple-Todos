import { CirclePlus } from 'lucide-react'
import React, { useState } from 'react'
import JoinTodo from '../JoinTodo/JoinTodo'

function JoinTodoBox() {

  const [isVisible , setIsVisible] = useState(false)

  return (
    <>
    <div onClick={() => setIsVisible(true)} className=" w-70 sm:w-80 h-36 bg-gradient-to-r from-blue-300 to-blue-500 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300  mt-5 cursor-pointer group flex items-center justify-center gap-4">
      <div className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
        <CirclePlus  className="w-8 h-8 text-green-600" />
      </div>
      <p className="text-white text-xl font-semibold group-hover:underline">Join Group</p>
    </div>
    {!isVisible || <JoinTodo setIsVisible = {setIsVisible} />}
    </>
  )
}

export default JoinTodoBox