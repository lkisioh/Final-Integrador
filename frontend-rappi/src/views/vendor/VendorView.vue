<script setup>

// import { traerProductos } from '@/composables/products/traerProductos'
// import router from '@/router'

// import { userUuid } from '@/stores/user/userUuid'
// const {productos,cargando,error,llamarProductosAPI} = traerProductos()
// const {setUuid,getUuid} = userUuid()
// setUuid(router.currentRoute.value.params.uuid)
// const uuid = getUuid()

// llamarProductosAPI('http://localhost:3000/products/' + uuid)

import router from '@/router';
import { RouterLink } from 'vue-router';

const vendorUuid = router.currentRoute.value.params.uuid
const products = [
  {
    uuid: '111',
    name: 'Pebete Milan',
    description: 'Milan - pan - mayonesa',
    price: 1800,
    vendorUuid: 2,
    photo: 'pebeteMilna.img',
    available: true
  },
  {
    uuid: '333',
    name: 'COCA COLA 500ml',
    description: 'Coca Cola 500 mililitros',
    price: 1300,
    vendorUuid: 2,
    photo: 'coca500ml.img',
    available: true
  }
]
function ventas(){
  router.push('/vendor/ventas/' + vendorUuid)
}
function editarProducto(prod){
  router.push('product/' + prod)
}
</script>

<template>
  <div class="vendor-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <div class="vendor-box">
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
          <tr v-for="product in products" :key="product.id">
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
