import http from '@/services/http'
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'

export const openSesion = () => {
  const { setUuid } = userUuid()

  const answer  = ref({ uuid: '', role: '', redirectTo: '' })
  const error   = ref(null)
  const cargando = ref(false)

  const openSesionAPI = async (url, { email, password }) => {
    cargando.value = true
    error.value = null
    try {
      const res = await http.post(url, { email, password })
      const data = res.data


      if (data?.uuid) setUuid(data.uuid)

      answer.value = data

      return data
    } catch (e) {
      error.value = e?.response?.data ?? e.message
      console.error('Error al loguear:', error.value)
      throw e
    } finally {
      cargando.value = false
    }
  }

  return { answer, error, cargando, openSesionAPI }
}
