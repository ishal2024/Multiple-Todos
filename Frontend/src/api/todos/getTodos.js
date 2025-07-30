import api from "../axiosConfig.js/api"


function getAllTodos(){
    return api.get('/todo/' , {withCredentials : true})
}

function createTodos(formData){
    return api.post('/todo/create' , formData , {withCredentials : true , headers: {
    'Content-Type': 'multipart/form-data',
  }})
}

function joinOtherTodo(data){
    return api.post('/todo/join' , data , {withCredentials : true })
}

function getTodoById(todoId){
    return api.get(`/todo/get/${todoId}`, {withCredentials : true })
}

function removeCurrentUser(todoId){
    return api.get(`/todo/removeCurrentUser/${todoId}` , {withCredentials : true})
}

function removeTodo(todoId){
    return api.get(`/todo/delete/${todoId}` , {withCredentials : true})
}

function updateTodo(todoId , formData){
    return api.post(`/todo/update/${todoId}` , formData , {withCredentials : true})
}

export {getAllTodos , createTodos , joinOtherTodo  , getTodoById , removeCurrentUser , removeTodo , updateTodo}