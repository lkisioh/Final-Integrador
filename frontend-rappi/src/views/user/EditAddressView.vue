<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { userUuid } from '@/stores/user/userUuid'; 

const route = useRoute();
const router = useRouter();
const storeUserUuid = userUuid();

const addressUuid = route.params.addressUuid; 
const userUuidValue = storeUserUuid.getUuid(); 
const formData = ref({
    street: '',
    number: 0,
    apartment: '' 
});

const cargarDatosDireccion = () => {

    axios.get(`http://localhost:3000/users/${userUuidValue}`)
        .then(response => {
            const user = response.data;
            const address = user.addresses.find(addr => addr.uuid === addressUuid);

            if (address) {
                formData.value = {
                    street: address.street,
                    number: address.number,
                    apartment: address.apartment || '',
                };
            } else {
                alert('Dirección no encontrada.');
                router.back(); 
            }
        })
        .catch(error => {
            console.error("Error al cargar datos de usuario:", error);
            alert("No se pudieron cargar los datos para editar.");
            router.back();
        });
};

onMounted(() => {
    if (!userUuidValue || !addressUuid) {
        alert('Faltan identificadores para la edición.');
        router.back();
        return;
    }
    cargarDatosDireccion();
});

const handleSubmit = () => {
    axios.patch(
        `http://localhost:3000/users/${userUuidValue}/addresses/${addressUuid}`, 
        formData.value 
    )
    .then(() => {
        alert('Dirección actualizada con éxito!');
        router.push({ 
            name: 'user-details',            
            params: { uuid: userUuidValue }  
        });
    })
    .catch(error => {
        console.error('Error al actualizar:', error.response.data);
        alert('Error al guardar los cambios. Revisa la consola.');
    });
};
</script>

<template>
    <div class="edit-address-container">
        <h1>Editar Dirección</h1>
        <form @submit.prevent="handleSubmit">
            
            <label for="street">Calle:</label>
            <input type="text" id="street" v-model="formData.street" required />

            <label for="number">Número:</label>
            <input type="number" id="number" v-model="formData.number" required />
            
            <label for="apartment">Departamento (Opcional):</label>
            <input type="text" id="apartment" v-model="formData.apartment" />
            
            <button type="submit">Guardar Cambios</button>
            <button type="button" @click="router.back()">Cancelar</button>
        </form>
    </div>
</template>

<style scoped>
.edit-address-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
}

h1 {
    color: #333;
    margin-bottom: 25px;
    font-size: 1.8em;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 10px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

label {
    font-weight: bold;
    color: #555;
    margin-bottom: -10px; 
}

input[type="text"],
input[type="number"] {
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="number"]:focus {
    border-color: #007bff; 
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s, opacity 0.3s;
    margin-top: 10px;
}

button[type="submit"] {
    background-color: #28a745; 
    color: white;
}

button[type="submit"]:hover {
    background-color: #218838;
}

button[type="button"] {
    background-color: #6c757d; 
    color: white;
    margin-left: 10px;
}

button[type="button"]:hover {
    background-color: #5a6268;
}
</style>