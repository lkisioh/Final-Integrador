<script setup>
import { ref } from 'vue'
import { createDriver } from '@/composables/driver/createDriver'



import router from '@/router'
const uuidDriver = router.currentRoute.value.params.uuid


// const {driver,cargando,error,createDriverAPI} = createDriver()
// // Ejemplo de datos del formulario
const name = ref('Driver 3')
const location = ref('25 de mayo 3345')
const phone = ref(3564233223)
const vehicle = ref('moto')
const email = ref('driverprueba@gmail.com')
const password = ref('123456')


// async function nuevoDriver() {
//   console.log('Creando conductor:'+driver.value)

//   mapearDriver(name,location,phone,vehicle,email,password)
//   //lamada api
//   const ok = await createDriverAPI('http://localhost:3000/drivers', driver.value)
// if (ok) {
//     alert('Conductor creado con éxito')
//     router.push('/orders')  // Redirige a la vista de órdenes después de crear
//   } else {
//     console.log('Error al cambiar página')
//   }
//   console.log('JSON plano:', JSON.stringify(driver.value))
// }


// function mapearDriver(name,location,phone,vehicle,email,password){
// driver.value = {
//   name: name.value,
//   email: email.value,
//   password: password.value,
//   location: location.value,
//   phone: phone.value,
//   vehicle: vehicle.value
// }
// }
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

      <button v-if="uuidDriver>=0"> Editar</button>
      <button v-else type="submit">Crear</button>
    </form>
  </div>
</template>

<style scoped>

</style>
