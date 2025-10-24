<script setup>
// Si querés usar reactive o ref:
import { ref } from 'vue'

import { RouterLink, RouterView } from 'vue-router'

// Ejemplo de datos del formulario
const email = ref('')
const password = ref('')

// Función para crear el usuario (podés adaptarla a tu lógica)
function login() {
  console.log('Usuario logeado:', { email: email.value, password: password.value })
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
      <RouterLink to="/newUser">Crea una cuenta</RouterLink>
      <br>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<style scoped>

</style>