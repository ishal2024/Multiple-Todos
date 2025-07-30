import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createTodos, updateTodo } from '../../../api/todos/getTodos'
import { useLocation, useNavigate } from 'react-router-dom'
import {toast , ToastContainer} from 'react-toastify'
import Spinner from '../../Layout/Spinner'
import { useSelector } from 'react-redux'


function CreateProjectForm() {

    const location = useLocation()
    const navigate = useNavigate()
    const [spinner , setSpinner] = useState(false)
     const theme = useSelector((state) => state?.theme)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: location?.state?.todoInfo?.title || "",
            description: location?.state?.todoInfo?.description || "",
            category: location?.state?.todoInfo?.category || 'Group',
        }
    })

    async function handleCreateTodo(data) {
        setSpinner(true)
        try {
            console.log(data)
            let formData = new FormData()
            formData.append('thumbnail', data?.thumbnail[0]);
            formData.append('title', data?.title);
            formData.append('description', data?.description);
            formData.append('category', data?.category || 'Group');

            const response = await createTodos(formData)
            console.log(response)
            if(response?.data?.todo){
                setSpinner(false)
                navigate('/')
            }
            else{
                setSpinner(false)
                toast.warn("Something Went Wrong , Please try again")
            }

        } catch (error) {
             setSpinner(false)
            toast.error(error?.response?.data?.message)
            console.log(error)
        }
    }

    async function modifyTodo(data) {
         setSpinner(true)
        try {
            let formData = new FormData()
            formData.append('thumbnail', data?.thumbnail[0] || location?.state?.todoInfo?.thumbnail);
            formData.append('title', data?.title || location?.state?.todoInfo?.title);
            formData.append('description', data?.description || location?.state?.todoInfo?.description);
            formData.append('category', data?.category || location?.state?.todoInfo?.category);

            const response = await updateTodo(location?.state?.todoInfo?._id , formData)
            console.log(response)
            if(response?.data?.updatedTodo){
                 navigate('/')
                  setSpinner(false)
                }
            else {
                toast.warn("Something Went Wrong , Please try again")
                 setSpinner(false)
            }
        } catch (error) {
             setSpinner(false)
            toast.error(error?.response?.data?.message)
            console.log(error)
        }
    }

    return (
        <>
        <ToastContainer />
         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
  <div className={`relative ${theme?.cardColor} ${theme?.primaryTextColor} rounded-xl shadow-lg w-[90vw] md:w-[70vw] overflow-hidden`}>
    
    {/* Header Bar */}
    <div className={`flex items-center justify-center relative ${theme?.bgColor} px-6 py-4 border-b ${theme?.borderColor}`}>
      <h2 className="text-lg font-semibold ">Create new Group</h2>
      <button
        onClick={() => navigate('/')} // or use your modal close logic
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2  hover:text-red-600 text-2xl font-bold"
      >
        &times;
      </button>
    </div>

    {/* Form */}
    <form
      className="grid grid-cols-1 md:grid-cols-2"
      onSubmit={
        location?.state?.todoInfo
          ? handleSubmit(modifyTodo)
          : handleSubmit(handleCreateTodo)
      }
    >
      {/* 📷 Image Upload Section */}
      {location?.state?.todoInfo?.thumbnail ? (
        <div className="w-full h-full flex items-center justify-center p-6 ">
          <img
            src={location?.state?.todoInfo?.thumbnail}
            alt="Preview"
            className="max-h-[250px] object-contain rounded"
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 ">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 hover:border-black transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12  mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 16l4-4 4 4m0 0l4-4 4 4M4 4h16"
              />
            </svg>
            <span className="">Click to upload image</span>
            <input
              accept="image/*"
              {...register("thumbnail", { required: true })}
              id="imageUpload"
              type="file"
              required
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* 📝 Form Section */}
      <div className="p-6 flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Title"
          className=" px-4 py-2 rounded-md focus:outline-none border-2 border-gray-400  "
          {...register("title", { required: true })}
          required
        />
        <textarea
          placeholder="Description"
          rows="4"
          className=" px-4 py-2 rounded-md resize-none border-2 focus:outline-none border-gray-400  "
          {...register("description", { required: true })}
          required
        ></textarea>
        <select
          className=" px-4 py-2 rounded-md border-2 focus:outline-none border-gray-400  "
          {...register("category")}
        >
          <option value="">Select Category</option>
          <option value="Group">Group</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="urgent">Friends</option>
        </select>

        {/* Thumbnail input (if already uploaded) */}
        {location?.state?.todoInfo?.thumbnail && (
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail")}
            className=" px-4 py-2 rounded-md"
          />
        )}

        {/* Submit Button */}
        {location?.state?.todoInfo ? (
          <button
            type="submit"
            className="mt-2 bg-green-600 hover:bg-green-700 transition py-2 rounded-md font-semibold text-white"
          >
            Update Todo
          </button>
        ) : (
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-semibold text-white"
          >
            Submit
          </button>
        )}
        {spinner && <Spinner />}
      </div>
    </form>
  </div>
</div>

        </>

    )
}

export default CreateProjectForm