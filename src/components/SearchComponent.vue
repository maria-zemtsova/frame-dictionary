<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

type SearchResultType = 'frame' | 'participant' | 'action'

interface SearchResult {
  type: SearchResultType
  title: string
  description?: string
  slug: string
  frameTitle?: string
  frameSlug?: string
}

interface Frame {
  title: string
  description?: string
  slug: string
}

interface Participant {
  title: string
  description?: string
  slug: string
  frameTitle?: string
  frameSlug?: string
  path: string
}

interface Action {
  title: string
  description?: string
  slug: string
  frameTitle?: string
  frameSlug?: string
  path: string
}

const router = useRouter()
const searchQuery = ref('')
const isSearchOpen = ref(false)
const isLoading = ref(false)
const searchResults = ref<SearchResult[]>([])
const modalRef = ref<HTMLDivElement | null>(null)

const hasResults = computed(() => searchResults.value.length > 0)

const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  isLoading.value = true
  searchResults.value = []
  const query = searchQuery.value.toLowerCase()

  try {
    // 1. Загружаем и ищем по фреймам
    const { data: framesData } = await axios.get<{ frames: Frame[] }>('/api/frames/index.json')
    const frameResults = framesData.frames
      .filter(
        (frame) =>
          frame.title.toLowerCase().includes(query) ||
          (frame.description && frame.description.toLowerCase().includes(query)),
      )
      .map((frame) => ({
        type: 'frame' as const,
        title: frame.title,
        description: frame.description,
        slug: frame.slug,
      }))

    // 2. Загружаем и ищем по участникам
    let participantResults: SearchResult[] = []
    try {
      const { data: participantsData } = await axios.get<{ participants: Participant[] }>(
        '/api/participants/index.json',
      )
      participantResults = participantsData.participants
        .filter(
          (participant) =>
            participant.title.toLowerCase().includes(query) ||
            (participant.description && participant.description.toLowerCase().includes(query)),
        )
        .map((participant) => ({
          type: 'participant' as const,
          title: participant.title,
          description: participant.description,
          slug: participant.slug,
          frameTitle: participant.frameTitle,
          frameSlug: participant.path.split('/')[2],
        }))
    } catch (error) {
      console.error('Error loading participants:', error)
    }

    // 3. Загружаем и ищем по действиям
    let actionResults: SearchResult[] = []
    try {
      const { data: actionsData } = await axios.get<{ actions: Action[] }>(
        '/api/lexemes/index.json',
      )
      actionResults = actionsData.actions
        .filter(
          (action) =>
            action.title.toLowerCase().includes(query) ||
            (action.description && action.description.toLowerCase().includes(query)),
        )
        .map((action) => ({
          type: 'action' as const,
          title: action.title,
          description: action.description,
          slug: action.slug,
          frameTitle: action.frameTitle,
          frameSlug: action.path.split('/')[2],
        }))
    } catch (error) {
      console.error('Error loading actions:', error)
    }

    // Объединяем и сортируем результаты
    searchResults.value = [...frameResults, ...participantResults, ...actionResults].sort((a, b) =>
      a.title.localeCompare(b.title),
    )
  } catch (error) {
    console.error('Search error:', error)
  } finally {
    isLoading.value = false
  }
}

const navigateToResult = (result: SearchResult) => {
  closeSearch()

  let path = ''
  switch (result.type) {
    case 'frame':
      path = `/frames/${result.slug}`
      break
    case 'participant':
      path = `/frames/${result.slug}`
      break
    case 'action':
      path = `/frames/${result.slug}`
      break
  }

  if (path) {
    router.push(path)
  }
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
  searchResults.value = []
}

const handleClickOutside = (event: MouseEvent) => {
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    closeSearch()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div class="search">
    <button class="search__trigger" @click="isSearchOpen = true">
      <svg class="search__icon" viewBox="0 0 24 24">
        <path
          d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
      <span class="search__text">Поиск</span>
    </button>

    <transition name="fade">
      <div v-if="isSearchOpen" class="modal__overlay">
        <div ref="modalRef" class="modal__content">
          <button @click="closeSearch" class="modal__close">×</button>
          <h2 class="modal__title">Поиск</h2>

          <div class="search__input-container">
            <input
              v-model="searchQuery"
              @input="performSearch"
              placeholder="Поиск фреймов, участников, действий..."
              class="search__input"
              autofocus
            />
          </div>

          <div v-if="isLoading" class="search__loading">
            <div class="search__spinner"></div>
          </div>

          <div v-else class="search__results">
            <div v-if="!hasResults && searchQuery" class="search__empty">Ничего не найдено</div>

            <ul v-else class="search__list">
              <li
                v-for="(item, index) in searchResults"
                :key="index"
                class="search__item"
                @click="navigateToResult(item)"
              >
                <div class="search__badge" :class="`search__badge--${item.type}`">
                  {{
                    item.type === 'frame'
                      ? 'Фрейм'
                      : item.type === 'participant'
                        ? 'Участник'
                        : 'Действие'
                  }}
                </div>
                <div class="search__content">
                  <h3 class="search__title">{{ item.title }}</h3>
                  <p v-if="item.description" class="search__description">{{ item.description }}</p>
                  <p v-if="item.frameTitle" class="search__frame">
                    Из фрейма: {{ item.frameTitle }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<style lang="scss">
.search {
  &__trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  &__icon {
    width: 20px;
    height: 20px;
    fill: #42b883;
  }

  &__text {
    font-size: 20px;
    color: #2c3e50;
    font-family: Inter;
  }
}

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
    width: 90%;
    max-width: 600px;
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
    color: #666;
    transition: color 0.2s;

    &:hover {
      color: #333;
    }
  }

  &__title {
    width: 100%;
    text-align: center;
    margin-bottom: 1.5rem;
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
}

.search {
  &__input-container {
    margin-bottom: 1.5rem;
  }

  &__input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #42b883;
    }
  }

  &__loading {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }

  &__spinner {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 3px solid rgba(66, 184, 131, 0.3);
    border-radius: 50%;
    border-top-color: #42b883;
    animation: spin 1s ease-in-out infinite;
  }

  &__empty {
    padding: 1rem;
    text-align: center;
    color: #666;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    padding: 1rem;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f8f8f8;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 8px;
    color: white;

    &--frame {
      background-color: #42b883;
    }

    &--participant {
      background-color: #647eff;
    }

    &--action {
      background-color: #ff9800;
    }
  }

  &__content {
    h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
  }

  &__description {
    margin: 0;
    font-size: 14px;
    color: #666;
  }

  &__frame {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
    font-style: italic;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
