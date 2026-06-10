<template>
  <div class="sources">
    <div class="sources__header">
      <h2 class="sources__title">Использованные источники</h2>
      <p class="sources__acknowledgement">
        Мы выражаем глубокую благодарность создателям следующих ресурсов, которые сделали возможной
        нашу работу.
      </p>
    </div>

    <ul class="sources__list">
      <li v-for="source in sources" :key="source.id" class="sources__item">
        <a :href="source.link" target="_blank" rel="noopener noreferrer" class="sources__link">
          <span class="sources__name">{{ source.name }}</span>
          <span class="sources__description">{{ source.description }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Source {
  id: number
  name: string
  description: string
  link: string
}

export default defineComponent({
  name: 'SourcesList',
  data() {
    return {
      sources: [
        {
          id: 1,
          name: 'Национальный корпус русского языка (НКРЯ)',
          description: 'Основной источник примеров коллокаций и словоупотреблений',
          link: 'https://ruscorpora.ru/',
        },
        {
          id: 2,
          name: 'SkELL (Sketch Engine for Language Learning)',
          description: 'Источник для анализа частотности словосочетаний',
          link: 'https://skell.sketchengine.eu/#home',
        },
        {
          id: 3,
          name: 'WordNet',
          description: 'Использовался для семантических отношений между словами',
          link: 'https://wordnet.princeton.edu/',
        },
      ] as Source[],
    }
  },
})
</script>

<style lang="scss" scoped>
.sources {
  &__header {
    margin-bottom: 2rem;
    text-align: center;
  }

  &__title {
    margin: 0 auto;
    margin-bottom: 1rem;

    color: #333;
    font-family: 'Inter', serif;
    text-transform: uppercase;
    font-size: 60px;
    font-weight: bold;
    background: linear-gradient(45deg, #42b983, #647eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__acknowledgement {
    color: #666;
    font-size: 20px;
    line-height: 1.5;
    max-width: 800px;
    margin: 0 auto;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 800px;
  }

  &__item {
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }

  &__link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  &__name {
    display: block;
    font-size: 18px;
    font-weight: 500;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    transition: color 0.2s;

    .sources__item:hover & {
      color: #42b883;
    }
  }

  &__description {
    display: block;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }
}
</style>
