import React, { useEffect, useState } from 'react'
import { ThumbsDown, ThumbsUp, MessageCircle, Pencil, Trash } from 'lucide-react'
import { toggledisLike, toggleLike } from '../../../api/subTodos/like'
import { useDispatch, useSelector } from 'react-redux'
import CommentBox from '../Comment/CommentBox'
import { deleteSubTodo } from '../../../api/subTodos/subTodo'
import { addSubtodoInfo, subtodoFormVisible } from '../../../Redux/isVisibleSlicer'
import DeleteNotify from './DeleteNotify'
import { toast } from 'react-toastify'



function SubTodoCard({ subTodo, setHandleLike }) {


  const userInfo = useSelector((state) => state?.user?.userInfo)
  const dispatch = useDispatch()
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false)
  const [isDelete , setIsDelete] = useState(false)
  const theme = useSelector((state) => state?.theme)

  async function handleLikeToggle(subTodoId) {
    try {
      const res = await toggleLike(subTodoId)
      if (res?.data?.status === true) {
        console.log(res?.data?.status)
        setHandleLike((prev) => !prev)
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDisLikeToggle(subTodoId) {
    try {
      const res = await toggledisLike(subTodoId)
      if (res?.data?.status === true) {
        console.log(res?.data?.status)
        setHandleLike((prev) => !prev)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveSubTodo(){
    try {
      const response = await deleteSubTodo(subTodo?._id)
      console.log(response)
      if(response?.data?.deletedSubtodo){
        setHandleLike((prev) => !prev)
        toast.success(response?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }



  return (
    <>
      <div className={`max-w-sm min-h-[380px] p-4 rounded-2xl shadow-md border ${theme?.cardColor} ${theme?.primaryTextColor} ${theme?.borderColor} flex flex-col justify-between`}>
        <div>
          <h2 className="text-xl font-semibold ">{subTodo?.title}</h2>
          <p className={`text-sm  ${theme?.secondaryTextColor} mb-3`}>{subTodo?.description}</p>

          <img
            src={
              subTodo?.image !== ''
                ? subTodo?.image
                : 'https://imgs.search.brave.com/1Lu_7g6oAyZjQV1ZRdKCWQM2T_iXjj2pmobgnnXcY_4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90YWot/bWFoYWwtYWdyYS1z/dW5zZXQtYmFua3Mt/cml2ZXIteWFtdW5h/LW1vb2R5LXNreS12/aWV3LXdvb2Rlbi1i/b2F0LXVzZWQtdG91/cmlzdC1yaWRlLXNj/ZW5pYy1ib2F0cy1p/bmRpYS0xODA5NTM5/NDUuanBn'
            }
            alt="Subtodo"
            className="rounded-md w-full mb-4 object-cover h-[180px]"
          />

          <div className={`flex justify-around items-center ${theme?.secondaryTextColor} mb-4`}>
            <div onClick={() => handleLikeToggle(`${subTodo?._id}`)} className="flex items-center space-x-1">
              <ThumbsUp
                className={`${subTodo?.like.includes(userInfo?._id) && 'text-blue-500'}`}
                size={18} />
              <span>{subTodo?.like.length}</span>
            </div>
            <div onClick={() => handleDisLikeToggle(`${subTodo?._id}`)} className="flex items-center space-x-1">
              <ThumbsDown
                className={`${subTodo?.dislike.includes(userInfo?._id) && 'text-red-500'}`}
                size={18} />
              <span>{subTodo?.dislike.length}</span>
            </div>
            <div onClick={() => setIsCommentBoxVisible(true)} className="flex items-center space-x-1">
              <MessageCircle size={18} />
              <span>{subTodo?.comments}</span>
              {/* <CommentBox subTodoId={subTodo?._id} /> */}
            </div>
              {isCommentBoxVisible && (
                <CommentBox
                  subTodoId={subTodo?._id}
                setIsCommentBoxVisible={setIsCommentBoxVisible}
                />
              )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center space-x-2">
            <img
              src={
                subTodo?.owner?.profileImage !== ''
                  ? subTodo?.owner?.profileImage
                  : 'https://imgs.search.brave.com/B4JwHMfYN5iGa-PymU8M7lOZ45VzIeQhmdYReaYVxj4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by91c2VyLXByb2Zp/bGUtaW50ZXJmYWNl/LXNpZ24tc3ltYm9s/LWljb25fMTAyNjk1/MC0xMDQ1NTYuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MA'
              }
              alt="Owner"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium ">{subTodo?.owner?.fullname}</p>
              <p className={`text-xs ${theme?.secondaryTextColor}`}>{subTodo?.owner?.email}</p>
            </div>
          </div>
          {subTodo?.owner?._id == userInfo?._id &&
            <div className="flex items-center gap-x-5">
              <Pencil
              onClick={() => {
                  dispatch(subtodoFormVisible(true))
                  dispatch(addSubtodoInfo(subTodo))
              }}
               size={18} className="text-green-500 cursor-pointer " />
              <Trash
                onClick={() => setIsDelete(true)}
                size={18} className="text-red-500 cursor-pointer" />
                {isDelete && <DeleteNotify setIsDelete = {setIsDelete} handleRemoveSubTodo = {handleRemoveSubTodo} message = {"You want to delete this Post ?"} />}
            </div>

          }
        </div>
      </div>
    </>
  )
}

export default SubTodoCard