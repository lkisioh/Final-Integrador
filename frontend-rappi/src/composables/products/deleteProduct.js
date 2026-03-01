import http from '@/services/http'
import {ref} from 'vue'

export const deleteProduct = () => {

  const error = ref(null)
  const cargando = ref(false)

  const deleteProductAPI = async (url) => {
    try {
      cargando.value = true

      const res = await http.delete(url)

      return res.data
    } catch (err) {
     if (err?.response?.status === 409) {
    alert(err.response.data.message) 
    return
  }
  alert('Error: ' + (err?.response?.data?.message ?? err.message))
} finally {
      cargando.value = false
    }

  }

  return {
    error,
    cargando,
    deleteProductAPI,
 }
 }

