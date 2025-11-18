<script setup>
import router from '@/router'

function volver(){
  router.push('/orders/' + router.currentRoute.value.params.uuid)
}
</script>

<template>
  <div class="historial-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/SelectUser">← Volver atrás</RouterLink>
    </nav>

    <div class="historial-box">
      <h1 class="hist-title">HISTORIAL DE PEDIDOS</h1>
      <table class="hist-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidos" :key="pedido.uuid">
            <td>{{ pedido.name }}</td>
            <td>{{ pedido.cliente }}</td>
            <td>{{ pedido.total }}</td>
            <td>{{ pedido.estado }}</td>
          </tr>
        </tbody>
      </table>

      <h4> Total generado hoy : {{ totalHoy }}</h4>
      <div style="margin-top:16px">
        <button @click="volver" class="primary">Volver</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
