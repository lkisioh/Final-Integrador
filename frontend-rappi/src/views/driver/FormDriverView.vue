<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { createDriver } from '@/composables/driver/createDriver'
import axios from 'axios'
const {driver,cargando,error,createDriverAPI} = createDriver()

import router from '@/router'
const uuidDriver = router.currentRoute.value.params.uuid

const name = ref('')
const location = ref(' ')
const phone = ref(0)
const vehicle = ref('')
const email = ref('')
const password = ref('')

onMounted(async () => {
  if (uuidDriver) {
    console.log('Cargando datos para editar el Driver:', uuidDriver);
    try {
      const res = await axios.get(`http://localhost:3000/drivers/${uuidDriver}`);
      const d = res.data;
      
      name.value = d.name;
      email.value = d.email;
      phone.value = d.phone;
      vehicle.value = d.vehicle;
      location.value = d.location;      
      console.log('✅ Datos del driver cargados con éxito');
    } catch (err) {
      console.error("Error cargando driver:", err);
    }
  }
});

const editar = async () => {
  mapearDriver(name, location, phone, vehicle, email, password);
  
  const datosLimpios = { ...driver.value };
  if (!datosLimpios.password) delete datosLimpios.password;

  try {
    cargando.value = true;
    await axios.patch(`http://localhost:3000/drivers/${uuidDriver}`, datosLimpios);
    alert('Conductor actualizado ✅');
    router.push('/orders/' + uuidDriver);
  } catch (err) {
    console.error("Error al editar", err.response?.data);
    alert('Error al editar el conductor');
  } finally {
    cargando.value = false;
  }
}

async function nuevoDriver() {
  console.log('Creando conductor:'+driver.value)

  mapearDriver(name,location,phone,vehicle,email,password)

  const data = await createDriverAPI('http://localhost:3000/drivers', driver.value)
if (data && data.uuid) {
    alert('Conductor creado con éxito')
    router.push('/orders/' + data.uuid)
  } else {
    console.log('Error al cambiar página')
  }
  console.log('JSON plano:', JSON.stringify(driver.value))
}


function mapearDriver(name,location,phone,vehicle,email,password){
driver.value = {
  name: name.value,
  email: email.value,
  password: password.value,
  location: location.value,
  phone: phone.value,
  vehicle: vehicle.value
}
}
</script>

<template>
  <div class="form-driver-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/SelectUser">← Volver atrás</RouterLink>
    </nav>
    <div class="form-box">
      <h2>Driver</h2>
      <form @submit.prevent="nuevoDriver">
        <div>
          <label>Nombre:</label>
          <input v-model="name" type="text" />
        </div>

        <div>
          <label>Teléfono:</label>
          <input v-model="phone" type="number" />
        </div>

        <div>
          <label>Vehículo:</label>
          <select name="vehicle"  v-model="vehicle">
            <option value="moto">Moto</option>
            <option value="auto">Auto</option>
            <option value="bicicleta">Bicicleta</option>
          </select>
        </div>

        <div>
          <label>Email:</label>
          <input v-model="email" type="text" />
        </div>

        <div>
          <label>Contraseña:</label>
          <input v-model="password" type="password" />
        </div>

        <button v-if="uuidDriver" @click.prevent="editar">Editar</button>
        <button v-else type="submit">Crear</button>
      </form>
      <h3 v-if="error" class="error">{{ error }}</h3>
      <h3 v-if="cargando" class="loading">Cargando...</h3>
    </div>
  </div>
</template>

<style scoped>

</style>
