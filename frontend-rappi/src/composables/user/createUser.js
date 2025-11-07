
import axios from 'axios'
import {ref} from 'vue'

export const createUser = () => {

  let usuario = ref({
    name: "",
    email: "",
    password: "",
    addresses: [
      {
        street: "",
        number: null,
        apartment: ""
      }
    ],
  })
  const error = ref(null)
  const cargando = ref(false)


  const createUserAPI = async (url) => {
    try {
      cargando.value = true
      const res = await axios.post(url, usuario.value)
      return res.data
    } catch (error) {
      console.error(`Error al crear el usuario: ${error.message}`)
    } finally {
      cargando.value = false
    }
  }

  return {
    usuario,
    error,
    cargando,
    createUserAPI
  }
}


