import http from '@/services/http'
import {ref} from 'vue'

export const cambiarEstadoOrders= ()=> {

  let order = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const AceptarOrdenAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await http.patch(url, { status: "ACEPTADO" })

    order.value= res.data
  }catch (error){
    console.error(`Error al cambiar el estado de la orden: ${error.message}`)
  }finally {
      cargando.value = false
    }
  }
  const CancelarOrdenAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await http.patch(url, { status: "CANCELADO" })

    order.value= res.data
  }catch (error){
    console.error(`Error al cambiar el estado de la orden: ${error.message}`)
  }finally {
      cargando.value = false
    }
}
return{
    order,
    error,
    cargando,
    AceptarOrdenAPI,
    CancelarOrdenAPI,
}
}

