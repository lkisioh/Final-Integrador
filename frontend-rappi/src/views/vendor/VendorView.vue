<script setup>
import { onMounted } from 'vue';
import { traerProductos } from '@/composables/products/traerProductos'
import { traerVendor } from '@/composables/vendor/traerVendor'
import { useRouter } from 'vue-router'
import { userUuid } from '@/stores/user/userUuid'
import axios from 'axios';
import { ref } from 'vue';

const router = useRouter();
const vendorUuid = router.currentRoute.value.params.uuid;
const deleteLoading = ref(false);

const {getUuid} = userUuid();
const userLoginUuid = getUuid();

const { productos, cargando, error, llamarProductosAPI } = traerProductos();

const {vendor, llamarVendorAPI} = traerVendor();

const toggleAvailability = async (productUuid, currentStatus) => {
    const newStatus = !currentStatus;

    const confirmation = newStatus
        ? "¿Estás seguro de que quieres poner el producto como DISPONIBLE?"
        : "¿Estás seguro de que quieres poner el producto como NO DISPONIBLE?";

    if (!confirm(confirmation)) {
        return;
    }

    try {
        const url = `/vendors/${vendorUuid}/products/${productUuid}`;

        await axios.patch(url, { available: newStatus });

        alert(`Disponibilidad de producto actualizada a: ${newStatus ? 'Disponible' : 'No Disponible'}`);

        const reloadUrl = `/vendors/${vendorUuid}/products`;
        llamarProductosAPI(reloadUrl);

    } catch (e) {
        console.error("Error al cambiar disponibilidad:", e);
        alert(`Error al actualizar disponibilidad: ${e.response?.data?.message || 'Error desconocido'}`);
    }
};

const deleteProduct = async (productUuid) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        return;
    }
    deleteLoading.value = true;
    try {
        const url = `http://localhost:3000/vendors/${vendorUuid}/products/${productUuid}`;

        await axios.delete(url);

        alert("Producto eliminado con éxito.");

        const reloadUrl = `/vendors/${vendorUuid}/products`;
        llamarProductosAPI(reloadUrl);

    } catch (e) {
        console.error("Error al eliminar el producto:", e);
        alert(`Error al eliminar el producto: ${e.response?.data?.message || 'Error desconocido'}`);
    } finally {
        deleteLoading.value = false;
    }
};

const goToEditView = (productUuid) => {
    router.push({
        name: 'ProductEdit',
        params: { vendorUuid: vendorUuid, productUuid: productUuid}
    });
};

async function eliminarVendor(uuid) {
  if (!confirm('⚠️ ¿ESTÁS SEGURO? Se borrarán todos tus datos')) return

  try {
    await axios.delete(`http://localhost:3000/vendors/${vendorUuid}`);

    alert('Cuenta eliminada');
    localStorage.clear();
    router.push('/');
  } catch (error) {
    console.error("Error NestJS/TypeORM:", error.response?.data);
    alert('Error al borrar: ' + (error.response?.data?.message || 'Error de servidor'));
  }
}

function logout() {
  localStorage.removeItem('userUuid')
  localStorage.removeItem('userName')
  localStorage.removeItem('userRole')

  router.push('/')
}

onMounted(() => {
  console.log('Cargando productos para el Vendedor UUID:', vendorUuid);
  const productosUrl = `/products/${vendorUuid}`;
  llamarProductosAPI(productosUrl);

    console.log('Cargando datos del Vendedor:', vendorUuid);
    const vendorUrl = `/vendors/${vendorUuid}`;
    llamarVendorAPI(vendorUrl);
});
</script>

