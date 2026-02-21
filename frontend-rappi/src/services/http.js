import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
})

// verificar o validar el token en cada request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default http
