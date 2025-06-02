<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface FrameItem {
  id: number
  path: string
  title: string
  slug: string
}

const router = useRouter()
const frameItems = ref<FrameItem[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Загрузка данных фреймов
const loadFrames = async () => {
  try {
    // Проверяем кеш
    const cacheKey = 'frames-cache'
    const cachedData = localStorage.getItem(cacheKey)

    if (cachedData) {
      frameItems.value = JSON.parse(cachedData)
      isLoading.value = false
    }

    // Делаем запрос через Axios
    const response = await axios.get('/api/frames/index.json')

    // Сохраняем в кеш
    frameItems.value = response.data.frames
    localStorage.setItem(cacheKey, JSON.stringify(response.data.frames))

    // Проверяем обновления (если нужно)
    await checkForUpdates()
  } catch (err) {
    error.value = 'Не удалось загрузить список фреймов'
    console.error('Error loading frames:', err)
  } finally {
    isLoading.value = false
  }
}

// Проверка обновлений на сервере
const checkForUpdates = async () => {
  try {
    const response = await axios.get('/api/frames/index.json', {
      params: {
        lastUpdate: true,
        _: new Date().getTime(), // Добавляем timestamp чтобы избежать кеширования
      },
      headers: {
        'Cache-Control': 'no-cache',
      },
    })

    const serverLastUpdated = response.data.lastUpdated
    const localLastUpdated = localStorage.getItem('frames-last-updated')

    if (!localLastUpdated || new Date(serverLastUpdated) > new Date(localLastUpdated)) {
      // Если есть обновления, перезагружаем данные
      const freshResponse = await axios.get('/api/frames/index.json')
      frameItems.value = freshResponse.data.frames
      localStorage.setItem('frames-cache', JSON.stringify(freshResponse.data.frames))
      localStorage.setItem('frames-last-updated', serverLastUpdated)
    }
  } catch (err) {
    console.error('Update check failed:', err)
  }
}

const navigateToFrame = (slug: string) => {
  router.push({
    name: 'frame',
    params: { frameSlug: slug },
  })
}

onMounted(() => {
  loadFrames()
})
</script>

<template>
  <section class="frames" id="frames">
    <div>
      <h2 class="frames__title">список фреймов</h2>
      <p class="frames__description">Выберете фрейм, который хотите изучать</p>
    </div>

    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <span>Загрузка фреймов...</span>
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
      <button @click="loadFrames" class="retry-button">Повторить попытку</button>
    </div>

    <ul v-else class="frames__list">
      <li class="frames__item" v-for="item in frameItems" :key="item.id">
        <button class="frames__link" @click="navigateToFrame(item.slug)">
          <img
            class="frames__icon"
            :src="item.path"
            :alt="item.title"
            :title="item.title"
            loading="lazy"
          />
        </button>
      </li>
    </ul>
  </section>
</template>
<style lang="scss">
.frames {
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

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 25px;
    list-style: none;
    padding: 0;
  }

  &__item {
    width: 100px;
    height: 100px;
    background-color: #f5f5f5;

    border-radius: 10px;
  }

  &__link {
    display: flex;
    justify-content: center; /* Горизонтальное центрирование */
    align-items: center; /* Вертикальное центрирование */
    width: 100%; /* Занимает всю ширину родителя */
    height: 100%;
    border-color: transparent;
    border-width: 0;
    border-radius: 10px;
  }

  &__icon {
    max-width: 100%; /* Чтобы изображение не выходило за границы */
    max-height: 100%;
  }
}
</style>
