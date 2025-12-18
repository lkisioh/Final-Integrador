<script setup>
import { ref } from 'vue'
import { userUuid } from '@/stores/user/userUuid'
import axios from 'axios'
import { traerUser } from '@/composables/user/traerUser'
import router from '@/router'

const {user,llamarUserAPI} = traerUser()
const storeUserUuid = userUuid()

const uuid = ref(storeUserUuid.getUuid())

function logout() {
  localStorage.removeItem('userUuid')
  localStorage.removeItem('userName')
  localStorage.removeItem('userRole')

  router.push('/')
}
function comprar(){
  router.push('/shop')
}
function editar(){
  router.push('/edit/user/' + uuid.value)
}
function verCarrito(){
  router.push('/cart')
}

llamarUserAPI('http://localhost:3000/users/' + uuid.value )

function agregarDireccion(){
  router.push('/user/address/' + uuid.value)
}

function editarDireccion(uuidAddress){
  router.push('/user/edit-address/' + uuidAddress)
}

async function eliminarDireccion(uuidAddress){
    if (!confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
        return;
    }

    const userUuidValue = uuid.value;

    try {
        const apiUrl = `http://localhost:3000/users/${userUuidValue}/addresses/${uuidAddress}`;
        await axios.delete(apiUrl);
        alert('Dirección eliminada con éxito.');
        llamarUserAPI('http://localhost:3000/users/' + userUuidValue);
    } catch (error) {
        console.error("Error al eliminar la dirección:", error.response?.data || error.message);
        alert('Error al eliminar la dirección. Revisa la consola.');
    }
}
</script>

<template>
  <NavBar></NavBar>
    <router-view></router-view>
  <div class="user-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>

    </nav>

    <div class="profile-box">
      <h1 class="uv-title">MI CUENTA</h1>
      <h2 class="uv-sub">Usuario</h2>
      <p><strong>UUID:</strong> {{ uuid}}</p>
      <p><strong>Email: {{ user.email }}</strong> </p>
      <p><strong>Nombre: {{ user.name }}</strong></p>

      <div class="section">
        <h3>Direcciones</h3>
        <div>
          <p v-if="!user.addresses || user.addresses.length === 0">No tienes direcciones guardadas</p>
          
          <ul v-else class="address-list">
            <li v-for="address in user.addresses" 
                :key="address.uuid" 
                :class="{ 'address-actual': storeUserUuid.currentAddressId === address.uuid }"
                class="address-item"> 
              
              <span>{{ address.street }} {{ address.number }} {{ address.apartment }}</span>
              
              <div class="address-actions">
                <button 
                  v-if="storeUserUuid.currentAddressId !== address.uuid" 
                  @click="storeUserUuid.setActualAddress(address.uuid)"
                  class="btn-select">
                  Marcar como actual
                </button>
                <span v-else class="badge-actual">⭐ Actual</span> 
                </div>
            <button  @click="editarDireccion(address.uuid)" >Editar</button> 
            <button @click="eliminarDireccion(address.uuid)">Eliminar</button></li>
         </ul>

        </div>

        <button class="primary" @click="agregarDireccion">Nueva dirección!</button>
      </div>

      <!-- <div class="section">
        <h3>Locales Favoritos</h3>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </div> -->

      <div class="actions">
        <button class="primary" @click="verCarrito">Ver Carrito</button>
        <button class="primary" @click="comprar">Ir a comprar!</button>
        <button @click="logout" class="btn-logout">Cerrar Sesión</button>
        <!-- <button class="primary" @click="editar">Editar Datos</button> -->
      
      </div>
    </div>
  </div>
</template>

<style>

</style>


