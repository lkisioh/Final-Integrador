import { ref, } from 'vue'
import { defineStore } from 'pinia'

export const userUuid = defineStore('userUuid', () => {
  const uuid = ref(null)

  function setUuid(newUuid) {
    uuid.value = newUuid
  }

  function getUuid() {
    return uuid.value
  }
  function clearUuid() {
    uuid.value = null
  }
  return { uuid, setUuid, clearUuid, getUuid }
})

