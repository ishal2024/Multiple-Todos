import React from 'react'
import { useState } from 'react'
import { joinOtherTodo } from '../../../api/todos/getTodos'
import { X } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { toggleUserPageRefresh } from '../../../Redux/adminSlicer'
import Spinner from '../../Layout/Spinner'

function JoinTodo({setIsVisible}) {

  const [todoCode, setTodoCode] = useState("")
  const dispatch = useDispatch()
  const [spinner , setSpinner] = useState(false)

  async function handleJoinTodo(e) {
     e.preventDefault(); 
     setSpinner(true)
    try {
      if (todoCode.length === 8) {
        console.log( todoCode )
        const response = await joinOtherTodo({ todoCode })
        console.log(response)
        if(response?.data?.updatedTodo){
          dispatch(toggleUserPageRefresh())
          setSpinner(false)
          toast.success(response?.data?.message)
          setIsVisible(false)
        }
        else{
          setSpinner(false)
          toast.error(response?.data?.message)
        }
      }
    } catch (error) {
      setSpinner(false)
      toast.error(error?.response?.data?.message)
      console.log(error)
    }
  }


  return (
    <>
      <div className=" inset-0 z-50 flex fixed top-0 items-center justify-center backdrop-blur-md bg-black/40">

        <div className="w-[85vw] md:w-[70vw] max-w-3xl bg-slate-800 rounded-xl shadow-2xl text-white overflow-hidden">

          {/* 🔔 Banner */}
          <div className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-medium px-4 py-2.5 flex items-center justify-between shadow-md">
            <p className="flex-1 text-center">
              Note : Todo Code Should have 8 digits Character
            </p>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 p-1 rounded-full hover:bg-black/10 transition"
              aria-label="Close Banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 📝 Join Todo Form */}
          <div className="p-8 flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Join a Post Group</h2>
              <p className="text-sm text-gray-300">Enter the 8-digit code to join an existing group</p>
            </div>

            <form className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input
                type="text"
                placeholder="Enter 8-digit Todo Code"
                value={todoCode}
                onChange={(e) => setTodoCode(e.target.value)}
                className="w-full sm:w-[300px] px-4 py-2 rounded-md bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button onClick={handleJoinTodo} className="px-6 py-2 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-600 transition">
                {spinner ? <Spinner /> : "Join Group"}
              </button>
            </form>

            {/* 📋 Steps to Join */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">🧭 Steps to Join a  Group</h3>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-200">
                <li>
                  📋 <span className="text-white">Copy the 8-digit Group Join Code</span> from the top-left corner of the group bar or poster.
                </li>
                <li>
                  🔍 <span className="text-white">Paste the code</span> into the input box above.
                </li>
                <li>
                  ✅ <span className="text-white">Click "Join Group"</span> to become a member of the group.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default JoinTodo