<script setup>
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'
import router from '@/router'

import NavBar from '@/components/user/NavBar.vue'
import { traerProductos } from '@/composables/products/traerProductos'

const {getUuid} = userUuid()
const uuid = getUuid()

console.log('Lo que trae el storeUuid es '+uuid)
function comprar(uuidProduct){
  router.push('/product/' + uuidProduct)
}
const productsCarrito = []

function agregarCarrito(uuidProduct){
  alert('Se agrego producto: '+uuidProduct)
productsCarrito.push(uuidProduct)
console.log(productsCarrito)
}

const {productos,cargando,error,llamarProductosAPI} = traerProductos()
llamarProductosAPI('http://localhost:3000/products/')
</script>

<template>
  <NavBar></NavBar>

  <!-- HACER ESTILO DE:   user view, products-container, products-box  -->
  <div class="user-view">

    <div >
      <div>
        <h1>Productos</h1>
      <!-- VER SI TRAE BIEN EL USER FINAL!!!1aaaaA -->
        <h2>Usuario comprador</h2>
        <p>UUID: {{ uuid }}</p>
        <h2>Cantidad en el carrito</h2>
        <p>{{ productos.length }}</p>
      </div>

      <!-- HACER QUE EL PRODUCTS TRAIGA SOLO LOS AVAILABLES Y TRAER EL NOMBRE DEL LOCAL-->
      <div class="products-box" v-for="product in productos" :key="product.uuid" >
        <h4>{{ product.name }}</h4>
        <h4>$ {{  product.price  }}</h4>
        <img src="" :alt= product.photo>
        <h5>{{ product.description }}</h5>

        <button @click="irAlVendedor(product.vendorUuid)">Más Sobre el vendedor</button>
        <button @click="agregarCarrito(product.uuid)">Agregar</button>
        <button @click="comprar(product.uuid)">Comprar</button>
      </div>

      <h5 v-if="error">{{ error }}</h5>
      <h5 v-if="cargando">Cargando...</h5>
    </div>
  </div>
</template>

<style scoped>
</style>
