<script setup>
// import { traerProductos } from '@/composables/products/traerProductos'

import router from '@/router'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
// const {productos,cargando,error,llamarProductosAPI} = traerProductos()
// llamarProductosAPI('http://localhost:3000/products')

// onMounted(() => {
//   llamarProductosAPI('http://localhost:3000/products')
// })

let toBuy =ref({})
const productUuid = router.currentRoute.value.params.uuid

function definirProduct(){
if(productUuid === '111'){
  toBuy.value= products[0]
}
else if(productUuid === '222'){
  toBuy.value = products[1]
}
else {
  toBuy.value = products[2]
}
}

onMounted(definirProduct)

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
    uuid: '222',
    name: 'Pebete Jamón',
    description: 'JyQ - pan - mayonesa',
    price: 1600,
    vendorUuid: 4,
    photo: 'pebeteJamon.img',
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

function ordenar(productUuid){
  
  alert('La compra de '+toBuy.value.name+' se realizo con éxito')
}
</script>

<template>
  <div class="product-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>

    </nav>

    <div class="product-box">
      <h1 class="pv-title">{{ toBuy.name }}</h1>
      <p class="pv-desc">{{ toBuy.description }}</p>
      <div class="pv-meta">
        <span class="pv-price">$ {{ toBuy.price }}</span>
        <span class="pv-vendor">Vendedor: {{ toBuy.vendorUuid }}</span>
        <span class="pv-available">{{ toBuy.available ? 'El producto está disponible' : 'El producto no está disponible' }}</span>
      </div>

      <div class="pv-actions">
        <button @click="ordenar(productUuid)" class="primary">FINALIZAR COMPRA</button>
        <RouterLink to="/shop" class="secondary">Seguir comprando</RouterLink>
      </div>

      <h5 v-if="error" class="error">{{ error }}</h5>
      <h5 v-if="cargando" class="loading">Cargando...</h5>
    </div>
  </div>
</template>

<style scoped>
</style>
