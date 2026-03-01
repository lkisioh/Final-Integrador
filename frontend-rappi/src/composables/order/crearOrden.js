import http from '@/services/http'
import {ref} from 'vue'

export const crearOrden = () => {

  const error = ref(null)
  const cargando = ref(false)


  const crearOrdenAPI = async (url, orden) => {
    try {
      cargando.value = true
      const res = await http.post(url, orden)
      return res.data
    } catch (error) {
      console.log('status', error?.response?.status)
    console.log('data', error?.response?.data)
    console.error("Error al generar la orden", error);
      console.error(`Error al crear la orden: ${error.message}`)
    } finally {
      cargando.value = false
    }
  }

  return {

    error,
    cargando,
    crearOrdenAPI
  }
}

