<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ModalDetails from '@/components/ModalDetails.vue'
// Определяем все необходимые интерфейсы
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

interface Situation {
  slug: string
  title: string
  description: string
  participants: Participant[]
  actions: Lexeme[]
}

interface Subframe {
  slug: string
  title: string
  description: string
  situations: Situation[]
}

interface FrameData {
  slug: string
  title: string
  description: string
  backgroundImage: string
  subframes: Subframe[]
}

const route = useRoute()
const frameData = ref<FrameData | null>(null)
const activeSubframe = ref<Subframe | null>(null)
const selectedSituation = ref<Situation | null>(null)
const selectedLexeme = ref<Lexeme | null>(null)
const selectedParticipant = ref<Participant | null>(null)
const showModal = ref(false)

// Загрузка данных фрейма
watchEffect(async () => {
  try {
    const response = await axios.get(`/api/frames/${route.params.frameSlug}.json`)

    frameData.value = response.data

    // Устанавливаем первый субфрейм по умолчанию
    if (frameData.value?.subframes?.length) {
      // Если в URL есть subframeSlug, используем его, иначе берем первый
      const subframeSlug = route.params.subframeSlug || frameData.value.subframes[0].slug
      activeSubframe.value =
        frameData.value.subframes.find((s: Subframe) => s.slug === subframeSlug) ||
        frameData.value.subframes[0]

      // Сбрасываем выбранную ситуацию при смене субфрейма
      selectedSituation.value = null
    }
  } catch (error) {
    console.error('Ошибка загрузки фрейма:', error)
    frameData.value = null
    activeSubframe.value = null
  }
})

const loadLexemeDetails = async (lexemeSlug: string) => {
  try {
    const response = await axios.get(`/api/lexemes/${lexemeSlug}.json`)
    selectedLexeme.value = response.data
    selectedParticipant.value = null // Сбрасываем участника, если был выбран
    showModal.value = true // Вот это открывает модальное окно!
  } catch (error) {
    console.error('Ошибка загрузки лексемы:', error)
  }
}

const loadParticipantDetails = async (participantSlug: string) => {
  try {
    const response = await axios.get(`/api/participants/${participantSlug}.json`)
    selectedParticipant.value = response.data
    selectedLexeme.value = null
    showModal.value = true
  } catch (error) {
    console.error('Ошибка загрузки участника:', error)
  }
}

const closeModal = () => {
  showModal.value = false
  selectedLexeme.value = null
  selectedParticipant.value = null
}
</script>

