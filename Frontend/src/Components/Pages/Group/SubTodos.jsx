import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllSubTodo } from '../../../api/subTodos/subTodo'
import SubTodoCard from './SubTodoCard'
import NoItem from '../../Layout/NoItem'
import Spinner from '../../Layout/Spinner'

function SubTodos({todoAdded }) {

    const { groupId } = useParams()
    const [subTodos , setSubTodos] = useState([])
    const [handelLike , setHandleLike] = useState(false)
    const [apiSpinner , setApiSpinner] = useState(false)


    async function getSubTodos() {
        setApiSpinner(true)
        try {
           const response = await getAllSubTodo(groupId)
           if(response?.data?.subtodos){
               setSubTodos(response?.data?.subtodos)
               setApiSpinner(false)
           }
          
        } catch (error) {
           setApiSpinner(false)
           console.log(error)
        }
    }

    console.log(subTodos)
   

    useEffect(() => {
        if(groupId){
            getSubTodos()
        }
    } , [groupId , handelLike , todoAdded ])

    return (
       <>
       {apiSpinner ? <Spinner />  : subTodos.length !== 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center mt-20 gap-15  '>
       {subTodos.map((val) => {
        return <SubTodoCard key={val?._id} subTodo = {val} setHandleLike = {setHandleLike}/>
       })}
       </div> : 
       <>
       <div className=' w-full my-20'>
        <NoItem message={"Post"} />
       </div>
       </>
}
        </>
    )
}

export default SubTodos