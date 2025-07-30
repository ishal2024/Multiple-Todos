import api from '../axiosConfig.js/api'

export function getAllComments(subTodoId){
    return api.get(`/comment/${subTodoId}` , {withCredentials : true})
}

export function createComments(subTodoId , data){
    return api.post(`/comment/create/${subTodoId}`, data , {withCredentials : true})
}

export function deleteComment(commentId){
    return api.get(`/comment/delete/${commentId}`, {withCredentials : true})
}

export function modifyComment(commentId , data){
    return api.post(`/comment/update/${commentId}`, data , {withCredentials : true})
}