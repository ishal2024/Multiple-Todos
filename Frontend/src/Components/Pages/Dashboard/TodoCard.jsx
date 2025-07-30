import { Link } from 'lucide-react'
import React from 'react'
import {useNavigate} from 'react-router-dom'

function TodoCard({todo}) {

    const navigate = useNavigate()
    return (
        <>
<div
  key={todo._id}
  className="relative h-40 rounded-lg overflow-hidden bg-cover bg-center px-5 py-4 flex items-center"
  style={{ backgroundImage: `url(${todo.thumbnail})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

  {/* Card Content */}
  <div className="relative z-10 w-full text-white">
    {/* Title + Category */}
    <div className="flex gap-4 items-center mb-1">
      <h2 className="text-lg font-bold">{todo.title}</h2>
      <span className="text-xs bg-blue-500 px-3 py-0.5 rounded-full">#{todo.category}</span>
    </div>

    {/* Description */}
    <p className="text-sm mb-2 line-clamp-2">{todo.description}</p>

    {/* Created At + Group Code */}
    <div className="flex flex-wrap gap-2 text-xs">
      <span className=" mt-2 px-2 py-0.5 ">
        Created: {new Date(todo.createdAt).toLocaleDateString()}
      </span>
      <span className=" mt-2 px-2 py-0.5 ">
        Code: {todo.todoCode}
      </span>
    </div>
  </div>

  {/* Arrow Icon */}
  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
    <button
      onClick={() => navigate(`/group/${todo._id}`)}
      className="text-white hover:text-gray-300 transition-transform hover:scale-110"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>


        </>
    )
}

export default TodoCard