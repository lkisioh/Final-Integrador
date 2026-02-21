<script setup>
import { RouterLink } from 'vue-router'
import { ref,watch } from 'vue'
import { createVendor } from '@/composables/vendor/createVendor'
import router from '@/router'
import { userUuid } from '@/stores/user/userUuid'
import { onMounted } from 'vue'
import axios from 'axios'

import { traerVendor } from '@/composables/vendor/traerVendor'

const {setUuid} = userUuid()
const cargando = ref(false)
const vendorUuid = router.currentRoute.value.params.uuid

const { llamarVendorAPI} = traerVendor();
onMounted(async() => {
if (vendorUuid) {
  console.log('Cargando datos del Vendedor para edición, UUID:', vendorUuid);
  const vendorUrl = `/vendors/${vendorUuid}`;
  const vendorData = await llamarVendorAPI(vendorUrl);

if (vendorData) {
name.value = vendorData.name || '';
category.value = vendorData.category || '';
phone.value = vendorData.phone || 0;
email.value = vendorData.email || '';
password.value = vendorData.password || '';

if (vendorData.address) {
street.value = vendorData.address.street || '';
number.value = vendorData.address.number || 0;
}

if (vendorData.daysOpen && vendorData.daysOpen.includes(' a ')) {
const partes = vendorData.daysOpen.split(' a ');
initDay.value = partes[0].trim();
endDay.value = partes[1].trim();
}
if (typeof vendorData.time === 'string') {
      time.value = vendorData.time.split(',').map(t => t.trim());
    } else {
      time.value = vendorData.time || [];
    }
console.log('✅ Datos cargados en los inputs');
}
}})


const {vendor,createVendorAPI} = createVendor()

const name = ref('')
const category = ref('')
const initDay = ref('')
const endDay = ref('')
const time = ref([])
const phone = ref(0)
const email = ref('')
const password = ref('')
const street = ref('')
const number = ref(0)

watch(time, (newTime, oldTime) => {
  if (newTime.includes('24hs') && !oldTime.includes('24hs')) {
    time.value = ['24hs']
  }
  else if (newTime.length > 1 && newTime.includes('24hs')) {
    time.value = newTime.filter(t => t !== '24hs')
  }
})

function mapearVendor() {
  vendor.value = {
    name: name.value,
    category: category.value,
    daysOpen: initDay.value + ' a ' + endDay.value,
    time: time.value,
    email: email.value,
    password: password.value,
    phone: Number(phone.value),

    address: {
      street: street.value,
      number: number.value
    },
    products: []
  }
}

async function nuevoVendor() {
  mapearVendor()

  console.log('JSON de Vendedor a enviar:', JSON.stringify(vendor.value))

  const ok = await createVendorAPI('/vendors', vendor.value)

  if (ok && ok.uuid) {
    alert('Vendedor creado con éxito')
    setUuid(ok.uuid)
    router.push('/vendor/' + ok.uuid)
  } else {
    console.error('Error al crear vendedor o la respuesta es inválida.', ok)
    alert('Error al registrar. Revisa la consola para detalles.')
  }
}

function handleCheckChange(event) {
  const selectedValue = event.target.value;
  const isChecked = event.target.checked;

  if (selectedValue === '24hs') {
    time.value = isChecked ? ['24hs'] : [];
  } else {
    if (time.value.includes('24hs')) {
      time.value = time.value.filter(t => t !== '24hs');
    }

  }
}

const editar = async () => {
  mapearVendor();

  try {
    cargando.value = true;

    const { password, products, ...datosLimpios } = vendor.value;

    const url = `http://localhost:3000/vendors/${vendorUuid}`;

    const res = await axios.patch(url, datosLimpios);

    if (res.status === 200 || res.status === 204) {
      alert('Vendedor actualizado con éxito ✅');
      router.push(`/vendor/${vendorUuid}`);
    }
  } catch (error) {
    console.error("Error al editar:", error.response?.data || error);
    alert('No se pudo guardar la edición. Revisá los datos.');
  } finally {
    cargando.value = false;
  }
};

</script>

<template>
  <div class="form-vendor-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/SelectUser">← Volver atrás</RouterLink>
    </nav>
    <div class="form-box">
      <h2>Vendedor</h2>
      <form @submit.prevent="nuevoVendor">
          <div>
          <label>Nombre local:</label>
          <input v-model="name" type="text" />
        </div>

        <div>
          <label>Direccion:</label>

          <label>Calle:</label>
          <input v-model="street" type="text" />

          <label>Número:</label>
          <input v-model="number" type="number" />

        </div>

        <div>
          <label>Categoría:</label>
          <input v-model="category" type="text" />
        </div>

        <div>
          <label>Días de trabajo:</label>
          <label for="initDay">Inicio</label>
          <select name="initDay" v-model="initDay">
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          <label for="endDay">Fin</label>
          <select name="endDay" v-model="endDay">
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
        </div>

        <div>
  <label>Horario:</label>
  <div class="opciones-horario">
    <label><input type="checkbox" value="madrugada" v-model="time" /> Madrugada (00 hs a 06 hs)</label>
    <label><input type="checkbox" value="mañana" v-model="time" /> Mañana (09 hs a 12hs)</label>
    <label><input type="checkbox" value="tarde" v-model="time" /> Tarde (12 hs a 18 hs)</label>
    <label><input type="checkbox" value="noche" v-model="time" /> Noche (18 hs a 00 hs)</label>
    <label><input type="checkbox" value="24hs" v-model="time" /> 24 hs</label>

    <br>
    <label v-if="time.length > 0">
      Se eligió: <strong>{{ time.join(' , ') }}</strong>
    </label>
  </div>
</div>

        <div>
          <label>Teléfono:</label>
          <input v-model="phone" type="text" />
        </div>

        <div>
          <label>Email:</label>
          <input v-model="email" type="text" />
        </div>

        <div>
          <label>Contraseña:</label>
          <input v-model="password" type="password" />
        </div>

        <div>
          <button v-if="vendorUuid" @click.prevent="editar">Editar</button>
          <button v-else type="submit">Crear</button>
        </div>

    </form>

    </div>

  </div>

</template>

<style scoped>

</style>
