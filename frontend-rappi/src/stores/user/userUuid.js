import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userUuid = defineStore('userUuid', () => {
  const uuid = ref(localStorage.getItem('userUuid') || null)
  const userType = ref(localStorage.getItem('userType') || null)
  const nombre = ref(localStorage.getItem('userName') || null)

  function setUuid(newUuid) {
    uuid.value = newUuid
    localStorage.setItem('userUuid', newUuid)
  }

  function setNombre(newName) {
    nombre.value = newName
    localStorage.setItem('userName', newName)
  }

  function setUserType(userTypeApi) {
    userType.value = userTypeApi
    localStorage.setItem('userType', userTypeApi)
  }

  function getUuid() {
    return uuid.value
  }

 function getNombre() { return nombre.value }

  function getUserType() {
    return userType.value
  }

  function clearStorage() {
    uuid.value = null
    userType.value = null
    localStorage.removeItem('userUuid')
    localStorage.removeItem('userType')
    localStorage.removeItem('userName') 
  }

const currentAddressId = ref(localStorage.getItem('currentAddressId') || null)
  function setActualAddress(addressUuidParam) {
    currentAddressId.value = addressUuidParam
    localStorage.setItem('currentAddressId', addressUuidParam)
    console.log("Dirección actualizada en el store:", addressUuidParam)
  }

  return { 
    uuid, 
    userType, 
    nombre,
    setUuid, 
    setUserType, 
    setNombre,
    getNombre,
    getUuid, 
    getUserType,
    clearStorage,
    currentAddressId,
    setActualAddress
  }
})