<script setup>
import { ref,} from 'vue'
import { RouterLink } from 'vue-router'
import { openSesion } from '@/composables/login/openSesion'
import { useRouter } from 'vue-router'

const router = useRouter()

import { userUuid } from '@/stores/user/userUuid'
const { setUuid, setUserType, setNombre }= userUuid()

const email = ref('')
const password= ref('')
const { answer, cargando, openSesionAPI } = openSesion()

const login = async () => {
  try {
    const { access_token, actor } =
      await openSesionAPI('/auth/login', {
        email: email.value,
        password: password.value
      })

    localStorage.setItem('access_token', access_token)
    localStorage.setItem('actor_type', actor.type)
    localStorage.setItem('actor_uuid', actor.uuid)

    // actualizar store
    setUuid(actor.uuid)
    setUserType(actor.type)
    setNombre(actor.name)

    if (actor.type === 'final-user') {
      router.push('/shop')
    }
    else if (actor.type === 'vendor') {
      router.push('/vendor/' + actor.uuid)
    }
    else if (actor.type === 'driver') {
      router.push('/orders/' + actor.uuid)
    }
    else {
      console.log('Respuesta API:', answer.value)
    }

  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="home-wrapper">
    <h1 class="title">Rappi</h1>

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
  </div>
  <div>
    <p>{{ cargando }}</p>
  </div>
</template>

<style scoped>
</style>
