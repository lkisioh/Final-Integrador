import http from '@/services/http'
import {ref} from 'vue'

export const traerDriver= ()=> {

  let drivers = ref([])
  const error = ref(null)
  const cargando = ref(false)

  const llamarDriverAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await http.get(url)

    drivers.value= res.data
  }catch (error){
    console.error(`Error al buscar los productos: ${error.message}`)
  }finally {
      cargando.value = false
    }


}
return{
    drivers,
    error,
    cargando,
    llamarDriverAPI
}
}
