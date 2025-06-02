<script setup lang="ts">
import { ref } from 'vue'
import SearchComponent from './SearchComponent.vue'

interface navItem {
  id: number
  title: string
  path: string
}

const navItems = ref<navItem[]>([
  { id: 1, title: 'Главная', path: '/' },
  { id: 2, title: 'Источники', path: '/sources' },
])
</script>

<template>
  <header class="header">
    <router-link class="header__logo" to="/">
      <img src="../assets/logo.svg" alt="Логотип" />
    </router-link>
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__item" v-for="item in navItems" :key="item.id">
          <router-link class="header__link" :to="item.path">{{ item.title }}</router-link>
        </li>
        <li class="header__item">
          <a class="header__link" href="/#frames">Фреймы</a>
        </li>
      </ul>
      <SearchComponent class="header__link" />
    </nav>
  </header>
</template>

<style lang="scss">
$text: #2c3e50;
$green: #42b883;
.header {
  min-height: 150px;
  margin-bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 250px;

  &__nav {
    width: 560px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__list {
    height: 100%;
    display: flex;
    padding: 0;
    list-style: none;
    align-items: center;
    gap: 56px;
  }

  &__link {
    text-decoration: none;
    color: inherit;
    position: relative;
    transition: color 0.4s;
    font-size: 20px;
  }

  &__link:hover {
    color: hsla(160, 100%, 37%, 1);
    padding: 3px;
  }

  &__link::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, hsla(160, 100%, 37%, 1), #647eff);
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.4s ease;
  }

  &__link:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
}
</style>
