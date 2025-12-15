<script setup>

import { traerProductos } from '@/composables/products/traerProductos'
import { traerVendor } from '@/composables/vendor/traerVendor'
import router from '@/router'
import { RouterLink } from 'vue-router';

import { userUuid } from '@/stores/user/userUuid'
const {productos,cargando,error,llamarProductosAPI} = traerProductos()
const {setUuid,getUuid} = userUuid()
setUuid(router.currentRoute.value.params.uuid)
const uuid = getUuid()
llamarProductosAPI('http://localhost:3000/products/' + uuid)
const vendorUuid = router.currentRoute.value.params.uuid

const {vendor,llamarVendorAPI} = traerVendor()
llamarVendorAPI('http://localhost:3000/vendors/' + vendorUuid)
</script>

<template>
  <div class="vendor-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
    </nav>
    <div class="vendor-box">
      <h1>Local: {{ vendor.name }}</h1>
      <h2>Horario: {{ vendor.time }}</h2>
      <h2>Ubicación: </h2>
      <h3>Calle: {{ vendor.address?.street }}</h3>
      <h3>Número: {{ vendor.address?.number }}</h3>
      <h2>Celular: {{ vendor.phone }}</h2>
      <h1>Mis productos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productos" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>${{ product.price }}</td>
            <td>
              <button>Editar</button>
              <button>Disponibilidad</button>
              <button>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 20px;">
        <RouterLink :to="'/products/' + vendorUuid">Agregar producto</RouterLink>
        <RouterLink :to="'/edit/vendor/' + vendorUuid">Editar perfil</RouterLink>
        <RouterLink :to="'/orders/vendor' + vendorUuid">Mis ventas</RouterLink>
      </div>

      <h5 v-if="error">{{ error }}</h5>
      <h5 v-if="cargando">Cargando...</h5>
    </div>
  </div>
</template>

<style scoped>
</style>
