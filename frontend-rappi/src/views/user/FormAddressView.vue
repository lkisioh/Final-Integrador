<script setup>
import { ref } from 'vue';
import router from '@/router';

import { useRoute } from 'vue-router'

import { addAddress } from '@/composables/user/addAddress';

const { address, createAddressAPI } = addAddress();

const route = useRoute()

const rawUuid = route.params.uuid

const street = ref('')
const number = ref(0)
const apartment = ref('')

async function guardarDireccion() {

  address.value = {
    street: street.value,
    number: number.value,
    apartment: apartment.value
  };
  await createAddressAPI(`/users/${rawUuid}/addresses`)

  console.log('Dirección guardada:', address.value);
  router.push('/user/' + rawUuid);
}
</script>

<template>
  <div class="address-view-container">
    <h1>Agregar Nueva Dirección</h1>
    <h2>uuid: {{ rawUuid }}</h2>
    <form @submit.prevent="guardarDireccion">
      <div>
        <label for="street">Calle:</label>
        <input type="text" id="street" v-model="street" required />
      </div>
      <div>
        <label for="number">Número:</label>
        <input type="number" id="number" v-model="number" required />
      </div>
      <div>
        <label for="apartment">Departamento:</label>
        <input type="text" id="apartment" v-model="apartment"/>
      </div>
      <button type="submit" class="primary">Guardar Dirección</button>
    </form>
  </div>
</template>
