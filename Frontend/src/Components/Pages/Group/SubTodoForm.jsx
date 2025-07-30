import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createTodo, updateSubTodo } from '../../../api/subTodos/subTodo'
import { addSubtodoInfo, subtodoFormVisible } from '../../../Redux/isVisibleSlicer'
import { useState } from 'react'
import {toast} from 'react-toastify'
import Spinner from '../../Layout/Spinner'

function SubTodoForm({ setTodoAdded }) {

    const todoInfo = useSelector((state) => state?.todo?.todoInfo)
    const dispatch = useDispatch()
    const formVisible = useSelector((state) => state?.isVisible?.subTodoForm)
    const subTodo = useSelector((state) => state?.isVisible?.subTodoInfo)
    const [spinner , setSpinner] = useState(false)
    const theme = useSelector((state) => state?.theme)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: subTodo?.title || "",
            description: subTodo?.description || "",
            image: subTodo?.image || ""
        }
    })

    async function handleCreateTodo(data) {
        setSpinner(true)
        try {

            const todoData = new FormData()
            todoData.append('title', data?.title)
            todoData.append('description', data?.description)
            todoData.append('image', data?.image[0])

            if (todoInfo) {
                const response = await createTodo({ todoData, todoId: todoInfo?._id })
                if(response?.data?.subtodo){
                    setSpinner(false)
                    toast.success(response?.data?.message)
                    dispatch(subtodoFormVisible(false))
                    setTodoAdded((prev) => !prev)
                }
                else{
                    setSpinner(false)
                    toast.error(response?.data?.message)
                }
            }


        } catch (error) {
            setSpinner(false)
             toast.error(error?.response?.data?.message)
        }
    }

    async function modifySubTodo(data) {
        setSpinner(true)
        try {
            const todoData = new FormData()
            todoData.append('title', data?.title || subTodo?.title)
            todoData.append('description', data?.description || subTodo?.description)
            todoData.append('image', data?.image[0] || subTodo?.image)

            const response = await updateSubTodo(subTodo?._id, todoData)
            console.log(response)
            if(response?.data?.updatedSubtodo){

                dispatch(subtodoFormVisible(false))
                dispatch(addSubtodoInfo({}))
                setSpinner(false)
                toast.success(response?.data?.message)
                setTodoAdded((prev) => !prev)
            }
            else{
                setSpinner(false)
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setSpinner(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
                <form
                    onSubmit={handleSubmit(Object.keys(subTodo).length == 0 ? handleCreateTodo : modifySubTodo)}
                    className={`${theme?.cardColor} ${theme?.primaryTextColor} w-[90vw] max-w-lg rounded-xl shadow-xl p-6 space-y-5`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-1 text-center">
                            <h2 className="text-xl font-semibold ">Add Post</h2>
                        </div>
                        <button
                            onClick={() => {
                                dispatch(subtodoFormVisible(false))
                                dispatch(addSubtodoInfo({}))
                            }}
                            className="text-red-600 hover:text-red-800 transition"
                        >
                            <X />
                        </button>
                    </div>
                    {/* Title */}
                    <div>
                        <label className={`block text-sm font-medium ${theme?.secondaryTextColor} mb-1`}>Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter title"
                            {...register("title", { required: true })}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className={`block text-sm font-medium ${theme?.secondaryTextColor} mb-1`}>Description</label>
                        <textarea
                            rows={4}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter description"
                            {...register("description", { required: true })}
                            required
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className={`block text-sm font-medium  mb-1`}>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className={`w-full border  rounded-md p-2`}
                            {...register("image")}

                        />
                        {Object.keys(subTodo).length !== 0 &&
                            <div className="mt-2 w-full h-18 overflow-hidden rounded-md border">
                                <img
                                    src={subTodo?.image}
                                    alt={subTodo?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        }
                    </div>

                    {/* Add Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`${Object.keys(subTodo).length != 0 && 'bg-green-600 hover:bg-green-700'}
                                px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300`}
                        >
                         {spinner ? <Spinner /> : Object.keys(subTodo).length == 0 ? 'Add Sub Todo' : "Update Sub Todo"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SubTodoForm