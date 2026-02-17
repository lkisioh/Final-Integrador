<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { traerOrders } from '@/composables/order/traerOrders'
import { traerProductos } from '@/composables/products/traerProductos'
import { traerVendor } from '@/composables/vendor/traerVendor'

import { cambiarEstadoOrders } from '@/composables/order/cambiarEstado'

const route = useRoute()
const router = useRouter()
const vendorUuid = route.params.uuid

const { orders, llamarOrdersAPI } = traerOrders()

const { productos, llamarProductosAPI } = traerProductos();

const { vendor, llamarVendorAPI} = traerVendor();

const { AceptarOrdenAPI, CancelarOrdenAPI} = cambiarEstadoOrders()



onMounted(() => {
  cargarVentas()

  console.log('Cargando productos para el Vendedor UUID:', vendorUuid);
  const productosUrl = `http://localhost:3000/vendors/${vendorUuid}/products`;
  llamarProductosAPI(productosUrl);

    console.log('Cargando datos del Vendedor:', vendorUuid);
    const vendorUrl = `http://localhost:3000/vendors/${vendorUuid}`;
    llamarVendorAPI(vendorUrl);
})

const ventasDelVendor= ref([])
const ventasFiltradas = ref([])

const cargarVentas = async () => {
  try {
    await llamarOrdersAPI('http://localhost:3000/orders/')
  } catch (err) {
    console.error('Error al cargar ventas:', err)
  }

  ventasDelVendor.value = orders.value.filter(order => order.vendorUuid === vendorUuid) // Todas las ventas del vendor

}

const cambiarLista = (filtro) => {

  if (filtro === 'todas') {
    ventasFiltradas.value = ventasDelVendor.value
    return
  }
  ventasFiltradas.value = ventasDelVendor.value.filter(order => order.status === filtro)
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

const aceptarOrden = async (orderUuid) => {
  try {
    const url = `http://localhost:3000/orders/${orderUuid}`;

    await AceptarOrdenAPI(url);
    alert('Orden aceptada con éxito.');
    cargarVentas();
  } catch (e) {
    console.error('Error al aceptar la orden:', e);
    alert(`Error al aceptar la orden: ${e.response?.data?.message || 'Error desconocido'}`);
  }
};

const cancelarOrden = async (orderUuid) => {
  try {
    const url = `http://localhost:3000/orders/${orderUuid}`;
    await CancelarOrdenAPI(url);
    alert('Orden cancelada con éxito.');
    cargarVentas();
  } catch (e) {
    console.error('Error al cancelar la orden:', e);
    alert(`Error al cancelar la orden: ${e.response?.data?.message || 'Error desconocido'}`);
  }
};

</script>

<template>
  <div class="ventas-view-container">
    <div class="ventas-box">
      <header class="header-ventas">
        <button @click="volver" class="btn-back">← Volver al Perfil</button>
        <h1>Ventas</h1>

        <button @click="cambiarLista('todas')">Todas</button>
        <button @click="cambiarLista('PENDIENTE')"> Esperando aceptación</button>
        <button @click="cambiarLista('ACEPTADO')"> Aceptadas</button>
        <button @click="cambiarLista('CANCELADO')"> Canceladas</button>

      </header>

      <div v-if="!orders || orders.length === 0" class="status-msg">
        Aún no hay ventas registradas.
      </div>

      <div v-else>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Orden</th>
                <th>Productos</th>
                <th>Cantidad.</th>
                <th>Subtotal</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th>Total</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="orden in ventasFiltradas" :key="orden.uuid">
                <td><span class="order-id">#{{ orden.uuid?.slice(0, 5) }}</span></td>
                <td>
                  <p v-for="item in orden.items" :key="item.uuid" class="product-item">
                    {{  productos.find(p => p.uuid === item.productUuid)?.name || 'Producto desconocido' }}
                  </p>
                </td>
                <td>
                  <p v-for="item in orden.items" :key="item.uuid" class="qty-item">
                    {{ item.quantity }}
                  </p>
                </td>
                <td>
                  <p v-for="item in orden.items" :key="item.uuid" class="qty-item">
                    {{ item.subtotal }}
                  </p>
                </td>
                <td>{{ orden.userName }}</td>
                <td>{{ orden.userOrderAddress }}</td>
                <td>{{ orden.status }}</td>

              <td class="total-cell">
                  ${{ orden.total }}
                </td>

                <td>
                  <button @click="aceptarOrden(orden.uuid)" class="btn-accept">Aceptar</button>
                </td>

                <td>
                  <button @click="cancelarOrden(orden.uuid)" class="btn-cancel">Cancelar</button>
                </td>
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
