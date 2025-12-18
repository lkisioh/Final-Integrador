<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { traerOrders } from '@/composables/order/traerOrders'

const route = useRoute()
const router = useRouter()
const vendorUuid = route.params.uuid

const { orders, cargando, error, llamarProductosAPI } = traerOrders()

onMounted(() => {
  llamarProductosAPI('http://localhost:3000/orders/')
})

const cargarVentas = async () => {
  try {
    const respuesta = await axios.get(`http://localhost:3000/ordenes?storeId=${vendorUuid.value}`);
    ventas.value = respuesta.data;
  } catch (error) {
    console.error("Error al cargar ventas", error);
  }
}

const totalVentas = computed(() => {
  if (!orders.value || !Array.isArray(orders.value)) return 0
  
  return orders.value.reduce((acc, orden) => {
    return acc + (Number(orden.total) || 0)
  }, 0)
})

function volver() {
  router.push('/vendor/' + vendorUuid)
}

onMounted(() => {
  cargarVentas()
})
</script>

<template>
  <div class="ventas-view-container">
    <div class="ventas-box">
      <header class="header-ventas">
        <button @click="volver" class="btn-back">← Volver al Perfil</button>
        <h1>Ventas del Local</h1>
      </header>

      <div v-if="cargando" class="status-msg">Cargando historial de ventas...</div>
      <div v-else-if="error" class="error-msg">⚠️ {{ error }}</div>
      
      <div v-else>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Orden</th>
                <th>Productos</th>
                <th>Cant.</th>
                <th>Cliente</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orden in ordenes" :key="orden.uuid">
                <td><span class="order-id">#{{ orden.uuid?.slice(0, 5) }}</span></td>
                <td>
                  <p v-for="product in orden.products" :key="product.uuid" class="product-item">
                    {{ product.name }}
                  </p>
                </td>
                <td>
                  <p v-for="product in orden.products" :key="product.uuid" class="qty-item">
                    {{ product.cantidad }}
                  </p>
                </td>
                <td>{{ orden.cliente }}</td>
                <td class="total-cell">${{ orden.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="footer-ventas">
          <div class="total-acumulado">
            <span>Total ventas acumuladas:</span>
            <span class="monto-total">${{ totalVentas }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal centrado con fondo celeste */
.ventas-view-container {
  background-color: #f0f4f8;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
}

/* Caja blanca de contenido */
.ventas-box {
  background-color: #ffffff;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #d9e2ec;
}

.header-ventas {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 25px;
}

h1 { color: #102a43; font-size: 26px; margin: 0; }

.btn-back {
  background: none;
  border: none;
  color: #627d98;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

/* Tabla Estilizada */
.table-container {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #f0f4f8;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th {
  text-align: left;
  padding: 15px;
  background-color: #f8fafc;
  color: #486581;
  font-size: 13px;
  text-transform: uppercase;
  border-bottom: 2px solid #d9e2ec;
}

td {
  padding: 15px;
  border-bottom: 1px solid #f0f4f8;
  color: #334e68;
  font-size: 14px;
  vertical-align: top;
}

.order-id { font-family: monospace; color: #627d98; }
.product-item, .qty-item { margin: 0; padding-bottom: 4px; }
.total-cell { font-weight: bold; color: #102a43; }

/* Footer con el total */
.footer-ventas {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #f0f4f8;
  display: flex;
  justify-content: flex-end;
}

.total-acumulado {
  background-color: #f8fafc;
  padding: 15px 25px;
  border-radius: 12px;
  text-align: right;
  border: 1px solid #d9e2ec;
}

.total-acumulado span {
  display: block;
  color: #627d98;
  font-size: 14px;
}

.monto-total {
  font-size: 24px !important;
  font-weight: 800;
  color: #243b55 !important;
}

.status-msg, .error-msg { text-align: center; padding: 40px; color: #627d98; }
.error-msg { color: #cf3d3d; }
</style>