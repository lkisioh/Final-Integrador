<template>

  <h1>403 - No autorizado</h1>
  <p>No tienes permiso para acceder a esta página.</p>
  <p>Si crees que esto es un error, por favor contacta al administrador del sitio.</p>

  <RouterLink to="/">Volver a la página principal</RouterLink>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>
<style>
h1 {
  color: red;
}
</style>
