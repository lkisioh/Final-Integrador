<script setup>

import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { createUser } from '@/composables/user/createUser.js'

const {usuario,cargando,error,createUserAPI} = createUser()

import router from '@/router'

const name = ref('Usuario 1')
const street = ref('Calle falsa')
const number = ref(555)
const apartment = ref('')
const email = ref('userprueba@gmail.com')
const password = ref('123456')

// async function nuevoUsuario() {
//   console.log('Creando usuario:'+usuario.value)

//   mapearUser(name,street,number,apartment,email,password)

//   const ok = await createUserAPI('http://localhost:3000/users', usuario.value)
// if (ok) {
//     alert('Usuario creado con éxito')
//     router.push('/user/' + usuario.value.uuid)  // Redirige a la vista de usuario después de crearlo
//   } else {
//     console.log('Error al cambiar página')
//   }
//   console.log('JSON plano:', JSON.stringify(usuario.value))
// }

// function mapearUser(name,street,number,apartment,email,password){
// usuario.value = {
//   name: name.value,
//   email: email.value,
//   password: password.value,
//   addresses: [
//     {
//       street: street.value,
//       number: number.value,
//       apartment: apartment.value
//     }
//   ]
// }
// }
</script>

<template>
  <div class="form-user-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/SelectUser">← Volver atrás</RouterLink>
    </nav>
    <div class="form-box">
      <h2>Comprador</h2>
      <form @submit.prevent="nuevoUsuario">
        <div>
          <label>Nombre:</label>
          <input v-model="name" type="text" />
        </div>

        <div>
          <label>Direccion:</label>

          <label>Calle:</label>
          <input v-model="street" type="text" />

          <label>Número:</label>
          <input v-model="number" type="number" />

          <label>Dpto:</label>
          <input v-model="apartment" type="text" />
        </div>


        <div>
          <label>Email:</label>
          <input v-model="email" type="text" />
        </div>

        <div>
          <label>Contraseña:</label>
          <input v-model="password" type="password" />
        </div>

        <button type="submit">Crear</button>
      </form>
      <h3 v-if="error" class="error">{{ error }}</h3>
      <h3 v-if="cargando" class="loading">Cargando...</h3>
    </div>
  </div>
</template>

<style scoped>

</style>
