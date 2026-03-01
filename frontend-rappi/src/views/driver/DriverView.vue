<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { userUuid } from '@/stores/user/userUuid';
import { traerOrders } from '@/composables/order/traerOrders';
import { traerDriver } from '@/composables/driver/traerDriver';
import { tomarOrden } from '@/composables/order/tomarOrden';
import { terminarOrden } from '@/composables/order/terminarOrden';
const router = useRouter();
const route = useRoute();

let ordenesSinDriver = ref([])
let ordenesTomadas = ref([])
const { ordenes, llamarOrdersAPI } = traerOrders()

const cargando = ref(false)
const error = ref(null)

const uuidDriver = route.params.uuid;
const storeDriver = userUuid()

const {driver,llamarDriverAPI} = traerDriver()
const { tomarOrdenAPI } = tomarOrden()
const { terminarOrdenAPI } = terminarOrden()

function editar() {
  router.push('/edit/driver/' + uuidDriver);
}

function logout() {
  localStorage.clear();
  router.push('/login')
}

async function cargarDatosDriver() {
  try {
    await llamarDriverAPI(`/drivers/${uuidDriver}`);
  } catch (e) {
    console.error("Error al cargar datos del perfil", e);
  }
}

async function cargarOrdenesSinDriver() {
  cargando.value = true
  try {
    await llamarOrdersAPI('/orders')
    ordenesSinDriver.value = ordenes.value.filter(o =>!o.driverUuid && o.status === 'ACEPTADO')
  } catch (e) {
    error.value = "Error al cargar pedidos" + e.message
  } finally {
    cargando.value = false
  }
}

async function cargarOrdenesaTomadasDriver() {
  cargando.value = true
  try {
    await llamarOrdersAPI('/orders')
    ordenesTomadas.value = ordenes.value.filter(o => o.driverUuid === uuidDriver && o.status === 'En camino')
  } catch (e) {
    error.value = e.message + "Error al cargar pedidos"
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
    alert("¡Pedido aceptado!")
    cargarOrdenes()
  } catch (e) {
    console.error("Error detallado:", e.response?.data || e.message);
    alert("Error al aceptar")
  }
}

async function cargarOrdenes() {
  await cargarOrdenesSinDriver()
  await cargarOrdenesaTomadasDriver()
}

async function entregarPedido(orden) {
  try {
    const uuidDriverReal = storeDriver.getUuid()
    await terminarOrdenAPI(`/orders/${orden.uuid}/finish-delivery`, {
      status: 'ENTREGADO',
      driverUuid: uuidDriverReal
    })
    alert("✅ Pedido entregado con éxito. Se movió a tu historial.")
    cargarOrdenesSinDriver()
  } catch (e) {
    alert(e.message + " - Error al marcar como entregado")
  }
}

onMounted(() => {
  cargarDatosDriver()
  cargarOrdenesSinDriver()
  cargarOrdenesaTomadasDriver()
})


function historial(){
  router.push('/driver/historial/' + uuidDriver)
}
</script>

<template>
  <div class="driver-view-container">
    <div class="driver-box">

      <div v-if="driver" class="profile-card">
        <div class="profile-header">
          <h2>Bienvenido {{ driver.name }}</h2>
        </div>
        <div class="profile-details">
          <p><strong>Vehículo:</strong> {{ driver.vehicle }}</p>
          <p><strong>Teléfono:</strong> {{ driver.phone }}</p>
          <p><strong>Email:</strong> {{ driver.email }}</p>
        </div>
      </div>
      <hr class="separator" />
      <h1>PEDIDOS DISPONIBLES</h1>

      <div v-if="ordenes.length === 0 && !cargando">
        <p>No hay pedidos pendientes en este momento ☕</p>
      </div>

      <table v-else>
        <thead>
          <tr>
            <th>Tienda (Retiro)</th>
            <th>Productos</th>
            <th>Monto Total</th>
            <th>Dirección Entrega</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="orden in ordenes" :key="orden.uuid">
  <td><strong>{{ orden.vendorName }}</strong></td>
  <td>
    <div v-for="item in orden.items" :key="item.uuid">
      {{ item.quantity }}x {{ item.nombre }}
    </div>
  </td>
  <td>${{ orden.total }}</td>
  <td>
    {{ orden.userOrderAddress }}
  </td>

  <td>
    <div class="action-buttons">
      <button
      v-show="orden.status === 'ACEPTADO'"
        @click="tomarPedido(orden)"
        class="btn-accept"
        :disabled="orden.status === 'En camino'"
      >
        Tomar Pedido
      </button>
    </div>
  </td>
</tr>
        </tbody>
      </table>

      <h1>PEDIDOS A ENTREGAR</h1>

      <div v-if="ordenesTomadas.length === 0 && !cargando">
        <p>No hay pedidos tomados en este momento ☕</p>
      </div>

      <table v-else>
        <thead>
          <tr>
            <th>Tienda (Retiro)</th>
            <th>Productos</th>
            <th>Monto Total</th>
            <th>Dirección Entrega</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="orden in ordenesTomadas" :key="orden.uuid">
  <td><strong>{{ orden.vendorName }}</strong></td>
  <td>
    <div v-for="item in orden.items" :key="item.uuid">
      {{ item.quantity }}x {{ item.nombre }}
    </div>
  </td>
  <td>${{ orden.total }}</td>
  <td>
    {{ orden.userOrderAddress }}
  </td>

  <td>
    <div class="action-buttons">


      <button @click="entregarPedido(orden)" class="btn-delivered">
        Pedido Entregado
      </button>
    </div>
  </td>
</tr>
        </tbody>
      </table>

      <div style="margin-top: 20px;">
        <button @click="historial">Ver historial de PEDIDOS</button>
        <button @click="editar" class="btn-edit-profile">Editar Perfil</button>
        <button @click="logout" class="btn-logout">Cerrar Sesión</button>
      </div>

      <h5 v-if="error" style="color: red;">{{ error }}</h5>
      <h5 v-if="cargando">Buscando pedidos...</h5>
    </div>
  </div>
</template>

<style scoped>
  .action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-accept {
  background-color: #4CAF50;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delivered {
  background-color: #2196F3;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-edit-profile {
  color: white;
  margin-right: 10px;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
