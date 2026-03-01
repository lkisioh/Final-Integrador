import http from '@/services/http'
import {ref} from 'vue'

export const traerOrdenesUser = ()=> {

  let ordenesUser = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarOrdenesUserAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await http.get(url)

    ordenesUser.value= res.data
  }catch (error){
    console.error(`Error al buscar los ordenes: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    ordenesUser,
    error,
    cargando,
    llamarOrdenesUserAPI
}
}
