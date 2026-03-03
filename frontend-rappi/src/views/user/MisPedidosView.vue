<script setup>
import { ref, onMounted, computed } from 'vue'
import { traerOrdenesUser } from '@/composables/user/traerOrdenesUserFinal';

const { ordenesUser, llamarOrdenesUserAPI } = traerOrdenesUser()
const cargando = ref(false)

const normalizar = (texto) => texto?.toString().trim().toUpperCase() || '';

async function cargarMisPedidos() {
  cargando.value = true
  try {
    const userUuid = localStorage.getItem('userUuid')
    if (!userUuid) {
      console.error("No se encontró UUID de usuario");
      return;
    }

    await llamarOrdenesUserAPI('/orders/user/' + userUuid)
    console.log("Órdenes recibidas:", ordenesUser.value)
  } catch (error) {
    console.error("Error al cargar:", error)
  } finally {
    cargando.value = false
  }
}

const pedidosOrdenados = computed(() => {
  if (!ordenesUser.value) return [];
  return [...ordenesUser.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

function formatFecha(fecha) {
  if(!fecha) return '';
  return new Date(fecha).toLocaleDateString() + ' ' + new Date(fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

onMounted(() => {
  cargarMisPedidos()
})
</script>

<template>
  <div class="mis-pedidos-container">
    <div class="header">
      <h1>Mis Pedidos</h1>
      <button @click="$router.push('/shop')" class="btn-volver">Volver a la tienda</button>
    </div>

    <div v-if="cargando" class="msg-info">Actualizando estados...</div>

    <div v-if="pedidosOrdenados.length === 0 && !cargando" class="msg-vacio">
      <p>Todavía no realizaste ningún pedido. 🍕</p>
    </div>

    <div v-else class="lista-pedidos">
      <div v-for="pedido in pedidosOrdenados" :key="pedido.uuid" class="pedido-card">

        <div class="pedido-header">
          <div class="info-tienda">
            <span class="tienda-name">{{ pedido.vendorName }}</span>
            <br>
            <span class="fecha">{{ formatFecha(pedido.createdAt) }}</span>
          </div>
          <span :class="['estado-badge', normalizar(pedido.status).toLowerCase()]">
            {{ pedido.status }}
          </span>
        </div>

        <div class="pedido-detalle">
          <p class="titulo-seccion">Productos:</p>
          <ul class="lista-items">
            <li v-for="item in pedido.items" :key="item.productUuid">
              {{ item.quantity }} x {{ item.productName || 'Producto' }} - 
              <span class="precio">${{ item.unitPrice }}</span>
            </li>
          </ul>
        </div>

        <div class="pedido-footer">
          <div class="entrega">
            <p v-if="normalizar(pedido.status) === 'PENDIENTE'">
                ⏳ Tu pedido está siendo procesado por el local.
            </p>
            <p v-else-if="normalizar(pedido.status) === 'ACEPTADO'">
                🍽️ <strong>{{ pedido.vendorName }}</strong> está preparando tu comida.
            </p>
            <p v-else-if="normalizar(pedido.status) === 'EN CAMINO'">
                🛵 ¡Tu pedido está en viaje!
            </p>
            <p v-else-if="normalizar(pedido.status) === 'ENTREGADO'">
                ✅ Pedido entregado.
            </p>
            <p v-else-if="normalizar(pedido.status) === 'CANCELADO'">
                ❌ El pedido fue cancelado.
            </p>
          </div>
          <div class="total-box">
            <span class="total-label">Total</span>
            <span class="total-monto">${{ Number(pedido.total).toFixed(2) }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.estado-badge.pendiente { background-color: #fff3cd; color: #856404; }
.estado-badge.aceptado { background-color: #cce5ff; color: #004085; }
.estado-badge.entregado { background-color: #d4edda; color: #155724; }
.estado-badge.cancelado { background-color: #f8d7da; color: #721c24; }
.estado-badge.en_camino { background-color: #d1ecf1; color: #0c5460; }

.mis-pedidos-container {
  background-color: #f0f4f8;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
}
.pedido-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #d9e2ec;
  border-left: 6px solid #ff441f;
}
</style>