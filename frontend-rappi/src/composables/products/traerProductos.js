import http from '@/services/http'
import {ref} from 'vue'

export const traerProductos = ()=> {

  let productos = ref([])
  let producto = ref({})
  const error = ref(null)
  const cargando = ref(false)

  const llamarProductosAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await http.get(url)

    productos.value= res.data
  }catch (error){
    console.error(`Error al buscar los productos: ${error.message}`)
  }finally {
      cargando.value = false
    }
    }
    const llamarProductoAPI= async(url)=>{
  try{
    cargando.value=true
    const res = await http.get(url)

    producto.value= res.data
  }catch (error){
    console.error(`Error al buscar el producto: ${error.message}`)
  }finally {
      cargando.value = false
    }

}
return{
    productos,
    producto,
    error,
    cargando,
    llamarProductosAPI,
    llamarProductoAPI
 }
}
