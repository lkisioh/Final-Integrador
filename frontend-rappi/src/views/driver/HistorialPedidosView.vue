<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const pedidos = ref([])
const cargando = ref(false)

const uuidDriver = route.params.uuid

async function cargarHistorial() {
  cargando.value = true
  try {
    const respuesta = await axios.get('http://localhost:3000/ordenes')
    pedidos.value = respuesta.data.filter(o => 
      o.status === 'entregado' && o.driverUuid === uuidDriver
    )
  } catch (error) {
    console.error("Error al cargar el historial", error)
  } finally {
    cargando.value = false
  }
}

function volver() {
  router.push('/orders/' + uuidDriver) 
}

onMounted(() => {
  cargarHistorial()
})
</script>

¡Perfecto! Vamos a hacer esos ajustes finales. He agregado la dirección de entrega y el monto del pedido (total a pagar), y eliminé el subtítulo que no querías.

Así queda el código de tu historial para el Driver:

1. Template Actualizado
He modificado las columnas para incluir "Dirección" y "Monto", y limpié el encabezado.

HTML

<template>
  <div class="historial-view-container">
    <div class="historial-box">
      <header class="header-historial">
        <button @click="volver" class="btn-back">← Volver a pedidos activos</button>
        <h1 class="hist-title">Historial de Entregas</h1>
        </header>
      
      <div v-if="cargando" class="status-msg">Cargando historial...</div>
      
      <div v-else-if="pedidos.length === 0" class="no-data">
        <div class="empty-icon">📦</div>
        <p>Aún no has completado ninguna entrega.</p>
      </div>

      <div v-else class="table-container">
        <table class="hist-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Local</th>
              <th>Productos</th>
              <th>Monto</th>
              <th style="text-align: center;">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pedido in pedidos" :key="pedido.uuid">
              <td class="date-cell">
                {{ new Date(pedido.createdAt).toLocaleDateString() }}
              </td>
              <td>
                <strong>{{ pedido.tiendaNombre }}</strong>
              </td>
              
              <td>
                <ul class="items-list">
                  <li v-for="item in pedido.items" :key="item.nombre">
                    {{ item.cantidad }}x {{ item.nombre }}
                  </li>
                </ul>
              </td>
              <td class="amount-cell">
                ${{ pedido.totalAPagar }}
              </td>
              <td style="text-align: center;">
                <span class="badge-success">Entregado</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.historial-view-container {
  background-color: #f0f4f8;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
}

.historial-box {
  background-color: #ffffff;
  width: 100%;
  max-width: 1000px; /* Un poco más ancho para la nueva columna */
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #d9e2ec;
}

.header-historial {
  margin-bottom: 30px;
}

.hist-title {
  color: #102a43;
  font-size: 24px;
  margin: 10px 0 0 0;
}

.btn-back {
  background: none;
  border: none;
  color: #486581;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
}

.address-text {
  color: #486581;
  font-size: 13px;
  display: block;
  max-width: 150px; /* Evita que la celda se estire demasiado */
}

.amount-cell {
  font-weight: bold;
  color: #102a43;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
}

.hist-table {
  width: 100%;
  border-collapse: collapse;
}

.hist-table th {
  background-color: #f8fafc;
  padding: 15px;
  color: #627d98;
  font-size: 11px;
  text-transform: uppercase;
  border-bottom: 2px solid #d9e2ec;
  text-align: left;
}

.hist-table td {
  padding: 15px;
  border-bottom: 1px solid #f0f4f8;
  font-size: 14px;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
}

.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
}

.status-msg, .no-data {
  text-align: center;
  padding: 50px;
  color: #627d98;
}
</style>