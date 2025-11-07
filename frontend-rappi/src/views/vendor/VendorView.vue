<script setup>

const products = [
  { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 30.5 },
  { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 45.0 },
  { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 25.75 },
]
</script>

<template>
  <h1>Productos del vendedor</h1>
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
      </tr>
    </tbody>

    <h5>{{ error }}</h5>
    <h5 v-if="cargando">Cargando...</h5>

  </table>
</template>
<style>
</style>
