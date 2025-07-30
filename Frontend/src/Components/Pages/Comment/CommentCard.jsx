import { Pencil, Trash } from 'lucide-react'
import React from 'react'
import {deleteComment} from '../../../api/subTodos/comment'
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify'

function CommentCard({ comment , setIsCommentAdded  ,setUpdatedComment , setUpdatedCommentId}) {
 
  const userInfo = useSelector((state) => state?.user?.userInfo)
  const theme = useSelector((state) => state?.theme)

   async function removeComment(commentId){
     try {
      const res = await deleteComment(commentId)
      if(res?.data?.deletedComment){
        setIsCommentAdded((prev) => !prev)
        toast.success(res?.data?.message)
      }
     } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error)
     }
  }

    return (
        <>
          <div className={`flex flex-col p-4 ${theme?.cardColor} rounded-xl shadow-sm border  ${theme?.primaryTextColor}  ${theme?.borderColor} max-w-[300px] md:max-w-md w-full`}>
  {/* User Icon + Name + Actions */}
  <div className="flex items-center justify-between mb-2">
    {/* Profile section */}
    <div className="flex items-center space-x-3">
      <img
        src={`${comment?.owner?.profileImage !== "" ? comment?.owner?.profileImage : "https://imgs.search.brave.com/mxawWquDU3JSTrvgfYeUemUi6O1AwrjgnN5fQ5OLNHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9wZnAtcHJv/ZmlsZS1waWN0dXJl/LTUzODIyMTMtNDQ5/NTg0Mi5wbmc_Zj13/ZWJwJnc9MTI4"}`}
        alt="User"
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="font-medium  text-sm">{comment?.owner?.fullname}</span>
    </div>

    {/* Action icons */}
    {comment?.owner?._id == userInfo?._id && 
    <div className="flex space-x-2">
      <button className="text-green-500 hover:bg-green-100 p-1 rounded-full">
        <Pencil onClick={() => {
          setUpdatedComment(comment?.content)
          setUpdatedCommentId(comment?._id)
        }} size={18} className="text-green-500 cursor-pointer " />
      </button>
      <button onClick={() => removeComment(comment?._id)} className="text-red-500 hover:bg-red-100 p-1 rounded-full">
        <Trash size={18} className="text-red-500 cursor-pointer" />
      </button>
    </div>
      } 
  </div>
  {/* Comment Content */}
  <div className={` ${theme?.secondaryTextColor} text-sm mb-1`}>
    <p>
      {comment?.content}
    </p>
  </div>

  {/* Comment Date */}
  <div className={`text-xs ${theme?.secondaryTextColor} mt-1`}>
    {new Date(comment.createdAt).toLocaleString()}
  </div>
</div>

        </>
    )
}

export default CommentCard