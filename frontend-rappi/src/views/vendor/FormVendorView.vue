<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { createVendor } from '@/composables/vendor/createVendor'
import router from '@/router'
import { userUuid } from '@/stores/user/userUuid'

const {setUuid} = userUuid()

const vendorUuid = router.currentRoute.value.params.uuid


const {vendor,createVendorAPI} = createVendor()

const name = ref('')
const category = ref('')
const initDay = ref('')
const endDay = ref('')
const time = ref('')
const phone = ref(0)
const email = ref('')
const password = ref('')
const street = ref('')
const number = ref(0)


function mapearVendor() { 
  vendor.value = {
    name: name.value,
    category: category.value,
    daysOpen: initDay.value + ' a ' + endDay.value, 
    time: time.value,
    email: email.value,
    password: password.value,
    phone: Number(phone.value),
    
    address: {
      street: street.value,
      number: number.value
    },
    products: [] 
  }
}

async function nuevoVendor() {
  mapearVendor() 
  
  console.log('JSON de Vendedor a enviar:', JSON.stringify(vendor.value))
  
  const ok = await createVendorAPI('http://localhost:3000/vendors', vendor.value)
  
  if (ok && ok.uuid) { 
    alert('Vendedor creado con éxito')
    setUuid(ok.uuid)
    router.push('/vendors/' + ok.uuid)
  } else {
    console.error('Error al crear vendedor o la respuesta es inválida.', ok)
    alert('Error al registrar. Revisa la consola para detalles.')
  }
}



let currentChecked = null;
  function handleCheckChange(event) {
    const selectedValue = event.target.value;

    if (selectedValue === '24hs') {
      time.value = '24hs';
      currentChecked = '24hs';
    } else {
      if (currentChecked === '24hs') {
        time.value = '';
        currentChecked = null;
      }

      const index = time.value.indexOf(selectedValue);
      if (index > -1) {
        time.value.splice(index, 1);
      } else {
        time.value.push(selectedValue);
      }
    }
  }

function editar(){
  alert('Vendedor editado con éxito')
}

</script>

<template>
  <div class="form-vendor-container">
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/SelectUser">← Volver atrás</RouterLink>
    </nav>
    <div class="form-box">
      <h2>Vendedor</h2>
      <form @submit.prevent="nuevoVendor">
          <div>
          <label>Nombre local:</label>
          <input v-model="name" type="text" />
        </div>

        <div>
          <label>Direccion:</label>

          <label>Calle:</label>
          <input v-model="street" type="text" />

          <label>Número:</label>
          <input v-model="number" type="number" />

        </div>

        <div>
          <label>Categoría:</label>
          <input v-model="category" type="text" />
        </div>

        <div>
          <label>Días de trabajo:</label>
          <label for="initDay">Inicio</label>
          <select name="initDay" v-model="initDay">
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
          <label for="endDay">Fin</label>
          <select name="endDay" v-model="endDay">
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
        </div>

        <div>
          <label>Horario:</label>

          <check-group v-model="time" @change="handleCheckChange">
            <label>
              <input type="checkbox" value="madrugada" />
              Madrugada 00hs - 6hs
            </label>
            <label>
              <input type="checkbox" value="mañana" />
              Mañana 9hs - 12hs
            </label>
            <label>
              <input type="checkbox" value="tarde" />
              Tarde 12hs - 18hs
            </label>
            <label>
              <input type="checkbox" value="noche" />
              Noche 18hs - 00hs
            </label>
            <label>
              <input type="checkbox" value="24hs" />
              24 hs
            </label>
            <br>
            <label>Se eligio : {{ time }}</label>
          </check-group>
        </div>

        <div>
          <label>Teléfono:</label>
          <input v-model="phone" type="text" />
        </div>

        <div>
          <label>Email:</label>
          <input v-model="email" type="text" />
        </div>

        <div>
          <label>Contraseña:</label>
          <input v-model="password" type="password" />
        </div>

        <div>
          <button v-if="vendorUuid>=0" @click="editar">Editar</button>
          <button v-else type="submit">Crear</button>
      </div>

    </form>

    </div>

  </div>

</template>

<style scoped>

</style>
