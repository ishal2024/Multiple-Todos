import { MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeAdmin, removeAdmin, removeMember } from '../../../api/subTodos/admin'
import {toast} from 'react-toastify'
import UserProfile from './UserProfile'

function MemberIcon({ user, todo , todoForAdmin , setRefreshPage}) {

  const [showOptions, setShowOptions] = useState(false)
   const [profileVisible , setProfileVisible] = useState(false)
  const userInfo = useSelector((state) => state?.user?.userInfo)
  const todoInfo = useSelector((state) => state?.todo?.todoInfo)
  const theme = useSelector((state) => state?.theme)

  async function makeUserAdmin(userId){
    try {
      const response = await makeAdmin(userId , todoInfo?._id)
      console.log(response)
      if(response?.data?.updatedTodo){
        setRefreshPage((prev) => !prev)
        toast.success(response?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  async function removeFromAdmin(userId){
     try {
      if(todoForAdmin?.admin?.length > 1){
        const response = await removeAdmin(userId , todoInfo?._id)
      console.log(response)
      if(response?.data?.updatedTodo){
        setRefreshPage((prev) => !prev)
        toast.success(response?.data?.message)
      }
    }
    else{
      toast.warn("One Admin is compulosry to be in Group")
    }
     } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error)
     }
  }

    async function removeFromMember(userId){
    try {
      const response = await removeMember(userId , todoInfo?._id)
      console.log(response)
      if(response?.data?.updatedTodo){
        setRefreshPage((prev) => !prev)
        toast.success(response?.data?.message)
      }
    } catch (error) {
      toast.success(error?.response?.data?.message)
    }
  }


  return (
    <div className={`relative group flex items-center justify-between gap-3 p-2 ${theme?.hoverColor} rounded-lg transition-all`}>

      {/* Profile + Name */}
      <div className="flex items-center gap-3">
        <img
          src={user?.profileImage || "https://imgs.search.brave.com/mxawWquDU3JSTrvgfYeUemUi6O1AwrjgnN5fQ5OLNHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9wZnAtcHJv/ZmlsZS1waWN0dXJl/LTUzODIyMTMtNDQ5/NTg0Mi5wbmc_Zj13/ZWJwJnc9MTI4"}
          alt={user?.fullname}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className={`text-sm font-medium  hidden md:block truncate`}>{user?.fullname}</span>
      </div>

      {/* 3-dot button */}
      <div className="relative ">
        <button
          onClick={() => setShowOptions(prev => !prev)}
          className={`p-1 rounded-full ${theme?.hoverColor}`}
        >
          <MoreVertical size={18} />
        </button>

        {/* Dropdown options */}
        {showOptions && (
          <div className={`absolute right-0 top-8 z-50 w-28 md:w-35 ${theme?.cardColor} ${theme?.hoverColor} shadow-lg border rounded-md text-sm`}>
            <button 
            onClick={() => setProfileVisible(true)}
            className="w-full px-3 py-2 text-left ">View Profile</button>
            {profileVisible && <UserProfile setShowOptions = {setShowOptions} setProfileVisible = {setProfileVisible} user = {user} />}
            {todo?.admin?.some((user) => user?._id == userInfo?._id) && (<>
              <button
                 onClick={() => makeUserAdmin(user?._id)}
                 className="w-full px-3 py-2 text-left ">Make Admin</button>
              <button
                onClick={() => removeFromMember(user?._id)} 
               className="w-full px-3 py-2 text-left ">Remove</button>
            </>)}
            {todoForAdmin?.admin?.some((user) => user?._id == userInfo?._id) &&  
             <button 
               onClick={() => removeFromAdmin(user?._id)}
              className="w-full px-3 py-2 text-left ">Remove Admin</button> }
          </div>
        )}
      </div>
    </div>
  )
}

export default MemberIcon