<script setup>
import { userUuid } from '@/stores/user/userUuid'


const { getUuid }= userUuid()
const uuid = getUuid()

</script>
<template>
  <div class="nan´links">

   <RouterLink to="/shop"> 🍔 Productos</RouterLink>
   <RouterLink to="/vendors"> 🏪 Vendedores</RouterLink>
   <RouterLink to="/cart"> 🛒 Carrito</RouterLink>
   <RouterLink :to="`/user/${uuid}`"> 👤 Mi Cuenta</RouterLink>

  </div>
</template>
<style>
</style>
{}
