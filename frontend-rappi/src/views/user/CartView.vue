<script setup>
import { ref } from 'vue'
import router from '@/router';
const cart = ref([
  { uuid: 1, product:[{uuid:222, name: 'Pebete Jamon', cantidad:1}], vendedor: 'Vendor 65',total: 5652},
  { uuid: 2, product:[{uuid:333, name: 'Coca Cola', cantidad: 1}], vendedor: 'Vendor 1', total: 52,},
  { uuid: 3, product:[{uuid:111, name: 'Pebete Milan', cantidad: 3}], vendedor: 'Vendor 2', total: 561352}
])

import { RouterLink } from 'vue-router'

function comprar(){
  router.push('/shop')
}
function pagar(){
  router.push('/user/payment')
}

function eliminarProducto(uuid){
  const idx = cart.value.findIndex(i => i.uuid === uuid)
  if (idx !== -1) cart.value.splice(idx, 1)
}
var total = 0;
for (let i = 0; i < cart.value.length; i++) {

total += cart.value[i].total * cart.value[i].product.reduce((acc, prod) => acc + prod.cantidad, 0);

}
</script>

<template>
  <div class="cart-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/user/1">← Volver atrás</RouterLink>
    </nav>

    <div class="cart-box">
      <h1 class="cart-title">CARRITO</h1>

      <table class="cart-table">
        <thead>
          <tr>
            <th>Productos</th>
            <th>Cantidad</th>
            <th>Vendor</th>
            <th>Precio Unitario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.uuid">
            <td>
              <p v-for="producto in item.product" :key="producto.uuid">{{ producto.name }}</p>
            </td>
            <td>
              <p v-for="producto in item.product" :key="producto.uuid">{{ producto.cantidad }}</p>
            </td>
            <td>{{ item.vendedor }}</td>
            <td>{{ item.total }}</td>
            <td><button @click="eliminarProducto(item.uuid)" class="secondary">Eliminar</button></td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary">
        <h3>Total a pagar: <span class="cart-total">{{ total }}</span></h3>
        <div class="cart-actions">
          <button @click="pagar" class="primary">Finalizar Compra</button>
          <button @click="comprar" class="secondary">Volver a tienda</button>
        </div>
      </div>

      <h5 v-if="error" class="error">{{ error }}</h5>
      <h5 v-if="cargando" class="loading">Cargando...</h5>
    </div>
  </div>
</template>

<style scoped>
</style>
