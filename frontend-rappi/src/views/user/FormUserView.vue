<script setup>
// Si querés usar reactive o ref:
import { ref } from 'vue'

import { RouterLink, RouterView } from 'vue-router'

// Ejemplo de datos del formulario
const name = ref('')
const street = ref('')
const streetNumber = ref('')
const apartment = ref('')
const email = ref('')
const password = ref('')

const user = ref ({})

// Función para crear el usuario (podés adaptarla a tu lógica)
function nuevoUsuario() {
  console.log('Creando usuario:'+{name})

  crearUsuario(name,street,streetNumber,apartment,email,password)
  //lamada api


  console.log(user.value)
  console.log('JSON plano:', JSON.stringify(user.value))
}


function crearUsuario(name,street,streetNumber,apartment,email,password){
user.value = {
    name: name.value,
     address: {
    street: street.value,
    streetNumber: streetNumber.value,
    apartment: apartment.value
  },
  email: email.value,
  password: password.value
}
}
</script>

<template>
  <div class="form">
    <h2>Crear Usuario</h2>
    <form @submit.prevent="nuevoUsuario">
        <div>
        <label>Nombre:</label>
        <input v-model="name" type="text" />
      </div>

      <div>
        <label>Direccion:</label>

        <label>Calle:</label>
        <input v-model="street" type="text" />
      
        <label>Número:</label>
        <input v-model="streetNumber" type="number" />

        <label>Dpto:</label>
        <input v-model="apartment" type="text" />
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