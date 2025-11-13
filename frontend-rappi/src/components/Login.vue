<script setup>
import { ref,} from 'vue'
import { RouterLink } from 'vue-router'
// import { openSesion } from '@/composables/login/openSesion'
import router from '@/router'

import { userUuid } from '@/stores/user/userUuid'


const { setUuid }= userUuid()


const email = ref('')
const password= ref('')

 // const { answer, cargando, error, openSesionAPI } = openSesion()
const login = async () => {

  if(email.value=== 'userprueba@gmail.com' && password.value === '123456')
  {
    setUuid(1)
    router.push('/user/1')
  }
  else if (email.value=== 'vendorprueba@gmail.com' && password.value === '123456')
  {
    setUuid(2)
    router.push('/vendor/2')
  }
   else if (email.value=== 'driverprueba@gmail.com' && password.value === '123456')
  {
    setUuid(3)
    router.push('/orders/3')
  }



  // try {
  //   const data = await openSesionAPI('http://localhost:3000/login', {
  //     email: email.value,
  //     password: password.value,
  //   })

  //   console.log('Respuesta login:', data)

  //   if (data?.redirectTo) {
  //     router.push(data.redirectTo)
  //   } else {
  //     console.warn('No vino redirectTo en la respuesta.')
  //   }
  // } catch (e) {
  //   console.log(e)
  // }
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
