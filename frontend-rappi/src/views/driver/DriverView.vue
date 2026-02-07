<script setup>
import { useRouter, useRoute } from 'vue-router'; 
import { ref, onMounted } from 'vue';
import axios from 'axios'; 
import { userUuid } from '@/stores/user/userUuid'; 

const router = useRouter();
const route = useRoute(); 

const ordenes = ref([])
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

async function cargarOrdenesPendientes() {
  cargando.value = true
  try {
    const respuesta = await axios.get('http://localhost:3000/ordenes')
    
    ordenes.value = respuesta.data.filter(o => 
      o.status === 'pendiente' || (o.status === 'aceptado' && o.driverUuid === uuidDriver)
    )
  } catch (e) {
    error.value = "Error al cargar pedidos"
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
  const nombreDriverReal = storeDriver.getNombre();
    console.log("Enviando nombre al servidor:", nombreDriverReal);
  try {
    
    await axios.patch(`http://localhost:3000/ordenes/${orden.uuid}`, {
      status: 'aceptado',
      driverUuid: uuidDriver,
      driverNombre: nombreDriverReal
    })
    alert("¡Pedido aceptado!")
    cargarOrdenesPendientes()
  } catch (e) {
    console.error("Error detallado:", e.response?.data || e.message);
    alert("Error al aceptar")
  }
}

async function entregarPedido(orden) {
  try {
    const nombreDriverReal = storeDriver.getNombre()
    const uuidDriverReal = storeDriver.getUuid()
    await axios.patch(`http://localhost:3000/ordenes/${orden.uuid}`, {
      status: 'entregado',
      driverNombre: nombreDriverReal,
      driverUuid: uuidDriverReal
    })
    alert("✅ Pedido entregado con éxito. Se movió a tu historial.")
    cargarOrdenesPendientes() 
  } catch (e) {
    alert("Error al marcar como entregado")
  }
}

onMounted(() => {
  cargarOrdenesPendientes()
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
  <td><strong>{{ orden.tiendaNombre }}</strong></td>
  <td>
    <div v-for="item in orden.items" :key="item.nombre">
      {{ item.cantidad }}x {{ item.nombre }}
    </div>
  </td>
  <td>${{ orden.totalAPagar }}</td>
  <td>
    {{ orden.direccionEnvio.calle }} {{ orden.direccionEnvio.numero }}
  </td>

  <td>
    <div class="action-buttons">
      <button 
        @click="tomarPedido(orden)" 
        class="btn-accept"
        :disabled="orden.status === 'aceptado'"
      >
        {{ orden.status === 'aceptado' ? 'Pedido en curso' : 'Aceptar Pedido' }}
      </button>

      <button @click="entregarPedido(orden)" class="btn-delivered":disabled="orden.status !== 'aceptado'">
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
        <!-- <button @click="eliminarCuentaDriver" class="btn-delete-account">Eliminar Cuenta</button> -->

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
