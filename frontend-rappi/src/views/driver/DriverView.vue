<script setup>
import router from '@/router';
import { ref } from 'vue';

const ordenes = ref([])

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
