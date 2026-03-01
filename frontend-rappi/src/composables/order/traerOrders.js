import http from '@/services/http'
import {ref} from 'vue'

export const traerOrders= ()=> {

  let ordenes = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarOrdersAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await http.get(url)

    ordenes.value= res.data
  }catch (error){
    console.error(`Error al buscar las órdenes: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    ordenes,
    error,
    cargando,
    llamarOrdersAPI
}
}
