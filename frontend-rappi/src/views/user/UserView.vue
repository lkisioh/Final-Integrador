<script setup>
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'
import router from '@/router'

const storeUserUuid = userUuid()

const uuid = ref(storeUserUuid.getUuid())
function comprar(){
  router.push('/shop')
}

</script>

<template>
  <div>
    <h1>MI CUENTA</h1>
    <h2>Usuario</h2>
    <p>UUID: {{ uuid}}</p>
    <p>Mail: userprueba@gmail.com</p>
    <p>Nombre: Nombre user 1 </p>
    <p>Direcciones:</p>
    <div>
      <ul>
        <li>Calle falsa 1 - 789</li>
        <li>Calle falsa 2 - 357</li>
      </ul>
      <button @click="agregarDireccion">Nueva dirección!</button>
    </div>
    <p>Locales Favoritos</p>
    <div>
      <ul>
        <li>Vendor 1</li>
        <li>Vendor 2</li>
      </ul>
    </div>
    <button>Ver Carrito</button>

  </div>

  <div>
    <button @click="comprar">Ir a comprar!</button>
  </div>
  <div>
    <button @click="editar">Editar Datos</button>
  </div>

</template>

<style>

</style>


