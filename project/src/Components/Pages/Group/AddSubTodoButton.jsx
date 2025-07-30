import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import SubTodoForm from './SubTodoForm'
import { useDispatch, useSelector } from 'react-redux'
import { subtodoFormVisible } from '../../../Redux/isVisibleSlicer'

function AddSubTodoButton({setTodoAdded}) {

    const dispatch = useDispatch()
    const formVisible = useSelector((state) => state?.isVisible?.subTodoForm)
    console.log(formVisible)
    return (
        <>
            <div className="flex justify-center w-full mt-5">
                <button
                    onClick={() => dispatch(subtodoFormVisible(true))}
                    className="flex items-center justify-evenly w-40 h-15  gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
                    <Plus size={25} />
                    <span className="text-base font-medium">Add Post</span>
                </button>
            </div>
            {formVisible && <SubTodoForm  setTodoAdded = {setTodoAdded} />}
        </>
    )
}

export default AddSubTodoButton