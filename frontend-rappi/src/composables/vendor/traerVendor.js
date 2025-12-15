import axios from 'axios'
import {ref} from 'vue'

export const traerVendor = ()=> {

  let vendor = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const llamarVendorAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)

    vendor.value= res.data
    console.log(vendor.value)
  }catch (error){
    console.error(`Error al buscar el vendor: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    vendor,
    error,
    cargando,
    llamarVendorAPI
}
}
