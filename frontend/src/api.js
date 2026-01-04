import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' })

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

API.interceptors.response.use(response => response, error => {
    if (!error.response) {
        // network or CORS or server down
        alert('Server error: ' + (error.message || 'Network error'))
    } else if (error.response.status >= 500) {
        alert('Server error: ' + (error.response.data?.message || 'Internal server error'))
    }
    return Promise.reject(error)
})

export default API
