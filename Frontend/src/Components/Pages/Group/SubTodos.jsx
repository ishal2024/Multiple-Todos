import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllSubTodo } from '../../../api/subTodos/subTodo'
import SubTodoCard from './SubTodoCard'
import NoItem from '../../Layout/NoItem'

function SubTodos({todoAdded }) {

    const { groupId } = useParams()
    const [subTodos , setSubTodos] = useState([])
    const [handelLike , setHandleLike] = useState(false)


    async function getSubTodos() {
        try {
           const response = await getAllSubTodo(groupId)
           setSubTodos(response?.data?.subtodos)
          
        } catch (error) {
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
       {subTodos.length !== 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center mt-20 gap-15  '>
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