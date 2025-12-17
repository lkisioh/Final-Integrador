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
        const url = `http://localhost:3000/vendors/${vendorUuid}/products/${productUuid}`;
        
        await axios.patch(url, { available: newStatus }); 
        
        alert(`Disponibilidad de producto actualizada a: ${newStatus ? 'Disponible' : 'No Disponible'}`);

        const reloadUrl = `http://localhost:3000/vendors/${vendorUuid}/products`; 
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

        const reloadUrl = `http://localhost:3000/vendors/${vendorUuid}/products`; 
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

onMounted(() => {
  console.log('Cargando productos para el Vendedor UUID:', vendorUuid);
  const productosUrl = `http://localhost:3000/vendors/${vendorUuid}/products`;   
  llamarProductosAPI(productosUrl); 
    
    console.log('Cargando datos del Vendedor:', vendorUuid);
    const vendorUrl = `http://localhost:3000/vendors/${vendorUuid}`;
    llamarVendorAPI(vendorUrl);
});
</script>

<template>
  <div class="vendor-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
    </nav>
    <div class="vendor-box">
      <h1>Local: {{ vendor.name }}</h1>
      <h2>Horario: {{ vendor.time }}</h2>
      <h2>Ubicación: </h2>
      <h3>Calle: {{ vendor.address?.street }}</h3>
      <h3>Número: {{ vendor.address?.number }}</h3>
      <h2>Celular: {{ vendor.phone }}</h2>
      <h1>Mis productos</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productos" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>${{ product.price }}</td>
            <td>
              <button @click="goToEditView(product.uuid)">Editar</button> 
               <button @click="toggleAvailability(product.uuid, product.available)">
                    {{ product.available ? ' Producto disponible (Cambiar a NO)' : 'Producto no disponible (Cambiar a SÍ)' }}
                </button>
               <button @click="deleteProduct(product.uuid)" :disabled="deleteLoading"                >
                    {{ deleteLoading ? 'Eliminando...' : 'Eliminar' }}
                </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 40px; display: block; clear: both; position: relative;">
  <hr> <RouterLink :to="'/products/' + vendorUuid" style="margin-right: 15px; display: inline-block;">
    Agregar producto
  </RouterLink>
  
  <RouterLink :to="'/edit/vendor/' + vendorUuid" style="margin-right: 15px; display: inline-block;">
    Editar perfil
  </RouterLink>
  
  <RouterLink :to="'/orders/vendor/' + vendorUuid" style="display: inline-block;">
    Mis ventas
  </RouterLink>
</div>

      <h5 v-if="error">{{ error }}</h5>
      <h5 v-if="cargando">Cargando...</h5>
    </div>
  </div>
</template>

<style scoped>

</style>
