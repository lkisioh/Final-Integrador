<script setup>
import { computed } from 'vue' 
import router from '@/router';
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/user/cartStore' 
import { userUuid } from '@/stores/user/userUuid';
import { traerUser } from '@/composables/user/traerUser';

const cartStore = useCartStore()
const storeUserUuid = userUuid()
const { user, llamarUserAPI } = traerUser()
const uuid = storeUserUuid.getUuid()
llamarUserAPI('http://localhost:3000/users/' + uuid)

const direccionSeleccionada = computed(() => {
  if (!user.value.addresses || !storeUserUuid.currentAddressId) return null
  
  return user.value.addresses.find(a => a.uuid === storeUserUuid.currentAddressId)
})

function comprar(){
  router.push('/shop')
}

function pagar(){
  router.push('/user/payment')
}

function eliminarProducto(uuid){
  cartStore.items = cartStore.items.filter(i => i.uuid !== uuid)
}

const total = computed(() => {
  return cartStore.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
})
</script>

<template>
  <div class="cart-view-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/shop">← Volver atrás</RouterLink>
    </nav>

    <div class="cart-box">
      <h1 class="cart-title">CARRITO</h1>

      <table class="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartStore.items" :key="item.uuid">
            <td>{{ item.name }}</td>
            <td style="text-align: center;">
          <div class="quantity-controls">
            <button @click="cartStore.decrQuantity(item.uuid)" class="btn-qty">-</button>
            <span class="qty-number">{{ item.quantity }}</span>
            <button @click="cartStore.incrQuantity(item.uuid)" class="btn-qty">+</button>
          </div>
        </td>
            <td>${{ item.price }}</td>
            <td>${{ item.price * item.quantity }}</td>
            <td>
              <button @click="eliminarProducto(item.uuid)" class="secondary">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="cartStore.items.length === 0" style="text-align: center; margin-top: 20px;">
        <p>Tu carrito está vacío.</p>
      </div>

      <div class = "cart-summary">
        <div class = "summary-details">
          <div class = "shipping-info">
            <p class = "shipping-title">📍 Dirección de envío:</p>
            <div v-if="direccionSeleccionada" class="address-text">
        <span>{{ direccionSeleccionada.street }} {{ direccionSeleccionada.number }}</span>
        <span v-if="direccionSeleccionada.apartment"> - Depto: {{ direccionSeleccionada.apartment }}</span>
      </div>
            <div v-else class="address-error">
              <p>No has seleccionado una dirección de envío.</p>
            </div>
          </div>
        
        </div>
        </div>
      
      

      <div class="cart-summary">
        <h3>Total a pagar: <span class="cart-total">${{ total }}</span></h3>
        <div class="cart-actions">
          <button @click="pagar" class="primary" :disabled="cartStore.items.length === 0">
            Finalizar Compra
          </button>
          <button @click="comprar" class="secondary">Volver a tienda</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-table { 
  width: 100%; 
  border-collapse: collapse; 
  margin-top: 20px; 
}

.cart-table th, .cart-table td { 
  border-bottom: 1px solid #ddd; 
  padding: 10px; text-align: left; 
}

.cart-summary { 
  margin-top: 30px; 
  text-align: right; 
}

.primary { 
  background-color: #4CAF50; 
  color: white; 
  padding: 10px 20px; 
  border: none; 
  cursor: pointer; 
}

.secondary { 
  background-color: #f44336; 
  color: white; 
  padding: 5px 10px; 
  border: none; 
  cursor: pointer; 
  margin-left: 5px; 

}

button:disabled { 
  background-color: #ccc; 
  cursor: not-allowed; 

}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-qty {
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;
}

.btn-qty:hover {
  background-color: #ddd;
}

.qty-number {
  font-weight: bold;
  min-width: 20px;
}
</style>