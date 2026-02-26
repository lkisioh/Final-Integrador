import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
})

// verificar o validar el token en cada request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
// token vencido
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('actor_type')
      localStorage.removeItem('actor_uuid')

      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default http
