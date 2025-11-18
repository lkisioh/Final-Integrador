<script setup>
import router from '@/router'
import { traerOrdenes } from '@/composables/orders/traerOrders'

// HACER
const {ordenes,cargando,error,llamarOrdenesAPI} = traerOrdenes()

llamarOrdenesAPI('http://localhost:3000/orders/')

let totalVentas = 0
for (let i = 0; i < ordenes.length; i++) {
  totalVentas += ordenes[i].total
}
function volver(){
  router.push('/vendor/' + router.currentRoute.value.params.uuid)
}
</script>

<template>
  <h1>VENTAS DEL LOCAL</h1>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Productos</th>
        <th>Cantidad</th>
        <th>Cliente</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="orden in ordenes" :key="orden.uuid">
        <td>{{ orden.name }}</td>
        <td>
          <p v-for="product in orden.products" :key="product.uuid">
            {{ product.name }}
          </p>
        </td>
        <td>
          <p v-for="product in orden.products" :key="product.uuid">
            {{ product.cantidad }}
          </p>
        </td>
        <td>{{ orden.cliente }}</td>
        <td>{{ orden.total }}</td>
      </tr>
    </tbody>
  </table>

  <h4>Total ventas: {{ totalVentas }}</h4>

  <h5 v-if="error">{{ error }}</h5>
  <h5 v-if="cargando">Cargando...</h5>
   <button @click="volver">Volver</button>
</template>

