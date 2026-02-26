import http from '@/services/http'
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'

export const openSesion = () => {
  const { setUuid } = userUuid()

  const answer = ref(null)
  const error = ref(null)
  const cargando = ref(false)

  const openSesionAPI = async (url, { email, password }) => {
    cargando.value = true
    error.value = null

    try {
      const { data } = await http.post(url, { email, password })

      if (data?.access_token) localStorage.setItem('access_token', data.access_token)

      if (data?.actor?.uuid) setUuid(data.actor.uuid)
      if (data?.actor?.type) localStorage.setItem('actor_type', data.actor.type)
      if (data?.actor?.uuid) localStorage.setItem('actor_uuid', data.actor.uuid)


      answer.value = data

      return data
    } catch (e) {
      error.value = e?.response?.data ?? e?.message ?? 'Error desconocido'
      console.error('Error al loguear:', error.value)
      throw e
    } finally {
      cargando.value = false
    }
  }

  return { answer, error, cargando, openSesionAPI }
}
