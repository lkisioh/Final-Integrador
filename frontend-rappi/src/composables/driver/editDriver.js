import http from '@/services/http'
import {ref} from 'vue'

export const editDriver = ()=> {

  let driverEditado = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const editarDriverAPI= async(url,datosNuevos)=>{
  try{
    cargando.value=true
    const res = await http.patch(url,datosNuevos)

    driverEditado.value= res.data
  }catch (error){
    console.error(`Error al editar el driver: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    driverEditado,
    error,
    cargando,
    editarDriverAPI
}
}
