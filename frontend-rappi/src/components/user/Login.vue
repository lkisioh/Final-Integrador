<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')

function login() {
  console.log('Usuario logeado:', { email: email.value, password: password.value })
}
</script>

<template>
  <div class="login-box">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div class="input-group">
        <label>Email</label>
        <input v-model="email" type="text" />
      </div>

      <div class="input-group">
        <label>Contraseña</label>
        <input v-model="password" type="password" />
      </div>

      <button type="submit">Entrar</button>

      <p class="register-text">
        ¿No tienes una cuenta?
        <RouterLink to="/newUser">Crea una cuenta</RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped>

</style>
