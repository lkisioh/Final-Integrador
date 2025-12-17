import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
const items = ref([])
  
  const savedItems = localStorage.getItem('cart_items')
  if (savedItems) {
    try {
      items.value = JSON.parse(savedItems)
    } catch (e) {
      console.error("Error al cargar el carrito del disco", e)
      items.value = []
    }
  }  
  watch(items, (newVal) => {
    localStorage.setItem('cart_items', JSON.stringify(newVal))
  }, { deep: true })

  function addToCart(product) {
    const existingItem = items.value.find(item => item.uuid === product.uuid)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    alert(`Agregado: ${product.name}`)
  }

  function clearCart() {
    items.value = []
  }

  function incrQuantity(uuid) {
    const item = items.value.find(i => i.uuid === uuid)
    if (item) {
      item.quantity += 1
    }
  }

  function decrQuantity(uuid) {
    const item = items.value.find(i => i.uuid === uuid)
    if (item && item.quantity > 1) {
      item.quantity -= 1
    } else {
      items.value = items.value.filter(i => i.uuid !== uuid)
    }
  }

  const totalItems = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0))

  return { items, addToCart, clearCart, incrQuantity, decrQuantity, totalItems }
})