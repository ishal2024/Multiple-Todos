import React, { useState } from 'react'
import { X } from "lucide-react";
import { changePassword } from '../../api/userAuth/auth';
import { toggleUserPageRefresh } from '../../Redux/adminSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ChangePasswordForm({ setUpdatePasswordBox }) {

    const [newPassword, setNewPassword] = useState("")
    const dispatch = useDispatch()
    const theme = useSelector((state) => state?.theme)

    async function handleChangePassword() {
        try {
            const res = await changePassword({ password: newPassword })
            if (res?.data?.updatedUser) {
                dispatch(toggleUserPageRefresh())
                setUpdatePasswordBox(false)
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error)
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                <div className={`${theme?.cardColor} ${theme?.primaryTextColor} rounded-lg shadow-lg w-[90%] max-w-md p-6 relative`}>

                    {/* ❌ Close Button */}
                    <button
                        className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                        onClick={() => setUpdatePasswordBox(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* 🔒 Heading */}
                    <h2 className="text-xl font-bold  mb-6 text-center">
                        Change Password
                    </h2>

                    {/* 🔐 New Password Field */}
                    <form className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium ${theme?.secondaryTextColor} mb-1`}>
                                New Password
                            </label>
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target?.value)}
                                type="password"
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            onClick={handleChangePassword}
                            className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default ChangePasswordForm