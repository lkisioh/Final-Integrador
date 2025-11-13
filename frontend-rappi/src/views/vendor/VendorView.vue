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
</script>

<template>
  <h1>Mis productos</h1>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td><button>Editar producto</button></td>
        <td><button>Disponibilidad producto</button></td>
        <td><button>Eliminar producto</button></td>
      </tr>
    </tbody>

    <router-link :to="'vendor/products/' + vendorUuid">Agregar producto</router-link>
    <br>
    <router-link :to="'/edit/vendor/' + vendorUuid">Editar perfil</router-link>
    <br>
    <router-link :to="'/orders/vendor' + vendorUuid">Mis ventas</router-link>

    <h5>{{ error }}</h5>
    <h5 v-if="cargando">Cargando...</h5>

  </table>
</template>
<style>
</style>
