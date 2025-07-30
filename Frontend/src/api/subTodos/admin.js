import api from '../axiosConfig.js/api'


export function makeAdmin(userId , todoId){
    return api.get(`/todo/makeAdmin/${userId}/${todoId}` , {withCredentials : true})
}

export function removeAdmin(userId , todoId){
    return api.get(`/todo/removeAdmin/${userId}/${todoId}` , {withCredentials : true})
}

export function removeMember(userId , todoId){
    return api.get(`/todo/remove/${userId}/${todoId}` , {withCredentials : true})
}
