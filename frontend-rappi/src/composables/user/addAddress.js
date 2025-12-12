import axios from 'axios'
import {ref} from 'vue'

export const addAddress = () => {

  let address = ref({
    street: "",
    number: null,
    apartment: ""
  })
  const error = ref(null)
  const cargando = ref(false)

  const createAddressAPI = async (url) => {
    try {
      cargando.value = true

      const res = await axios.post(url, address.value)

      return res.data
    } catch (err) {
      console.error(`Error al agregar calle: ${err.message}`)
    } finally {
      cargando.value = false
    }

  }

  return {
    address,
    error,
    cargando,
    createAddressAPI,
 }
 }

