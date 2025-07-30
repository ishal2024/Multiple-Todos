import React, { useEffect, useState } from 'react'
import { getAllTodos } from '../../../api/todos/getTodos'
import Todos from '../Dashboard/Todos'
import { useSelector } from 'react-redux'
import Container from '../../Layout/Container'

function MemeberTodo() {

    const [todos, setTodos] = useState([])
    const user = useSelector((state) => state?.user?.userInfo)
    const theme = useSelector((state) => state?.theme)
    

    async function getTodos() {
        try {
            const response = await getAllTodos()
            console.log(response)
            if (response?.data?.todos) {
                const filterTodo = response?.data?.todos.filter((val) => val?.members?.includes(user?._id))
                console.log(filterTodo)
                setTodos(filterTodo)
            }
        } catch (error) {
            console.log(error?.response?.message)
        }
    }

    console.log(todos)


    useEffect(() => {
        if (user?._id) getTodos()
    }, [user])


    return (

        <Container>
            {/* All Groups Heading */}
            <h2 className={`text-2xl text-center font-bold  border-b ${theme?.primaryTextColor} ${theme?.borderColor} mt-10`}>
                Members Group
            </h2>

            {/* Todos List */}
            <Todos todos={todos} />
        </Container>
    )
}

export default MemeberTodo