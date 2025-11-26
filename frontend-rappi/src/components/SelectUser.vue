
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="select-user-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/">← Volver atrás</RouterLink>
    </nav>
    <div class="select-user-box">
      <h1 class="title">¿Qué tipo de cuenta deseas crear?</h1>
      <div class="options">
        <RouterLink to="/newVendor" class="option vendor">
          <div class="icon">🏪</div>
          <span>Ser Vendedor</span>
          <p class="description">Vende tus productos</p>
        </RouterLink>

        <RouterLink to="/newUser" class="option buyer">
          <div class="icon">🛍️</div>
          <span>Ser Comprador</span>
          <p class="description">Compra productos</p>
        </RouterLink>

        <RouterLink to="/newDriver" class="option driver">
          <div class="icon">🚚</div>
          <span>Ser Delivery</span>
          <p class="description">Entrega pedidos</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
