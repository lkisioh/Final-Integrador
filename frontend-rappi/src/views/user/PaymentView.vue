<script setup>
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'
import router from '@/router'
import { RouterLink } from 'vue-router'
    function pagar(){
  alert('Pago realizado con éxito')
  router.push('/shop')
}
function volver(){
  router.push('/cart')
}
</script>

<template>
  <div class="payment-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <div class="payment-box">
      <h1 class="payment-title">PAGAR COMPRA</h1>

      <label>Método de pago:</label>
      <select class="input">
        <option value="credit-card">Tarjeta de crédito</option>
        <option value="debit-card">Tarjeta de débito</option>
      </select>

      <label>Detalles de pago:</label>
      <input class="input" type="text" placeholder="Número de tarjeta" />
      <div class="row">
        <input class="input small" type="text" placeholder="Fecha de vencimiento" />
        <input class="input small" type="text" placeholder="CVV" />
      </div>

      <div class="pv-actions">
        <button @click="pagar" class="primary">Pagar ahora</button>
        <button @click="volver" class="secondary">Volver</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>