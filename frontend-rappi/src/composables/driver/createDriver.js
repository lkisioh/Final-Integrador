import http from '@/services/http'
import {ref} from 'vue'

export const createDriver = () => {

  let driver = ref({
    name:"",
    location:"",
    phone: null,
    vehicle: "",
    email: "",
    password: "",
  })
  const error = ref(null)
  const cargando = ref(false)


  const createDriverAPI = async (url) => {
    try {
      cargando.value = true
      const res = await http.post(url, driver.value)
      return res.data
    } catch (error) {
      console.error(`Error al crear el conductor: ${error.message}`)
    } finally {
      cargando.value = false
    }
  }

  return {
    driver,
    error,
    cargando,
    createDriverAPI
  }
}

