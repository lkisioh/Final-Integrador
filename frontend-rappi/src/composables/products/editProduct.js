import http from '@/services/http'
import {ref} from 'vue'

export const editProduct = ()=> {

  let productEditado = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const editarProductAPI= async(url,datosNuevos)=>{
  try{
    cargando.value=true
    const res = await http.patch(url,datosNuevos)

    productEditado.value= res.data
  }catch (error){
    console.error(`Error al editar el producto: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    productEditado,
    error,
    cargando,
    editarProductAPI
}
}
