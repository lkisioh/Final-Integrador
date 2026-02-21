import http from '@/services/http'
import {ref} from 'vue'

export const createOrder = () => {

  let order = ref({
    CAMBIAR_ATRIBUTOS_SEGUN_BACKEND:"",
    location:"",
    phone: null,
    vehicle: "",
    email: "",
    password: "",
  })
  const error = ref(null)
  const cargando = ref(false)


  const createOrderAPI = async (url) => {
    try {
      cargando.value = true
      const res = await http.post(url, order.value)
      return res.data
    } catch (error) {
      console.error(`Error al crear la orden: ${error.message}`)
    } finally {
      cargando.value = false
    }
  }

  return {
    order,
    error,
    cargando,
    createOrderAPI
  }
}
