import api from "../axiosConfig.js/api";

export function toggleLike(subtodoId){
    return api.get(`/subtodo/like/${subtodoId}` , {withCredentials :true})
}

export function toggledisLike(subtodoId){
    return api.get(`/subtodo/dislike/${subtodoId}` , {withCredentials :true})
}