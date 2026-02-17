<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { userUuid } from '@/stores/user/userUuid'

import { traerDriver } from '@/composables/driver/traerDriver'

const { drivers, llamarDriverAPI} = traerDriver();



const pedidos = ref([])
const cargando = ref(false)
const storeUser = userUuid()
const uuidCliente = storeUser.getUuid()

async function cargarMisPedidos() {
  if (!uuidCliente) return
  cargando.value = true
  try {
    const respuesta = await axios.get('http://localhost:3000/orders')
    console.log("Todas las órdenes del servidor:", respuesta.data)
    console.log("Mi UUID de cliente es:", uuidCliente)
    pedidos.value = respuesta.data.filter(o => o.userUuid === uuidCliente)
  } catch (error) {
    console.error("Error al cargar:", error)
  } finally {
    cargando.value = false
  }
}

function formatFecha(fecha) {
  if(!fecha) return '';
  return new Date(fecha).toLocaleDateString() + ' ' + new Date(fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}


onMounted(() => {
  cargarMisPedidos()
  llamarDriverAPI('http://localhost:3000/drivers/')
  setInterval(cargarMisPedidos, 15000)
})
</script>

<template>
  <div class="mis-pedidos-container">
    <div class="header">
      <h1>Mis Pedidos</h1>
      <button @click="$router.push('/shop')" class="btn-volver">Volver a la tienda</button>
    </div>

    <div v-if="cargando" class="msg-info">Actualizando estados...</div>

    <div v-if="pedidos.length === 0 && !cargando" class="msg-vacio">
      <p>Todavía no realizaste ningún pedido.</p>
    </div>

    <div v-else class="lista-pedidos">
      <div v-for="pedido in pedidos" :key="pedido.uuid" class="pedido-card">

        <div class="pedido-header">
          <div class="info-tienda">
            <span class="tienda-name">{{ pedido.vendorName }}</span>
            <br>
            <span class="fecha">{{ formatFecha(pedido.createdAt) }}</span>
            <br>
          </div>
          <span :class="['estado-badge', (pedido.status)]">
        {{ pedido.status}}
        </span>
        </div>

        <div class="pedido-detalle">
          <p class="titulo-seccion">Productos:</p>
          <ul class="lista-items">
            <li v-for="item in pedido.items" :key="item.productUuid">
              {{ item.quantity }} x {{ item.nombre }} - <span class="precio">${{ item.unitPrice }}</span>
            </li>
          </ul>
        </div>

        <div class="pedido-footer">
          <div class="entrega">
            <p v-if = "pedido.status === 'PENDIENTE'">
                ⏳ Tu pedido está siendo procesado.
            </p>
            <p v-else-if="pedido.status === 'ACEPTADO'">
                🍽️ <strong>{{ pedido.vendorName}}</strong> está preparando tu pedido.
            </p>
            <p v-else-if="pedido.status === 'En camino'">
                🛵 <strong>{{ drivers.find(d => d.uuid === pedido.driverUuid)?.name}}</strong> está en camino.
            </p>
            <p v-else-if="pedido.status === 'ENTREGADO'">
                ✅ Entregado por: <strong>{{ drivers.find(d => d.uuid === pedido.driverUuid)?.name }}</strong>
            </p>
            <p v-else-if="pedido.status === 'CANCELADO'">
                ❌ Pedido cancelado.
            </p>

          </div>
          <div class="total-box">
            <span class="total-label">Total</span>
            <span class="total-monto">${{ pedido.total }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<style scoped>
.mis-pedidos-container {
  background-color: #f0f4f8;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  margin: 0;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
}

@media (min-width: 600px) {
  .mis-pedidos-container {
    justify-content: flex-start;
    padding-top: 60px;
  }
}

.header,
.lista-pedidos,
.msg-info,
.msg-vacio {
  width: 100%;
  max-width: 600px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

h1 {
  color: #243b55;
  font-size: 28px;
  margin: 0;
  font-weight: 700;
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

.btn-volver {
  padding: 10px 18px;
  background-color: #ffffff;
  color: #486581;
  border: 1px solid #d9e2ec;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-volver:hover {
  background-color: #486581;
  color: white;
}

/* Status Badges */
.estado-badge {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.pendiente { background-color: #fff3cd; color: #856404; }
.aceptado { background-color: #cce5ff; color: #004085; }
.entregado { background-color: #d4edda; color: #155724; }

/* Footer del pedido */
.pedido-footer {
  margin-top: 15px;
  padding: 15px;
  background-color: #f8fafc;
  border-radius: 10px;
  border-left: 4px solid #3498db;
}

.total-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.total-monto {
  font-size: 1.5rem;
  font-weight: bold;
  color: #102a43;
}

.lista-items li {
  font-size: 0.95rem;
  color: #334e68;
  padding: 8px 0;
  border-bottom: 1px solid #f0f4f8;
}
</style>
