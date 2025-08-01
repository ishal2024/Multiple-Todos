import React, { useEffect, useState } from 'react'
import { getAllTodos } from '../../../api/todos/getTodos'
import Todos from '../Dashboard/Todos'
import { useSelector } from 'react-redux'
import Container from '../../Layout/Container'
import Spinner from '../../Layout/Spinner'

function AdminTodo() {

    const [todos, setTodos] = useState([])
    const user = useSelector((state) => state?.user?.userInfo)
    const theme = useSelector((state) => state?.theme)
    const [apiSpinner , setApiSpinner] = useState(false)

    async function getTodos() {
        setApiSpinner(true)
        try {
            const response = await getAllTodos()
            console.log(response)
            if (response?.data?.todos) {
                const filterTodo = response?.data?.todos.filter((val) => val?.admin?.includes(user?._id))
                console.log(filterTodo)
                setTodos(filterTodo)
                setApiSpinner(false)
            }
        } catch (error) {
            setApiSpinner(false)
            console.log(error?.response?.message)
        }
    }

    console.log(todos)


    useEffect(() => {
        if(user?._id) getTodos()
    }, [user])


    return (

        <Container>
             {/* All Groups Heading */}
            <h2 className={`text-2xl text-center font-bold  ${theme?.primaryTextColor} border-b ${theme?.borderColor} mt-10`}>
                Admins Group
            </h2>

            {/* Todos List */}
            {apiSpinner ? <Spinner /> : <Todos todos={todos} />}
       </Container>

    )
}

export default AdminTodo