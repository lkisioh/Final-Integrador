<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 
import axios from 'axios';
const route = useRoute();
const router = useRouter();

const vendorUuid = route.params.vendorUuid;
console.log('UUID capturado en Formulario:', vendorUuid);
const newProduct = ref({
    name: '',
    description: '',
    price: 0, 
    photo: '', 
    available: true
});
const creationError = ref(null);
const creationLoading = ref(false); 

const crearProducto = async () => {
    creationLoading.value = true;
    creationError.value = null;

    try {
        if (newProduct.value.price <= 0) {
            throw new Error('El precio debe ser mayor a cero.');
        }

        const url = `http://localhost:3000/vendors/${vendorUuid}/products`; 
        
        await axios.post(url, newProduct.value);
        
        alert(`¡Producto "${newProduct.value.name}" creado con éxito!`);
        
        router.push({ path: `/vendor/${vendorUuid}` });

    } catch (error) {
        console.error("Error al crear producto:", error);
        creationError.value = error.response?.data?.message || error.message || 'Error desconocido al crear.';
    } finally {
        creationLoading.value = false;
    }
};

const goBack = () => {
    router.push({ path: `/vendors/${vendorUuid}` });
};
</script>

<template>
    <div class="product-create-view">
        <h2>Agregar Nuevo Producto</h2>
        <p>Vendedor UUID: {{ vendorUuid }}</p>
        <button @click="goBack" style="margin-bottom: 20px;">← Volver al Perfil</button>
        
        <form @submit.prevent="crearProducto" class="creation-form">
            <div style="margin-bottom: 10px;">
                <label>Nombre:</label>
                <input type="text" v-model="newProduct.name" required>
            </div>
            <div style="margin-bottom: 10px;">
                <label>Descripción:</label>
                <textarea v-model="newProduct.description" required></textarea>
            </div>
            <div style="margin-bottom: 10px;">
                <label>Precio ($):</label>
                <input type="number" v-model.number="newProduct.price" min="0.01" step="0.01" required>
            </div>
            <div style="margin-bottom: 10px;">
                <label>Foto URL:</label>
                <input type="text" v-model="newProduct.photo">
            </div>
            <div style="margin-bottom: 15px;">
                <label>Disponible:</label>
                <input type="checkbox" v-model="newProduct.available">
            </div>

            <button type="submit" :disabled="creationLoading">
                {{ creationLoading ? 'Guardando...' : 'Agregar Producto' }}
            </button>

            <p v-if="creationError" style="color: red; margin-top: 10px;">Error: {{ creationError }}</p>
        </form>
    </div>
</template>