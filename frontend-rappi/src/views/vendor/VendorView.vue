<script setup>

import { traerProductos } from '@/composables/products/traerProductos'
import router from '@/router'
import { userUuid } from '@/stores/user/userUuid'
const {productos,cargando,error,llamarProductosAPI} = traerProductos()
const {setUuid,getUuid} = userUuid()
setUuid(router.currentRoute.value.params.uuid)
const uuid = getUuid()

llamarProductosAPI('http://localhost:3000/products/' + uuid)

</script>

<template>
  <h1>Productos del vendedor</h1>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in productos" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
      </tr>
    </tbody>

    <router-link :to="'/products/' + uuid">Agregar producto</router-link>

    <h5>{{ error }}</h5>
    <h5 v-if="cargando">Cargando...</h5>

  </table>
</template>
<style>
</style>
