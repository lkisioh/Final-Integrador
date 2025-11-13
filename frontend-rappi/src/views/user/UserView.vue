<script setup>
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'
import router from '@/router'

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
</script>

<template>
  <div class="user-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
     
    </nav>

    <div class="profile-box">
      <h1 class="uv-title">MI CUENTA</h1>
      <h2 class="uv-sub">Usuario</h2>
      <p><strong>UUID:</strong> {{ uuid}}</p>
      <p><strong>Mail:</strong> userprueba@gmail.com</p>
      <p><strong>Nombre:</strong> Nombre user 1</p>

      <div class="section">
        <h3>Direcciones</h3>
        <ul>
          <li>Calle falsa 1 - 789</li>
          <li>Calle falsa 2 - 357</li>
        </ul>
        <button class="primary" @click="agregarDireccion">Nueva dirección!</button>
      </div>

      <div class="section">
        <h3>Locales Favoritos</h3>
        <ul>
          <li>Vendor 1</li>
          <li>Vendor 2</li>
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


