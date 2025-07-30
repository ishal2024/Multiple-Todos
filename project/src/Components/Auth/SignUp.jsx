import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { logInUser, registerUser } from '../../api/userAuth/auth'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../Redux/userSlicer'
import { useNavigate , NavLink } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import Spinner from '../Layout/Spinner'

function SignUp() {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [spinner , setSpinner] = useState(false)

    async function handleRegister(data) {
        setSpinner(true)
        try {    
            const response = await registerUser(data)
            console.log(response?.data?.user)
            if(response?.data?.user){
                const res = await logInUser({email : data.email , password : data.password})
                dispatch(userLogin(res?.data?.userInfo))
                setSpinner(false)
                navigate('/')
                console.log(res)
            }
            else{
                setSpinner(false)
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setSpinner(false)
            toast.error(error?.response?.data?.message)
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex h-[800px] w-full">
                <ToastContainer />
                <div className = "w-full hidden md:inline-block">
                    <img
                        className="h-full"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
                        alt="leftSideImage"
                    />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <form
                        className="md:w-96 w-80 flex flex-col items-center justify-center"
                        onSubmit={handleSubmit(handleRegister)}
                        encType="multipart/form-data"
                    >
                        <h2 className="text-4xl text-gray-900 font-medium">Sign up</h2>
                        <p className="text-sm text-gray-500/90 mt-3">
                            Create your account to get started
                        </p>

                        <div className="w-full mt-6">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="mb-3 w-full px-4 h-11 border border-gray-300/60 rounded-full outline-none text-sm text-gray-700"
                                {...register('fullname', { required: true })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="mb-3 w-full px-4 h-11 border border-gray-300/60 rounded-full outline-none text-sm text-gray-700"
                                {...register('username', { required: true })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="mb-3 w-full px-4 h-11 border border-gray-300/60 rounded-full outline-none text-sm text-gray-700"
                                {...register('email', { required: true })}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="mb-3 w-full px-4 h-11 border border-gray-300/60 rounded-full outline-none text-sm text-gray-700"
                                {...register('password', { required: true })}
                                required
                            />
                            <textarea
                                placeholder="Short Description"
                                className="mb-3 w-full px-4 py-2 border border-gray-300/60 rounded-2xl outline-none text-sm text-gray-700 resize-none"
                                rows="3"
                                {...register('description')}
                            ></textarea>

                           
                        </div>

                        <button
                        
                            type="submit"
                            className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
                        >
                            {spinner ? <Spinner /> : "Register"}
                        </button>

                        <p className="text-gray-500/90 text-sm mt-4">
                            Already have an account?{' '}
                            <NavLink to={'/login'} className="text-indigo-400 hover:underline"  >
                                Log In
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp