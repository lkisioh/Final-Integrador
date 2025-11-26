<script setup>
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'

import { traerUser } from '@/composables/user/traerUser'
import router from '@/router'

const {user,llamarUserAPI} = traerUser()
const storeUserUuid = userUuid()

const uuid = ref(storeUserUuid.getUuid())
function comprar(){
  router.push('/shop')
}
function editar(){
  router.push('/edit/user/' + uuid.value)
}
function verCarrito(){
  router.push('/cart')
}

llamarUserAPI('http://localhost:3000/users/by-uuid/' + uuid.value )


console.log(user)
</script>

<template>
  <NavBar></NavBar>
    <router-view></router-view>
  <div class="user-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>

    </nav>

    <div class="profile-box">
      <h1 class="uv-title">MI CUENTA</h1>
      <h2 class="uv-sub">Usuario</h2>
      <p><strong>UUID:</strong> {{ uuid}}</p>
      <p><strong>Email: {{ user.email }}</strong> </p>
      <p><strong>Nombre: {{ user.name }}</strong></p>

      <div class="section">
        <h3>Direcciones</h3>
        <ul v-for="adress in user.adresses" :key="adress">
          <li> {{ adress.street  }} - {{ adress.number }}</li>
        </ul>
        <button class="primary" @click="agregarDireccion">Nueva dirección!</button>
      </div>

      <div class="section">
        <h3>Locales Favoritos</h3>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div class="actions">
        <button class="primary" @click="verCarrito">Ver Carrito</button>
        <button class="primary" @click="comprar">Ir a comprar!</button>
        <button class="primary" @click="editar">Editar Datos</button>
      </div>
    </div>
  </div>
</template>

<style>

</style>


