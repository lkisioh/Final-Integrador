<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 
import axios from 'axios';
const route = useRoute();
const router = useRouter();

const vendorUuid = route.params.vendorUuid;
console.log('UUID capturado en Formulario:', vendorUuid);
const newProduct = ref({
    name: '',
    description: '',
    price: 0, 
    photo: '', 
    available: true
});
const creationError = ref(null);
const creationLoading = ref(false); 

const crearProducto = async () => {
    creationLoading.value = true;
    creationError.value = null;

    try {
        if (newProduct.value.price <= 0) {
            throw new Error('El precio debe ser mayor a cero.');
        }

        const url = `http://localhost:3000/vendors/${vendorUuid}/products`; 
        
        await axios.post(url, newProduct.value);
        
        alert(`¡Producto "${newProduct.value.name}" creado con éxito!`);
        
        router.push({ path: `/vendor/${vendorUuid}` });

    } catch (error) {
        console.error("Error al crear producto:", error);
        creationError.value = error.response?.data?.message || error.message || 'Error desconocido al crear.';
    } finally {
        creationLoading.value = false;
    }
};

const goBack = () => {
    router.push({ path: `/vendors/${vendorUuid}` });
};
</script>

<template>
  <div class="product-form-view">
    <div class="form-card">
      <button @click="goBack" class="btn-back">← Volver al Perfil</button>
      
      <h2>Agregar Nuevo Producto</h2>
      <p class="subtitle">Completa los datos para tu nuevo artículo</p>
      
      <form @submit.prevent="crearProducto" class="styled-form">
        <div class="input-group">
          <label>Nombre del Producto</label>
          <input type="text" v-model="newProduct.name" placeholder="Ej: Pizza Napolitana" required>
        </div>

        <div class="input-group">
          <label>Descripción</label>
          <textarea v-model="newProduct.description" placeholder="Ingredientes o detalles..." required></textarea>
        </div>

        <div class="row">
          <div class="input-group">
            <label>Precio ($)</label>
            <input type="number" v-model.number="newProduct.price" min="0.01" step="0.01" required>
          </div>

          <div class="input-group checkbox-group">
            <label>Disponible</label>
            <input type="checkbox" v-model="newProduct.available">
          </div>
        </div>

        <div class="input-group">
          <label>URL de la Foto</label>
          <input type="text" v-model="newProduct.photo" placeholder="http://imagen.com/foto.jpg">
        </div>

        <button type="submit" class="btn-submit" :disabled="creationLoading">
          {{ creationLoading ? 'Guardando...' : 'Agregar Producto' }}
        </button>

        <p v-if="creationError" class="error-msg">⚠️ {{ creationError }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.product-form-view {
  background-color: #f0f4f8;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
}

.form-card {
  background-color: #ffffff;
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #d9e2ec;
}

h2 {
  color: #102a43;
  margin: 10px 0 5px 0;
  font-size: 24px;
}

.subtitle {
  color: #627d98;
  margin-bottom: 30px;
  font-size: 14px;
}

.styled-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.input-group label {
  font-weight: 600;
  color: #486581;
  font-size: 14px;
}

input[type="text"],
input[type="number"],
textarea {
  padding: 12px;
  border: 1px solid #d9e2ec;
  border-radius: 8px;
  background-color: #f8fafc;
  font-size: 15px;
  transition: all 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #486581;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(72, 101, 129, 0.1);
}

textarea {
  height: 100px;
  resize: none;
}

.row {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}

.checkbox-group {
  flex-direction: row !important;
  align-items: center;
  padding-bottom: 12px;
}

.checkbox-group input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.btn-submit {
  background-color: #486581;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 10px;
}

.btn-submit:hover {
  background-color: #243b55;
}

.btn-submit:disabled {
  background-color: #bcccdc;
  cursor: not-allowed;
}

.btn-back {
  background: none;
  border: none;
  color: #627d98;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 10px;
  display: flex;
}

.btn-back:hover {
  color: #102a43;
}

.error-msg {
  color: #cf3d3d;
  background-color: #fff1f1;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  margin-top: 15px;
}
</style>