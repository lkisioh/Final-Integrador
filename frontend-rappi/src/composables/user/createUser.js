
import axios from 'axios'
import {ref} from 'vue'
import { userUuid } from '@/stores/user/userUuid'



export const createUser = () => {

  const {setUuid} = userUuid()
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

      setUuid(res.data.uuid)  // Guardar el UUID en el store

      return res.data
    } catch (err) {
      console.error(`Error al crear el usuario: ${error.message}`)
    } finally {
      cargando.value = false
    }
  }

  // --- CARGAR (GET /users/:uuid) ---
  const loadUserAPI = async (url) => {
    try {
      cargando.value = true
      error.value = null

      const res = await axios.get(url)
      usuario.value = res.data

      if (!usuario.value.addresses || usuario.value.addresses.length === 0) {
        usuario.value.addresses = [
          { street: '', number: null, apartment: '' }
        ]
      }

      setUuid(res.data.uuid)
      return res.data
    } catch (err) {
      console.error(`Error al cargar el usuario: ${err.message}`)
      error.value = 'Error al cargar el usuario'
      return null
    } finally {
      cargando.value = false
    }
  }

  // --- EDITAR (PUT /users/:uuid) ---
  const updateUserAPI = async (url) => {
    try {
      cargando.value = true
      error.value = null

      const res = await axios.put(url, usuario.value)
      return res.data
    } catch (err) {
      console.error(`Error al actualizar el usuario: ${err.message}`)
      error.value = 'Error al actualizar el usuario'
      return null
    } finally {
      cargando.value = false
    }
  }

  // ACÁ es donde antes te explotaba: si pones loadUserAPI y no existe → ReferenceError
  return {
    usuario,
    error,
    cargando,
    createUserAPI,
    loadUserAPI,
    updateUserAPI
  }
}


