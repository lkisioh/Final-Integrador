import http from '@/services/http'
import {ref} from 'vue'

export const editUser = ()=> {

  let userEditado = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const editarUserAPI= async(url,datosNuevos)=>{
  try{
    cargando.value=true
    const res = await http.patch(url,datosNuevos)

    userEditado.value= res.data
  }catch (error){
    console.error(`Error al editar el usuario: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    userEditado,
    error,
    cargando,
    editarUserAPI
}
}
