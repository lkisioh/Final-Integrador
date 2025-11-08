
import axios from 'axios'
import {ref} from 'vue'
import { userUuid } from '@/stores/user/userUuid'




export const createProduct = () => {

  const {getUuid} = userUuid()
  const uuid = getUuid()
  let product= ref({
    name: "",
    description: "",
    price: null,
    vendorUuid: uuid
  })
  const error = ref(null)
  const cargando = ref(false)


  const createProductAPI = async (url) => {
    try {
      cargando.value = true
      const res = await axios.post(url, product.value)

      return res.data
    } catch (error) {
      console.error(`Error al crear el producto: ${error.message}`)
    } finally {
      cargando.value = false
    }
  }

  return {
    product,
    error,
    cargando,
    createProductAPI
  }
}


