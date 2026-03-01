<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/login')
</script>

<template>
  <header>


    <div class="wrapper">


    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
