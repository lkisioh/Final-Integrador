import http from '@/services/http'
import {ref} from 'vue'

export const deleteAddress = () => {

  const error = ref(null)
  const cargando = ref(false)

  const deleteAddressAPI = async (url) => {
    try {
      cargando.value = true

      const res = await http.delete(url)

      return res.data
    } catch (err) {
      console.error(`Error al eliminar direccion: ${err.message}`)
    } finally {
      cargando.value = false
    }

  }

  return {
    error,
    cargando,
    deleteAddressAPI,
 }
 }

