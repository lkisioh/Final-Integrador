import http from '@/services/http'
import {ref} from 'vue'

export const tomarOrden = ()=> {

  let ordenTomada = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const tomarOrdenAPI= async(url,datosNuevos)=>{
  try{
    cargando.value=true
    const res = await http.patch(url,datosNuevos)

    ordenTomada.value= res.data
  }catch (error){
    console.error(`Error al tomar el orden: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    ordenTomada,
    error,
    cargando,
    tomarOrdenAPI
}
}
