<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderMain from './components/HeaderMain.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <HeaderMain />

  <!-- Основное содержимое, которое будет меняться при навигации -->
  <main>
    <RouterView />
  </main>

  <Footer />
</template>
