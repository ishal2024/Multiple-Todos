import React, { useEffect } from 'react'
import { getUserData } from '../../api/userAuth/auth'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {

    const navigate = useNavigate()

    async function getUser(){
        try {
            const response = await getUserData()
            if(!response?.data?.userInfo) navigate('/login')
        } catch (error) {
            navigate('/login')
        }
    }

    useEffect(() => {
       getUser()
    },[])

  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute