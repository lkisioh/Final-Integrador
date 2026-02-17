import axios from 'axios'
import {ref} from 'vue'

export const traerVendor = ()=> {

  let vendors = ref([])
  let vendor = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const llamarVendorAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)
    vendor.value= res.data
    console.log(vendor.value)
    return res.data
  }catch (error){
    console.error(`Error al buscar el vendor: ${error.message}`)
    return null
  }finally {
      cargando.value = false
    } }

  const llamarVendorsAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await axios.get(url)

    vendors.value= res.data
    console.log(vendors.value)
  }catch (error){
    console.error(`Error al buscar el vendor: ${error.message}`)
  }finally {
      cargando.value = false
    }
}
return{
    vendor,
    vendors,
    error,
    cargando,
    llamarVendorAPI,
    llamarVendorsAPI

}}
