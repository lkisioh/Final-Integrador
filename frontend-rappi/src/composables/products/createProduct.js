import http from '@/services/http'
import {ref} from 'vue'
export const createProduct = () => {

  const error = ref(null)
  const cargando = ref(false)

  const createProductAPI = async (url, productData) => {
    try {
      cargando.value = true
      const res = await http.post(url, productData)

      return res.data
    } catch (error) {
      console.log('DATA:', error?.response?.data);
      console.log('MESSAGE:', error?.response?.data?.message);
      console.error(`Error al crear el producto: ${error.message}`)
    } finally {
      cargando.value = false
    }
  }

  return {
    error,
    cargando,
    createProductAPI
  }
}


