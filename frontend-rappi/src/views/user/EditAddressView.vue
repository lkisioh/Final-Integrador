<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { userUuid } from '@/stores/user/userUuid';

import { traerUser } from '@/composables/user/traerUser'
import { editAddress } from '@/composables/user/editAddress';
const {user,llamarUserAPI} = traerUser()
const {addressNueva, editarAddressAPI} = editAddress()

const route = useRoute();
const router = useRouter();
const storeUserUuid = userUuid();

const addressUuid = route.params.addressUuid;
const userUuidValue = storeUserUuid.getUuid();

async function cargarDatosDireccion (){
  await llamarUserAPI(`/users/${userUuidValue}`)
  const address = user.value?.addresses?.find(addr => addr.uuid === addressUuid);
  if (address) {
    addressNueva.value = {
      street: address.street,
      number: address.number,
      apartment: address.apartment || '',
    };
  } else {
                alert('Dirección no encontrada.');
                router.back();
            }
};

onMounted(() => {
    if (!userUuidValue || !addressUuid) {
        alert('Faltan identificadores para la edición.');
        router.back();
        return;
    }
    cargarDatosDireccion();
});

async function handleSubmit () {
    await editarAddressAPI(`/users/${userUuidValue}/addresses/${addressUuid}`)
    alert('Dirección actualizada con éxito!');
    router.push({
    name: 'user-details',
    params: { uuid: userUuidValue }
    });
};
</script>

<template>
    <div class="edit-address-container">
        <h1>Editar Dirección</h1>
        <form @submit.prevent="handleSubmit">

            <label for="street">Calle:</label>
            <input type="text" id="street" v-model="addressNueva.street" required />

            <label for="number">Número:</label>
            <input type="number" id="number" v-model="addressNueva.number" required />

            <label for="apartment">Departamento (Opcional):</label>
            <input type="text" id="apartment" v-model="addressNueva.apartment" />

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
