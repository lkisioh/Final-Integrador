<script setup>
import { ref,} from 'vue'
import { RouterLink } from 'vue-router'
import { openSesion } from '@/composables/login/openSesion'
import router from '@/router'

const email = ref('')
const password= ref('')

const { answer, cargando, error, openSesionAPI } = openSesion()
const login = async () => {
  try {
    const data = await openSesionAPI('http://localhost:3000/login', {
      email: email.value,
      password: password.value,
    })

    console.log('Respuesta login:', data)

    if (data?.redirectTo) {
      router.push(data.redirectTo)
    } else {
      console.warn('No vino redirectTo en la respuesta.')
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="login">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input v-model="email" type="text" />
      </div>

      <div>
        <label>Contraseña:</label>
        <input v-model="password" type="password" />
      </div>

      <p>¿No tienes una cuenta?</p>
      <RouterLink to="/SelectUser">Crea una cuenta</RouterLink>
      <br>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<style scoped>

</style>
