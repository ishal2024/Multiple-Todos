import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTodoById, removeCurrentUser, removeTodo } from '../../../api/todos/getTodos'
import MemberIcon from './MemberIcon'
import SubTodoLayout from './SubTodoLayout'
import { useDispatch, useSelector } from 'react-redux'
import { insertTodoInfo, removeTodoInfo } from '../../../Redux/todoSlicer'
import { toast } from 'react-toastify'
import DeleteNotify from './DeleteNotify'


function GroupSideBar() {

  const { groupId } = useParams()
  const [todo, setTodo] = useState(null)
  const theme = useSelector((state) => state?.theme)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state?.user?.userInfo)
  const [isDeleteGroup , setIsDeleteGroup] = useState(false)
  const [isRemoveUser , setIsRemoveUser] = useState(false) 
  const [refreshPage, setRefreshPage] = useState(false)

  async function getTodo() {
    try {
      const todo = await getTodoById(groupId)
      if (todo?.data?.todo) {
        console.log(todo?.data?.todo)
        setTodo(todo?.data?.todo[0])
        dispatch(insertTodoInfo(todo?.data?.todo[0]))
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function removeUser() {
    try {
      const response = await removeCurrentUser(todo?._id)
      console.log(response)
      if (response?.data?.updatedTodo) {
        navigate('/')
        toast.success(response?.data?.message)
      }
    } catch (error) {
       toast.error(error?.response?.data?.message)
    }
  }

  // To delete Todo only one admin should be in Group

  async function deleteTodo() {
    try {
      if (todo?.admin?.length === 1) {
        const response = await removeTodo(todo?._id)
        if (response?.data?.todo) {
          navigate('/')
          toast.success(response?.data?.message)
        }
      }
      else{
        toast.warn("Only One Admin Should be in Group")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      
    }
  }

  
  

  useEffect(() => {
    getTodo()

    return () => {
      dispatch(removeTodoInfo())
    }
  }, [refreshPage])

  return (
        <>
 <div className={`flex flex-col w-screen h-screen ${theme?.bgColor} ${theme?.primaryTextColor} ${theme?.borderColor} overflow-hidden`}>

  {/* Header Section */}
  <header className="flex items-center justify-between  px-4 border-b  py-3 flex-shrink-0">
    <div className="flex items-center gap-4">
      <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer h-6 w-6 " />
      <div className="h-15 w-15 rounded-full md:ml-10  flex-shrink-0 ">
        <img src={todo?.thumbnail} alt="Group Avatar" className="h-full w-full rounded-full object-cover" />
      </div>
      <span className="font-semibold text-lg">{todo?.title || 'Group Name'}</span>
    </div>
    <div className="text-sm ">
      Group Code: <span className="font-bold ">{todo?.todoCode || 'N/A'}</span>
    </div>
  </header>

  {/* Main Content Area (Sidebar + SubTodoLayout) */}
  <main className="flex flex-grow overflow-hidden ">

    {/* --- Left Sidebar --- */}
    <aside className="w-35 md:w-60 flex flex-col border-r  flex-shrink-0  ">
      
      {/* Scrollable Member/Admin List */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        {/* Admin Section */}
        <div>
          <h2 className="text-base font-semibold  mb-3">Admins</h2>
          <div className="flex flex-col gap-3">
            {todo?.admin?.map((val) => (
              <MemberIcon setRefreshPage={setRefreshPage} todoForAdmin={todo} key={val?._id} user={val} />
            ))}
          </div>
        </div>

        {/* Members Section */}
        <div>
          <h2 className="text-base font-semibold  mb-3">Members</h2>
          <div className="flex flex-col gap-3">
            {todo?.members?.map((val) => (
              <MemberIcon setRefreshPage={setRefreshPage} todo={todo} key={val?._id} user={val} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Action Buttons at the bottom of the sidebar */}
      <div className="p-4 border-t   flex-shrink-0">
        <div className="flex flex-col gap-2">
          {/* These buttons are only visible to admins of the group */}
          {todo?.admin?.some((user) => user._id === userInfo._id) && (
            <>
              <button
                onClick={() => navigate('/create', { state: { todoInfo: todo } })}
                className='w-full text-center   rounded-md py-2 bg-green-600 hover:bg-green-700 text-white'
              >
                Edit Group
              </button>
              <button
                onClick={() => setIsDeleteGroup(true)}
                className='w-full text-center rounded-md py-2 bg-red-500 hover:bg-red-700 text-white'
              >
                Delete Group
              </button>
              {isDeleteGroup && 
              <DeleteNotify setIsDelete={setIsDeleteGroup} handleRemoveSubTodo={deleteTodo} 
              message={"You really want to Delete this Group ?"} />}
            </>
          )}
          {/* This button is visible to everyone in the group */}
          <button
            onClick={() => setIsRemoveUser(true)}
            className={`w-full text-center rounded-md py-2 bg-red-500 hover:bg-red-700 text-white`}
          >
            Leave Group
          </button>
          {isRemoveUser && <DeleteNotify handleRemoveSubTodo={removeUser} setIsDelete={setIsRemoveUser} message={"You really want to leave this Group ?"} />}
        </div>
      </div>
    </aside>

    {/* --- Right Content Pane --- */}
    <section className="flex-grow overflow-y-auto p-4 md:p-6">
      {/* This area is now scrollable. The SubTodoLayout component will be rendered inside it. */}
      <SubTodoLayout />
    </section>

  </main>
</div>



        </>
        )
}

        export default GroupSideBar