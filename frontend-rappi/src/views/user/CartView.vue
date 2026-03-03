<script setup>
import { computed, ref } from 'vue'
import router from '@/router';
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/user/cartStore'
import { userUuid } from '@/stores/user/userUuid';
import { traerUser } from '@/composables/user/traerUser';
import { crearOrden } from '@/composables/order/crearOrden';

const cartStore = useCartStore()
const storeUserUuid = userUuid()
const { user, llamarUserAPI } = traerUser()
const uuid = storeUserUuid.getUuid()
const { crearOrdenAPI } = crearOrden()

const paymentMethod = ref('')
const methods = ['CASH', 'CARD']

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


const subtotalGeneral = computed(() => {
  return cartStore.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
})

const montoAjuste = computed(() => {
  return subtotalGeneral.value * 0.10;
})

const totalFinalConAjuste = computed(() => {
  if (paymentMethod.value === 'CASH') return subtotalGeneral.value - montoAjuste.value;
  if (paymentMethod.value === 'CARD') return subtotalGeneral.value + montoAjuste.value;
  return subtotalGeneral.value;
})

function calcularTotalTienda(productos) {
  return productos.reduce((acc, item) => acc + (item.price * item.quantity), 0)
}

async function finalizarCompraGeneral() {
  if (!direccionSeleccionada.value) {
    alert("⚠️ Por favor selecciona una dirección antes de finalizar la compra.");
    return;
  }
  if (!paymentMethod.value) {
    alert("⚠️ Por favor selecciona un método de pago.");
    return;
  }

  const payload = {
    paymentMethod: paymentMethod.value,
    userUuid: uuid,
    addressUuid: direccionSeleccionada.value.uuid,
    items: cartStore.items.map(p => ({
      productId: p.uuid,
      vendorId: p.storeId,
      quantity: Number(p.quantity),
      price: Number(p.price)
    }))
  };

  try {
    alert(`Procesando compra general por $${totalFinalConAjuste.value.toFixed(2)}...`)
    
    
    await crearOrdenAPI('/orders/checkout', payload);

    alert(`✅ ¡Compra finalizada con éxito! Se han generado las órdenes para cada tienda.`);

    cartStore.items = []; 
    router.push('/mis-pedidos/' + uuid);
  } catch (error) {
    console.error("Error al procesar la compra general", error);
    alert("Hubo un error al procesar tu pedido.");
  }
}

function eliminarProducto(uuid) {
  cartStore.items = cartStore.items.filter(i => i.uuid !== uuid)
}

function irAShop() {
  router.push('/shop')
}
</script>

<template>
  <div class="cart-view-container">
    <nav class="nav-links">
      <RouterLink to="/shop">← Volver atrás</RouterLink>
    </nav>

    <div class="cart-box">
      <h1 class="cart-title">CARRITO DE COMPRAS</h1>

      <div class="global-shipping-header">
        <div class="shipping-content">
          <span class="pin-icon">📍</span>
          <div v-if="direccionSeleccionada" class="address-details">
            <p class="label">Entregar en:</p>
            <p class="address-text">
              <strong>{{ direccionSeleccionada.street }} {{ direccionSeleccionada.number }}</strong>
            </p>
          </div>
          <div v-else class="address-details error">
            <p class="label">⚠️ Atención: No has seleccionado dirección.</p>
          </div>
        </div>
        <button @click="router.push('/user/' + uuid)" class="btn-change">Cambiar</button>
      </div>

      <div v-if="cartStore.items.length > 0">
        <div v-for="(productos, tiendaNombre) in productosAgrupados" :key="tiendaNombre" class="store-section">
          <h2 class="store-title">Tienda: {{ tiendaNombre }}</h2>
          <table class="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
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
                <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                <td>
                  <button @click="eliminarProducto(item.uuid)" class="secondary">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="store-subtotal-info">
            Subtotal tienda: <strong>${{ calcularTotalTienda(productos).toFixed(2) }}</strong>
          </div>
        </div>

        <div class="final-checkout-card">
          <div class="payment-selection">
            <h3>Método de Pago</h3>
            <select v-model="paymentMethod" class="full-width-select">
              <option value="" disabled>Selecciona cómo quieres pagar</option>
              <option v-for="method in methods" :key="method" :value="method">
                {{ method === 'CASH' ? 'Efectivo (10% Desc.)' : method === 'CARD' ? 'Tarjeta (10% Recargo)' : method }}
              </option>
            </select>
          </div>

          <div class="total-summary">
            <p>Subtotal General: <strong>${{ subtotalGeneral.toFixed(2) }}</strong></p>
            <p v-if="paymentMethod === 'CARD'" class="adjustment-text surcharge">
                Recargo Tarjeta (10%): <span>+${{ montoAjuste.toFixed(2) }}</span>
            </p>
            <p v-if="paymentMethod === 'CASH'" class="adjustment-text discount">
                Descuento Efectivo (10%): <span>-${{ montoAjuste.toFixed(2) }}</span>
            </p>
              <h2 class="grand-total">Total Final: ${{ totalFinalConAjuste.toFixed(2) }}</h2>
          </div>

          <button 
            @click="finalizarCompraGeneral" 
            class="primary btn-finalize"
            :disabled="!direccionSeleccionada || !paymentMethod"
          >
            CONFIRMAR Y FINALIZAR COMPRA
          </button>
        </div>
      </div>

      <div v-else class="empty-cart">
        <p>Tu carrito está vacío.</p>
        <button @click="irAShop" class="primary">Ir a la tienda</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view-container { padding: 20px; display: flex; flex-direction: column; align-items: center; }
.cart-box { width: 100%; max-width: 800px; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.store-section { margin-bottom: 25px; border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
.store-title { background: #f4f4f4; padding: 10px; font-size: 1.1rem; border-left: 5px solid #4CAF50; }
.cart-table { width: 100%; border-collapse: collapse; }
.cart-table th, .cart-table td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
.store-subtotal-info { text-align: right; padding: 10px; background: #fafafa; }

.final-checkout-card {
  margin-top: 30px;
  padding: 20px;
  border: 2px solid #4CAF50;
  border-radius: 12px;
  background-color: #f9fff9;
}
.payment-selection { margin-bottom: 20px; }
.full-width-select { width: 100%; padding: 12px; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem; }
.total-summary { text-align: right; margin-bottom: 20px; }
.grand-total { font-size: 1.8rem; color: #2e7d32; margin-top: 5px; }
.adjustment-text { font-size: 0.9rem; color: #666; font-style: italic; }
.btn-finalize { width: 100%; font-size: 1.2rem; font-weight: bold; padding: 15px; border-radius: 8px; }
.discount span { color: #2e7d32; font-weight: bold;}
.surcharge span {color: #d32f2f; font-weight: bold;}
.primary { background-color: #4CAF50; color: white; cursor: pointer; border: none; }
.primary:hover { background-color: #45a049; }
.secondary { background-color: #ffeded; color: #d32f2f; border: 1px solid #ffcdd2; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
.quantity-controls { display: flex; align-items: center; gap: 8px; }
.btn-qty { width: 25px; height: 25px; border: 1px solid #ccc; background: white; cursor: pointer; border-radius: 4px; }
</style>