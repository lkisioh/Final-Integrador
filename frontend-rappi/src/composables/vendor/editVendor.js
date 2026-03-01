import http from '@/services/http'
import {ref} from 'vue'

export const editVendor = ()=> {

  let vendorEditado = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const editarVendorAPI= async(url,datosNuevos)=>{
  try{
    cargando.value=true
    const res = await http.patch(url,datosNuevos)

    vendorEditado.value= res.data
  }catch (error){
    console.error(`Error al editar el vendedor: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    vendorEditado,
    error,
    cargando,
    editarVendorAPI
}
}
