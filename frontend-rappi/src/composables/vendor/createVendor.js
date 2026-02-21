
import http from '@/services/http'
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
      const res = await http.post(url, vendor.value)
      return res.data
    } catch (err) {
    console.error('Error al crear vendedor:', {
    message: err.message,
    status: err.response?.status,
    data: err.response?.data,
  })
    throw err
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


