<script setup>
// Si querés usar reactive o ref:
import { ref } from 'vue'
import { createUser } from '@/composables/user/createUser.js'

const {usuario,cargando,error,createUserAPI} = createUser()

import router from '@/router'

// Ejemplo de datos del formulario
const name = ref('')
const street = ref('')
const number = ref(0)
const apartment = ref('')
const email = ref('')
const password = ref('')


// Función para crear el usuario (podés adaptarla a tu lógica)
async function nuevoUsuario() {
  console.log('Creando usuario:'+usuario.value)

  mapearUser(name,street,number,apartment,email,password)
  //lamada api
  const ok = await createUserAPI('http://localhost:3000/users', usuario.value)
if (ok) {
    alert('Usuario creado con éxito')
    router.push('/user/' + usuario.value.uuid)  // Redirige a la vista de usuario después de crearlo
  } else {
    console.log('Error al cambiar página')
  }
  console.log('JSON plano:', JSON.stringify(usuario.value))
}


function mapearUser(name,street,number,apartment,email,password){
usuario.value = {
  name: name.value,
  email: email.value,
  password: password.value,
  addresses: [
    {
      street: street.value,
      number: number.value,
      apartment: apartment.value
    }
  ]
}
}
</script>

<template>
  <div class="form">
    <h2>Comprador</h2>
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
        <input v-model="number" type="number" />

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


  <h3 color="red">{{ error }}</h3>
  <h3>{{ cargando }}</h3>
</template>

<style scoped>

</style>
