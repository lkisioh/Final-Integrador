<script setup>
const ordenes = [
  { id: 1, name: 'Orden 1', description: 'Descripción de la orden 1', price: 10.5 },
  { id: 2, name: 'Orden 2', description: 'Descripción de la orden 2', price: 20.0 },
  { id: 3, name: 'Orden 3', description: 'Descripción de la orden 3', price: 15.75 },
]
</script>

<template>
  <h1>LISTA DE PEDIDOSSSS</h1>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="orden in ordenes" :key="orden.id">
        <td>{{ orden.name }}</td>
        <td>{{ orden.description }}</td>
        <td>{{ orden.price }}</td>
      </tr>
    </tbody>

    <h5>{{ error }}</h5>
    <h5 v-if="cargando">Cargando...</h5>

  </table>
</template>
<style>
</style>
