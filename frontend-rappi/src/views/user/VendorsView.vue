<script setup>
import { onMounted } from 'vue'
import NavBar from '@/components/user/NavBar.vue'
import { traerVendor } from '@/composables/vendor/traerVendor'
const {vendors,cargando,llamarVendorsAPI} = traerVendor()


async function fetchVendors() {
  cargando.value = true
  try {
    llamarVendorsAPI('/vendors')
  } catch (error) {
    console.error("Error:", error)
  } finally {
    cargando.value = false
  }
}

function formatTime(time) {
  if (!time) return 'No especificado';
  if (Array.isArray(time)) return time.join(', ');
  return time;
}

onMounted(fetchVendors)
</script>

<template>
  <NavBar></NavBar>
  <div class="vendors-container">
    <div class="content">
      <h1>Explorar Tiendas</h1>
      <button class="btn-back" @click="$router.push('/shop')">
          ← Volver a la Tienda
        </button>
      <div v-if="cargando" class="loading-msg">Cargando locales...</div>

      <div v-else class="vendors-grid">
        <div v-for="vendor in vendors" :key="vendor.uuid" class="vendor-card">

          <div class="vendor-header">
            <div>
              <span class="emoji">🏪</span>
              <h3 class="vendor-name">{{ vendor.name }}</h3>
            </div>
            <span class="category-badge">{{ vendor.category }}</span>
          </div>

          <div class="vendor-body">
            <p><strong>📅 Días:</strong> {{ vendor.daysOpen }}</p>
            <p><strong>⏰ Horarios:</strong> {{ formatTime(vendor.time) }}</p>
            <p v-if="vendor.address">
              <strong>📍 Dirección:</strong> Calle: {{ vendor.address.street }} Nº {{ vendor.address.number }}
            </p>
            <p><strong>📞 Teléfono:</strong> {{ vendor.phone }}</p>
            <button @click="$router.push('/shop/' + vendor.uuid)">Ver productos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.vendors-container {
  background-color: #f0f4f8;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0 40px 0;
  position: absolute;
  top: 0; left: 0;
}

.content { width: 90%; max-width: 600px; }

h1 { color: #243b55; text-align: center; margin-bottom: 30px; }

.vendor-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #d9e2ec;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  text-align: left;
}

.vendor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.vendor-name { font-size: 20px; color: #102a43; margin: 0; display: inline; margin-left: 10px; }

.category-badge {
  background-color: #e1e8f0;
  color: #486581;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: bold;
}

.vendor-body p {
  margin: 8px 0;
  font-size: 14px;
  color: #486581;
}

.btn-visitar {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

.btn-visitar:hover { background-color: #ee5253; }
</style>
