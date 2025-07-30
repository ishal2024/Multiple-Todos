import axios from 'axios'

const api = axios.create({
    baseURL : 'https://multiple-todos.onrender.com'
})

export default api