import React, { useState } from 'react'
import {X} from 'lucide-react'
import { updateProfileImage } from '../../api/userAuth/auth'
import { useDispatch, useSelector } from 'react-redux'
import { toggleUserPageRefresh } from '../../Redux/adminSlicer'
import {toast} from 'react-toastify'
import Spinner from '../Layout/Spinner'

function UpdateImage({user , setUpdateImageBox}) {

    const [imagePreview , setImagePreview] = useState(null)
    const [file , setFile] = useState(null)
    const [spinner , setSpinner] = useState(false)
    const dispatch = useDispatch()
    const theme = useSelector((state) => state?.theme)

    function handleChange(e){
      const file = e.target.files[0]
      setFile(file)
      if(file){
        setImagePreview(URL.createObjectURL(file))
      }
    }

    async function handleUpdateImage(e){
        e.preventDefault()
        setSpinner(true)
       try {
        console.log(file)
        const formData = new FormData()
        formData.append("profileImage" , file)
        const res = await updateProfileImage(formData)
        if(res?.data?.updatedUser){ 
            setUpdateImageBox(false)
            dispatch(toggleUserPageRefresh())
            toast.success(res?.data?.message)
            setSpinner(false)
        }
       } catch (error) {
        toast.error(error?.response?.data?.message)
        setSpinner(false)
        console.log(error)
       }
    }

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className={`${theme?.cardColor} ${theme?.primaryTextColor} ${theme?.borderColor} p-6 rounded-xl shadow-lg w-[90%] max-w-md relative`}>
        {/* ❌ Cross icon */}
        <button
          onClick={() => setUpdateImageBox(false)}
          className="absolute top-3 right-3  hover:text-red-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-6">Update Profile Image</h2>

        {/* Profile Image Preview */}
        <div className="flex justify-center mb-4">
          <div className={`w-28 h-28 rounded-full overflow-hidden border-2 ${theme?.borderColor} `}>
            <img
              src={imagePreview}
              alt="Preview"
              
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className='mb-5'>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className={`w-full border-2 p-2 rounded-2xl  mt-4 text-sm ${theme?.borderColor}`}
        />
        </div>

        {/* Update Button */}
        <button
        onClick={handleUpdateImage}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
        >
          {spinner ? <Spinner /> : "Update Image"}
        </button>
      </div>
    </div>
    </>
  )
}

export default UpdateImage