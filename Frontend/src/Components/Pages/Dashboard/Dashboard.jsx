import React, { useEffect, useState } from 'react'
import CreateProject from './CreateProject'
import Todos from './Todos'
import JoinTodoBox from './JoinTodoBox'
import { getAllTodos } from '../../../api/todos/getTodos'
import Container from '../../Layout/Container'
import { useSelector } from 'react-redux'
import Spinner from '../../Layout/Spinner'

function Dashboard() {

  const [todos, setTodos] = useState([])
  const pageRefresh = useSelector((state) => state?.admin?.userPageRefresh)
  const theme = useSelector((state) => state?.theme)
  const [apiSpinner , setApiSpinner] = useState(false)

  async function getTodos() {
      setApiSpinner(true)
    try {
      const response = await getAllTodos()
      console.log(response)
      if (response?.data?.todos) {
        setApiSpinner(false)
        setTodos(response?.data?.todos)
      }
    } catch (error) {
      setApiSpinner(false)
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

         {apiSpinner ? <Spinner />  :  <div className='w-full  flex justify-center'>
          <Todos todos={todos} />
          </div>}
        </div> 
      </Container>
    </>
  )
}

export default Dashboard