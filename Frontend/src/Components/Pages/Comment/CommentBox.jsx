import React, { useEffect, useState } from 'react'
import { getAllComments } from '../../../api/subTodos/comment'
import { X } from 'lucide-react';
import CommentCard from './CommentCard'
import AddComment from './AddComment'
import { useSelector } from 'react-redux';

function CommentBox({ subTodoId, setIsCommentBoxVisible }) {

    const [comments, setComments] = useState([])
    const [isCommentAdded, setIsCommentAdded] = useState(false)
    const [updatedComment, setUpdatedComment] = useState(null)
    const [updatedCommentId, setUpdatedCommentId] = useState(null)
     const theme = useSelector((state) => state?.theme)

    async function getComments() {
        try {
            const res = await getAllComments(subTodoId)
            if (res?.data?.comments) setComments(res?.data?.comments.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getComments()
    }, [isCommentAdded])

    return (
        <>

            <div  className={`
            fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black/30 backdrop-blur-sm z-50`}>
                <div className={`relative md:w-[40%] w-[90%] ${theme?.primaryTextColor} ${theme?.bgColor} rounded-xl p-6 shadow-lg flex flex-col gap-y-6`}>

                    {/* ❌ Close Button */}
                    <button
                        
                        className={`

                            absolute top-3 right-3 ${theme?.secondaryTextColor} hover:text-red-500 transition-colors`}
                    >
                        <X onClick={() => setIsCommentBoxVisible(false)} size={22} />
                    </button>

                    {/* 🧾 Heading */}
                    <div className="text-center">
                        <h1 className="text-xl font-semibold ">Comments</h1>
                        <hr className={`mt-2 ${theme?.borderColor}`} />
                    </div>

                    {/* 💬 Comments List */}
                    {comments.length !== 0 ? <div className="w-full flex flex-col gap-y-3 items-center max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {comments.map((val) => (
                            <CommentCard
                                key={val._id}
                                comment={val}
                                setIsCommentAdded={setIsCommentAdded}
                                setUpdatedComment={setUpdatedComment}
                                setUpdatedCommentId={setUpdatedCommentId}
                            />
                        ))}
                    </div> : <div className={`text-3xl p-4 text-center ${theme?.primaryTextColor}`}>No Comments are Added</div>}

                    {/* ➕ Add Comment */}
                    <AddComment
                        updatedComment={updatedComment}
                        setUpdatedComment={setUpdatedComment}
                        updatedCommentId={updatedCommentId}
                        subTodoId={subTodoId}
                        setIsCommentAdded={setIsCommentAdded}
                    />
                </div>
            </div>
        </>
    )
}

export default CommentBox
