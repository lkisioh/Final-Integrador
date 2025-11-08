<script setup>
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'
import router from '@/router'

const storeUserUuid = userUuid()
const uuidLogin = ref(storeUserUuid.getUuid())

function comprar(){
  router.push('/products')
}

</script>


<template>
  <div>
    <h1>MI CUENTA</h1>
    <h2>Usuario</h2>
    <p>UUID: {{ uuidLogin }}</p>
  </div>

  <div>
    <button @click="comprar">Comprar!</button>
  </div>

</template>

<style>

</style>


