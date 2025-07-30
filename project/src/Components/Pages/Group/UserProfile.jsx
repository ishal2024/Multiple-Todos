import React from 'react'
import {X} from 'lucide-react'

function UserProfile({setProfileVisible , user , setShowOptions}) {
  return (
    <>
   <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8 relative animate-fadeIn">
        {/* ❌ Close Button */}
        <button
          onClick={() => {
            setProfileVisible(false)
            setShowOptions(false)
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">User Profile</h2>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="flex flex-col items-center text-center gap-4">
            <img
              src={user.profileImage}
              alt={user.fullname}
              className="w-32 h-32 rounded-full object-cover shadow"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">@{user.username}</h3>
              <p className="text-gray-500">{user.fullname}</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center gap-4">
            <div>
              <h4 className="text-sm text-gray-500">Email</h4>
              <p className="text-base font-medium text-gray-700">{user.email}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Description</h4>
              <p className="text-gray-600">{user.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserProfile