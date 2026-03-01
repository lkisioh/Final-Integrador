import http from '@/services/http'
import {ref} from 'vue'

export const editAddress = () => {

  let addressNueva = ref({
    street: "",
    number: null,
    apartment: ""
  })
  const error = ref(null)
  const cargando = ref(false)

  const editarAddressAPI = async (url) => {
    try {
      cargando.value = true

      const res = await http.patch(url, addressNueva.value)

      return res.data
    } catch (err) {
      console.error(`Error al agregar calle: ${err.message}`)
    } finally {
      cargando.value = false
    }

  }

  return {
    addressNueva,
    error,
    cargando,
    editarAddressAPI,
 }
 }

