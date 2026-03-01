import http from '@/services/http'
import {ref} from 'vue'

export const terminarOrden = ()=> {

  let ordenTerminada = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const terminarOrdenAPI= async(url,datosNuevos)=>{
  try{
    cargando.value=true
    const res = await http.patch(url,datosNuevos)

    ordenTerminada.value= res.data
  }catch (error){
    console.error(`Error al terminar el orden: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    ordenTerminada,
    error,
    cargando,
    terminarOrdenAPI
}
}
