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
  cargando.value = true;
  try {
    
    const token = localStorage.getItem('access_token'); 

    const respuesta = await axios.get('http://localhost:3000/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log("Datos recibidos:", respuesta.data);

    pedidos.value = respuesta.data.filter(o =>
      o.driverUuid === uuidDriver && 
      o.status?.toString().toUpperCase() === 'ENTREGADO'
    );
    
    pedidos.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  } catch (error) {
    console.error("Error al cargar el historial:", error.response?.data || error.message);
    if (error.response?.status === 401) {
       alert("Sesión expirada. Por favor, vuelve a entrar.");
       router.push('/login');
    }
  } finally {
    cargando.value = false;
  }
}

function volver() {
  router.push('/orders/' + uuidDriver)
}

onMounted(() => {
  cargarHistorial()
})
</script>

<template>
  <div class="historial-view-container">
    <div class="historial-box">
      <header class="header-historial">
        <button @click="volver" class="btn-back">← Volver a pedidos activos</button>
        <h1 class="hist-title">Historial de Entregas ✅</h1>
      </header>

      <div v-if="cargando" class="status-msg">
        <div class="spinner"></div>
        <p>Buscando tus entregas...</p>
      </div>

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
              <th>Monto Total</th>
              <th style="text-align: center;">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pedido in pedidos" :key="pedido.uuid">
              <td class="date-cell">
                <span class="date-text">{{ new Date(pedido.createdAt).toLocaleDateString() }}</span>
                <small class="time-text">{{ new Date(pedido.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</small>
              </td>
              <td>
                <strong class="vendor-name">{{ pedido.vendorName }}</strong>
              </td>

              <td>
                <div class="items-container">
                  <div v-for="item in pedido.items" :key="item.productUuid" class="item-pill">
                    {{ item.quantity }}x {{ item.productName || 'Producto' }}
                  </div>
                </div>
              </td>
              <td class="amount-cell">
                ${{ Number(pedido.total).toFixed(2) }}
              </td>
              <td style="text-align: center;">
                <span class="badge-success">ENTREGADO</span>
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
  max-width: 1100px;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #d9e2ec;
}

.date-cell {
  display: flex;
  flex-direction: column;
}

.date-text { font-weight: 600; color: #334e68; }
.time-text { color: #829ab1; font-size: 11px; }

.vendor-name { color: #102a43; }

.items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.item-pill {
  background: #f0f4f8;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #486581;
  border: 1px solid #d9e2ec;
}

.amount-cell {
  font-weight: 800;
  color: #243b55;
  font-size: 15px;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 800;
  border: 1px solid #c3e6cb;
}

.hist-table { width: 100%; border-collapse: collapse; }
.hist-table th { text-align: left; padding: 15px; background: #f8fafc; color: #627d98; font-size: 11px; text-transform: uppercase; border-bottom: 2px solid #d9e2ec; }
.hist-table td { padding: 15px; border-bottom: 1px solid #f0f4f8; }

.no-data { text-align: center; padding: 60px; color: #829ab1; }
.empty-icon { font-size: 50px; margin-bottom: 15px; }
</style>