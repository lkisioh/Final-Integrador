<script setup>
import { onMounted } from 'vue'

import { traerProductos } from '@/composables/products/traerProductos'


const {productos,cargando,error,llamarProductosAPI} = traerProductos()
llamarProductosAPI('http://localhost:3000/products')

onMounted(() => {
  llamarProductosAPI('http://localhost:3000/products')
})


</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="producto in productos" :key="producto.id">
        <td>{{ producto.name }}</td>
        <td>{{ producto.description }}</td>
        <td>{{ producto.price }}</td>
      </tr>
    </tbody>

    <h5>{{ error }}</h5>
    <h5 v-if="cargando">Cargando...</h5>

  </table>
</template>
<style>
</style>
