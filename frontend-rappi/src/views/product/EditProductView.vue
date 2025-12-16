<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const { vendorUuid, productUuid } = route.params;

const productData = ref({
    name: '',
    description: '',
    price: 0,
    photo: '',
    available: true
});

const loading = ref(true);
const error = ref(null);

const fetchProductData = async () => {
    loading.value = true;
    error.value = null;
    try {
 
        const url = `http://localhost:3000/vendors/${vendorUuid}/products/${productUuid}`; 
        const response = await axios.get(url);
        
        productData.value = response.data;

    } catch (e) {
        console.error("Error al cargar producto para edición:", e);
        error.value = 'No se pudieron cargar los datos del producto. Verifique la ruta GET por UUID en el Backend.';
    } finally {
        loading.value = false;
    }
};

const updateProduct = async () => {
    loading.value = true;
    error.value = null;

    try {
        const dataToSend = { ...productData.value }; 

        delete dataToSend.id; 
        delete dataToSend.uuid; 
        delete dataToSend.vendorUuid;
        
        const url = `http://localhost:3000/vendors/${vendorUuid}/products/${productUuid}`;
        
        await axios.patch(url, dataToSend); 

        alert("¡Producto actualizado con éxito!");
        
        router.push({ name: 'vendor-details', params: { uuid: vendorUuid } });

    } catch (e) {
        console.error("Error al actualizar producto:", e);
        error.value = `Error al actualizar: ${e.response?.data?.message || 'Error desconocido'}`;
    } finally {
        loading.value = false;
    }
};
onMounted(() => {
    fetchProductData();
});

const goBack = () => {
    router.back();
};
</script>

<template>
    <div class="edit-product-view">
        <button @click="goBack" style="margin-bottom: 20px;">← Volver</button>
        <h2>Editar Producto ({{ productData.name || 'Cargando...' }})</h2>
        <p>Vendedor ID: {{ vendorUuid }}</p>

        <h3 v-if="loading">Cargando datos...</h3>
        <p v-if="error" style="color: red;">Error: {{ error }}</p>

        <form v-if="!loading && !error" @submit.prevent="updateProduct" class="edit-form">
            
            <div style="margin-bottom: 10px;">
                <label>Nombre:</label>
                <input type="text" v-model="productData.name" required>
            </div>
            <div style="margin-bottom: 10px;">
                <label>Descripción:</label>
                <textarea v-model="productData.description" required></textarea>
            </div>
            <div style="margin-bottom: 10px;">
                <label>Precio ($):</label>
                <input type="number" v-model.number="productData.price" min="0.01" step="0.01" required>
            </div>
            <div style="margin-bottom: 10px;">
                <label>Foto URL:</label>
                <input type="text" v-model="productData.photo">
            </div>
            <div style="margin-bottom: 15px;">
                <label>Disponible:</label>
                <input type="checkbox" v-model="productData.available">
            </div>

            <button type="submit" :disabled="loading" style="background-color: #3498db; color: white;">
                {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
        </form>
    </div>
</template>