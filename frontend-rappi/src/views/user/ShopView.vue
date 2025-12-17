<script setup>
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'
import router from '@/router'
import NavBar from '@/components/user/NavBar.vue'
//import { traerProductos } from '@/composables/products/traerProductos'
import { traerVendor } from '@/composables/vendor/traerVendor'
import { useCartStore } from '@/stores/user/cartStore'

const {getUuid} = userUuid()
const uuid = getUuid()
const cartStore = useCartStore()
console.log('Lo que trae el storeUuid es '+uuid)
function comprar(uuidProduct){
  router.push('/product/' + uuidProduct)
}
const productsCarrito = ref([])

function agregarCarrito(product) {
  cartStore.addToCart({
    uuid: product.uuid,
    name: product.name,
    price: product.price,
  })
}

//const {productos,cargando,error,llamarProductosAPI} = traerProductos()
//llamarProductosAPI('http://localhost:3000/products')

const {vendors,cargando,error, llamarVendorAPI,llamarVendorsAPI} = traerVendor()
llamarVendorsAPI('http://localhost:3000/vendors')

function irAlVendedor(uuidVendor){

  llamarVendorAPI('http://localhost:3000/vendors/' + uuidVendor)

  router.push('/vendor/' + uuidVendor)
}

// FALTARÏA QUE LA API DEVUELVA LOS PRODUCTOS DE CADA VENDEDOR PARA MOSTRARLOS ACÁ; HABRÍA que modificar
// el BAck en /vendors por get que devuelve todo pero no tiene la entidad products en la devolución.
</script>

<template>
  <NavBar></NavBar>

  <div class="user-view">

    <div >
      <div>
        <h1>Productos</h1>
        <h2>Usuario comprador</h2>
        <p>UUID: {{ uuid }}</p>
        <h2>Cantidad en el carrito</h2>
        <p>{{ cartStore.totalItems }}</p>
      </div>

      <div>
        <h3>Vendedores</h3>

        <div v-for="vendor in vendors" :key="vendor.uuid">
          <h3> xs </h3>
          <p> Local: {{ vendor.name }}</p>
          <button @click="irAlVendedor(vendor.uuid)">Ver Vendedor</button>
          <p>Productos</p>
          <ul>
            <li v-for="product in vendor.products" :key="product.uuid">
              {{ product.name }} - ${{ product.price }} <button @click="agregarCarrito(product)">Agregar al carrito</button>
            </li>
            
          </ul>

        </div>


      </div>

      <!-- <div class="products-box" v-for="product in productos" :key="product.uuid" >
        <h4>{{ product.name }}</h4>
        <h4>$ {{  product.price  }}</h4>
        <img src="" :alt= product.photo>
        <h5>{{ product.description }}</h5>

        <button @click="irAlVendedor(product.vendorUuid)">Más Sobre el vendedor</button>
        <button @click="agregarCarrito(product.uuid)">Agregar</button>
        <button @click="comprar(product.uuid)">Comprar</button>
      </div> -->

      <h5 v-if="error">{{ error }}</h5>
      <h5 v-if="cargando">Cargando...</h5>
    </div>
  </div>
</template>

<style scoped>
</style>
