<script setup>
import { userUuid } from '@/stores/user/userUuid'


const { getUuid }= userUuid()
const uuid = getUuid()

</script>
<template>
  <div class="nan-links">

   <RouterLink to="/mis-pedidos/:uuid"> 🍔 Mis pedidos</RouterLink>
   <RouterLink to="/vendors"> 🏪 Vendedores</RouterLink>
   <RouterLink to="/cart"> 🛒 Carrito</RouterLink>
   <RouterLink :to="`/user/${uuid}`"> 👤 Mi Cuenta</RouterLink>

  </div>
</template>
<style scoped>
.nan-links {
  /* Esto la mantiene siempre arriba y a la vista */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Prioridad máxima */
  
  /* Estilo visual */
  background-color: white; 
  display: flex;
  justify-content: flex-end; 
  gap: 20px;
  padding: 15px 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

.nan-links a {
  text-decoration: none;
  color: #243b55;
  font-weight: 600;
  font-size: 14px;
}
</style>

