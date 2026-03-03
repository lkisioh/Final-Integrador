<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { userUuid } from '@/stores/user/userUuid';
import { traerOrders } from '@/composables/order/traerOrders';
import { traerDriver } from '@/composables/driver/traerDriver';
import { tomarOrden } from '@/composables/order/tomarOrden';
import { terminarOrden } from '@/composables/order/terminarOrden';

const router = useRouter();
const route = useRoute();

const { ordenes, llamarOrdersAPI } = traerOrders()
const ordenesSinDriver = ref([])
const ordenesTomadas = ref([])

const cargando = ref(false)
const error = ref(null)

const uuidDriver = route.params.uuid;
const storeDriver = userUuid()

const { driver, llamarDriverAPI } = traerDriver()
const { tomarOrdenAPI } = tomarOrden()
const { terminarOrdenAPI } = terminarOrden()

const compararEstado = (status, objetivo) => status?.toString().toUpperCase() === objetivo.toUpperCase();

const formatearDireccion = (orden) => {
  console.log("Dirección:", orden.uuid, orden.userOrderAddress);

  if (orden.userOrderAddress && orden.userOrderAddress.trim() !== "") {
    return orden.userOrderAddress;
  }
    return "📍 Consultar dirección (ID: " + orden.uuid.slice(0, 5) + ")";
};

async function cargarOrdenes() {
  cargando.value = true
  error.value = null
  try {
    await llamarOrdersAPI('/orders')
    
    ordenesSinDriver.value = ordenes.value.filter(o => 
      !o.driverUuid && compararEstado(o.status, 'ACEPTADO')
    )

    ordenesTomadas.value = ordenes.value.filter(o => 
      o.driverUuid === uuidDriver && compararEstado(o.status, 'En camino')
    )
  } catch (e) {
    error.value = "Error al cargar pedidos: " + e.message
  } finally {
    cargando.value = false
  }
}

async function tomarPedido(orden) {
  try {
    await tomarOrdenAPI(`/orders/${orden.uuid}/assign-driver`, {
      status: 'En camino',
      driverUuid: uuidDriver,
    })
    alert("🚀 ¡Pedido aceptado! Ya puedes ir a retirarlo.")
    await cargarOrdenes() 
  } catch (e) {
    alert("Error al aceptar el pedido")
  }
}

async function entregarPedido(orden) {
  try {
    await terminarOrdenAPI(`/orders/${orden.uuid}/finish-delivery`, {
      status: 'ENTREGADO',
      driverUuid: uuidDriver 
    })
    alert("✅ Pedido entregado con éxito.")
    await cargarOrdenes()
  } catch (e) {
    alert("Error al marcar como entregado")
  }
}
onMounted(async () => {
  await llamarDriverAPI(`/drivers/${uuidDriver}`);
  await cargarOrdenes()
})

function editar() { router.push('/edit/driver/' + uuidDriver); }
function logout() { localStorage.clear(); router.push('/login'); }
function historial() { router.push('/driver/historial/' + uuidDriver); }
</script>

<template>
  <div class="driver-view-container">
    <div class="driver-box">

      <div v-if="driver" class="profile-card">
        <div class="profile-header">
          <h2>Bienvenido, {{ driver.name }} 🛵</h2>
        </div>
        <div class="profile-details">
          <p><strong>Vehículo:</strong> {{ driver.vehicle }}</p>
          <p><strong>Teléfono:</strong> {{ driver.phone }}</p>
        </div>
      </div>

      <hr class="separator" />

      <h1>📦 PEDIDOS DISPONIBLES</h1>
      <div v-if="ordenesSinDriver.length === 0 && !cargando">
        <p class="empty-msg">No hay pedidos nuevos para retirar en este momento. ☕</p>
      </div>

      <table v-else-if="ordenesSinDriver.length > 0">
        <thead>
          <tr>
            <th>Tienda</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Entrega</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="orden in ordenesSinDriver" :key="orden.uuid">
            <td><strong>{{ orden.vendorName }}</strong></td>
            <td>
              <div v-for="item in orden.items" :key="item.uuid" class="item-list">
                {{ item.quantity }}x {{ item.nombre || 'Producto' }}
              </div>
            </td>
            <td>${{ orden.total.toFixed(2) }}</td>
            <td class="address-cell">{{ formatearDireccion(orden) }}</td>
            <td>
              <button @click="tomarPedido(orden)" class="btn-accept">Tomar Pedido</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h1 class="title-margin">🚚 MIS PEDIDOS EN CAMINO</h1>
      <div v-if="ordenesTomadas.length === 0 && !cargando">
        <p class="empty-msg">No tienes pedidos activos ahora.</p>
      </div>

      <table v-else-if="ordenesTomadas.length > 0">
        <thead>
          <tr>
            <th>Tienda</th>
            <th>Productos</th>
            <th>Entrega</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="orden in ordenesTomadas" :key="orden.uuid">
            <td><strong>{{ orden.vendorName }}</strong></td>
            <td>
              <div v-for="item in orden.items" :key="item.uuid">
                {{ item.quantity }}x {{ item.nombre || 'Producto' }}
              </div>
            </td>
            <td class="address-cell">{{ formatearDireccion(orden) }}</td>
            <td>
              <button @click="entregarPedido(orden)" class="btn-delivered">Marcar Entregado</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="footer-actions">
        <button @click="historial" class="btn-history">Historial</button>
        <button @click="editar" class="btn-edit">Perfil</button>
        <button @click="logout" class="btn-logout">Salir</button>
      </div>

      <h5 v-if="error" class="error-text">{{ error }}</h5>
      <h5 v-if="cargando" class="loading-text">Actualizando pedidos...</h5>
    </div>
  </div>
</template>

<style scoped>
.driver-view-container { padding: 20px; max-width: 1000px; margin: 0 auto; }
.driver-box { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.title-margin { margin-top: 40px; }
.empty-msg { color: #888; font-style: italic; padding: 10px; }

table { width: 100%; border-collapse: collapse; margin-top: 15px; }
th { text-align: left; padding: 12px; border-bottom: 2px solid #eee; color: #666; font-size: 0.9em; }
td { padding: 12px; border-bottom: 1px solid #eee; }

.address-cell { color: #d32f2f; font-weight: 600; }
.item-list { font-size: 0.9em; }

.footer-actions { display: flex; gap: 10px; margin-top: 30px; justify-content: center; }

.btn-accept { background-color: #4CAF50; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-delivered { background-color: #2196F3; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: bold; }
.btn-history { background: #607d8b; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
.btn-logout { background: #f44336; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
.btn-edit { background: #eee; color: #333; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }

.error-text { color: red; text-align: center; margin-top: 20px; }
.loading-text { color: #2196F3; text-align: center; }
</style>