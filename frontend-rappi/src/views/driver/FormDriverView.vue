<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { createDriver } from '@/composables/driver/createDriver'
import axios from 'axios'
import { traerDriver } from '@/composables/driver/traerDriver'
import { editDriver } from '@/composables/driver/editDriver'
import router from '@/router'

const {driver,cargando,error,createDriverAPI} = createDriver()
const {llamarDriverAPI} = traerDriver()
const {editarDriverAPI} = editDriver()
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
      const data = await llamarDriverAPI(`/drivers/${uuidDriver}`);

      name.value = data.name;
      email.value = data.email;
      phone.value = data.phone;
      vehicle.value = data.vehicle;
      location.value = data.location;
      console.log('✅ Datos del driver cargados con éxito');
    } catch (err) {
      console.error("Error cargando driver:", err);
    }
  }
});

const editar = async () => {
  mapearDriver(name, location, phone, vehicle, email, password);
  const datosLimpios = { ...driver.value };
  try {
    cargando.value = true;
    await editarDriverAPI(`/drivers/${uuidDriver}`, datosLimpios);
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
  mapearDriver(name,location,phone,vehicle,email,password)
   console.log('JSON de Conductor a enviar:', JSON.stringify(driver.value))
  const ok = await createDriverAPI('/drivers', driver.value)
  if (ok && ok.uuid) {
    alert('Conductor creado con éxito')
    // login auto para obtener tokken y poder manejarse
     const emailLog = String(email.value).trim()
     const passwordLog = String(password.value)
    try{
      const { access_token, actor } = await axios.post('http://localhost:3000/auth/login', {
      email: emailLog,
      password: passwordLog,
    }).then(r => r.data)
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('actor_type', actor.type)
    localStorage.setItem('actor_uuid', actor.uuid)
    router.push(`/orders/`+actor.uuid)
  } catch (e) {
  console.log('STATUS', e?.response?.status)
  console.log('DATA', e?.response?.data)
  console.log('MESSAGE', e?.response?.data?.message)
  throw e
}

  } else {
    console.log('Error al crear conductor')
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
      <RouterLink to="/login">Home</RouterLink>
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

        <div v-show="!uuidDriver">
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
