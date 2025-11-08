<template>
  <h1>Agregando un nuevo producto</h1>

  <form @submit.prevent="crearProducto">
    <div>
      <label>Nombre:</label>
      <input v-model="name" type="text" />
    </div>

    <div>
      <label>Descripción:</label>
      <input v-model="description" type="text" />
    </div>

    <div>
      <label>Precio: $ARS</label>
      <input v-model="price" type="number" />
    </div>

    <button type="submit">Agregar Producto</button>
  </form>
</template>
<script setup>
  import { ref } from 'vue'
import { createProduct } from '@/composables/products/createProduct'

import { userUuid } from '@/stores/user/userUuid'

const {getUuid} = userUuid()
const uuid = getUuid()

const {product,cargando,error,createProductAPI} = createProduct()

import router from '@/router'

// Ejemplo de datos del formulario
const name = ref('')
const description = ref('')
const price = ref(0)


// Función para crear el producto (podés adaptarla a tu lógica)
async function crearProducto() {
  console.log('Creando producto:' + product.value)

  mapearProduct(name, description, price)
  //lamada api
  const ok = await createProductAPI('http://localhost:3000/products', product.value)
if (ok) {
    alert('Producto creado con éxito')
    router.push('/vendor/' + uuid)  // Redirige a la vista de producto después de crearlo
  } else {
    console.log('Error al cambiar página')
  }
  console.log('JSON plano:', JSON.stringify(product.value))
}


function mapearProduct(name, description, price){
product.value = {
  name: name.value,
  description: description.value,
  price: price.value,
  vendorUuid: router.currentRoute.value.params.uuid
}
}
</script>
<style>
</style>