<template>
  <div v-if="frameData" class="frame">
    <h1 class="frame__title"><span>фрейм</span> <br />{{ frameData.title }}</h1>
    <div class="frame__subframes-tabs">
      <button
        v-for="subframe in frameData.subframes"
        :key="subframe.slug"
        @click="
          () => {
            activeSubframe = subframe
            selectedSituation = null
          }
        "
        :class="{ active: activeSubframe?.slug === subframe.slug }"
        class="frame__subframe-tab highlight"
      >
        {{ subframe.title }}
      </button>
    </div>

    <div
      v-if="activeSubframe"
      class="frame__subframe-content"
      :style="
        frameData.backgroundImage && {
          backgroundImage: `url(${frameData.backgroundImage})`,
        }
      "
    >
      <div class="frame__subframe-wrapper">
        <div class="frame__subframe-description">
          <p>{{ activeSubframe.description }}</p>
        </div>

        <!-- Табы ситуаций -->
        <div class="frame__situations-tabs">
          <button
            v-for="situation in activeSubframe.situations"
            :key="situation.slug"
            @click="selectedSituation = situation"
            :class="{ active: selectedSituation?.slug === situation.slug }"
            class="frame__situation-tab"
          >
            {{ situation.title }}
          </button>
        </div>
      </div>

      <!-- Контент выбранной ситуации -->
      <div v-if="selectedSituation" class="frame__situation-content">
        <h3 class="frame__situation-title">Описание ситуации</h3>
        <p class="frame__situation-description">{{ selectedSituation.description }}</p>

        <!-- Участники -->
        <div class="frame__participants" v-if="selectedSituation.participants?.length">
          <h4 class="frame__situation-title">Участники</h4>
          <ul class="participants__list">
            <li
              class="participants__item"
              v-for="participant in selectedSituation.participants"
              :key="participant.slug"
              @click="loadParticipantDetails(participant.slug)"
            >
              <span>{{ participant.title }}</span>
            </li>
          </ul>
        </div>

        <!-- Действия -->
        <div class="frame__actions" v-if="selectedSituation.actions?.length">
          <h4 class="frame__situation-title">Действия</h4>
          <ul class="participants__list">
            <li
              class="participants__item"
              v-for="action in selectedSituation.actions"
              :key="action.slug"
              @click="loadLexemeDetails(action.slug)"
            >
              <span>{{ action.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ModalDetails
      v-if="showModal"
      :lexeme="selectedLexeme"
      :participant="selectedParticipant"
      @close="closeModal"
    />
  </div>
</template>

<style lang="scss">
.frame {
  font-family: 'Inter', serif;
  &__title {
    font-weight: bold;
    margin: 0 auto;
    margin-bottom: 60px;
    text-align: center;
    text-transform: uppercase;
    line-height: 120%;
    font-size: 60px;
    color: #2c3e50;
  }

  &__title span {
    font-weight: bold;
    background: linear-gradient(45deg, #42b983, #647eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }

  &__subframe-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  &__subframe-content {
    margin-left: 70px;
    margin-right: 70px;
    margin-bottom: 60px;
    margin-top: 35px;
    padding-top: 70px;
    padding-bottom: 70px;
    position: relative;
    border: 1px solid rgba(44, 62, 80, 0.5);
    border-radius: 10px;
  }

  &__subframe-description {
    width: 50%;
    font-family: 'Roboto' sans-serif;
    font-size: 20px;
  }

  &__situations-tabs {
    display: flex;
    gap: 25px;
    flex-direction: column;
    align-items: center;
  }

  &__situation-tab {
    width: 465px;
    height: 70px;
    font-family: 'Roboto' sans-serif;
    font-size: 20px;
    padding: 8px 16px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 5px;
    position: relative;
    border-radius: 10px;
    padding: 20px;

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

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px;
      background: white;
      z-index: -1;
    }
  }

  &__situation-content {
    margin: 50px;
    padding: 50px 70px;
    font-family: 'Roboto' sans-serif;
    font-size: 20px;
    position: relative;
    border-radius: 10px;
    background: white;

    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: 11px; /* 10px + 1px границы */
      background: linear-gradient(to left, #42b983, #647eff);
      z-index: -1;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px;
      background: white;
      z-index: -1;
    }
  }

  &__situation-title {
    width: 330px;
    margin-bottom: 30px;
    font-family: 'Inter', serif;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(45deg, #42b983, #647eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__situation-description {
    margin-bottom: 45px;
  }

  &__participants {
    margin-bottom: 50px;
  }
}

.participants__list {
  padding: 0;
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.participants__item {
  position: relative;
  border-radius: 10px;
  padding: 20px;
  background: white; /* Обязательно! */

  span {
    color: #2c3e50;
  }

  /* Градиентная рамка */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 11px; /* 10px родителя + 1px границы */
    background: linear-gradient(to left, #42b983, #647eff);
    z-index: 0; /* Важно! Должен быть выше фона */
  }

  /* Белый фон с обрезанными углами */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px; /* Совпадает с родителем */
    background: white;
    z-index: 1; /* Перекрывает градиент */
  }

  /* Контент должен быть выше всего */
  & > * {
    position: relative;
    z-index: 2;
  }
}

.subframe-description {
  margin: 20px 0;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.situations {
  margin-top: 30px;
}

.situation {
  margin-bottom: 30px;
  padding: 15px;
  border-radius: 8px;
}

.participants,
.actions {
  margin-top: 15px;
}

.active {
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}

/* Стили для табов субфреймов */
.frame__subframes-tabs {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.frame__subframe-tab {
  width: 44%;
  height: 75px;

  font-family: 'Roboto' sans-serif;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 8px 8px 0 0;
  background: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #2c3e50;
}

.frame__subframe-tab.active {
  background: linear-gradient(135deg, #42b883, #647eff);
  color: white;
  font-weight: bold;
}
/* Стили для контента субфрейма */

/* Стили для табов ситуаций */
.frame__situations-tabs {
  display: flex;
  gap: 25px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.frame__situation-tab:hover {
  background: #f0f0f0;
}

.frame__situation-tab.active {
  border: none;
  background: #42b883;
  color: white;
}
</style>
