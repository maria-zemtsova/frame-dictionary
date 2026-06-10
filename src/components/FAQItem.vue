<template>
  <div class="faq__item" :class="{ 'is-active': isActive }">
    <div class="faq__header" @click="$emit('toggle')">
      <h3 class="faq__question">{{ question }}</h3>
      <span class="faq__icon">
        <svg :class="{ 'rotate-180': isActive }" width="24" height="24" viewBox="0 0 24 24">
          <path fill="#42b983" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z" />
        </svg>
      </span>
    </div>
    <transition name="slide">
      <div v-show="isActive" class="faq-answer">
        <p>{{ answer }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  question: string
  answer: string
  isActive: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<style lang="scss">
.faq {
  margin-bottom: 120px;
  margin-top: 120px;
  &__item {
    border-radius: 8px;
    margin-bottom: 12px;
    transition: all 0.3s ease;
    position: relative;
    border-radius: 10px;
    padding: 5px;
    background: white;

    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: 11px;
      background: linear-gradient(to left, #42b983, #647eff);
      z-index: -1;
    }
  }

  &__header {
    display: flex;
    width: 600px;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    cursor: pointer;
  }

  &__question {
    margin: 0;
    color: #2c3e50;
    font-family: 'Roboto', sans-serif;
    font-size: 25px;
    // font-weight: bold;
  }

  &__icon {
    transition: transform 0.3s ease;
  }

  &__icon svg {
    transition: transform 0.3s ease;
  }

  &__180 {
    transform: rotate(180deg);
  }

  &__answer {
    padding: 0 16px;
    overflow: hidden;
    background-color: white;
    margin: 0;
  }

  &__answer p {
    margin: 0;
    padding: 16px 0;

    line-height: 1.6;
    color: #2c3e50;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease;
  max-height: 500px;
}

.slide-enter-from,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.is-active {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
</style>