<template>
  <div class="vendor-view-container">
    <nav class="nav-links">
      <RouterLink to="/">🏠 Home</RouterLink>
    </nav>

    <div class="vendor-box">
      <section class="vendor-info-header">
        <h1>Local: {{ vendor.name }}</h1>
        <div class="info-grid">
          <div class="info-item">
            <h2>⏰ Horario</h2>
            <h3>{{ vendor.time }}</h3>
          </div>
          <div class="info-item">
            <h2>📍 Ubicación</h2>
            <h3>{{ vendor.address?.street }} {{ vendor.address?.number }}</h3>
          </div>
          <div class="info-item">
            <h2>📱 Celular</h2>
            <h3>{{ vendor.phone }}</h3>
          </div>
        </div>
         <RouterLink :to="'/orders/vendor/' + vendorUuid" class="btn-link orders"> 📋 Mis ventas </RouterLink>
         <RouterLink :to="'/edit/vendor/' + vendorUuid" class="btn-link orders"> Editar </RouterLink>
      </section>

      <hr>

      <section class="products-section">
        <h1>Mis productos</h1>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th style="text-align: center;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in productos" :key="product.id">
                <td><strong>{{ product.name }}</strong></td>
                <td>{{ product.description }}</td>
                <td>${{ product.price }}</td>
                <td class="actions-cell">
                  <button @click="goToEditView(product.uuid)" class="btn-edit">Editar</button>

                  <button
                    @click="toggleAvailability(product.uuid, product.available)"
                    :class="product.available ? 'status-on' : 'status-off'"
                  >
                    {{ product.available ? '✅ Disponible' : '❌ No disponible' }}
                  </button>

                  <button
                    @click="deleteProduct(product.uuid)"
                    :disabled="deleteLoading"
                    class="btn-delete"
                  >
                    {{ deleteLoading ? '...' : 'Eliminar' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer class="vendor-actions">
        <div class="links-group">
          <RouterLink :to="'/products/' + vendorUuid" class="btn-link add">
            ➕ Agregar producto
          </RouterLink>


        </div>

        <button @click="logout" class="btn-logout">Cerrar Sesión</button>
        <button @click="eliminarVendor" class="btn-delete-account">Eliminar Cuenta</button>
      </footer>

      <h5 v-if="error" class="error-msg">{{ error }}</h5>
      <h5 v-if="cargando" class="loading-msg">Cargando datos del local...</h5>
    </div>
  </div>
</template>

<style scoped>
.vendor-view-container {
  background-color: #f0f4f8;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.vendor-box {
  background-color: #ffffff;
  width: 90%;
  max-width: 900px;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #d9e2ec;
}

h1 { color: #102a43; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #f0f4f8; padding-bottom: 10px; }
h2 { color: #243b55; font-size: 16px; margin: 8px 0; font-weight: 600; }
h3 { color: #486581; font-size: 14px; margin: 4px 0; font-weight: 400; }

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
}

thead {
  background-color: #f8fafc;
}

th {
  text-align: left;
  padding: 12px;
  color: #627d98;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #d9e2ec;
}

td {
  padding: 12px;
  border-bottom: 1px solid #f0f4f8;
  color: #334e68;
  font-size: 14px;
}

tr:hover {
  background-color: #f9fbff;
}

button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #d9e2ec;
  background: white;
  cursor: pointer;
  font-size: 12px;
  margin-right: 5px;
  transition: all 0.2s;
}

button.btn-edit {
  background-color: #38a169;
  color: white;
  border: none;
}

button:nth-of-type(1):hover {
  background-color: #e1e8f0;
  color: #243b55;
}

button:nth-last-of-type(1) {
  color: #cf3d3d;
  border-color: #fbb6b6;
}

button:nth-last-of-type(1):hover {
  background-color: #fff5f5;
  border-color: #cf3d3d;
}

button:nth-of-type(2) {
  background-color: #f0f4f8;
  color: #486581;
}

.router-link-active,
a {
  text-decoration: none;
  color: #486581;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s;
}

a:hover {
  color: #243b55;
}

hr {
  border: 0;
  border-top: 1px solid #d9e2ec;
  margin: 20px 0;
}

.btn-logout {
  float: right;
  background-color: #102a43;
  color: white;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
}

.btn-logout:hover {
  background-color: #243b55;
}

.btn-delete-account {
  background-color: #f52f2f;
  color: #cf3d3d;
  border: 1px solid #fa4141;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-delete-account:hover {
  background-color: #cf3d3d;
  color: black;
}

h5 {
  text-align: center;
  color: #627d98;
  margin-top: 20px;
}
</style>
