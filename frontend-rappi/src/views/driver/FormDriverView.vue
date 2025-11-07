<script setup>
// Si querés usar reactive o ref:
import { ref } from 'vue'

// Ejemplo de datos del formulario
const name = ref('')
const location = ref('')
const phone = ref(0)
const vehicle = ref('')
const email = ref('')
const password = ref('')

const user = ref ({})

// Función para crear el usuario (podés adaptarla a tu lógica)
function nuevoDriver() {
  console.log('Creando driver:'+{name})

  crearDriver(name,location,phone,vehicle,email,password)
  //lamada api


  console.log(user.value)
  console.log('JSON plano:', JSON.stringify(user.value))
}


function crearDriver(name,location,phone,vehicle,email,password){
user.value = {
    name: name.value,
    location: location.value,
    phone: phone.value,
    vehicle: vehicle.value,
    email: email.value,
    password: password.value
}
}
</script>

<template>
  <div class="form">
    <h2>Driver</h2>
    <form @submit.prevent="nuevoDriver">
        <div>
        <label>Nombre:</label>
        <input v-model="name" type="text" />
      </div>

      <div>
        <label>Ubicación:</label>

        <label>Gps:</label>
        <input v-model="location" type="text" />
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

      <button type="submit">Crear</button>
    </form>
  </div>
</template>

<style scoped>

</style>
