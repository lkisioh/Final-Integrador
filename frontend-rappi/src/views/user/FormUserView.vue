<script setup>

import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { createUser } from '@/composables/user/createUser.js'
import axios from 'axios'

const {usuario,cargando,error,createUserAPI} = createUser()

import router from '@/router'
const rawUuid = router.currentRoute.value.params.uuid

const isEdit = rawUuid !== undefined && rawUuid !== null && rawUuid !== '' && rawUuid !== 'undefined'

const name = ref('')
const street = ref('')
const number = ref(0)
const apartment = ref('')
const email = ref('')
const password = ref('')

onMounted(async () => {
  if (isEdit) {
    try {
      const res = await axios.get(`http://localhost:3000/users/${rawUuid}`)
      name.value = res.data.name
      email.value = res.data.email
    } catch (e) {
      console.error("Error cargando usuario", e)
    }
  }
})

function mapearUser() {
  usuario.value = {
    name: name.value,
    email: email.value,
    password: password.value,
    addresses: isEdit ? [] : [
      {
        street: street.value,
        number: number.value,
        apartment: apartment.value
      }
    ]
  }
}

async function nuevoUsuario() {
  console.log('Creando usuario:'+usuario.value)

  mapearUser()

  const ok = await createUserAPI('/users', usuario.value)
if (ok) {
    alert('Usuario creado con éxito')
    router.push('/user/' + usuario.value.uuid)
  } else {
    console.log('Error al cambiar página')
  }
  console.log('JSON plano:', JSON.stringify(usuario.value))
}

async function editar() {
  mapearUser()
  const datosEdit = {
    name: name.value,
    email: email.value
  }
  if (password.value) datosEdit.password = password.value

  try {
    await axios.patch(`http://localhost:3000/users/${rawUuid}`, datosEdit)
    alert('Datos de perfil actualizados ✅')
    router.push('/user/' + rawUuid)
  } catch (e) {
    alert('Error al editar: ' + (e.response?.data?.message || e.message))
  }
}
</script>

<template>
  <div class="form-user-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink :to="isEdit ? `/user/${rawUuid}` : '/SelectUser'">← Volver atrás</RouterLink>
    </nav>
    <div class="form-box">
      <h2>{{ isEdit ? 'Editar Mi Perfil' : 'Registro de Comprador' }}</h2>

      <form @submit.prevent="isEdit ? editar() : nuevoUsuario()">
        <div>
          <label>Nombre:</label>
          <input v-model="name" type="text" />
        </div>

        <div v-if="!isEdit">
          <label>Direccion Inicial:</label>
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
          <input v-model="password" type="password" :placeholder="isEdit ? 'Dejar en blanco para no cambiar' : ''" />
        </div>

        <button v-if="isEdit" type="button" @click="editar">Editar perfil</button>
        <button v-else type="submit">Crear Cuenta</button>
      </form>

      <h3 v-if="error" class="error">{{ error }}</h3>
      <h3 v-if="cargando" class="loading">Procesando...</h3>
    </div>
  </div>
</template>

<style scoped>

</style>
