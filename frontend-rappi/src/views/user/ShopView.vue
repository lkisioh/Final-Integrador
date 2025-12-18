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

function agregarCarrito(product,vendorUuid,vendorName) {
  cartStore.addToCart({
    uuid: product.uuid,
    name: product.name,
    price: product.price,
  },
  vendorUuid,
  vendorName)
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
          <p>Productos</p>
          <ul>
            <li v-for="product in vendor.products" :key="product.uuid">
              {{ product.name }} - ${{ product.price }} 
              <button @click="agregarCarrito(product,vendor.uuid,vendor.name)">Agregar al carrito</button>
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
  :deep(nav), :deep(.navbar) {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999 !important; 
  background-color: white; 
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.user-view {
  background-color: #f0f4f8; 
  min-height: 100vh;         
  width: 100vw;              
  display: flex;
  flex-direction: column;
  align-items: center;       
  padding: 100px 0 40px 0; 
  margin: 0;
  position: absolute;        
  left: 0;
  top: 0;
  z-index: 1; 
}

.user-view > div {
  width: 90%;                
  max-width: 600px;          
  display: flex;
  flex-direction: column;
}

div[v-for="vendor in vendors"] {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #d9e2ec;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

p:nth-of-type(2) {
  background-color: #38a169;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  align-self: center; 
}

button {
  background-color: #486581;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  width: 100%;
  margin: 10px 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f0f4f8;
  list-style: none;
  background: white;
}

li button {
  width: auto;
  background-color: #2c7a7b;
  padding: 5px 10px;
}
</style>