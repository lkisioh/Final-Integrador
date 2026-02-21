import http from '@/services/http'
import {ref} from 'vue'

export const traerUser = ()=> {

  let user = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const llamarUserAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await http.get(url)

    user.value= res.data
  }catch (error){
    console.error(`Error al buscar los usuario: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    user,
    error,
    cargando,
    llamarUserAPI
}
}
