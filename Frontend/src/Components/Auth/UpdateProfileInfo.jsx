import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateUserInfo } from '../../api/userAuth/auth'
import { useDispatch, useSelector } from 'react-redux'
import { toggleUserPageRefresh } from '../../Redux/adminSlicer'
import Spinner from '../Layout/Spinner'
import { toast } from 'react-toastify'


function UpdateProfileInfo({ setUpdateUserBox, user }) {

    const dispatch = useDispatch()
    const [spinner , setSpinner] = useState(false)
    const theme = useSelector((state) => state?.theme)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            fullname: user?.fullname,
            username: user?.username,
            description: user?.description,
        }
    })

    async function handleUserUpdate(data) {
        console.log(data)
        setSpinner(true)
        try {
            const res = await updateUserInfo(data)
            console.log(res)
            if (res?.data?.updatedUser) {
                dispatch(toggleUserPageRefresh())
                setUpdateUserBox(false)
                toast.success(res?.data?.messgae)
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className={`${theme?.cardColor} p-6 rounded-xl shadow-lg w-[90%] max-w-md relative`}>
                    {/* ❌ Cross icon */}
                    <button
                        onClick={() => setUpdateUserBox((prev) => !prev)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-center mb-6">
                        Update Profile Information
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit(handleUserUpdate)} className="space-y-4">
                        <div>
                            <label className={`block text-sm ${theme?.secondaryTextColor} mb-1`}>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                {...register('fullname', { required: true })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className={`block text-sm ${theme?.secondaryTextColor} mb-1`}>Username</label>
                            <input
                                type="text"
                                name="username"
                                {...register('username', { required: true })}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className={`block text-sm ${theme?.secondaryTextColor} mb-1`}>Description</label>
                            <textarea
                                name="description"
                                {...register('description', { required: true })}
                                rows="3"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                        >
                            {spinner ? <Spinner /> : "Update Information"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProfileInfo