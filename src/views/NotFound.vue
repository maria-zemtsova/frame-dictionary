<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const frameSlug = route.params.frameSlug
</script>

<template>
  <div class="not-found">
    <h1>Извините</h1>
    <p class="message">
      Фрейм <span class="frame-name">{{ frameSlug }}</span> находится в разработке
    </p>
    <router-link to="/" class="home-link">Вернуться на главную</router-link>
  </div>
</template>

<style>
.not-found {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #e74c3c;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.message {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.frame-name {
  font-weight: bold;
  color: #3498db;
}

.home-link {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #2980b9;
}
</style>
