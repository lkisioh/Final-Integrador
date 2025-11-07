<script setup>
// Si querés usar reactive o ref:
import { ref } from 'vue'


// Ejemplo de datos del formulario

const marketname = ref('')
const category = ref('')
const daysOpen = ref('')
const time = ref('')
const phone = ref(0)
const email = ref('')
const street = ref('')
const streetNumber = ref('')
const password = ref('')

const initDay = ref('')
const endDay = ref('')

const vendor = ref ({})

// Función para crear el usuario (podés adaptarla a tu lógica)
function nuevoVendedor() {
  console.log('Creando vendor:'+{marketname})

  crearVendedor(marketname,category, daysOpen, time, phone, email, street, streetNumber, password)
  //lamada api


  console.log(vendor.value)
  console.log('JSON plano:', JSON.stringify(vendor.value))
}


function crearVendedor(marketname,category, daysOpen, time, phone, email, street, streetNumber, password){



vendor.value = {
    marketname: marketname.value,
    category: category.value,
    daysOpen: [initDay.value + ' a ' + endDay.value],
    time: time.value,
    phone: phone.value,
     email: email.value,
    address: {
      street: street.value,
      streetNumber: streetNumber.value,
    },
  password: password.value
}
}

let currentChecked = null;
  function handleCheckChange(event) {
    const selectedValue = event.target.value;

    if (selectedValue === '24hs') {
      time.value = ['24hs'];
      currentChecked = '24hs';
    } else {
      if (currentChecked === '24hs') {
        time.value = [];
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
</script>

<template>
  <div class="form">
    <h2>Vendedor</h2>
    <form @submit.prevent="nuevoVendedor">
        <div>
        <label>Nombre local:</label>
        <input v-model="marketname" type="text" />
      </div>

      <div>
        <label>Direccion:</label>

        <label>Calle:</label>
        <input v-model="street" type="text" />

        <label>Número:</label>
        <input v-model="streetNumber" type="number" />

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
        <input v-model="phone" type="number" />
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
