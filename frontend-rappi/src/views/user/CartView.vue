<script setup>
import { computed } from 'vue'
import router from '@/router';
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/user/cartStore'
import { userUuid } from '@/stores/user/userUuid';
import { traerUser } from '@/composables/user/traerUser';
import axios from 'axios';

const cartStore = useCartStore()
const storeUserUuid = userUuid()
const { user, llamarUserAPI } = traerUser()
const uuid = storeUserUuid.getUuid()

llamarUserAPI('/users/' + uuid)

const direccionSeleccionada = computed(() => {
  if (!user.value.addresses || !storeUserUuid.currentAddressId) return null
  return user.value.addresses.find(a => a.uuid === storeUserUuid.currentAddressId)
})

const productosAgrupados = computed(() => {
  const grupos = {}
  cartStore.items.forEach(item => {
    if (!grupos[item.storeName]) {
      grupos[item.storeName] = []
    }
    grupos[item.storeName].push(item)
  })
  return grupos
})

function calcularTotalTienda(productos) {
  return productos.reduce((acc, item) => acc + (item.price * item.quantity), 0)
}

async function pagarOrden(nombreTienda, productosTienda) {
  if (!direccionSeleccionada.value) {
    alert("⚠️ Por favor selecciona una dirección antes de finalizar la compra.");
    return;
  }

 const nuevaOrden = {
  userUuid: uuid,
  userName: `${user.value.name}`,
  userOrderAddress: `${direccionSeleccionada.value.street} ${direccionSeleccionada.value.number}, Depto ${direccionSeleccionada.value.apartment || 'N/A'}`,
  vendorUuid: String(productosTienda[0].storeId),
  vendorName: nombreTienda,
  items: productosTienda.map(p => ({
    // acá seria el producto uuid, cantidad porque el back deberia sacar el precio del producto, y subtotal que seria cantidad * precio
    productUuid: p.uuid,
    quantity: Number(p.quantity),
    unitPrice: Number(p.price),
    subtotal: Number(p.quantity) * Number(p.price),
  })),
  status: 'PENDIENTE',
  total: Number(calcularTotalTienda(productosTienda)),
}


  try {
    alert(`Procesando tu pedido a ${nombreTienda}...`)
    alert( ` el json es ${JSON.stringify(nuevaOrden)}`)
    console.log("Enviando nueva orden al backend:", nuevaOrden);
    await axios.post('http://localhost:3000/orders', nuevaOrden);

    alert(`✅ Pedido enviado a ${nombreTienda}. Un repartidor lo tomará pronto.`);

    const idsAQuitar = productosTienda.map(p => p.uuid);
    cartStore.items = cartStore.items.filter(item => !idsAQuitar.includes(item.uuid));
    router.push('/mis-pedidos/' + uuid);
  } catch (error) {
    console.log('status', error?.response?.status)
    console.log('data', error?.response?.data)
    console.error("Error al generar la orden", error);
    alert("Hubo un error al procesar tu pedido.");
  }
}

function comprar() {
  router.push('/shop')
}

function eliminarProducto(uuid) {
  cartStore.items = cartStore.items.filter(i => i.uuid !== uuid)
}

// const totalGeneral = computed(() => {
//   return cartStore.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
// })
</script>

<template>
  <div class="cart-view-container">
    <nav class="nav-links">
      <RouterLink to="/shop">← Volver atrás</RouterLink>
    </nav>

    <div class="cart-box">
      <h1 class="cart-title">CARRITO</h1>

      <div class="global-shipping-header">
        <div class="shipping-content">
          <span class="pin-icon">📍</span>
          <div v-if="direccionSeleccionada" class="address-details">
            <p class="label">Entregar en:</p>
            <p class="address-text">
              <strong>{{ direccionSeleccionada.street }} {{ direccionSeleccionada.number }}</strong>
              <span v-if="direccionSeleccionada.apartment"> - Depto: {{ direccionSeleccionada.apartment }}</span>
            </p>
          </div>
          <div v-else class="address-details error">
            <p class="label">⚠️ Atención:</p>
            <p class="address-text">No has seleccionado una dirección actual en tu perfil.</p>
          </div>
        </div>
        <button @click="router.push('/user/:uuid')" class="btn-change">Cambiar</button>
      </div>

      <div v-if="cartStore.items.length > 0">
        <div v-for="(productos, tiendaNombre) in productosAgrupados" :key="tiendaNombre" class="store-section">
          <h2 class="store-title">Tienda: {{ tiendaNombre }}</h2>

          <table class="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in productos" :key="item.uuid">
                <td>{{ item.name }}</td>
                <td>
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

          <div class="store-footer">
            <div class="store-total">
              Subtotal: <strong>${{ calcularTotalTienda(productos) }}</strong>
            </div>
            <button
              @click="pagarOrden(tiendaNombre, productos)"
              class="primary"
              :disabled="!direccionSeleccionada"
            >
              Finalizar pedido en {{ tiendaNombre }}
            </button>
          </div>
        </div>
      </div>

      <div v-else class="empty-cart">
        <p>Tu carrito está vacío.</p>
        <button @click="comprar" class="primary">Ir a la tienda</button>
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

.store-section {
  margin-bottom: 40px;
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 8px;
}

.store-title {
  background-color: #f8f9fa;
  padding: 10px;
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  border-left: 4px solid #4CAF50;
}
</style>
