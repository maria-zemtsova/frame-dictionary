<template>
  <div class="faq" id="questions">
    <div>
      <h2 class="faq__title">ВОПРОСЫ</h2>
      <p class="faq__description">Собрали список вопросов, которые могли у вас возникнуть</p>
    </div>
    <div class="faq__container">
      <div v-if="loading" class="loading">Загрузка вопросов...</div>
      <div v-if="error" class="error">Ошибка загрузки данных: {{ error }}</div>
      <div v-if="!loading && !error" class="faq__list">
        <FAQItem
          v-for="item in questions"
          :key="item.id"
          :question="item.question"
          :answer="item.answer"
          :is-active="activeId === item.id"
          @toggle="handleToggle(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import FAQItem from './FAQItem.vue'

interface Question {
  id: number
  question: string
  answer: string
}

const questions = ref<Question[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const activeId = ref<number | null>(null)

const fetchQuestions = async () => {
  try {
    const response = await axios.get<Question[]>('/api/questions.json')
    questions.value = response.data
    error.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
  } finally {
    loading.value = false
  }
}

const handleToggle = (id: number) => {
  activeId.value = activeId.value === id ? null : id
}

onMounted(() => {
  fetchQuestions()
})
</script>

<style lang="scss">
.faq {
  display: flex;
  gap: 61px;
  justify-content: center;
  align-items: center;
  margin-bottom: 120px;
  margin-top: 120px;

  div {
    text-align: center;
  }
  &__title {
    font-weight: bold;
    font-size: 36px;
    font-family: 'Inter', serif;
    background: linear-gradient(45deg, #42b983, #647eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    text-transform: uppercase;
  }

  &__description {
    font-family: 'Roboto';
    font-size: 20px;
    color: #95a5a6;
  }

  &__container {
    padding: 20px;
  }

  &__list {
    width: 100%;
  }
}
</style>
