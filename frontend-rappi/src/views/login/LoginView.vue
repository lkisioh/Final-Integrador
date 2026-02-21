<script setup>
import { ref,} from 'vue'
import { RouterLink } from 'vue-router'
import { openSesion } from '@/composables/login/openSesion'
import { useRouter } from 'vue-router'

const router = useRouter()

import { userUuid } from '@/stores/user/userUuid'
const { setUuid, getUuid, setUserType, getUserType, setNombre }= userUuid()

const email = ref('')
const password= ref('')
const { answer, cargando, openSesionAPI } = openSesion()

const login = async () => {
  try {
    const data = await openSesionAPI('/auth/login', {
      email: email.value,
      password: password.value,
    })

  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('auth', JSON.stringify({
  uuid: data.uuid,
  role: data.kind,
  name: data.name,
  email: data.email,
}));

    console.log('Respuesta login:', data)
    setUuid(data.uuid)
    setUserType(data.kind)
    setNombre(data.name)

    const userRole = getUserType()
    const userUuid = getUuid()

    if (userRole === 'final-user') {
      router.push('/shop')
    }
    else if (userRole === 'vendor'){
      router.push('/vendor/'+ userUuid)
    }
    else if (userRole === 'driver'){
      router.push('/orders/'+ userUuid)
    }
     else {
      console.log('Lo que envió la Api fue: '+ answer)

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
