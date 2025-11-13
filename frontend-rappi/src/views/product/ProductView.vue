<script setup>
// import { traerProductos } from '@/composables/products/traerProductos'

import router from '@/router'
import { ref } from 'vue'
import { onMounted } from 'vue'
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
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ toBuy.name }}</td>
        <td>{{ toBuy.description }}</td>
        <td>{{ toBuy.price }}</td>
      </tr>
    </tbody>

    <h5>{{ error }}</h5>
    <h5 v-if="cargando">Cargando...</h5>
    <button @click="ordenar(productUuid)">FINALIZAR COMPRA</button>
  </table>

</template>
<style>
</style>
