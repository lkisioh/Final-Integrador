import http from '@/services/http'
import {ref} from 'vue'

export const traerOrders= ()=> {

  let orders = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarOrdersAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await http.get(url)

    orders.value= res.data
  }catch (error){
    console.error(`Error al buscar las órdenes: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    orders,
    error,
    cargando,
    llamarOrdersAPI
}
}
