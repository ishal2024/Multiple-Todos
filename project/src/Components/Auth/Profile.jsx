import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import UpdateImage from './UpdateImage'
import UpdateProfileInfo from './UpdateProfileInfo'
import ChangePasswordForm from './ChangePasswordForm'

function Profile() {
    
    const user = useSelector((state) => state.user?.userInfo)
    const [updateImageBox , setUpdateImageBox] = useState(false)
    const [updateUserBox , setUpdateUserBox] = useState(false)
    const [updatePasswordBox , setUpdatePasswordBox] = useState(false)
    const theme = useSelector((state) => state?.theme)


    const profileInfo = [
          { label: "Full Name", value: user.fullname, key: "fullname" },
          { label: "Email", value: user.email, key: "email" },
          { label: "Username", value: user.username, key: "username" },
          { label: "Description", value: user.description, key: "description" },
          { label: "Password", value: "********", key: "password" },
        ]


  return (
    <>
    <div className={`w-[90%] ${theme?.bgColor} ${theme?.primaryTextColor} ${theme?.borderColor} px-4 py-8 mb-20 space-y-10 overflow-y-auto`}>
    
      {/* 📸 Profile Image Section */}
      <div className='flex-col justify-center item-center'>
        <h2 className="text-2xl font-bold mb-4 ">Profile Image</h2>
        <div className="flex items-center gap-6">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-48 h-38 rounded-lg object-cover shadow"
          />
          <button
            onClick={() => setUpdateImageBox(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Update Photo
          </button>
          {updateImageBox && <UpdateImage setUpdateImageBox = {setUpdateImageBox} user = {user} />}
        </div>
      </div>

      {/* 📝 Profile Information Section */}
     <div className="space-y-6">
 <div className="flex items-center gap-10 mb-4">
  <h2 className="text-2xl font-bold ">Profile Information</h2>
  <button 
  onClick={() => setUpdateUserBox(true)}
  className=" bg-gray-300 rounded-2xl p-3 text-blue-600 hover:text-blue-800 " aria-label="Edit Profile Information">
    <Pencil className="w-5 h-5" />
  </button>
  {updateUserBox && <UpdateProfileInfo setUpdateUserBox = {setUpdateUserBox}  user = {user} />}
</div>
  <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {profileInfo?.map((item) => (
      <div
        key={item.key}
        className={`relative ${theme?.cardColor} p-4 rounded-md shadow-sm flex flex-col gap-2`}
      >
        {/* Label */}
        <label
          htmlFor={item.key}
          className="text-sm  font-medium"
        >
          {item.label}
        </label>

        {/* Input with edit icon */}
        <div className="relative">
          <input
            id={item.key}
            value={item?.value}
            readOnly
            className="w-full  px-4 py-2 pr-10 rounded-md border  focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Pencil Icon */}
         
        </div>
      </div>
    ))}
  </form>
</div>
<div className="mt-10">
  <h2 className="text-2xl font-bold  mb-4">Security</h2>
  <button
    onClick={() => setUpdatePasswordBox(true)}
    className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-md transition"
  >
    Change Password
  </button>
  {updatePasswordBox && <ChangePasswordForm setUpdatePasswordBox = {setUpdatePasswordBox} />}
</div>
    </div>
    </>
  )
}

export default Profile