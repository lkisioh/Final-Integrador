import { ref, } from 'vue'
import { defineStore } from 'pinia'

export const userUuid = defineStore('userUuid', () => {
  const uuid = ref(null)
  const userType = ref(null)

  function setUuid(newUuid) {
    uuid.value = newUuid
  }

  function setUserType(userTypeApi){
    userType.value = userTypeApi
  }
  function getUuid() {
    return uuid.value
  }
  function getUserType() {
    return userType.value
  }

  return { uuid, setUuid, setUserType, getUuid, getUserType }
})

