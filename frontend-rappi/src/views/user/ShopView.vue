<script setup>
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'
import router from '@/router'
// import { traerProductos } from '@/composables/products/traerProductos'

const products = [
  {
    uuid: '111',
    name: 'Pebete Milan',
    description: 'Milan - pan - mayonesa',
    price: 1800,
    vendorUuid: 2,
    photo: 'pebeteMilan.img',
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

const storeUserUuid = userUuid()
const uuid = ref(storeUserUuid.getUuid())


function comprar(uuidProduct){

  router.push('/product/' + uuidProduct)
}

const productsCarrito = []

function agregarCarrito(uuidProduct){
  alert('Se agrego producto: '+uuidProduct)
productsCarrito.push(uuidProduct)
console.log(productsCarrito)
}

function verCarrito(){
  alert(productsCarrito)
}


// const {productos,cargando,error,llamarProductosAPI} = traerProductos()
// llamarProductosAPI('http://localhost:3000/products/')
</script>


<template>
  <div>
    <h1>Productos</h1>
    <h2>Usuario compador</h2>
    <p>UUID: {{ uuid }}</p>
  </div>

  <table>
    
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Precio</th>
        <th>Vendedor</th>
        <th>Foto</th>
        <th>Disponibilidad</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.uuid">
        <td>{{ product.name }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.vendorUuid }}</td>
        <td>{{ product.photo }}</td>
        <td>{{ product.available }}</td>
        <td><button @click="agregarCarrito(product.uuid)">Agregar al carrito!</button></td>
        <td><button @click="comprar(product.uuid)">Comprar</button></td>
      </tr>
    </tbody>

    <h5>{{ error }}</h5>
    <h5 v-if="cargando">Cargando...</h5>

    <button @click="verCarrito">Ver carrito</button>
  </table>



</template>

<style>

</style>
