import React, { useEffect, useState } from 'react'
import CreateProject from './CreateProject'
import Todos from './Todos'
import JoinTodoBox from './JoinTodoBox'
import { getAllTodos } from '../../../api/todos/getTodos'
import Container from '../../Layout/Container'
import { useSelector } from 'react-redux'

function Dashboard() {

  const [todos, setTodos] = useState([])
  const pageRefresh = useSelector((state) => state?.admin?.userPageRefresh)
  const theme = useSelector((state) => state?.theme)

  async function getTodos() {
    try {
      const response = await getAllTodos()
      console.log(response)
      if (response?.data?.todos) {
        setTodos(response?.data?.todos)
      }
    } catch (error) {
      console.log(error?.response?.message)
    }
  }



  useEffect(() => {
    getTodos()
  }, [pageRefresh])


  return (
    <>
      <Container>
        <div className={`flex  flex-col md:flex-row flex-wrap gap-x-6 items-center `}>
          <CreateProject />
          <JoinTodoBox />
        </div>

        <div className='w-full  flex-col   '>
          <h2 className={`text-2xl text-center font-bold ${theme?.primaryTextColor} pb-2 border-b ${theme?.borderColor}  mb-8`}>
            All Groups
          </h2>

         <div className='w-full  flex justify-center'>
          <Todos todos={todos} />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Dashboard