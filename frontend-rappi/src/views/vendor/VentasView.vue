<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { traerOrders } from '@/composables/order/traerOrders'
import { traerVendor } from '@/composables/vendor/traerVendor'
import { cambiarEstadoOrders } from '@/composables/order/cambiarEstado'

const route = useRoute()
const router = useRouter()
const vendorUuid = route.params.uuid

const { ordenes, llamarOrdersAPI } = traerOrders()
const { vendor, llamarVendorAPI } = traerVendor()
const { AceptarOrdenAPI, CancelarOrdenAPI } = cambiarEstadoOrders()

const filtroActual = ref('todas')
const normalizar = (texto) => texto?.toString().trim().toUpperCase() || '';

const ventasFiltradas = computed(() => {
  if (!ordenes.value || !Array.isArray(ordenes.value)) return [];
  if (filtroActual.value === 'todas') return ordenes.value;
  
  return ordenes.value.filter(order => {
    return normalizar(order.status) === normalizar(filtroActual.value);
  });
});

const productos = computed(() => {
  return vendor.value?.products || []
})

const cargarVentas = async () => {
  try {
    await llamarOrdersAPI('/orders/vendor/' + vendorUuid)
  } catch (err) {
    console.error('Error al cargar ventas:', err)
  }
}

onMounted(() => {
  llamarVendorAPI(`/vendors/${vendorUuid}`);
  cargarVentas()
})

const obtenerDireccion = (orden) => {
  return orden.userOrderAddress || "📍 Dirección no disponible";
};

const cambiarLista = (filtro) => {
  filtroActual.value = filtro
}

const totalVentas = computed(() => {
  return ventasFiltradas.value.reduce((acc, orden) => {
    const valor = parseFloat(orden.total) || 0;
    return acc + valor;
  }, 0);
});

function volver() {
  router.push('/vendor/' + vendorUuid)
}

const aceptarOrden = async (orderUuid) => {
  if (!orderUuid) return;
  try {
    await AceptarOrdenAPI(`/orders/${orderUuid}`);
    alert('✅ Orden aceptada');
    await cargarVentas(); 
  } catch (e) {
    console.error("Error al aceptar:", e);
  }
};

const cancelarOrden = async (orderUuid) => {
  if (!orderUuid) return;
  try {
    await CancelarOrdenAPI(`/orders/${orderUuid}`);
    alert('❌ Orden cancelada');
    await cargarVentas();
  } catch (e) {
    console.error("Error al cancelar:", e);
  }
};
</script>

<template>
  <div class="ventas-view-container">
    <div class="ventas-box">
      <header class="header-ventas">
        <button @click="volver" class="btn-back">← Volver al Perfil</button>
        <h1>Gestión de Ventas</h1>

        <div class="filter-container">
          <button @click="cambiarLista('todas')" :class="{ active: filtroActual === 'todas' }">Todas</button>
          <button @click="cambiarLista('PENDIENTE')" :class="{ active: filtroActual === 'PENDIENTE' }">⏳ Esperando</button>
          <button @click="cambiarLista('ACEPTADO')" :class="{ active: filtroActual === 'ACEPTADO' }">✅ Aceptadas</button>
          <button @click="cambiarLista('CANCELADO')" :class="{ active: filtroActual === 'CANCELADO' }">❌ Canceladas</button>
        </div>
      </header>

      <div v-if="!ventasFiltradas || ventasFiltradas.length === 0" class="status-msg">
        No hay órdenes en esta categoría.
      </div>

      <div v-else>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Orden</th>
                <th>Productos</th>
                <th>Cant.</th>
                <th>Subtotal</th>
                <th>Cliente y Entrega</th>
                <th>Estado</th>
                <th style="text-align: right;">Total Final</th>
                <th style="text-align: center;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orden in ventasFiltradas" :key="orden.uuid">
                <td><span class="order-id">#{{ orden.uuid?.slice(0, 5) }}</span></td>
                
                <td>
                  <p v-for="item in orden.items" :key="item.uuid" class="product-item">
                    {{ productos.find(p => p.uuid === item.productUuid)?.name || 'Producto' }}
                  </p>
                </td>

                <td>
                  <p v-for="item in orden.items" :key="item.uuid" class="qty-item">{{ item.quantity }}</p>
                </td>

                <td>
                  <p v-for="item in orden.items" :key="item.uuid" class="qty-item">${{ item.subtotal }}</p>
                </td>

                <td>
                  <div class="client-info">
                    <span class="client-name">👤 {{ orden.userName }}</span>
                    <span class="client-address">📍 {{ obtenerDireccion(orden) }}</span>
                  </div>
                </td>

                <td>
                  <span class="status-badge" :class="normalizar(orden.status).toLowerCase()">
                    {{ orden.status }}
                  </span>
                </td>

                <td class="total-cell" style="text-align: right;">
                  <span class="monto-final">${{ Number(orden.total).toFixed(2) }}</span>
                </td>

                <td class="actions-cell">
                  <div v-if="normalizar(orden.status) === 'PENDIENTE'" class="btn-group">
                    <button @click="aceptarOrden(orden.uuid)" class="btn-accept">Aceptar</button>
                    <button @click="cancelarOrden(orden.uuid)" class="btn-cancel">Cancelar</button>
                  </div>
                  <span v-else class="done-msg">Procesada</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="footer-ventas">
          <div class="total-acumulado">
            <span>Total ventas vista actual:</span>
            <span class="monto-total">${{ totalVentas.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.ventas-box {
  background-color: #ffffff;
  width: 100%;
  max-width: 1100px;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #d9e2ec;
}

.header-ventas {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
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

.filter-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-container button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #d9e2ec;
  background: white;
  color: #486581;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-container button.active {
  background-color: #102a43;
  color: white;
  border-color: #102a43;
}

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

.client-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.client-name {
  font-weight: 700;
  color: #102a43;
}

.client-address {
  font-size: 12px;
  color: #627d98;
  line-height: 1.3;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  display: inline-block;
}

.status-badge.pendiente { background: #fff3cd; color: #856404; }
.status-badge.aceptado { background: #d4edda; color: #155724; }
.status-badge.cancelado { background: #f8d7da; color: #721c24; }

.total-cell {
  font-weight: bold;
  color: #102a43;
  font-size: 15px;
}

.actions-cell { text-align: center; min-width: 160px; }

.btn-group {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.btn-accept {
  background-color: #38a169;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.btn-cancel {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.done-msg { font-size: 12px; color: #bcccdc; font-style: italic; }

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
</style>