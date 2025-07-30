import React, { useState } from 'react'
import { logoutUser } from '../../api/userAuth/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Layout/Spinner'

function LogOut() {

    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)

    async function logout() {
        setSpinner(true)
        try {
            const response = await logoutUser()
            if (response?.data?.user) {
                setSpinner(true)
                navigate('/login')
            }
        } catch (error) {
            setSpinner(false)
            console.log(error)
        }
    }

    return (
        <>
            <button onClick={logout} className='border-2 rounded-2xl text-white  py-2 px-4  bg-red-600 hover:bg-red-700'>Logout</button>
            {spinner && <Spinner />}
        </>
    )
}

export default LogOut