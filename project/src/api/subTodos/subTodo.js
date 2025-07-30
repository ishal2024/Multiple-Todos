import api from '../axiosConfig.js/api'


export function createTodo({todoId , todoData}){
    return api.post(`/subtodo/create/${todoId}` , todoData , {withCredentials : true , headers: {
    'Content-Type': 'multipart/form-data',
  }})
}

export function getAllSubTodo(todoId){
    return api.get(`/subtodo/${todoId}` , {withCredentials : true})
}

export function deleteSubTodo(todoId){
    return api.get(`/subtodo/delete/${todoId}` , {withCredentials : true})
}

export function updateSubTodo(todoId , data){
    return api.post(`/subtodo/update/${todoId}` , data , {withCredentials : true})
}

