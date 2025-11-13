<script setup>
import router from '@/router';
import { RouterLink } from 'vue-router';

const ordenes = [
  { uuid: 1, name: 'Orden 1', products:[{uuid:222, name: 'Pebete Jamon', cantidad:1},{uuid:111, name: 'Pebete Milan', cantidad: 2}], retiro: 'Local vendor 65', envio: 'direccion user 1', total: 5652, estado:'Listo para llevar'},
  { uuid: 2, name: 'Orden 2', products:[{uuid:333, name: 'Coca Cola', cantidad: 1}], retiro: 'Local vendor 1', envio: 'direccion user 2', total: 52, estado:'En preparacion'},
  { uuid: 3, name: 'Orden 3', products:[{uuid:111, name: 'Pebete Milan', cantidad: 2}, {uuid:333, name: 'Coca Cola', cantidad: 2}], retiro: 'Local vendor 2', envio: 'direccion user 8', total: 561352, estado: 'En preparacion'},
]

const uuidDriver = router.currentRoute.value.params.uuid

function editar(){
  router.push('/edit/driver/' + uuidDriver)
}
function historial(){
  router.push('/driver/historial/' + uuidDriver)
}
</script>

<template>
  <div class="driver-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      
    </nav>
    <div class="driver-box">
      <h1>LISTA DE PEDIDOS</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Productos</th>
            <th>Cantidad</th>
            <th>Local de retiro</th>
            <th>Envio cliente</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="orden in ordenes" :key="orden.uuid">
            <td>{{ orden.name }}</td>
            <td>
              <p v-for="product in orden.products" :key="product.uuid">
                 {{ product.name }}
                </p>
            </td>
            <td>
              <p v-for="product in orden.products" :key="product.uuid">
                 {{ product.cantidad }}
                </p>
            </td>
            <td>{{ orden.retiro }}</td>
            <td>{{ orden.envio }}</td>
            <td>${{ orden.total }}</td>
            <td>{{ orden.estado }}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 20px;">
        <button @click="editar">Editar perfil</button>
        <button @click="historial">Ver historial de PEDIDOS</button>
      </div>

      <h5 v-if="error">{{ error }}</h5>
      <h5 v-if="cargando">Cargando...</h5>
    </div>
  </div>
</template>

<style scoped>
</style>
