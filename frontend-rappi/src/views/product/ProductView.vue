<script setup>
import { createOrder } from '@/composables/order/createOrders'
import { traerProductos } from '@/composables/products/traerProductos'
import router from '@/router'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { userUuid } from '@/stores/user/userUuid'
const storeUserUuid = userUuid()
const uuid = ref(storeUserUuid.getUuid())

const {order,createOrderAPI} = createOrder()


const productUuid = router.currentRoute.value.params.uuid
const {productos,llamarProductosAPI} = traerProductos()

const product= ref({})
onMounted(() => {
  llamarProductosAPI('/products/'+ productUuid)
  product.value = productos[0].value
})

let toBuy =ref({})
const clientUuid = uuid
const price = product.value.price
const cantidad = 1

async function ordenar() {
  console.log('Creando orden:' )

  mapearOrden(productUuid, clientUuid, price, cantidad)
  //lamada api
  const ok = await createOrderAPI('/orders', product.value)
if (ok) {
    alert('Orden creado con éxito')
    console.log('uuid routa ' +order.value.OrderUuid)
    router.push('/vendors/' + uuid.value)  // Redirige a la vista de ordenes del comprador
  } else {
    console.log('Error al cambiar página')
  }
  console.log('JSON plano:', JSON.stringify(order.value))
}

function mapearOrden(name, description, price){
order.value = {
  productUuid: name.value,
  clientUuid: clientUuid.value,
  vendorUuid: router.currentRoute.value.params.uuid,
   price: price.value,
   cantidad: cantidad.value
}
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
