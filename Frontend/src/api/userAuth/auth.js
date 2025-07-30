import api from '../axiosConfig.js/api'

export function logInUser(data) {
    return api.post('/user/login', data, { withCredentials: true })
}

export function registerUser(data) {
    return api.post('/user/register',data, {withCredentials : true})
}

export function getUserData() {
    return api.get('/user/getUser' , {withCredentials : true})
}

export function updateProfileImage(data){
    return api.post('/user/updateUserImage' , data , {withCredentials : true})
}

export function updateUserInfo(data){
    return api.post('/user/updateUser' , data , {withCredentials : true})
}

export function changePassword(data){
    return api.post('/user/changePassword' , data , {withCredentials : true})
}

export function logoutUser(){
    return api.get('/user/logout' , {withCredentials : true})
 }