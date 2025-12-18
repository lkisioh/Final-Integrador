<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue';
import axios from 'axios'; 

const ordenes = ref([])
const cargando = ref(false)
const error = ref(null)

const uuidDriver = router.currentRoute.value.params.uuid

async function cargarOrdenesPendientes() {
  cargando.value = true
  try {
    const respuesta = await axios.get('http://localhost:3000/ordenes?estado=pendiente')
    ordenes.value = respuesta.data
  } catch (e) {
    error.value = "Error al cargar pedidos disponibles"
  } finally {
    cargando.value = false
  }
}

async function tomarPedido(ordenId) {
  try {
    await axios.patch(`http://localhost:3000/ordenes/${ordenId}`, {
      estado: 'aceptado',
      driverUuid: uuidDriver
    })
    
    alert("¡Pedido tomado con éxito!")
    cargarOrdenesPendientes()
  } catch (e) {
    alert("No se pudo tomar el pedido")
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
          <tr v-for="orden in ordenes" :key="orden.ordenId">
            <td><strong>{{ orden.tiendaNombre }}</strong></td>
            
            <td>
              <div v-for="item in orden.items" :key="item.nombre">
                {{ item.cantidad }}x {{ item.nombre }}
              </div>
            </td>
            
            <td>${{ orden.totalAPagar }}</td>
            
            <td>
              {{ orden.direccionEnvio.calle }} {{ orden.direccionEnvio.numero }}
              <span v-if="orden.direccionEnvio.depto !== 'N/A'">({{ orden.direccionEnvio.depto }})</span>
            </td>

            <td>
              <button @click="tomarPedido(orden.ordenId)" class="btn-accept">
                Aceptar Pedido
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 20px;">
        <button @click="editar">Editar perfil</button>
        <button @click="historial">Ver historial de PEDIDOS</button>
      </div>

      <h5 v-if="error" style="color: red;">{{ error }}</h5>
      <h5 v-if="cargando">Buscando pedidos...</h5>
    </div>
  </div>
</template>

<style scoped>
</style>
