<script setup lang="ts"></script>

<template>
  <section class="search">
    <svg class="search__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
      />
    </svg>
    <button class="search__button">Поиск</button>
  </section>
</template>

<style lang="scss">
.search {
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  height: auto;
  &__icon {
    width: 22px;
    fill: #42b883;
  }

  &__button {
    background: none;
    border: none;
    font-size: 20px;
    padding: 0;
  }
}
</style>
