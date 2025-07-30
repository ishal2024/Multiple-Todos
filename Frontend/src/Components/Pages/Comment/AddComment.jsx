import React, { useEffect, useState } from 'react'
import { createComments, modifyComment } from '../../../api/subTodos/comment'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

function AddComment({ subTodoId, setIsCommentAdded , updatedComment , updatedCommentId , setUpdatedComment}) {

  const [comment, setComment] = useState("")
  const theme = useSelector((state) => state?.theme)
  console.log(subTodoId)

  async function addComment() {
    try {
      const res = await createComments(subTodoId, { content: comment })

      console.log(res)
      if (res?.data?.comment) {
        setComment("")
        setIsCommentAdded((prev) => !prev)
        toast.success(res?.data?.message)
      }
    } catch (error) {
      setComment("")
      toast.error(error?.response?.data?.message)
    }
  }

   async function updateComment() {
    try {
      console.log(comment)
      const res = await modifyComment(updatedCommentId , { content: comment })
      console.log(res)
      if (res?.data?.updatedComment) {
        setComment("")
        setUpdatedComment(null)
        setIsCommentAdded((prev) => !prev)
      }
    } catch (error) {
      setComment("")
      console.log(error)
    }
  }

  useEffect(() => {
    if (updatedComment) setComment(updatedComment)
  }, [updatedComment])

  return (
    <>
      <div className={`flex w-full items-center gap-2 ${theme?.bgColor} border ${theme?.borderColor}  ${theme?.primaryTextColor}   rounded-lg px-3 py-2 shadow-sm`}>
        {/* Comment Input Box */}
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-grow outline-none text-sm placeholder-gray-500"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Send Button */}
        {updatedComment ?
          <button onClick={updateComment} className=" bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded-md text-sm font-medium">
            Update
          </button>
            : 
          <button onClick={addComment} className=" bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md text-sm font-medium">
            Send
          </button>}
      </div>

    </>
  )
}

export default AddComment