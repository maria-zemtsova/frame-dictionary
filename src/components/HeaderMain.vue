<script setup lang="ts">
import { ref } from 'vue'
import SearchComponent from './SearchComponent.vue'

interface navItem {
  id: number
  title: string
  path: string
}

const navItems = ref<navItem[]>([
  { id: 1, title: 'Команда', path: '/team' },
  { id: 2, title: 'О нас', path: '/about' },
  { id: 3, title: 'Фреймы', path: '/frames' },
])
</script>

<template>
  <header class="header">
    <img class="header__logo" src="../assets/logo.svg" alt="Логотип" />
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__item" v-for="item in navItems" :key="item.id">
          <a class="header__link" :href="item.path">{{ item.title }}</a>
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
  gap: 300px;

  &__nav {
    width: 490px;
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
