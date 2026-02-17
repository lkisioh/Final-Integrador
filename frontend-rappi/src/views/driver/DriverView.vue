<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { userUuid } from '@/stores/user/userUuid';

const router = useRouter();
const route = useRoute();

const ordenes = ref([])
const ordenesTomadas = ref([])
const cargando = ref(false)
const error = ref(null)

const uuidDriver = route.params.uuid;
const storeDriver = userUuid()
//const uuidDriver = storeDriver.getUuid()

function logout() {
  localStorage.removeItem('userUuid')
  localStorage.removeItem('userName')
  localStorage.removeItem('userRole')

  router.push('/')
}

async function cargarOrdenesSinDriver() {
  cargando.value = true
  try {
    const respuesta = await axios.get('http://localhost:3000/orders')

    ordenes.value = respuesta.data.filter(o =>!o.driverUuid && o.status === 'ACEPTADO')
  } catch (e) {
    error.value = "Error al cargar pedidos"
  } finally {
    cargando.value = false
  }
}

async function cargarOrdenesaTomadasDriver() {
  cargando.value = true
  try {
    const respuesta = await axios.get('http://localhost:3000/orders')

    ordenesTomadas.value = respuesta.data.filter(o => o.driverUuid === uuidDriver && o.status === 'En camino')
  } catch (e) {
    error.value = e.message + "Error al cargar pedidos"
  } finally {
    cargando.value = false
  }
}

async function eliminarCuentaDriver() {
  if (!uuidDriver) {
    alert("No se pudo identificar al driver.");
    return;
  }

  if (!confirm('⚠️ ¿Estás seguro? Esta acción es irreversible.')) return;

  try {
    await axios.delete(`http://localhost:3000/drivers/${uuidDriver}`);

    alert('Cuenta eliminada con éxito');
    localStorage.clear();
    router.push('/');
  } catch (err) {
    console.error("Error al eliminar driver:", err);
    alert('No se pudo eliminar la cuenta. Verifica que el servidor esté activo.');
  }
}

async function tomarPedido(orden) {
  try {

    await axios.patch(`http://localhost:3000/orders/${orden.uuid}/assign-driver`, {
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
    await axios.patch(`http://localhost:3000/orders/${orden.uuid}/finish-delivery`, {
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
  cargarOrdenesSinDriver()
  cargarOrdenesaTomadasDriver()
})

function editar(){
  router.push('/edit/driver/' + uuidDriver)
}
function historial(){
  router.push('/driver/historial/' + uuidDriver)
}
</script>

<template>
  <div class="driver-view-container">
    <div class="driver-box">
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

        <button @click="logout" class="btn-logout">Cerrar Sesión</button>
         <button @click="eliminarCuentaDriver" class="btn-delete-account">Eliminar Cuenta</button>

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
</style>
