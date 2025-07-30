import React, { useEffect } from 'react'
import GroupSideBar from './GroupSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../../api/userAuth/auth';
import { userLogin } from '../../../Redux/userSlicer';
import { ToastContainer } from 'react-toastify';

function GroupLayout() {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state?.user?.userInfo)

  async function getUser() {
    try {
      const res = await getUserData()
      console.log(res)
      if (res?.data?.userInfo) {
        dispatch(userLogin(res?.data?.userInfo))
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(userData)



  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
    <ToastContainer />
      <GroupSideBar />
    </>
  )
}

export default GroupLayout