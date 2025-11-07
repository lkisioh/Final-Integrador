
import axios from 'axios'
import {ref} from 'vue'

export const createVendor = () => {

  let vendor = ref({
    marketName: "",
    category: "",
    daysOpen: "",
    time: "",
    email: "",
    phone: null,
    password: "",
    address:
      {
        street: "",
        number: null,
        apartment: ""
      }
  })
  const error = ref(null)
  const cargando = ref(false)


  const createVendorAPI = async (url) => {
    try {
      cargando.value = true
      const res = await axios.post(url, vendor.value)
      return res.data
    } catch (error) {
      console.error(`Error al crear el vendedor: ${error.message}`)
    } finally {
      cargando.value = false
    }
  }

  return {
    vendor,
    error,
    cargando,
    createVendorAPI
  }
}


