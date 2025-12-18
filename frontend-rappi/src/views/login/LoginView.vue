<script setup>
import { ref,} from 'vue'
import { RouterLink } from 'vue-router'
import { openSesion } from '@/composables/login/openSesion'
import router from '@/router'


import { userUuid } from '@/stores/user/userUuid'
const { setUuid, getUuid, setUserType, getUserType, setNombre, getNombre }= userUuid()

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
    setUuid(data.uuid)
    setUserType(data.role)
    setNombre(data.name)

    const userRole = getUserType()
    const userUuid = getUuid()
    const userName = getNombre()

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
