<script setup lang="ts">
import { ref, computed } from 'vue'
// import type { Lexeme, Participant } from '@/types' // Убедитесь, что у вас есть эти типы
interface Lexeme {
  slug: string
  title: string
  description?: string
  englishTranslations?: string[]
  contexts?: string[]
  collocations?: string[]
}

interface Participant {
  slug: string
  title: string
  description?: string
  role?: string
}
const props = defineProps<{
  lexeme: Lexeme | null
  participant: Participant | null
}>()

const emit = defineEmits(['close'])

const title = computed(() => {
  return props.lexeme?.title || props.participant?.title || ''
})

const description = computed(() => {
  return props.lexeme?.description || props.participant?.description || ''
})

const role = computed(() => {
  return props.participant?.role || null
})

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal__overlay" @click.self="closeModal">
    <div class="modal__content">
      <button class="modal__close" @click="closeModal">×</button>

      <h2 class="modal__title">{{ title }}</h2>

      <div v-if="description" class="modal__section">
        <h3>Определение</h3>
        <p>{{ description }}</p>
      </div>

      <div v-if="lexeme?.englishTranslations?.length" class="modal__section">
        <h3>Английские аналоги</h3>
        <ul>
          <li v-for="(translation, index) in lexeme.englishTranslations" :key="index">
            {{ translation }}
          </li>
        </ul>
      </div>

      <div v-if="lexeme?.contexts?.length" class="modal__section">
        <h3>Контексты употребления</h3>
        <ul>
          <li v-for="(context, index) in lexeme.contexts" :key="index">
            {{ context }}
          </li>
        </ul>
      </div>

      <div v-if="lexeme?.collocations?.length" class="modal__section">
        <h3>Коллокации</h3>
        <ul>
          <li v-for="(collocation, index) in lexeme.collocations" :key="index">
            {{ collocation }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  &__content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
  }

  &__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  &__title {
    width: 100%;
    text-align: center;
    margin-bottom: 45px;
    margin-top: 0;
    color: #333;
    font-family: 'Inter', serif;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(45deg, #42b983, #647eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__section {
    margin-bottom: 1.5rem;
  }

  &__section h3 {
    font-family: 'Roboto' sans-serif;
    font-size: 22px;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }

  &__section p {
    padding-left: 20px;
    font-family: 'Roboto' sans-serif;
    font-size: 20px;
  }

  &__section ul {
    list-style: none;
  }

  &__section li {
    padding-left: 20px;
    font-family: 'Roboto' sans-serif;
    font-size: 20px;
  }
}
</style>
